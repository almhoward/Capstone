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
8.  **Dish-Specific Guidelines:**
    *   **Burgers/Sandwiches:** Include bread/bun, protein, lettuce, tomato, onion, cheese, and common condiments (mayo, mustard, ketchup).
    *   **Salads:** Include greens, vegetables, protein (if common), cheese, and dressing.
    *   **Pizza:** Include dough, sauce, cheese, and common toppings (pepperoni, mushrooms, etc.).
    *   **Tacos/Burritos:** Include tortilla, protein, lettuce, tomato, cheese, sour cream, and salsa.
    *   **Pasta:** Include pasta, sauce, cheese, and common additions (meat, vegetables).
    *   **Asian Dishes:** Include rice/noodles, protein, vegetables, and sauce/seasoning.
    *   **Breakfast:** Include main component, sides (toast, hash browns), and accompaniments (butter, syrup, milk).
    *   **Desserts:** Include main component, toppings, and serving accompaniments (ice cream, whipped cream).
    *   **Drinks:** Include base liquid, flavorings, and garnishes.
    *   **Soups:** Include broth, vegetables, protein, and serving accompaniments (bread, crackers).

9.  **Ingredient Categories to Consider:**
    *   **Base Components:** Main structural elements (bread, pasta, rice, meat)
    *   **Vegetables:** Fresh, cooked, or pickled vegetables
    *   **Dairy:** Cheese, milk, yogurt, cream
    *   **Condiments:** Sauces, spreads, dressings, dips
    *   **Garnishes:** Fresh herbs, citrus, nuts, seeds
    *   **Accompaniments:** Side items typically served with the dish
    *   **Seasonings:** Spices, herbs, salt, pepper (only if substantial)

10. **Regional/Cultural Considerations:**
    *   For ethnic dishes, include traditional accompaniments and garnishes
    *   Consider common serving styles and expected components
    *   Include typical sauces, chutneys, or condiments specific to the cuisine

11. **Dish Complexity Rules:**
    *   For simple dishes (e.g., "apple"), include common serving accompaniments
    *   For complex dishes, break down into component categories
    *   For generic terms (e.g., "chicken"), include common preparation methods and sides

**Example Output for "Peanut Butter and Jelly Sandwich":**
Bread
Peanut Butter
Grape Jelly
"""

    # 3. Generate content
    model = genai.GenerativeModel('gemini-2.5-flash-lite-preview-06-17')
    # Add a generation_config for quality
    generation_config = genai.types.GenerationConfig(
        temperature=0.7,
        top_p=0.85
    )
    response = model.generate_content(
        prompt,
        generation_config=generation_config
    )

    # 4. Return the ingredients as a list
    return [ingredient.strip() for ingredient in response.text.strip().split('\n')]
