import requests
from io import BytesIO

from pdf2image import convert_from_bytes
import numpy as np
import cv2
import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../Tensorflow/HTRPipeline")
    )
)
from htr_pipeline import read_page, DetectorConfig, LineClusteringConfig


def pdfToText_node(state):
    pdf_url = state["pdf_url"]
    response = requests.get(pdf_url)

    if response.status_code != 200:
        raise ValueError(f"Failed to fetch PDF from {pdf_url}")

    pdf_bytes = BytesIO(response.content)

    pages = convert_from_bytes(pdf_bytes.read())

    all_text = ""

    for i, page in enumerate(pages):
        img = cv2.cvtColor(np.array(page), cv2.COLOR_RGB2GRAY)

    # img = cv2.imread(r"C:\Users\DINESH\WorkSpace\GradeOPS\Tensorflow\HTRPipeline\data\IMG_20260425_183320.png", cv2.IMREAD_GRAYSCALE)

    # detect and read text
        read_lines = read_page(img, 
                                DetectorConfig(scale=0.5, margin=5), 
                                line_clustering_config=LineClusteringConfig(min_words_per_line=2))

    # output text
        for read_line in read_lines:
            line_text = ' '.join(read_word.text for read_word in read_line)
            all_text += line_text + "\n"

    print(all_text)
    return{
        "answer_text":all_text
    }


