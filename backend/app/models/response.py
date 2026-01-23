from pydantic import BaseModel
from typing import Optional, Dict

class AnalysisResponse(BaseModel):
    label: str
    confidence: float
    probabilities: Optional[Dict[str, float]] = None
    explanation: Optional[str] = None
