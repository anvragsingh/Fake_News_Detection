# AI Fake News Detector - TruthLens

**TruthLens** is a production-ready AI system designed to detect fake news and misinformation with high accuracy. Powered by a fine-tuned **RoBERTa** transformer model, it analyzes linguistic patterns and semantic context to determine the credibility of news articles in real-time.

## Key Features

*   **Deep Learning Engine**: Utilizes a **RoBERTa-base** model fine-tuned on the **LIAR dataset**, achieving **~63% accuracy** on unseen test data.
*   **Real-time Analysis**: Instant classification of news text as **REAL** or **FAKE** with confidence scores and probability breakdowns.
*   **Modern Web Interface**: A responsive **React 18** frontend featuring a clean, intuitive UI with visual confidence meters.
*   **Scalable Backend**: High-performance **FastAPI** backend serving predictions via RESTful endpoints.
*   **Multi-Input Support**: Designed to handle direct text input, URL scraping (planned), and file uploads.

## Technology Stack

*   **AI/ML**: Python, PyTorch, Hugging Face Transformers, Scikit-learn, Pandas.
*   **Backend**: FastAPI, Uvicorn, SQLAlchemy, Pydantic.
*   **Frontend**: React.js (Vite), Tailwind CSS, Axios, React Router.
*   **Data**: LIAR Benchmark Dataset (12.8k labeled statements).

## Model Performance

The underlying RoBERTa model was trained for 10 epochs on processed text data.

*   **Validation Accuracy**: ~84.95%
*   **Test Accuracy**: 82.83%
*   **Precision (Real)**: 0.78
*   **Recall (Real)**: 0.89

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   Python (v3.10+)

### 1. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual env & install dependencies
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Start the server (runs on port 8001)
uvicorn app.main:app --host 127.0.0.1 --port 8001
```

### 2. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Access the application at **http://localhost:5173**.

## Future Roadmap
- [ ] Integration of "Explanation" engine (LIME/SHAP).
- [ ] Automated URL web scraping.
- [ ] User authentication and history tracking.
- [ ] Model retraining on largescale FakeNewsNet dataset.

## License
This project is licensed under the MIT License.
