import ollama
from openai import AsyncClient
import asyncio
from src.config.api_key import OPENAI_API_KEY

client_openai = AsyncClient(api_key=OPENAI_API_KEY)


def generate_response_ollama(prompt: str):
    """

    :param prompt: Prompt to a Ollama3.1
    :return: Response from Ollama3.1
    """

    response = ollama.chat(
        model='llama3.1',
        messages=[
            {
                'role': 'user',
                'content': prompt,
            },
        ],
    )
    return response['message']['content']


async def generate_doc_with_openai(
    section_title, subsections, input_content, model="gpt-4o-mini"
):
    # Create a single prompt for the entire section, including subsections
    subsections_list = "\n".join([f"- {subsection}" for subsection in subsections])
    prompt = f"""
    You are a clinical trial protocol specialist, and your task is to write a highly detailed, formal, and professional clinical trial protocol document. 
    Specifically, write the section '{section_title}', ensuring that all subsections are fully covered. The subsections that need to be addressed are:

    {subsections_list}

    Make sure the following points are covered:
    1. Adhere to the formal tone used in clinical trial protocols.
    2. Provide detailed, in-depth explanations where necessary, especially focusing on the scientific and procedural aspects.
    3. Follow ICH-GCP (International Conference on Harmonisation - Good Clinical Practice) guidelines where applicable.
    4. Ensure each subsection is complete and self-contained and HIGHLY DETAILED.
    5. Format - in markdown. 
    6. Create tables where appropriate (e.g., in synopsis). 
    7. Be extremely thorough and detailed but don't make things up, stick to the input.

    Use the following information about the clinical trial to ensure relevance: {input_content}.

    Structure the response as it would appear in a real clinical trial protocol document, maintaining clarity and precision and detail.

    DO NOT WRITE ANYTHING IRRELEVANT TO THE CLINICAL STUDY INCLUDING COMMENTS ABOUT WHAT YOU ARE WRITING OR HOW YOU ARE DOING IT.
    Remember also when writing in markdown don't use ```markdown but something that can be interpreted universally. 
    """

    response = await client_openai.chat.completions.create(
        model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()
