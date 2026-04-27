from typing import TypedDict, Dict


class QuestionItem(TypedDict):
    questionText: str
    maxMarks: int
    rubrics: str

# Each evaluation result
class EvaluationItem(TypedDict):
    marks: int
    reason: str

# Final state
class EvaluationState(TypedDict):
    pdf_url: str
    answer_text: str
    prompt: str
    questions: Dict[str, QuestionItem]
    results: Dict[str, EvaluationItem]
    total_marks:int
    remarks: str