# app/schemas.py

from pydantic import BaseModel
from datetime import datetime

class ReviewOut(BaseModel):
    # Matches the columns in models.py
    id: int
    contact_number: str
    user_name: str
    product_name: str
    product_review: str
    created_at: datetime

    class Config:
        # Enables conversion from SQLAlchemy model instances
        from_attributes = True