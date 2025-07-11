from flask import Flask, request, jsonify
from flask_cors import CORS
from .recipe_search import get_ingredients

app = Flask(__name__)
CORS(app, origins=['https://capstonesearchbar.web.app', 'http://localhost:3000'])

@app.route('/', methods=['GET'])
def search_recipe():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is missing"}), 400

    try:
        ingredients = get_ingredients(query)
        return jsonify({
            "best_match": query, # The query is the recipe name
            "ingredients": ingredients
        })

    except Exception as e:
        return jsonify({"error": "Failed to get recipe", "details": str(e)}), 500
