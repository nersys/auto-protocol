from fastapi import APIRouter, HTTPException
import logging
from src.schemas.protocol_template import ProtocolInput
from src.prompts.builder import build_prompt
from src.models.response_generation import generate_response_ollama


router = APIRouter()
LLM_MODEL = "llama3.2"


@router.post('/generate-outline/')
async def generate_outline(data: ProtocolInput):
    """
    :param data: Takes input from user on the associated protocol document
    :return: An outline generated for that protocol document
    """
    try:
        prompt = build_prompt(data.model_dump(), 'generate-outline')
        outline = generate_response_ollama(prompt=prompt)
        return {"response": outline}
    except Exception as e:
        logging.error(f"Error generating protocol outline: {e}")
        raise HTTPException(
            status_code=500, detail="Error generating protocol outline."
        )
