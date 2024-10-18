# api/routers/protocol.py
import asyncio
import logging
import os
import markdown
from fastapi import APIRouter, HTTPException

from src.models.response_generation import (
    generate_response_ollama,
    generate_doc_with_openai,
)
from src.prompts.builder import build_prompt
from src.schemas.outlines.protocol_outlines import PROTOCOL_OUTLINE
from src.schemas.protocol_template import ProtocolInput
from weasyprint import HTML
import tempfile

router = APIRouter()
LLM_MODEL = "llama3.2"


@router.post("/generate-synopsis/")
async def generate_synopsis(data: ProtocolInput):
    try:
        prompt = build_prompt(data.model_dump(), 'generate-synopsis')

        synopsis_text = generate_response_ollama(prompt=prompt)

        return {"response": synopsis_text}
    except Exception as e:
        logging.error(f"Error generating protocol synopsis: {e}")
        raise HTTPException(
            status_code=500, detail="Error generating protocol synopsis."
        )


@router.post("/generate-protocol-document")
async def generate_protocol_document(data: ProtocolInput):
    try:
        context = data.model_dump()
        tasks = [
            generate_doc_with_openai(section, PROTOCOL_OUTLINE[section], context)
            for section in PROTOCOL_OUTLINE
        ]
        document = await asyncio.gather(*tasks)
        combined_doc = "\n\n".join(document)

        html_content = markdown.markdown(combined_doc, extensions=['extra', 'tables'])

        # Wrap the HTML content in a basic HTML structure for proper rendering
        full_html_content = f"""
               <html>
               <head>
                   <style>
                       body {{ font-family: Arial, sans-serif; }}
                       h1, h2, h3 {{ color: #333; }}
                       table {{ width: 100%; border-collapse: collapse; }}
                       th, td {{ border: 1px solid #ddd; padding: 8px; }}
                       th {{ background-color: #f2f2f2; }}
                   </style>
               </head>
               <body>
                   {html_content}
               </body>
               </html>
               """

        # Generate the PDF from the interpreted HTML and store it in a temporary directory
        temp_dir = tempfile.gettempdir()  # System temp directory
        pdf_path = os.path.join(temp_dir, "protocol_document.pdf")
        HTML(string=full_html_content).write_pdf(pdf_path)

        return {"response": combined_doc}
    except Exception as e:
        logging.error(f"Error generating the document: {e}")
        raise HTTPException(status_code=500, detail="Error generate protocol document.")


from fastapi.responses import FileResponse
import os


@router.get("/download-protocol")
async def download_protocol_document():
    try:
        # Get the file path for the stored PDF in the temp directory
        temp_dir = tempfile.gettempdir()  # Temporary directory
        pdf_path = os.path.join(temp_dir, "protocol_document.pdf")

        # Check if the file exists
        if not os.path.exists(pdf_path):
            raise HTTPException(status_code=404, detail="PDF not found")

        # Return the PDF file as a response for download
        return FileResponse(pdf_path, media_type='application/pdf', filename="protocol_document.pdf")

    except Exception as e:
        raise HTTPException(status_code=500, detail="Error downloading the protocol document.")
