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
-The student's answer has been extracted using OCR and may contain missing words, spelling errors, formatting issues, or incorrectly recognized characters.
Evaluate the answer based on the meaning and concepts conveyed rather than grammatical correctness or OCR mistakes.
Only award marks when you can confidently understand that the student has demonstrated the required concept, formula, reasoning, or calculation according to the rubric.
If a portion of the answer is unclear, ambiguous, or cannot be understood due to OCR errors, do not assume the intended meaning. Award marks only for the parts that are clearly understandable and supported by the extracted text.
Do not guess missing content. When in doubt, be conservative and explain which parts could not be evaluated because of unclear OCR extraction.

Return output in JSON format like:
{{
  "results": {{
    "Q1": {{"marks": , "reason": "..."}},
    "Q2": {{"marks": , "reason": "..."}}
  }},
  "total_marks":,
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