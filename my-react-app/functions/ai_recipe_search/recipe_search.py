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
    prompt = f"""List the primary and universally expected ingredients for {user_query}.
If {user_query} refers to a common prepared dish (e.g., hamburger, sandwich, salad), include both the foundational components and widely recognized standard accompanying ingredients that are almost always served with it to complete the dish.
Only return the ingredient names, each on a new line.
Do not include quantities, descriptions, preparation steps, or any other text.
Exclude common universal seasonings (e.g., salt, black pepper, cooking oil, water) unless they are a defining, integral, and substantial component of the dish's flavor or structure (e.g., heavily brined items, specific seasoned oils, stocks, or doughs where water content is critical).
Prioritize ingredients that would be present in the most common or traditional preparation of the dish.Push """

    # 3. Generate content
    model = genai.GenerativeModel('gemini-2.5-flash-lite-preview-06-17')
    response = model.generate_content(prompt)

    # 4. Return the ingredients as a list
    return [ingredient.strip() for ingredient in response.text.strip().split('\n')]