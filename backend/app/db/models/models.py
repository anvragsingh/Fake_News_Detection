from sqlalchemy import Boolean, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    predictions = relationship("Prediction", back_populates="owner")
    feedback = relationship("Feedback", back_populates="user")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    label = Column(String)
    confidence = Column(Float)
    probability_fake = Column(Float)
    probability_real = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Nullable for anonymous users?
    
    owner = relationship("User", back_populates="predictions")
    feedback = relationship("Feedback", back_populates="prediction", uselist=False)

class Feedback(Base):
    __tablename__ = "feedback"
    
    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer) # 1-5 or boolean?
    comment = Column(String, nullable=True)
    actual_label = Column(String, nullable=True) # validation if user knows
    created_at = Column(DateTime, default=datetime.utcnow)
    
    prediction_id = Column(Integer, ForeignKey("predictions.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    prediction = relationship("Prediction", back_populates="feedback")
    user = relationship("User", back_populates="feedback")
