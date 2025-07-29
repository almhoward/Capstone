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
    prompt = f"""You are an expert culinary assistant specializing in recipe analysis. Your task is to identify and list the essential ingredients for a given dish.

**Dish:**
{user_query}

**Instructions:**
1.  **Primary Ingredients:** List the core, foundational components of the dish.
2.  **Standard Accompaniments:** If the dish is a common preparation (e.g., hamburger, sandwich, salad), also include the standard ingredients that are almost always served with it to complete the dish.
3.  **Output Format:** Return only the ingredient names, with each ingredient on a new line. Do not include quantities, descriptions, preparation steps, or any other text.
4.  **Exclusions:** Do not include common seasonings like salt, black pepper, cooking oil, or water unless they are a defining and substantial component of the final dish (e.g., brine, seasoned oils, dough).
5.  **Important Note on Tomatoes:** For dishes where tomatoes are a common ingredient (such as many chicken, pasta, or salad dishes), ensure that "Tomatoes" are included in the list.
6.  **Ingredient Specificity:**
    *   If "Butter" is mentioned, interpret it as a category that can include "peanut butter" or "almond butter".
    *   However, treat "peanut butter chips" as a distinct ingredient that should only be returned if explicitly part of the dish's common recipe.
7.  **Prioritization:** Focus on the ingredients found in the most common, traditional preparation of the dish.

**Example Output for "Peanut Butter and Jelly Sandwich":**
Bread
Peanut Butter
Grape Jelly
"""

    # 3. Generate content
    model = genai.GenerativeModel('gemini-2.5-flash-lite-preview-06-17')
    # Add a generation_config for quality
    generation_config = genai.types.GenerationConfig(
        temperature=0.2,
        top_p=0.85
    )
    response = model.generate_content(
        prompt,
        generation_config=generation_config
    )

    # 4. Return the ingredients as a list
    return [ingredient.strip() for ingredient in response.text.strip().split('\n')]
