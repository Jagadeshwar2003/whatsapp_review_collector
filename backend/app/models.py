# app/models.py

from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .db import Base # Import Base from our local db.py file

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    contact_number = Column(String)
    user_name = Column(String)
    product_name = Column(String)
    product_review = Column(Text)
    created_at = Column(DateTime, default=func.now())