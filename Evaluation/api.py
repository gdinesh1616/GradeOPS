from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
from typing import List
from state import EvaluationState
from main import graph
app = FastAPI()


class QuestionItem(BaseModel):
    questionText: str
    maxMarks: int
    rubrics: str

class EvalRequest(BaseModel):
    pdf_url: str
    rubric: Dict[str, QuestionItem]

@app.post("/evaluate")
def evaluate(req: EvalRequest):
    result = graph.invoke({
        "pdf_url": req.pdf_url,
        "answer_text": "",   # initial empty
        "prompt": "",        # initial empty
        "questions": req.rubric,
        "results": {},  
        "total_marks":"",     # important
        "remarks": ""        # important
    })
    return result