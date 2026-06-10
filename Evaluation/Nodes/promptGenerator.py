from state import EvaluationState

def prompt_node(state: EvaluationState):
    answer_text = state.get("answer_text", "")
    questions = state.get("questions", {})

    # Build questions + rubrics section
    questions_block = ""
    for qid, q in questions.items():
        questions_block += f"""
{qid}:
Question: {q.questionText}
Max Marks: {q.maxMarks}
Rubric: {q.rubrics}
"""

    # Final prompt
    prompt = f"""
You are an examiner. Evaluate the student's answers strictly based on the rubric.

======================
STUDENT ANSWERS:
======================
{answer_text}

======================
QUESTIONS & RUBRICS:
======================
{questions_block}

======================
INSTRUCTIONS:
======================
- Evaluate each question separately
- Follow the rubric strictly
- Do not give extra marks
- Be concise but clear in reasoning
- Only give marks if the keywords mentioned in the rubrics were present

Return output in JSON format like:
{{
  "results": {{
    "Q1": {{"marks": 4, "reason": "..."}},
    "Q2": {{"marks": 3, "reason": "..."}}
  }},
  "total_marks":7,
  "remarks": "2 to 6 words overall summary"
}}

Rules for remarks:
- Must be 2 to 6 words ONLY
- No full sentences
- Examples: "Good understanding", "Needs more clarity", "Strong but incomplete"
"""
   
    return {
        "prompt":prompt
    }