# app/main.py

from fastapi import FastAPI, Request, Depends
# >>> FIX: Add PlainTextResponse for TwiML output
from fastapi.responses import PlainTextResponse 
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

# Corrected Relative Imports (The '.' ensures files inside 'app' find each other)
from .db import SessionLocal, engine, Base
from .models import Review
from .schemas import ReviewOut
from .twilio_helpers import twiml_message

# Create database tables (if they don't already exist)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="WhatsApp Review Collector")

# CORS (Allows your frontend to connect during development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary in-memory conversation storage
conversations = {}

# DB session dependency function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Webhook for WhatsApp messages ---
# >>> FIX: Set response_class to PlainTextResponse for TwiML
@app.post("/api/whatsapp", response_class=PlainTextResponse) 
async def webhook(request: Request, db: Session = Depends(get_db)):
    form = await request.form()
    from_number = form.get("From")
    body = (form.get("Body") or "").strip()

    if from_number not in conversations:
        conversations[from_number] = {"stage": 0}

    session = conversations[from_number]

    if session["stage"] == 0:
        session["stage"] = 1
        return twiml_message("Welcome! Which product is this review for?")

    if session["stage"] == 1:
        session["product_name"] = body
        session["stage"] = 2
        return twiml_message("Got it. What's your name?")

    if session["stage"] == 2:
        session["user_name"] = body
        session["stage"] = 3
        return twiml_message(
            f"Thanks, {session['user_name']}. Please send your review for {session['product_name']} now."
        )

    if session["stage"] == 3:
        review = Review(
            contact_number=from_number,
            user_name=session["user_name"],
            product_name=session["product_name"],
            product_review=body,
        )
        db.add(review)
        db.commit()
        db.refresh(review) 

        conversations.pop(from_number)
        return twiml_message(f"Thank you, {review.user_name}! Your review for {review.product_name} has been recorded.")

    return twiml_message("Error. Send 'Hi' to start again.")


# --- API to fetch reviews (for Frontend) ---
@app.get("/api/reviews", response_model=List[ReviewOut])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).order_by(Review.created_at.desc()).all()