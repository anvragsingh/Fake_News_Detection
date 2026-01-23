from pydantic import BaseModel
from typing import Optional

class AnalysisRequest(BaseModel):
    text: str
    url: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "text": "Breaking news: Aliens have landed in Central Park!",
                "url": "http://example.com/aliens"
            }
        }
