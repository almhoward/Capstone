import React, { useState, useEffect, useCallback } from 'react';
import './ShopMart.css';

function ShopMart() {
  // Sample product data
  const products = [
    // The Bare Minimum
    { id: 1, name: "Salt", price: 2.99, category: "spices & seasonings", rating: 4.8, reviews: 5000, image: "🧂" },
    { id: 2, name: "Pepper", price: 3.19, category: "spices & seasonings", rating: 4.7, reviews: 4500, image: "🌶️" },
    { id: 3, name: "Olive Oil", price: 15.75, category: "oils & fats", rating: 4.9, reviews: 6000, image: "🫒" },
    { id: 4, name: "Vegetable Oil", price: 4.50, category: "oils & fats", rating: 4.5, reviews: 2000, image: "🌻" },
    { id: 5, name: "All-Purpose Flour", price: 3.29, category: "baking & flours", rating: 4.8, reviews: 3500, image: "🍚" },
    { id: 6, name: "Granulated Sugar", price: 3.99, category: "sweeteners", rating: 4.7, reviews: 2800, image: "🍬" },

    // Canned Goods
    { id: 7, name: "Chicken Stock", price: 2.79, category: "broths & stocks", rating: 4.6, reviews: 1500, image: "🍲" },
    { id: 8, name: "Beef Stock", price: 2.89, category: "broths & stocks", rating: 4.5, reviews: 1200, image: "🍲" },
    { id: 9, name: "Canned Diced Tomatoes", price: 1.29, category: "canned goods", rating: 4.5, reviews: 1800, image: "🍅" },
    { id: 10, name: "Canned Crushed Tomatoes", price: 1.89, category: "canned goods", rating: 4.6, reviews: 1400, image: "🍅" },
    { id: 11, name: "Canned Whole Peeled Tomatoes", price: 1.79, category: "canned goods", rating: 4.5, reviews: 1300, image: "🍅" },
    { id: 12, name: "Tomato Sauce", price: 0.99, category: "canned goods", rating: 4.4, reviews: 1000, image: "🥫" },
    { id: 13, name: "Tomato Paste", price: 0.89, category: "canned goods", rating: 4.4, reviews: 900, image: "🥫" },
    { id: 14, name: "Marinara Sauce", price: 3.49, category: "sauces & condiments", rating: 4.7, reviews: 2000, image: "🍝" },
    { id: 15, name: "Canned White Beans", price: 1.19, category: "canned goods", rating: 4.3, reviews: 800, image: "🥫" },
    { id: 16, name: "Canned Black Beans", price: 1.19, category: "canned goods", rating: 4.4, reviews: 900, image: "🥫" },
    { id: 17, name: "Canned Kidney Beans", price: 1.19, category: "canned goods", rating: 4.3, reviews: 750, image: "🥫" },
    { id: 18, name: "Canned Garbanzo Beans", price: 1.29, category: "canned goods", rating: 4.5, reviews: 1100, image: "🥫" },
    { id: 19, name: "Tuna", price: 1.59, category: "canned goods", rating: 4.2, reviews: 1600, image: "🐟" },
    { id: 20, name: "Coconut Milk", price: 2.49, category: "canned goods", rating: 4.6, reviews: 1000, image: "🥥" },
    { id: 21, name: "Canned Green Chiles", price: 0.99, category: "canned goods", rating: 4.3, reviews: 600, image: "🌶️" },

    // Starches and Dry Goods
    { id: 22, name: "Pasta", price: 1.79, category: "grains & pasta", rating: 4.4, reviews: 1200, image: "🍝" },
    { id: 23, name: "Rice", price: 2.89, category: "grains & pasta", rating: 4.5, reviews: 1600, image: "🍚" },
    { id: 24, name: "Lentils", price: 2.29, category: "grains & pasta", rating: 4.3, reviews: 700, image: "🥣" },
    { id: 25, name: "Split Peas", price: 2.19, category: "grains & pasta", rating: 4.2, reviews: 650, image: "🥣" },
    { id: 26, name: "Dried Bread Crumbs", price: 2.59, category: "baking & flours", rating: 4.1, reviews: 500, image: "🍞" },
    { id: 27, name: "Quinoa", price: 4.99, category: "grains & pasta", rating: 4.7, reviews: 1000, image: "🥣" },
    { id: 28, name: "Oats", price: 4.59, category: "breakfast", rating: 4.6, reviews: 1100, image: "🥣" },
    { id: 29, name: "Cornmeal", price: 2.79, category: "baking & flours", rating: 4.3, reviews: 400, image: "🌽" },
    { id: 30, name: "Baking Powder", price: 2.29, category: "baking & flours", rating: 4.6, reviews: 1100, image: "🥄" },
    { id: 31, name: "Baking Soda", price: 1.49, category: "baking & flours", rating: 4.5, reviews: 900, image: "🥄" },
    { id: 32, name: "Yeast", price: 2.99, category: "baking & flours", rating: 4.7, reviews: 700, image: "🍞" },

    // The Root Cellar (Produce)
    { id: 33, name: "Potatoes", price: 3.99, category: "produce", rating: 4.5, reviews: 1300, image: "🥔" },
    { id: 34, name: "Onions", price: 2.99, category: "produce", rating: 4.6, reviews: 950, image: "🧅" },
    { id: 35, name: "Garlic", price: 0.79, category: "produce", rating: 4.9, reviews: 1100, image: "🧄" },
    { id: 36, name: "Sweet Potatoes", price: 3.59, category: "produce", rating: 4.7, reviews: 850, image: "🍠" },
    { id: 37, name: "Carrots", price: 1.99, category: "produce", rating: 4.6, reviews: 1000, image: "🥕" },
    { id: 38, name: "Celery", price: 2.29, category: "produce", rating: 4.4, reviews: 600, image: "🥬" },
    { id: 115, name: "Bell Peppers", price: 2.50, category: "produce", rating: 4.6, reviews: 800, image: "🫑" },
    { id: 116, name: "Zucchini", price: 1.79, category: "produce", rating: 4.3, reviews: 500, image: "🥒" },
    { id: 117, name: "Cucumbers", price: 1.29, category: "produce", rating: 4.5, reviews: 600, image: "🥒" },

    // Condiments
    { id: 39, name: "Vinegar", price: 5.99, category: "oils & vinegars", rating: 4.7, reviews: 1500, image: "🍾" },
    { id: 40, name: "Soy Sauce", price: 3.49, category: "sauces & condiments", rating: 4.6, reviews: 900, image: "🍶" },
    { id: 41, name: "Worcestershire Sauce", price: 3.19, category: "sauces & condiments", rating: 4.3, reviews: 700, image: "🍾" },
    { id: 42, name: "Hot Sauce", price: 2.50, category: "sauces & condiments", rating: 4.7, reviews: 600, image: "🌶️" },
    { id: 43, name: "Mustard", price: 1.89, category: "sauces & condiments", rating: 4.2, reviews: 800, image: "🌭" },
    { id: 44, name: "Mayonnaise", price: 4.99, category: "sauces & condiments", rating: 4.4, reviews: 1300, image: "🥚" },
    { id: 45, name: "Ketchup", price: 2.99, category: "sauces & condiments", rating: 4.3, reviews: 1100, image: "🍅" },
    { id: 46, name: "Honey", price: 6.99, category: "sweeteners", rating: 4.7, reviews: 1000, image: "🍯" },
    { id: 47, name: "Maple Syrup", price: 9.99, category: "sweeteners", rating: 4.8, reviews: 950, image: "🥞" },
    { id: 48, name: "Peanut Butter", price: 3.79, category: "spreads", rating: 4.5, reviews: 1000, image: "🥜" },
    { id: 49, name: "Sriracha", price: 3.50, category: "sauces & condiments", rating: 4.8, reviews: 1200, image: "🌶️" },

    // The Spice Rack
    { id: 50, name: "Dried Basil", price: 2.19, category: "herbs", rating: 4.5, reviews: 650, image: "🍃" },
    { id: 51, name: "Bay Leaves", price: 2.99, category: "herbs", rating: 4.3, reviews: 400, image: "🌿" },
    { id: 52, name: "Cayenne Pepper", price: 2.49, category: "spices & seasonings", rating: 4.6, reviews: 700, image: "🌶️" },
    { id: 53, name: "Crushed Red Pepper Flakes", price: 2.49, category: "spices & seasonings", rating: 4.5, reviews: 650, image: "🌶️" },
    { id: 54, name: "Curry Powder", price: 3.99, category: "spices & seasonings", rating: 4.7, reviews: 800, image: "🍛" },
    { id: 55, name: "Seasoned Salt", price: 2.79, category: "spices & seasonings", rating: 4.4, reviews: 500, image: "🧂" },
    { id: 56, name: "Chili Powder", price: 2.89, category: "spices & seasonings", rating: 4.5, reviews: 750, image: "🌶️" },
    { id: 57, name: "Cumin", price: 3.29, category: "spices & seasonings", rating: 4.6, reviews: 900, image: "🌿" },
    { id: 58, name: "Cinnamon", price: 3.79, category: "spices & seasonings", rating: 4.8, reviews: 1400, image: "🍂" },
    { id: 59, name: "Garlic Powder", price: 3.49, category: "spices & seasonings", rating: 4.5, reviews: 900, image: "🧄" },
    { id: 60, name: "Onion Powder", price: 3.29, category: "spices & seasonings", rating: 4.4, reviews: 850, image: "🧅" },
    { id: 61, name: "Oregano", price: 2.19, category: "herbs", rating: 4.6, reviews: 700, image: "🌿" },
    { id: 62, name: "Paprika", price: 2.99, category: "spices & seasonings", rating: 4.5, reviews: 600, image: "🌶️" },
    { id: 63, name: "Smoked Paprika", price: 3.49, category: "spices & seasonings", rating: 4.6, reviews: 550, image: "🌶️" },
    { id: 64, name: "Dried Parsley", price: 1.99, category: "herbs", rating: 4.3, reviews: 450, image: "🌿" },
    { id: 65, name: "Nutmeg", price: 4.29, category: "spices & seasonings", rating: 4.7, reviews: 700, image: "🌰" },
    { id: 66, name: "Ginger", price: 3.59, category: "spices & seasonings", rating: 4.6, reviews: 800, image: "🫚" },
    { id: 67, name: "Thyme", price: 2.19, category: "herbs", rating: 4.5, reviews: 600, image: "🌿" },
    { id: 68, name: "Rosemary", price: 2.49, category: "herbs", rating: 4.4, reviews: 550, image: "🌿" },
    { id: 69, name: "Dill", price: 2.19, category: "herbs", rating: 4.3, reviews: 500, image: "🌿" },
    { id: 70, name: "Italian Seasoning", price: 2.99, category: "spices & seasonings", rating: 4.7, reviews: 900, image: "🌿" },
    { id: 71, name: "Turmeric", price: 3.89, category: "spices & seasonings", rating: 4.6, reviews: 750, image: "🟠" },
    { id: 72, name: "Black Peppercorns", price: 5.99, category: "spices & seasonings", rating: 4.8, reviews: 1000, image: "⚫" },

    // The Almost-Bare Fridge
    { id: 73, name: "Eggs", price: 3.49, category: "dairy & eggs", rating: 4.7, reviews: 2500, image: "🥚" },
    { id: 74, name: "Milk", price: 3.59, category: "dairy & eggs", rating: 4.7, reviews: 3000, image: "🥛" },
    { id: 75, name: "Butter", price: 4.99, category: "dairy & eggs", rating: 4.8, reviews: 1700, image: "🧈" },
    { id: 76, name: "Parmesan Cheese", price: 4.29, category: "dairy & eggs", rating: 4.5, reviews: 1500, image: "🧀" },
    { id: 77, name: "Other Cheese", price: 3.99, category: "dairy & eggs", rating: 4.4, reviews: 1200, image: "🧀" },
    { id: 78, name: "Plain Yogurt", price: 3.29, category: "dairy & eggs", rating: 4.6, reviews: 1000, image: "🍦" },
    { id: 79, name: "Sour Cream", price: 2.59, category: "dairy & eggs", rating: 4.4, reviews: 700, image: "🍦" },
    { id: 80, name: "Cream Cheese", price: 2.99, category: "dairy & eggs", rating: 4.5, reviews: 900, image: "🧀" },
    { id: 81, name: "Fresh Parsley", price: 1.99, category: "herbs", rating: 4.6, reviews: 500, image: "🌿" },
    { id: 82, name: "Fresh Cilantro", price: 1.99, category: "herbs", rating: 4.5, reviews: 480, image: "🌿" },
    { id: 83, name: "Fresh Basil", price: 2.49, category: "herbs", rating: 4.7, reviews: 600, image: "🌿" },
    { id: 84, name: "Lemons", price: 1.49, category: "produce", rating: 4.8, reviews: 700, image: "🍋" },
    { id: 85, name: "Limes", price: 1.29, category: "produce", rating: 4.7, reviews: 650, image: "🍈" },
    { id: 86, name: "Fresh Ginger", price: 1.50, category: "produce", rating: 4.8, reviews: 400, image: "🫚" },
    { id: 87, name: "Shallots", price: 2.29, category: "produce", rating: 4.5, reviews: 300, image: "🧅" },
    { id: 122, name: "Heavy Cream", price: 3.99, category: "dairy & eggs", rating: 4.7, reviews: 1100, image: "🥛" },

    // The Freezer
    { id: 88, name: "Frozen Corn", price: 1.99, category: "frozen foods", rating: 4.2, reviews: 550, image: "🌽" },
    { id: 89, name: "Frozen Spinach", price: 1.79, category: "frozen foods", rating: 4.3, reviews: 400, image: "🥬" },
    { id: 90, name: "Frozen Peas", price: 1.99, category: "frozen foods", rating: 4.3, reviews: 600, image: "🟢" },
    { id: 91, name: "Ground Beef", price: 5.99, category: "meats & protein", rating: 4.6, reviews: 1800, image: "🥩" },
    { id: 92, name: "Chicken Breasts", price: 12.99, category: "meats & protein", rating: 4.7, reviews: 1800, image: "🍗" },
    { id: 118, name: "Salmon Fillet", price: 15.99, category: "meats & protein", rating: 4.8, reviews: 1500, image: "🐟" },
    { id: 119, name: "Pork Chops", price: 8.99, category: "meats & protein", rating: 4.5, reviews: 1000, image: "🍖" },
    { id: 120, name: "Tofu", price: 3.49, category: "meats & protein", rating: 4.3, reviews: 900, image: "⬜" },
    { id: 121, name: "Eggs", price: 3.49, category: "meats & protein", rating: 4.7, reviews: 2500, image: "🥚" },
    { id: 123, name: "Ground Turkey", price: 6.49, category: "meats & protein", rating: 4.5, reviews: 1100, image: "🦃" },
    { id: 124, name: "Lamb Chops", price: 18.99, category: "meats & protein", rating: 4.6, reviews: 700, image: "🐑" },
    { id: 125, name: "Shrimp", price: 10.99, category: "meats & protein", rating: 4.7, reviews: 1300, image: "🦐" },
    { id: 126, name: "Sausage", price: 5.99, category: "meats & protein", rating: 4.4, reviews: 900, image: "🌭" },
    { id: 127, name: "Canned Corn", price: 1.09, category: "canned goods", rating: 4.2, reviews: 700, image: "🌽" },
    { id: 128, name: "Canned Peas", price: 1.09, category: "canned goods", rating: 4.1, reviews: 650, image: "🟢" },
    { id: 129, name: "Canned Green Beans", price: 1.19, category: "canned goods", rating: 4.3, reviews: 720, image: "🫛" },
    { id: 130, name: "Pickles", price: 2.79, category: "sauces & condiments", rating: 4.5, reviews: 800, image: "🥒" },
    { id: 131, name: "Red Wine Vinegar", price: 3.99, category: "oils & vinegars", rating: 4.6, reviews: 950, image: "🍷" },
    { id: 132, name: "Apple Cider Vinegar", price: 3.49, category: "oils & vinegars", rating: 4.7, reviews: 1100, image: "🍎" },
    { id: 133, name: "Balsamic Vinegar", price: 5.99, category: "oils & vinegars", rating: 4.8, reviews: 1300, image: "🍾" },
    { id: 134, name: "Romaine Lettuce", price: 2.49, category: "produce", rating: 4.5, reviews: 600, image: "🥬" },
    { id: 135, name: "Green Leaf Lettuce", price: 2.29, category: "produce", rating: 4.4, reviews: 550, image: "🥬" },
    { id: 136, name: "Spinach", price: 3.29, category: "produce", rating: 4.7, reviews: 800, image: "🍃" },
    { id: 137, name: "Kale", price: 3.49, category: "produce", rating: 4.6, reviews: 750, image: "🥬" },
    { id: 138, name: "Broccoli", price: 2.99, category: "produce", rating: 4.5, reviews: 900, image: "🥦" },
    { id: 139, name: "Cauliflower", price: 3.99, category: "produce", rating: 4.4, reviews: 850, image: "🥦" },
    { id: 140, name: "Cabbage", price: 1.79, category: "produce", rating: 4.3, reviews: 500, image: "🥬" },
    { id: 141, name: "Fresh Tomatoes", price: 2.99, category: "produce", rating: 4.6, reviews: 1200, image: "🍅" },
    { id: 142, name: "Avocados", price: 1.99, category: "produce", rating: 4.7, reviews: 1500, image: "🥑" },
    { id: 143, name: "Apples", price: 0.79, category: "produce", rating: 4.8, reviews: 2000, image: "🍎" },
    { id: 144, name: "Bananas", price: 0.69, category: "produce", rating: 4.9, reviews: 2500, image: "🍌" },
    { id: 145, name: "Oranges", price: 0.89, category: "produce", rating: 4.7, reviews: 1800, image: "🍊" },
    { id: 146, name: "Grapes", price: 3.99, category: "produce", rating: 4.6, reviews: 1100, image: "🍇" },
    { id: 147, name: "Strawberries", price: 4.99, category: "produce", rating: 4.8, reviews: 1600, image: "🍓" },
    { id: 148, name: "Blueberries", price: 3.99, category: "produce", rating: 4.7, reviews: 1400, image: "🫐" },
    { id: 149, name: "Fresh Thyme", price: 2.49, category: "herbs", rating: 4.5, reviews: 300, image: "🌿" },
    { id: 150, name: "Fresh Rosemary", price: 2.49, category: "herbs", rating: 4.5, reviews: 300, image: "🌿" },
    { id: 151, name: "Fresh Dill", price: 2.49, category: "herbs", rating: 4.4, reviews: 280, image: "🌿" },
    { id: 152, name: "Mushrooms", price: 3.49, category: "produce", rating: 4.6, reviews: 900, image: "🍄" },
    { id: 153, name: "Fresh Cucumbers", price: 1.49, category: "produce", rating: 4.5, reviews: 700, image: "🥒" },
    { id: 154, name: "Fresh Bell Peppers", price: 2.79, category: "produce", rating: 4.6, reviews: 900, image: "🫑" },
    { id: 155, name: "Fresh Zucchini", price: 1.99, category: "produce", rating: 4.3, reviews: 600, image: "🥒" },
    { id: 156, name: "Cheddar Cheese", price: 5.99, category: "dairy & eggs", rating: 4.7, reviews: 1800, image: "🧀" },
    { id: 157, name: "Mozzarella Cheese", price: 4.99, category: "dairy & eggs", rating: 4.6, reviews: 1500, image: "🧀" },
    { id: 158, name: "Feta Cheese", price: 4.49, category: "dairy & eggs", rating: 4.5, reviews: 1000, image: "🧀" },
    { id: 159, name: "Swiss Cheese", price: 5.49, category: "dairy & eggs", rating: 4.6, reviews: 1200, image: "🧀" },
    { id: 160, name: "Greek Yogurt", price: 3.99, category: "dairy & eggs", rating: 4.8, reviews: 1700, image: "🍦" },
    { id: 161, name: "Heavy Cream", price: 3.99, category: "dairy & eggs", rating: 4.7, reviews: 1100, image: "🥛" },
    { id: 162, name: "Orange Juice", price: 3.49, category: "beverages", rating: 4.6, reviews: 900, image: "🍊" },
    { id: 163, name: "Apple Juice", price: 3.29, category: "beverages", rating: 4.5, reviews: 850, image: "🍎" },
    { id: 164, name: "Almond Milk", price: 3.19, category: "dairy alternatives", rating: 4.7, reviews: 1000, image: "🥛" },
    { id: 165, name: "Soy Milk", price: 2.99, category: "dairy alternatives", rating: 4.6, reviews: 950, image: "🥛" },
    { id: 166, name: "Oat Milk", price: 3.49, category: "dairy alternatives", rating: 4.8, reviews: 1100, image: "🥛" },
    { id: 167, name: "Sliced Turkey", price: 6.99, category: "deli meats", rating: 4.5, reviews: 700, image: "🦃" },
    { id: 168, name: "Sliced Ham", price: 5.99, category: "deli meats", rating: 4.4, reviews: 650, image: "🍖" },
    { id: 169, name: "Salami", price: 7.99, category: "deli meats", rating: 4.3, reviews: 500, image: "🍕" },
    { id: 170, name: "Pizza Dough", price: 3.49, category: "pre-made doughs", rating: 4.6, reviews: 800, image: "🍕" },
    { id: 171, name: "Pie Crusts", price: 3.99, category: "pre-made doughs", rating: 4.5, reviews: 750, image: "🥧" },
    { id: 172, name: "Crescent Rolls", price: 2.99, category: "pre-made doughs", rating: 4.4, reviews: 700, image: "🥐" },
    { id: 173, name: "Bread Flour", price: 4.49, category: "baking & flours", rating: 4.7, reviews: 900, image: "🍚" },
    { id: 174, name: "Cake Flour", price: 4.99, category: "baking & flours", rating: 4.6, reviews: 850, image: "🍚" },
    { id: 175, name: "Whole Wheat Flour", price: 3.99, category: "baking & flours", rating: 4.5, reviews: 800, image: "🍚" },
    { id: 176, name: "Gluten-Free Flour Blend", price: 6.99, category: "baking & flours", rating: 4.4, reviews: 700, image: "🍚" },
    { id: 177, name: "Powdered Sugar", price: 2.99, category: "sweeteners", rating: 4.6, reviews: 1100, image: "🍬" },
    { id: 178, name: "Molasses", price: 3.79, category: "sweeteners", rating: 4.5, reviews: 600, image: "🍯" },
    { id: 179, name: "Corn Syrup", price: 3.29, category: "sweeteners", rating: 4.4, reviews: 550, image: "🍯" },
    { id: 180, name: "Cake Mix", price: 2.49, category: "baking mixes", rating: 4.3, reviews: 900, image: "🎂" },
    { id: 181, name: "Brownie Mix", price: 2.29, category: "baking mixes", rating: 4.4, reviews: 850, image: "🍫" },
    { id: 182, name: "Pancake Mix", price: 2.79, category: "baking mixes", rating: 4.5, reviews: 1000, image: "🥞" },
    { id: 183, name: "Spaghetti", price: 1.89, category: "grains & pasta", rating: 4.7, reviews: 1500, image: "🍝" },
    { id: 184, name: "Penne", price: 1.89, category: "grains & pasta", rating: 4.6, reviews: 1400, image: "🍝" },
    { id: 185, name: "Farfalle", price: 1.99, category: "grains & pasta", rating: 4.5, reviews: 1300, image: "🍝" },
    { id: 186, name: "Lasagna Noodles", price: 2.49, category: "grains & pasta", rating: 4.4, reviews: 1000, image: "🍝" },
    { id: 187, name: "White Chocolate Chips", price: 3.49, category: "baking & flours", rating: 4.7, reviews: 800, image: "🍫" },
    { id: 188, name: "Peanut Butter Chips", price: 3.49, category: "baking & flours", rating: 4.6, reviews: 750, image: "🥜" },
    { id: 189, name: "Dried Black Beans", price: 1.99, category: "dried beans/legumes", rating: 4.5, reviews: 600, image: "🫘" },
    { id: 190, name: "Dried Lentils", price: 2.19, category: "dried beans/legumes", rating: 4.6, reviews: 650, image: "🥣" },
    { id: 191, name: "Dried Chickpeas", price: 2.29, category: "dried beans/legumes", rating: 4.5, reviews: 550, image: "🫘" },
    { id: 192, name: "Vegetable Broth", price: 2.79, category: "broths & stocks", rating: 4.7, reviews: 1200, image: "🍲" },
    { id: 193, name: "Red Cooking Wine", price: 7.99, category: "cooking wines", rating: 4.2, reviews: 400, image: "🍷" },
    { id: 194, name: "White Cooking Wine", price: 7.99, category: "cooking wines", rating: 4.2, reviews: 400, image: "🥂" },
    { id: 195, name: "Hoisin Sauce", price: 3.99, category: "asian sauces", rating: 4.6, reviews: 700, image: "🍶" },
    { id: 196, name: "Fish Sauce", price: 4.49, category: "asian sauces", rating: 4.5, reviews: 650, image: "🐟" },
    { id: 197, name: "Oyster Sauce", price: 4.29, category: "asian sauces", rating: 4.4, reviews: 600, image: "🦪" },
    { id: 198, name: "Rice Vinegar", price: 3.49, category: "asian sauces", rating: 4.7, reviews: 800, image: "🍚" },
    { id: 199, name: "Grapeseed Oil", price: 8.99, category: "specialty oils", rating: 4.5, reviews: 500, image: "🍇" },
    { id: 200, name: "Avocado Oil", price: 9.99, category: "specialty oils", rating: 4.8, reviews: 900, image: "🥑" },
    { id: 201, name: "Chili Oil", price: 6.99, category: "specialty oils", rating: 4.6, reviews: 750, image: "🌶️" },
    { id: 202, name: "Almond Butter", price: 7.99, category: "spreads", rating: 4.7, reviews: 1000, image: "🌰" },
    { id: 203, name: "Strawberry Jam", price: 3.49, category: "spreads", rating: 4.5, reviews: 850, image: "🍓" },
    { id: 204, name: "Ranch Dressing", price: 3.99, category: "dressings", rating: 4.4, reviews: 900, image: "🥗" },
    { id: 205, name: "Italian Dressing", price: 3.79, category: "dressings", rating: 4.3, reviews: 800, image: "🥗" },
    { id: 206, name: "Caesar Dressing", price: 4.29, category: "dressings", rating: 4.5, reviews: 750, image: "🥗" },
    { id: 207, name: "Agave Nectar", price: 5.49, category: "sweeteners", rating: 4.6, reviews: 600, image: "🍯" },
    { id: 208, name: "Sweet Relish", price: 2.19, category: "pickled items", rating: 4.3, reviews: 400, image: "🥒" },
    { id: 209, name: "Taco Seasoning", price: 1.99, category: "spices & seasonings", rating: 4.7, reviews: 1100, image: "🌮" },
    { id: 210, name: "Poultry Seasoning", price: 2.49, category: "spices & seasonings", rating: 4.5, reviews: 700, image: "🍗" },
    { id: 211, name: "Ranch Seasoning", price: 2.29, category: "spices & seasonings", rating: 4.6, reviews: 800, image: "🥗" },
    { id: 212, name: "White Pepper", price: 3.99, category: "spices & seasonings", rating: 4.4, reviews: 500, image: "⚪" },
    { id: 213, name: "Celery Seed", price: 2.99, category: "spices & seasonings", rating: 4.3, reviews: 300, image: "🌱" },
    { id: 214, name: "Mustard Seed", price: 2.79, category: "spices & seasonings", rating: 4.2, reviews: 250, image: "🌰" },
    { id: 215, name: "Fennel Seed", price: 3.29, category: "spices & seasonings", rating: 4.1, reviews: 200, image: "🌿" },
    { id: 216, name: "Cardamom", price: 6.99, category: "spices & seasonings", rating: 4.8, reviews: 400, image: "🌿" },
    { id: 217, name: "Cloves", price: 4.99, category: "spices & seasonings", rating: 4.6, reviews: 350, image: "🌿" },
    { id: 218, name: "Sea Salt", price: 3.49, category: "spices & seasonings", rating: 4.8, reviews: 1500, image: "🧂" },
    { id: 219, name: "Pink Himalayan Salt", price: 4.49, category: "spices & seasonings", rating: 4.7, reviews: 1200, image: "🧂" },
    { id: 220, name: "Nutritional Yeast", price: 5.99, category: "flavor enhancers", rating: 4.5, reviews: 600, image: "🧀" },
    { id: 221, name: "MSG", price: 3.99, category: "flavor enhancers", rating: 4.0, reviews: 200, image: "🧂" },
    { id: 222, name: "Frozen Pizza", price: 7.99, category: "prepared meals", rating: 4.3, reviews: 1500, image: "🍕" },
    { id: 223, name: "Frozen Lasagna", price: 8.99, category: "prepared meals", rating: 4.2, reviews: 1000, image: "🍝" },
    { id: 224, name: "Frozen Burritos", price: 2.99, category: "prepared meals", rating: 4.0, reviews: 800, image: "🌯" },
    { id: 225, name: "Frozen Waffles", price: 3.49, category: "breakfast items", rating: 4.5, reviews: 900, image: "🧇" },
    { id: 226, name: "Frozen Pancakes", price: 3.29, category: "breakfast items", rating: 4.4, reviews: 850, image: "🥞" },
    { id: 227, name: "Breakfast Sausages", price: 4.99, category: "breakfast items", rating: 4.6, reviews: 700, image: "🌭" },
    { id: 228, name: "Frozen Asparagus", price: 3.99, category: "frozen vegetables", rating: 4.5, reviews: 600, image: "🥦" },
    { id: 229, name: "Frozen Brussels Sprouts", price: 3.79, category: "frozen vegetables", rating: 4.4, reviews: 550, image: "🥦" },
    { id: 230, name: "Frozen Cauliflower", price: 3.49, category: "frozen vegetables", rating: 4.3, reviews: 500, image: "🥦" },
    { id: 231, name: "Ice Cream", price: 5.99, category: "desserts", rating: 4.8, reviews: 2000, image: "🍦" },
    { id: 232, name: "Frozen Yogurt", price: 4.99, category: "desserts", rating: 4.7, reviews: 1500, image: "🍦" },
    { id: 233, name: "Frozen Pies", price: 6.99, category: "desserts", rating: 4.5, reviews: 1000, image: "🥧" },
    { id: 234, name: "Bacon", price: 6.99, category: "pork", rating: 4.7, reviews: 1200, image: "🥓" },
    { id: 235, name: "Pork Loin", price: 9.99, category: "pork", rating: 4.5, reviews: 800, image: "🍖" },
    { id: 236, name: "Beef Steaks", price: 15.99, category: "beef", rating: 4.8, reviews: 1500, image: "🥩" },
    { id: 237, name: "Beef Roasts", price: 12.99, category: "beef", rating: 4.6, reviews: 900, image: "🍖" },
    { id: 238, name: "Whole Chicken", price: 7.99, category: "chicken", rating: 4.5, reviews: 1000, image: "🍗" },
    { id: 239, name: "Chicken Thighs", price: 5.99, category: "chicken", rating: 4.6, reviews: 1100, image: "🍗" },
    { id: 240, name: "Chicken Wings", price: 6.99, category: "chicken", rating: 4.4, reviews: 950, image: "🍗" },
    { id: 241, name: "Cod Fillet", price: 11.99, category: "seafood", rating: 4.7, reviews: 800, image: "🐟" },
    { id: 242, name: "Tilapia Fillet", price: 9.99, category: "seafood", rating: 4.5, reviews: 700, image: "🐟" },
    { id: 243, name: "Scallops", price: 18.99, category: "seafood", rating: 4.8, reviews: 600, image: "🦐" },
    { id: 244, name: "Tempeh", price: 3.99, category: "vegetarian proteins", rating: 4.3, reviews: 400, image: "🌱" },
    { id: 245, name: "Edamame", price: 2.99, category: "vegetarian proteins", rating: 4.2, reviews: 350, image: "🌱" },
    { id: 93, name: "Frozen Mixed Vegetables", price: 2.19, category: "frozen foods", rating: 4.3, reviews: 1100, image: "🥦" },
    { id: 94, name: "Frozen Berries", price: 3.99, category: "frozen foods", rating: 4.6, reviews: 900, image: "🍓" },
    { id: 95, name: "Frozen Shrimp", price: 9.99, category: "seafood", rating: 4.5, reviews: 700, image: "🦐" },
    { id: 96, name: "Bread/Rolls", price: 3.29, category: "bakery", rating: 4.4, reviews: 500, image: "🍞" },

    // Oils & Fats (Expanded)
    { id: 97, name: "Coconut Oil", price: 6.99, category: "oils & fats", rating: 4.6, reviews: 800, image: "🥥" },
    { id: 98, name: "Sesame Oil", price: 4.99, category: "oils & fats", rating: 4.5, reviews: 600, image: "🍶" },

    // Baking Essentials (Expanded)
    { id: 99, name: "Brown Sugar", price: 2.79, category: "sweeteners", rating: 4.6, reviews: 1200, image: "🍬" },
    { id: 100, name: "Confectioner's Sugar", price: 2.19, category: "sweeteners", rating: 4.5, reviews: 900, image: "🍬" },
    { id: 101, name: "Vanilla Extract", price: 5.99, category: "baking & flours", rating: 4.7, reviews: 1300, image: "🍮" },
    { id: 102, name: "Almond Extract", price: 4.99, category: "baking & flours", rating: 4.6, reviews: 500, image: "🌰" },
    { id: 103, name: "Chocolate Chips", price: 3.99, category: "baking & flours", rating: 4.8, reviews: 1800, image: "🍫" },
    { id: 104, name: "Cocoa Powder", price: 4.49, category: "baking & flours", rating: 4.7, reviews: 1000, image: "🍫" },
    { id: 105, name: "Cornstarch", price: 1.99, category: "baking & flours", rating: 4.3, reviews: 700, image: "🍚" },

    // Other Essentials
    { id: 106, name: "Kosher Salt", price: 3.49, category: "spices & seasonings", rating: 4.7, reviews: 1500, image: "🧂" },
    { id: 107, name: "Cooking Spray", price: 2.99, category: "oils & fats", rating: 4.4, reviews: 900, image: "🍳" },
    { id: 108, name: "Capers", price: 3.29, category: "canned goods", rating: 4.2, reviews: 300, image: "🫙" },
    { id: 109, name: "Anchovy Paste", price: 4.99, category: "sauces & condiments", rating: 4.1, reviews: 200, image: "🐟" },
    { id: 110, name: "Olives", price: 4.49, category: "canned goods", rating: 4.6, reviews: 500, image: "🫒" },
    { id: 111, name: "Sun-Dried Tomatoes", price: 5.99, category: "canned goods", rating: 4.7, reviews: 600, image: "🍅" },
    { id: 112, name: "Dried Fruits", price: 3.49, category: "dried fruits & nuts", rating: 4.5, reviews: 700, image: "🍇" },
    { id: 113, name: "Nuts", price: 3.99, category: "dried fruits & nuts", rating: 4.6, reviews: 800, image: "🌰" },
    { id: 114, name: "Seeds", price: 6.99, category: "dried fruits & nuts", rating: 4.8, reviews: 900, image: "🌱" }
  ];

  // State variables
  const [cart, setCart] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const allCategories = React.useMemo(() => [
    'all',
    ...new Set(products.map(product => product.category))
  ], [products]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('recipe'); // 'recipe' or 'ingredient'
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(24); // Default to 24 products per page
  
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [searchedRecipeName, setSearchedRecipeName] = useState('');

  // Filtering and Sorting Logic using useMemo
  const filteredProducts = React.useMemo(() => {
    console.log("filteredProducts useMemo re-evaluating...");
    console.log("currentCategory:", currentCategory);
    console.log("recipeIngredients in useMemo:", recipeIngredients);
    console.log("sortBy:", sortBy);

    let newFilteredProducts = [...products];

    // Category filtering
    if (currentCategory !== 'all') {
      newFilteredProducts = newFilteredProducts.filter(product => product.category === currentCategory);
    }

    if (searchType === 'ingredient' && searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      newFilteredProducts = newFilteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.category.toLowerCase().includes(searchTermLower)
      );
    }

    // Recipe ingredients filtering
    if (recipeIngredients.length > 0) {
      const ingredientNames = recipeIngredients.map(ing => ing.toLowerCase().trim());
      newFilteredProducts = newFilteredProducts.filter(product => {
        const productNameLower = product.name.toLowerCase().trim();
        return ingredientNames.some(ingredient => productNameLower.includes(ingredient) || ingredient.includes(productNameLower));
      });
    }

    // Sorting
    const sortedProducts = [...newFilteredProducts].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-low') {
        return a.price - b.price;
      } else if (sortBy === 'price-high') {
        return b.price - a.price;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

    return sortedProducts;
  }, [products, currentCategory, searchTerm, searchType, recipeIngredients, sortBy]);

  /**
   * Generate star rating display
   * @param {number} rating - Rating value (0-5)
   * @returns {string} HTML string of star symbols
   */
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '☆';
    }
    return stars;
  };

  

  

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    if (currentPage !== 1) {
      setCurrentPage(1); // Reset to first page when items per page changes
    }
  };

  // Event Handlers
  const handleSearch = async () => {
    if (!searchTerm) return;

    if (searchType === 'recipe') {
      try {
        const response = await fetch(`https://us-central1-capstonesearchbar.cloudfunctions.net/searchRecipes/?query=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.ingredients) {
          setSearchedRecipeName(data.best_match);
          const sortedNewIngredients = [...data.ingredients].sort();
          const sortedCurrentIngredients = [...recipeIngredients].sort();

          // Deep compare the sorted arrays
          if (JSON.stringify(sortedNewIngredients) !== JSON.stringify(sortedCurrentIngredients)) {
            console.log("Updating recipeIngredients to:", sortedNewIngredients);
            setRecipeIngredients(data.ingredients); // Set the unsorted array from data.ingredients
          } else {
            console.log("recipeIngredients content is the same, skipping update.");
          }
          console.log("recipeIngredients after update attempt:", recipeIngredients);
          if (currentPage !== 1) {
            setCurrentPage(1); // Reset to first page when a new recipe is searched
          }
        } else {
          alert("Recipe not found!");
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
        alert("Failed to fetch recipe. See console for details.");
      }
    }
  };

  const handleCategoryFilter = (category) => {
    if (currentCategory !== category) {
      setCurrentCategory(category);
    }
    if (searchTerm !== '') {
      setSearchTerm(''); // Clear search term
    }
    if (recipeIngredients.length > 0) {
      setRecipeIngredients([]); // Clear recipe ingredients when switching to category filter
    }
    if (currentPage !== 1) {
      setCurrentPage(1); // Reset to first page when category filter is applied
    }
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    if (currentPage !== 1) {
      setCurrentPage(1); // Reset to first page when sort order changes
    }
  };

  

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const updateQuantity = (productId, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + change } : item
      ).filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: ${total.toFixed(2)}`);
    setCart([]);
    setIsCartOpen(false);
  };

  const viewProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      alert(`Product Details:\n\nName: ${product.name}\nPrice: ${product.price.toFixed(2)}\nRating: ${product.rating}/5\nReviews: ${product.reviews}`);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">CrossMart</div>
          </div>

          <div className="header-center">
            <div className="search-switch-container">
              <span className={`switch-label ${searchType === 'recipe' ? 'active' : ''}`}>👨‍🍳 Recipe</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={searchType === 'ingredient'}
                  onChange={() => setSearchType(searchType === 'recipe' ? 'ingredient' : 'recipe')} 
                />
                <span className="slider round"></span>
              </label>
              <span className={`switch-label ${searchType === 'ingredient' ? 'active' : ''}`}>🛒 Ingredient</span>
            </div>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={`Search for ${searchType}s`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
            <button className="return-all-btn" onClick={() => handleCategoryFilter('all')}>🗑️</button>
          </div>

          <div className="header-right">
            <button className="cart-icon" onClick={toggleCart}>
              🛒<span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select className="filter-select" value={currentCategory} onChange={(e) => handleCategoryFilter(e.target.value)}>
            {allCategories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort by:</label>
          <select className="filter-select" value={sortBy} onChange={handleSortChange}>
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Products per page:</label>
          <select className="filter-select" value={productsPerPage} onChange={handleProductsPerPageChange}>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
            <option value="96">96</option>
          </select>
        </div>
        <div className="pagination-top">
          {filteredProducts.length > 0 && (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>
      </div>

      {/* Products Container */}
      <div className="products-container">
        {currentProducts.length > 0 ? (
          <div className="products-grid">
            {currentProducts.map(product => (
              <div className="product-card" key={product.id} onClick={() => viewProduct(product.id)}>
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                  <div className="product-rating">
                    <span className="stars">{generateStars(product.rating)}</span>
                    <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                  <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Bottom Pagination */}
      {filteredProducts.length > 0 && totalPages > 1 && (
        <div className="pagination-bottom">
          
          
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {/* Page numbers with ellipsis */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => {
            // Display a limited range of pages around the current one
            if (number === 1 || number === totalPages || (number >= currentPage - 2 && number <= currentPage + 2)) {
              return (
                <button
                  key={number}
                  className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              );
            } else if (number === currentPage - 3 || number === currentPage + 3) {
              return <span key={number} className="pagination-ellipsis">...</span>;
            }
            return null;
          })}
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          
          
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="cart-modal" style={{ display: isCartOpen ? 'flex' : 'none' }} onClick={(e) => { if (e.target.className === 'cart-modal') toggleCart(); }}>
          <div className="cart-content">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button className="close-cart" onClick={toggleCart}>×</button>
            </div>
            <div>
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div>{item.image}</div>
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="qty-btn" onClick={() => removeFromCart(item.id)}>×</button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total">
              <div className="total-amount">Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</div>
              <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopMart;