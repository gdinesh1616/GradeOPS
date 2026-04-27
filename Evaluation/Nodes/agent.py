from langchain_google_genai import ChatGoogleGenerativeAI
import json
import re

import os
from dotenv import load_dotenv
from state import EvaluationState
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")


def agent_node(state):
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")  
    response = llm.invoke(state["prompt"]).content

    cleaned = re.sub(r"```json|```", "", response).strip()

    data = json.loads(cleaned)

    return {
        "results": data["results"],
        "total_marks": data["total_marks"],
        "remarks": data["remarks"]
    }
    
