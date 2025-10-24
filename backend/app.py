from __future__ import annotations
import os
from typing import List, Dict, Any

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field


# ----- Request/Response Schemas -----
class InputData(BaseModel):
    cgpa: float = Field(..., ge=0.0, le=10.0)
    college_tier: str
    backlogs: int = Field(..., ge=0)
    current_backlogs: int = Field(..., ge=0)
    internships: int = Field(..., ge=0)
    projects: int = Field(..., ge=0)
    certifications: int = Field(..., ge=0)
    hackathons_won: int = Field(..., ge=0)
    extracurricular: int = Field(..., ge=0)
    skills: List[str]
    communication_skills: int = Field(..., ge=1, le=10)
    problem_solving: int = Field(..., ge=1, le=10)
    teamwork: int = Field(..., ge=1, le=10)
    leadership: int = Field(..., ge=1, le=10)
    time_management: int = Field(..., ge=1, le=10)
    aptitude_score: int = Field(..., ge=0, le=100)
    coding_score: int = Field(..., ge=0, le=100)


class PredictionResponse(BaseModel):
    placement_probability: float
    placement_prediction: int
    expected_salary_lpa: float
    recommendations: List[str]
    skill_gaps: List[str]
    features: Dict[str, Any]


# ----- Core Service -----
class StudentCareerSystem:
    def __init__(self, models_dir: str):
        self.models_loaded = False
        self.models_dir = models_dir
        self.load_models()

    def _p(self, fname: str) -> str:
        return os.path.join(self.models_dir, fname)

    def load_models(self) -> None:
        try:
            self.placement_model = joblib.load(self._p("placement_model.pkl"))
            self.salary_model = joblib.load(self._p("salary_model.pkl"))
            self.scalers = joblib.load(self._p("scalers.pkl"))
            self.label_encoders = joblib.load(self._p("label_encoders.pkl"))
            self.feature_columns = joblib.load(self._p("feature_columns.pkl"))
            self.models_loaded = True
        except FileNotFoundError as e:
            raise FileNotFoundError(
                f"Model artifact missing: {e}. Expected in {self.models_dir}"
            )

    def preprocess_input(self, input_data: InputData) -> pd.DataFrame:
        data = input_data
        features: Dict[str, Any] = {}

        # Academic
        features["cgpa"] = data.cgpa
        features["backlogs"] = data.backlogs
        features["current_backlogs"] = data.current_backlogs
        # Encode college tier
        try:
            features["college_tier"] = self.label_encoders["college_tier"].transform([data.college_tier])[0]
        except Exception:
            # Fallback for unseen label: default to lowest encoded value
            features["college_tier"] = 0

        # Experience
        features["internships"] = data.internships
        features["internship_duration_months"] = data.internships * 2
        features["academic_projects"] = data.projects
        features["research_papers"] = min(data.projects // 3, 2)
        features["github_projects"] = data.projects

        # Technical skills one-hot
        skills = set(s.strip() for s in (data.skills or []))
        features["python"] = 1 if "Python" in skills else 0
        features["java"] = 1 if "Java" in skills else 0
        features["sql"] = 1 if "SQL" in skills else 0
        features["machine_learning"] = 1 if "Machine Learning" in skills else 0
        features["web_development"] = 1 if "Web Development" in skills else 0
        features["cloud_computing"] = 1 if "Cloud Computing" in skills else 0
        features["data_science"] = 1 if "Data Science" in skills else 0

        # Soft skills
        features["communication_skills"] = data.communication_skills
        features["problem_solving"] = data.problem_solving
        features["teamwork"] = data.teamwork
        features["leadership"] = data.leadership
        features["time_management"] = data.time_management

        # Tests
        features["aptitude_score"] = data.aptitude_score
        features["coding_test_score"] = data.coding_score

        # Activities
        features["certifications_count"] = data.certifications
        features["hackathons_won"] = data.hackathons_won
        features["extracurricular_activities"] = data.extracurricular

        # Order features
        df = pd.DataFrame([features])
        try:
            df = df[self.feature_columns]
        except Exception as e:
            missing = [c for c in self.feature_columns if c not in df.columns]
            raise ValueError(f"Missing expected features: {missing}") from e
        return df

    def predict_placement(self, features: pd.DataFrame) -> tuple[float, int]:
        X = self.scalers["placement"].transform(features)
        prob = float(self.placement_model.predict_proba(X)[0][1])
        pred = int(self.placement_model.predict(X)[0])
        return prob, pred

    def predict_salary(self, features: pd.DataFrame) -> float:
        X = self.scalers["salary"].transform(features)
        salary = float(self.salary_model.predict(X)[0])
        return max(3.0, min(25.0, salary))

    def recommend_courses(self, input_data: InputData, placement_prob: float) -> List[str]:
        recs: List[str] = []
        if input_data.cgpa < 7.5:
            recs.append("📚 Academic Excellence Program")
        if input_data.backlogs > 0:
            recs.append("⏰ Backlog Clearance Strategy")
        skills = set(input_data.skills or [])
        if "Python" not in skills and placement_prob > 0.3:
            recs.append("🐍 Python Programming Fundamentals")
        if "SQL" not in skills:
            recs.append("🗄️ Database Management with SQL")
        if "Machine Learning" not in skills and placement_prob > 0.6:
            recs.append("🤖 Machine Learning Basics")
        if input_data.internships == 0:
            recs.append("💼 Internship Preparation Workshop")
        if input_data.communication_skills < 7:
            recs.append("🎤 Communication Skills Mastery")
        if input_data.aptitude_score < 70:
            recs.append("🧠 Quantitative Aptitude Training")
        if input_data.coding_score < 70:
            recs.append("⚡ Data Structures & Algorithms")
        if placement_prob > 0.7:
            if "Cloud Computing" in skills:
                recs.append("☁️ AWS Cloud Practitioner")
            if "Web Development" in skills:
                recs.append("🌐 Advanced Full Stack Development")
        return recs

    def analyze_skill_gaps(self, input_data: InputData) -> List[str]:
        gaps: List[str] = []
        skills = set(input_data.skills or [])
        for s in ["Python", "SQL", "Web Development"]:
            if s not in skills:
                gaps.append(f"Missing {s} skills")
        if input_data.internships == 0:
            gaps.append("No internship experience")
        if input_data.projects < 3:
            gaps.append("Insufficient project portfolio")
        if input_data.cgpa < 7.0:
            gaps.append("CGPA below competitive threshold")
        if input_data.backlogs > 2:
            gaps.append("Multiple backlogs affecting prospects")
        if input_data.communication_skills < 6:
            gaps.append("Communication skills need improvement")
        return gaps


# ----- FastAPI App -----
app = FastAPI(title="Student Career Guidance Backend", version="1.0.0")

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
system = StudentCareerSystem(MODELS_DIR)


@app.get("/health")
def health():
    return {"status": "ok", "models_loaded": system.models_loaded}


@app.post("/predict", response_model=PredictionResponse)
def predict(data: InputData):
    if not system.models_loaded:
        raise HTTPException(status_code=500, detail="Models not loaded")
    features_df = system.preprocess_input(data)
    placement_prob, placement_pred = system.predict_placement(features_df)
    salary_pred = system.predict_salary(features_df)
    recs = system.recommend_courses(data, placement_prob)
    gaps = system.analyze_skill_gaps(data)
    return PredictionResponse(
        placement_probability=placement_prob,
        placement_prediction=placement_pred,
        expected_salary_lpa=salary_pred,
        recommendations=recs,
        skill_gaps=gaps,
        features=features_df.iloc[0].to_dict(),
    )


# For local dev: uvicorn backend.app:app --reload --port 8000
