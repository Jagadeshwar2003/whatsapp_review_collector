# app/db.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 🚨 UPDATE THIS LINE 🚨 with your actual credentials
# Format: "postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
SQLALCHEMY_DATABASE_URL = "postgresql://reviews:mydevpass123@localhost:5432/whatsapp_reviews_db"

# Create the engine instance
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Configure the session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative class definitions (used in models.py)
Base = declarative_base()