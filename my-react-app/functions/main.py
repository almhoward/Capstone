from firebase_functions import https_fn
from firebase_admin import initialize_app
from ai_recipe_search.app import app

initialize_app()

@https_fn.on_request()
def searchRecipes(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()

# Force redeployment to fix CORS issue
