from fastapi import APIRouter, HTTPException, Request
from app.models.request import AnalysisRequest
from app.models.response import AnalysisResponse
from app.ml.model import FakeNewsModel

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_text(request: AnalysisRequest, req: Request):
    # Get model instance from app state
    model: FakeNewsModel = req.app.state.model
    
    if not model:
        raise HTTPException(status_code=503, detail="Model not loaded")
        
    try:
        result = model.predict(request.text)
        return AnalysisResponse(
            label=result["label"],
            confidence=result["confidence"],
            probabilities=result["probabilities"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
