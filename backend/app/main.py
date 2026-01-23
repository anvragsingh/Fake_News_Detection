from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from app.core.config import get_settings
from app.api.v1 import analyze, health
from app.ml.model import FakeNewsModel
from app.db.session import engine
from app.db.models import models

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting up...")
    
    # Create DB Tables
    models.Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    
    model_path = settings.MODEL_PATH
    
    # Check if we are running from root or backend dir to adjust path if needed
    if not os.path.exists(model_path):
        # Try adjusting path relative to cwd
        possible_path = os.path.join(os.getcwd(), model_path)
        if os.path.exists(possible_path):
            model_path = possible_path
    
    try:
        app.state.model = FakeNewsModel(model_path)
    except Exception as e:
        print(f"⚠️ WARNING: Could not load ML model: {e}")
        app.state.model = None
        
    yield
    
    # Shutdown
    print("🛑 Shutting down...")
    app.state.model = None

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(analyze.router, prefix=settings.API_V1_STR, tags=["Analysis"])
app.include_router(health.router, prefix=settings.API_V1_STR, tags=["Health"])

@app.get("/")
async def root():
    return {"message": "AI Fake News Detector API is running"}
