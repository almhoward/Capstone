from flask import Flask, request, jsonify
from flask_cors import CORS
from .recipe_search import get_ingredients

app = Flask(__name__)
CORS(app, origins=['https://capstonesearchbar.web.app', 'http://localhost:3000'])

@app.route('/', methods=['GET'])
def search_recipe():
    print("Function search_recipe started.")
    query = request.args.get('query')
    if not query:
        print("Query parameter is missing.")
        return jsonify({"error": "Query parameter is missing"}), 400

    try:
        print(f"Attempting to get ingredients for query: {query}")
        ingredients = get_ingredients(query)
        print(f"Successfully retrieved ingredients: {ingredients}")
        return jsonify({
            "best_match": query, # The query is the recipe name
            "ingredients": ingredients
        })

    except Exception as e:
        import traceback
        print(f"An error occurred: {e}")
        print(traceback.format_exc())
        return jsonify({"error": "Failed to get recipe", "details": str(e)}), 500
