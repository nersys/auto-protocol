from typing import Dict
import logging
import os
from jinja2 import Environment, FileSystemLoader, select_autoescape, DebugUndefined

# Define mappings for backend functions to templates
PROMPT_TEMPLATES = {
    "generate-outline": "protocol_outline.jinja2",
    "generate-synopsis": "synopsis.jinja2",
}


def get_project_root() -> str:
    """Returns the absolute path to the project root."""
    return os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))


def build_prompt(data: Dict, backend_function: str, prompt_type: str = "") -> str:
    """
    Builds the appropriate prompt string based on the backend function being executed.

    Args:
        data (Dict): Dictionary of data to pass into the prompt template.
        backend_function (str): Name of the backend function (e.g., "generate-outline").
        prompt_type (str): Optional prefix text for the prompt (e.g., "SYNOPSIS:")

    Returns:
        str: Rendered prompt string ready for the backend function.
    """
    try:
        template_name = PROMPT_TEMPLATES.get(backend_function)
        if not template_name:
            raise ValueError(
                f"No template found for backend function '{backend_function}'"
            )

        templates_path = os.path.join(get_project_root(), 'src/schemas/templates')

        if not os.path.isdir(templates_path):
            raise FileNotFoundError(f"Templates directory not found: {templates_path}")

        env = Environment(
            loader=FileSystemLoader(templates_path),
            autoescape=select_autoescape(),
        )

        available_templates = env.loader.list_templates()
        if template_name not in available_templates:
            raise FileNotFoundError(
                f"Template '{template_name}' not found in {templates_path}"
            )

        template = env.get_template(template_name)
        return prompt_type + template.render(data)

    except Exception as e:
        logging.error(f"Error rendering prompt for '{backend_function}': {e}")
        return ""
