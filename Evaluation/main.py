from typing import TypedDict, Dict
import os
import json
from typing import TypedDict, Dict
# from dotenv import load_dotenv
# from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph
from state import EvaluationState
from Nodes.pdfToText import pdfToText_node
from Nodes.promptGenerator import prompt_node
from Nodes.agent import agent_node
# Each question definition


# load_dotenv()

builder = StateGraph(EvaluationState)

builder.add_node("pdf_to_text",pdfToText_node)
builder.add_node("prompt_generator", prompt_node)
builder.add_node("evaluator",agent_node)
# builder.add_node("final", final_output)

builder.set_entry_point("pdf_to_text")
builder.add_edge("pdf_to_text", "prompt_generator")
builder.add_edge("prompt_generator","evaluator")


graph = builder.compile()




