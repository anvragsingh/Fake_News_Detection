from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/health")
async def health_check(req: Request):
    model_status = "loaded" if getattr(req.app.state, "model", None) else "not_loaded"
    return {
        "status": "ok",
        "model_status": model_status,
        "version": "1.0.0"
    }
