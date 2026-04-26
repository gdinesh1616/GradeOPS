from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
from typing import List
app = FastAPI()

class Question(BaseModel):
    questionText: str
    maxMarks: int
    rubrics: str


class EvalRequest(BaseModel):
    pdf_url: str
    rubric: List[Question]

@app.post("/evaluate")
def evaluate(req: EvalRequest):
    print(req.pdf_url,req.rubric)
    # result = graph.invoke({
    #     "pdf_url": req.pdf_url,
    #     "rubric": req.rubric
    # })
    return 5
    # return result