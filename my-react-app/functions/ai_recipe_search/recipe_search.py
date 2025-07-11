import os
import google.generativeai as genai
from google.cloud import secretmanager

def get_api_key():
    client = secretmanager.SecretManagerServiceClient()
    project_id = os.environ.get("GCP_PROJECT", "capstonesearchbar") # Fallback to hardcoded project ID
    secret_id = "API_KEY"  # The name of the secret in Secret Manager
    version_id = "latest"  # Use the latest version of the secret
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    response = client.access_secret_version(name=name)
    return response.payload.data.decode("UTF-8")

# Configure the client
genai.configure(api_key=get_api_key())

def get_ingredients(user_query: str) -> list[str]:
    # 2. Create a prompt
    prompt = f"""List the primary and essential ingredients for {user_query}.
Only return the ingredient names, each on a new line.
Do not include quantities, descriptions, or any other text.
Exclude common universal seasonings like salt and pepper unless they are a defining component of the dish.
Focus on the core components that make up the dish."""

    # 3. Generate content
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(prompt)

    # 4. Return the ingredients as a list
    return [ingredient.strip() for ingredient in response.text.strip().split('\n')]