import React, { useState } from 'react';
import './ShopMart.css';

// SVG Star Components
const FullStar = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFC107" stroke="#555" strokeWidth="0.7" strokeLinejoin="round" style={{marginRight: 2}}>
    <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18.5 5.5,22 7,14.5 2,9.5 9,9" />
  </svg>
);
const HalfStar = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{marginRight: 2}}>
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="#FFC107"/>
        <stop offset="50%" stopColor="#E0E0E0"/>
      </linearGradient>
    </defs>
    <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18.5 5.5,22 7,14.5 2,9.5 9,9" fill="url(#half-grad)" stroke="#555" strokeWidth="0.7" strokeLinejoin="round" />
  </svg>
);
const EmptyStar = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="0.7" strokeLinejoin="round" style={{marginRight: 2}}>
    <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18.5 5.5,22 7,14.5 2,9.5 9,9" />
  </svg>
);



// Map all products to new categories
const standardizedProducts = [
    // The Bare Minimum
    { id: 1, name: "Salt", price: 2.99, category: "Condiments & Spices", rating: 4.8, reviews: 5000, image: "🧂" },
    { id: 2, name: "Pepper", price: 3.19, category: "Condiments & Spices", rating: 4.7, reviews: 4500, image: "🌶️" },
    { id: 3, name: "Olive Oil", price: 15.75, category: "Condiments & Spices", rating: 4.9, reviews: 6000, image: "🫒" },
    { id: 4, name: "Vegetable Oil", price: 4.50, category: "Condiments & Spices", rating: 4.5, reviews: 2000, image: "🌻" },
    { id: 5, name: "All-Purpose Flour", price: 3.29, category: "Baking", rating: 4.8, reviews: 3500, image: "🍚" },
    { id: 6, name: "Granulated Sugar", price: 3.99, category: "Baking", rating: 4.7, reviews: 2800, image: "🍬" },

    // Canned Goods
    { id: 7, name: "Chicken Stock", price: 2.79, category: "Canned Goods", rating: 4.6, reviews: 1500, image: "🍲" },
    { id: 8, name: "Beef Stock", price: 2.89, category: "Canned Goods", rating: 4.5, reviews: 1200, image: "🍲" },
    { id: 9, name: "Canned Diced Tomatoes", price: 1.29, category: "Canned Goods", rating: 4.5, reviews: 1800, image: "🍅" },
    { id: 10, name: "Canned Crushed Tomatoes", price: 1.89, category: "Canned Goods", rating: 4.6, reviews: 1400, image: "🍅" },
    { id: 11, name: "Canned Whole Peeled Tomatoes", price: 1.79, category: "Canned Goods", rating: 4.5, reviews: 1300, image: "🍅" },
    { id: 12, name: "Tomato Sauce", price: 0.99, category: "Canned Goods", rating: 4.4, reviews: 1000, image: "🥫" },
    { id: 13, name: "Tomato Paste", price: 0.89, category: "Canned Goods", rating: 4.4, reviews: 900, image: "🥫" },
    { id: 14, name: "Marinara Sauce", price: 3.49, category: "Canned Goods", rating: 4.7, reviews: 2000, image: "🍝" },
    { id: 15, name: "Canned White Beans", price: 1.19, category: "Canned Goods", rating: 4.3, reviews: 800, image: "🥫" },
    { id: 16, name: "Canned Black Beans", price: 1.19, category: "Canned Goods", rating: 4.4, reviews: 900, image: "🥫" },
    { id: 17, name: "Canned Kidney Beans", price: 1.19, category: "Canned Goods", rating: 4.3, reviews: 750, image: "🥫" },
    { id: 18, name: "Canned Garbanzo Beans", price: 1.29, category: "Canned Goods", rating: 4.5, reviews: 1100, image: "🥫" },
    { id: 19, name: "Tuna", price: 1.59, category: "Canned Goods", rating: 4.2, reviews: 1600, image: "🐟" },
    { id: 20, name: "Coconut Milk", price: 2.49, category: "Canned Goods", rating: 4.6, reviews: 1000, image: "🥥" },
    { id: 21, name: "Canned Green Chiles", price: 0.99, category: "Canned Goods", rating: 4.3, reviews: 600, image: "🌶️" },

    // Starches and Dry Goods
    { id: 22, name: "Pasta", price: 1.79, category: "Pasta, Rice & Cereal", rating: 4.4, reviews: 1200, image: "🍝" },
    { id: 23, name: "Rice", price: 2.89, category: "Pasta, Rice & Cereal", rating: 4.5, reviews: 1600, image: "🍚" },
    { id: 24, name: "Lentils", price: 2.29, category: "Pasta, Rice & Cereal", rating: 4.3, reviews: 700, image: "🥣" },
    { id: 25, name: "Split Peas", price: 2.19, category: "Pasta, Rice & Cereal", rating: 4.2, reviews: 650, image: "🥣" },
    { id: 26, name: "Dried Bread Crumbs", price: 2.59, category: "Bread & Bakery", rating: 4.1, reviews: 500, image: "🍞" },
    { id: 27, name: "Quinoa", price: 4.99, category: "Pasta, Rice & Cereal", rating: 4.7, reviews: 1000, image: "🥣" },
    { id: 28, name: "Oats", price: 4.59, category: "Pasta, Rice & Cereal", rating: 4.6, reviews: 1100, image: "🥣" },
    { id: 29, name: "Cornmeal", price: 2.79, category: "Baking", rating: 4.3, reviews: 400, image: "🌽" },
    { id: 30, name: "Baking Powder", price: 2.29, category: "Baking", rating: 4.6, reviews: 1100, image: "🥄" },
    { id: 31, name: "Baking Soda", price: 1.49, category: "Baking", rating: 4.5, reviews: 900, image: "🥄" },
    { id: 32, name: "Yeast", price: 2.99, category: "Bread & Bakery", rating: 4.7, reviews: 700, image: "🍞" },

    // The Root Cellar (Produce)
    { id: 33, name: "Potatoes", price: 3.99, category: "Vegetables", rating: 4.5, reviews: 1300, image: "🥔" },
    { id: 34, name: "Onions", price: 2.99, category: "Vegetables", rating: 4.6, reviews: 950, image: "🧅" },
    { id: 35, name: "Garlic", price: 0.79, category: "Vegetables", rating: 4.9, reviews: 1100, image: "🧄" },
    { id: 36, name: "Sweet Potatoes", price: 3.59, category: "Vegetables", rating: 4.7, reviews: 850, image: "🍠" },
    { id: 37, name: "Carrots", price: 1.99, category: "Vegetables", rating: 4.6, reviews: 1000, image: "🥕" },
    { id: 38, name: "Celery", price: 2.29, category: "Vegetables", rating: 4.4, reviews: 600, image: "🥬" },

    // Condiments
    { id: 39, name: "Vinegar", price: 5.99, category: "Condiments & Spices", rating: 4.7, reviews: 1500, image: "🍾" },
    { id: 40, name: "Soy Sauce", price: 3.49, category: "Condiments & Spices", rating: 4.6, reviews: 900, image: "🍶" },
    { id: 41, name: "Worcestershire Sauce", price: 3.19, category: "Condiments & Spices", rating: 4.3, reviews: 700, image: "🍾" },
    { id: 42, name: "Hot Sauce", price: 2.50, category: "Condiments & Spices", rating: 4.7, reviews: 600, image: "🌶️" },
    { id: 43, name: "Mustard", price: 1.89, category: "Condiments & Spices", rating: 4.2, reviews: 800, image: "🌭" },
    { id: 44, name: "Mayonnaise", price: 4.99, category: "Condiments & Spices", rating: 4.4, reviews: 1300, image: "🥚" },
    { id: 45, name: "Ketchup", price: 2.99, category: "Condiments & Spices", rating: 4.3, reviews: 1100, image: "🍅" },
    { id: 46, name: "Honey", price: 6.99, category: "Condiments & Spices", rating: 4.7, reviews: 1000, image: "🍯" },
    { id: 47, name: "Maple Syrup", price: 9.99, category: "Condiments & Spices", rating: 4.8, reviews: 950, image: "🥞" },
    { id: 48, name: "Peanut Butter", price: 3.79, category: "Condiments & Spices", rating: 4.5, reviews: 1000, image: "🥜" },
    { id: 49, name: "Sriracha", price: 3.50, category: "Condiments & Spices", rating: 4.8, reviews: 1200, image: "🌶️" },

    // The Spice Rack
    { id: 50, name: "Dried Basil", price: 2.19, category: "Condiments & Spices", rating: 4.5, reviews: 650, image: "🍃" },
    { id: 51, name: "Bay Leaves", price: 2.99, category: "Condiments & Spices", rating: 4.3, reviews: 400, image: "🌿" },
    { id: 52, name: "Cayenne Pepper", price: 2.49, category: "Condiments & Spices", rating: 4.6, reviews: 700, image: "🌶️" },
    { id: 53, name: "Crushed Red Pepper Flakes", price: 2.49, category: "Condiments & Spices", rating: 4.5, reviews: 650, image: "🌶️" },
    { id: 54, name: "Curry Powder", price: 3.99, category: "Condiments & Spices", rating: 4.7, reviews: 800, image: "🍛" },
    { id: 55, name: "Seasoned Salt", price: 2.79, category: "Condiments & Spices", rating: 4.4, reviews: 500, image: "🧂" },
    { id: 56, name: "Chili Powder", price: 2.89, category: "Condiments & Spices", rating: 4.5, reviews: 750, image: "🌶️" },
    { id: 57, name: "Cumin", price: 3.29, category: "Condiments & Spices", rating: 4.6, reviews: 900, image: "🌿" },
    { id: 58, name: "Cinnamon", price: 3.79, category: "Condiments & Spices", rating: 4.8, reviews: 1400, image: "🍂" },
    { id: 59, name: "Garlic Powder", price: 3.49, category: "Condiments & Spices", rating: 4.5, reviews: 900, image: "🧄" },
    { id: 60, name: "Onion Powder", price: 3.29, category: "Condiments & Spices", rating: 4.4, reviews: 850, image: "🧅" },
    { id: 61, name: "Oregano", price: 2.19, category: "Condiments & Spices", rating: 4.6, reviews: 700, image: "🌿" },
    { id: 62, name: "Paprika", price: 2.99, category: "Condiments & Spices", rating: 4.5, reviews: 600, image: "🌶️" },
    { id: 63, name: "Smoked Paprika", price: 3.49, category: "Condiments & Spices", rating: 4.6, reviews: 550, image: "🌶️" },
    { id: 64, name: "Dried Parsley", price: 1.99, category: "Condiments & Spices", rating: 4.3, reviews: 450, image: "🌿" },
    { id: 65, name: "Nutmeg", price: 4.29, category: "Condiments & Spices", rating: 4.7, reviews: 700, image: "🌰" },
    { id: 66, name: "Dried Ginger", price: 3.59, category: "Condiments & Spices", rating: 4.6, reviews: 800, image: "🫚" },
    { id: 67, name: "Dried Thyme", price: 2.19, category: "Condiments & Spices", rating: 4.5, reviews: 600, image: "🌿" },
    { id: 68, name: "Dried Rosemary", price: 2.49, category: "Condiments & Spices", rating: 4.4, reviews: 550, image: "🌿" },
    { id: 69, name: "Dried Dill", price: 2.19, category: "Condiments & Spices", rating: 4.3, reviews: 500, image: "🌿" },
    { id: 70, name: "Italian Seasoning", price: 2.99, category: "Condiments & Spices", rating: 4.7, reviews: 900, image: "🌿" },
    { id: 71, name: "Turmeric", price: 3.89, category: "Condiments & Spices", rating: 4.6, reviews: 750, image: "🟠" },
    { id: 72, name: "Black Peppercorns", price: 5.99, category: "Condiments & Spices", rating: 4.8, reviews: 1000, image: "⚫" },

    // The Almost-Bare Fridge
    { id: 73, name: "Eggs", price: 3.49, category: "Dairy", rating: 4.7, reviews: 2500, image: "🥚" },
    { id: 74, name: "Milk", price: 3.59, category: "Dairy", rating: 4.7, reviews: 3000, image: "🥛" },
    { id: 75, name: "Butter", price: 4.99, category: "Dairy", rating: 4.8, reviews: 1700, image: "🧈" },
    { id: 76, name: "Parmesan Cheese", price: 4.29, category: "Dairy", rating: 4.5, reviews: 1500, image: "🧀" },
    { id: 77, name: "Other Cheese", price: 3.99, category: "Dairy", rating: 4.4, reviews: 1200, image: "🧀" },
    { id: 78, name: "Plain Yogurt", price: 3.29, category: "Dairy", rating: 4.6, reviews: 1000, image: "🍦" },
    { id: 79, name: "Sour Cream", price: 2.59, category: "Dairy", rating: 4.4, reviews: 700, image: "🍦" },
    { id: 80, name: "Cream Cheese", price: 2.99, category: "Dairy", rating: 4.5, reviews: 900, image: "🧀" },
    { id: 81, name: "Fresh Parsley", price: 1.99, category: "Condiments & Spices", rating: 4.6, reviews: 500, image: "🌿" },
    { id: 82, name: "Fresh Cilantro", price: 1.99, category: "Condiments & Spices", rating: 4.5, reviews: 480, image: "🌿" },
    { id: 83, name: "Fresh Basil", price: 2.49, category: "Condiments & Spices", rating: 4.7, reviews: 600, image: "🌿" },
    { id: 84, name: "Lemons", price: 1.49, category: "Fruits", rating: 4.8, reviews: 700, image: "🍋" },
    { id: 85, name: "Limes", price: 1.29, category: "Fruits", rating: 4.7, reviews: 650, image: "🍈" },
    { id: 86, name: "Fresh Ginger", price: 1.50, category: "Fruits", rating: 4.8, reviews: 400, image: "🫚" },
    { id: 87, name: "Shallots", price: 2.29, category: "Vegetables", rating: 4.5, reviews: 300, image: "🧅" },
    { id: 122, name: "Heavy Cream", price: 3.99, category: "Dairy", rating: 4.7, reviews: 1100, image: "🥛" },

    // The Freezer
    { id: 88, name: "Frozen Corn", price: 1.99, category: "Frozen Foods", rating: 4.2, reviews: 550, image: "🌽" },
    { id: 89, name: "Frozen Spinach", price: 1.79, category: "Frozen Foods", rating: 4.3, reviews: 400, image: "🥬" },
    { id: 90, name: "Frozen Peas", price: 1.99, category: "Frozen Foods", rating: 4.3, reviews: 600, image: "🟢" },
    { id: 91, name: "Ground Beef", price: 5.99, category: "Meat", rating: 4.6, reviews: 1800, image: "🥩" },
    { id: 92, name: "Chicken Breasts", price: 12.99, category: "Meat", rating: 4.7, reviews: 1800, image: "🍗" },
    { id: 118, name: "Salmon Fillet", price: 15.99, category: "Fish & Seafood", rating: 4.8, reviews: 1500, image: "🐟" },
    { id: 119, name: "Pork Chops", price: 8.99, category: "Meat", rating: 4.5, reviews: 1000, image: "🍖" },
    { id: 120, name: "Tofu", price: 3.49, category: "Meat", rating: 4.3, reviews: 900, image: "⬜" },
    
    { id: 123, name: "Ground Turkey", price: 6.49, category: "Meat", rating: 4.5, reviews: 1100, image: "🦃" },
    { id: 124, name: "Lamb Chops", price: 18.99, category: "Meat", rating: 4.6, reviews: 700, image: "🐑" },
    { id: 125, name: "Shrimp", price: 10.99, category: "Fish & Seafood", rating: 4.7, reviews: 1300, image: "🦐" },
    { id: 126, name: "Sausage", price: 5.99, category: "Meat", rating: 4.4, reviews: 900, image: "🌭" },
    { id: 127, name: "Canned Corn", price: 1.09, category: "Canned Goods", rating: 4.2, reviews: 700, image: "🌽" },
    { id: 128, name: "Canned Peas", price: 1.09, category: "Canned Goods", rating: 4.1, reviews: 650, image: "🟢" },
    { id: 129, name: "Canned Green Beans", price: 1.19, category: "Canned Goods", rating: 4.3, reviews: 720, image: "🫛" },
    { id: 130, name: "Pickles", price: 2.79, category: "Condiments & Spices", rating: 4.5, reviews: 800, image: "🥒" },
    { id: 131, name: "Red Wine Vinegar", price: 3.99, category: "Condiments & Spices", rating: 4.6, reviews: 950, image: "🍷" },
    { id: 132, name: "Apple Cider Vinegar", price: 3.49, category: "Condiments & Spices", rating: 4.7, reviews: 1100, image: "🍎" },
    { id: 133, name: "Balsamic Vinegar", price: 5.99, category: "Condiments & Spices", rating: 4.8, reviews: 1300, image: "🍾" },
    { id: 134, name: "Romaine Lettuce", price: 2.49, category: "Vegetables", rating: 4.5, reviews: 600, image: "🥬" },
    { id: 135, name: "Green Leaf Lettuce", price: 2.29, category: "Vegetables", rating: 4.4, reviews: 550, image: "🥬" },
    { id: 136, name: "Spinach", price: 3.29, category: "Vegetables", rating: 4.7, reviews: 800, image: "🍃" },
    { id: 137, name: "Kale", price: 3.49, category: "Vegetables", rating: 4.6, reviews: 750, image: "🥬" },
    { id: 138, name: "Broccoli", price: 2.99, category: "Vegetables", rating: 4.5, reviews: 900, image: "🥦" },
    { id: 139, name: "Cauliflower", price: 3.99, category: "Vegetables", rating: 4.4, reviews: 850, image: "🥦" },
    { id: 140, name: "Cabbage", price: 1.79, category: "Vegetables", rating: 4.3, reviews: 500, image: "🥬" },
    { id: 141, name: "Fresh Tomatoes", price: 2.99, category: "Vegetables", rating: 4.6, reviews: 1200, image: "🍅" },
    { id: 142, name: "Avocados", price: 1.99, category: "Fruits", rating: 4.7, reviews: 1500, image: "🥑" },
    { id: 143, name: "Apples", price: 0.79, category: "Fruits", rating: 4.8, reviews: 2000, image: "🍎" },
    { id: 144, name: "Bananas", price: 0.69, category: "Fruits", rating: 4.9, reviews: 2500, image: "🍌" },
    { id: 145, name: "Oranges", price: 0.89, category: "Fruits", rating: 4.7, reviews: 1800, image: "🍊" },
    { id: 146, name: "Grapes", price: 3.99, category: "Fruits", rating: 4.6, reviews: 1100, image: "🍇" },
    { id: 147, name: "Strawberries", price: 4.99, category: "Fruits", rating: 4.8, reviews: 1600, image: "🍓" },
    { id: 148, name: "Blueberries", price: 3.99, category: "Fruits", rating: 4.7, reviews: 1400, image: "🫐" },
    { id: 149, name: "Fresh Thyme", price: 2.49, category: "Condiments & Spices", rating: 4.5, reviews: 300, image: "🌿" },
    { id: 150, name: "Fresh Rosemary", price: 2.49, category: "Condiments & Spices", rating: 4.5, reviews: 300, image: "🌿" },
    { id: 151, name: "Fresh Dill", price: 2.49, category: "Condiments & Spices", rating: 4.4, reviews: 280, image: "🌿" },
    { id: 152, name: "Mushrooms", price: 3.49, category: "Vegetables", rating: 4.6, reviews: 900, image: "🍄" },
    { id: 153, name: "Fresh Cucumbers", price: 1.49, category: "Vegetables", rating: 4.5, reviews: 700, image: "🥒" },
    { id: 154, name: "Fresh Bell Peppers", price: 2.79, category: "Vegetables", rating: 4.6, reviews: 900, image: "🫑" },
    { id: 155, name: "Fresh Zucchini", price: 1.99, category: "Vegetables", rating: 4.3, reviews: 600, image: "🥒" },
    { id: 156, name: "Cheddar Cheese", price: 5.99, category: "Dairy", rating: 4.7, reviews: 1800, image: "🧀" },
    { id: 157, name: "Mozzarella Cheese", price: 4.99, category: "Dairy", rating: 4.6, reviews: 1500, image: "🧀" },
    { id: 158, name: "Feta Cheese", price: 4.49, category: "Dairy", rating: 4.5, reviews: 1000, image: "🧀" },
    { id: 159, name: "Swiss Cheese", price: 5.49, category: "Dairy", rating: 4.6, reviews: 1200, image: "🧀" },
    { id: 160, name: "Greek Yogurt", price: 3.99, category: "Dairy", rating: 4.8, reviews: 1700, image: "🍦" },
    { id: 162, name: "Orange Juice", price: 3.49, category: "Beverages", rating: 4.6, reviews: 900, image: "🍊" },
    { id: 163, name: "Apple Juice", price: 3.29, category: "Beverages", rating: 4.5, reviews: 850, image: "🍎" },
    { id: 164, name: "Almond Milk", price: 3.19, category: "Beverages", rating: 4.7, reviews: 1000, image: "🥛" },
    { id: 165, name: "Soy Milk", price: 2.99, category: "Beverages", rating: 4.6, reviews: 950, image: "🥛" },
    { id: 166, name: "Oat Milk", price: 3.49, category: "Beverages", rating: 4.8, reviews: 1100, image: "🥛" },
    { id: 167, name: "Sliced Turkey", price: 6.99, category: "Deli", rating: 4.5, reviews: 700, image: "🦃" },
    { id: 168, name: "Sliced Ham", price: 5.99, category: "Deli", rating: 4.4, reviews: 650, image: "🍖" },
    { id: 169, name: "Salami", price: 7.99, category: "Deli", rating: 4.3, reviews: 500, image: "🍕" },
    { id: 170, name: "Pizza Dough", price: 3.49, category: "Bread & Bakery", rating: 4.6, reviews: 800, image: "🍕" },
    { id: 171, name: "Pie Crusts", price: 3.99, category: "Bread & Bakery", rating: 4.5, reviews: 750, image: "🥧" },
    { id: 172, name: "Crescent Rolls", price: 2.99, category: "Bread & Bakery", rating: 4.4, reviews: 700, image: "🥐" },
    { id: 173, name: "Bread Flour", price: 4.49, category: "Bread & Bakery", rating: 4.7, reviews: 900, image: "🍚" },
    { id: 174, name: "Cake Flour", price: 4.99, category: "Bread & Bakery", rating: 4.6, reviews: 850, image: "🍚" },
    { id: 175, name: "Whole Wheat Flour", price: 3.99, category: "Bread & Bakery", rating: 4.5, reviews: 800, image: "🍚" },
    { id: 176, name: "Gluten-Free Flour Blend", price: 6.99, category: "Bread & Bakery", rating: 4.4, reviews: 700, image: "🌾" },
    { id: 177, name: "Powdered Sugar", price: 2.99, category: "Condiments & Spices", rating: 4.6, reviews: 1100, image: "🍬" },
    { id: 178, name: "Molasses", price: 3.79, category: "Condiments & Spices", rating: 4.5, reviews: 600, image: "🍯" },
    { id: 179, name: "Corn Syrup", price: 3.29, category: "Condiments & Spices", rating: 4.4, reviews: 550, image: "🌽" },
    { id: 180, name: "Cake Mix", price: 2.49, category: "Bread & Bakery", rating: 4.3, reviews: 900, image: "🍰" },
    { id: 181, name: "Brownie Mix", price: 2.29, category: "Bread & Bakery", rating: 4.4, reviews: 850, image: "🍫" },
    { id: 182, name: "Pancake Mix", price: 2.79, category: "Bread & Bakery", rating: 4.5, reviews: 1000, image: "🥞" },
    { id: 183, name: "Spaghetti", price: 1.89, category: "Pasta, Rice & Cereal", rating: 4.7, reviews: 1500, image: "🍝" },
    { id: 184, name: "Penne", price: 1.89, category: "Pasta, Rice & Cereal", rating: 4.6, reviews: 1400, image: "🍝" },
    { id: 185, name: "Farfalle", price: 1.99, category: "Pasta, Rice & Cereal", rating: 4.5, reviews: 1300, image: "🍝" },
    { id: 186, name: "Lasagna Noodles", price: 2.49, category: "Pasta, Rice & Cereal", rating: 4.4, reviews: 1000, image: "🍝" },
    { id: 187, name: "White Chocolate Chips", price: 3.49, category: "Bread & Bakery", rating: 4.7, reviews: 800, image: "🍫" },
    { id: 188, name: "Peanut Butter Chips", price: 3.49, category: "Bread & Bakery", rating: 4.6, reviews: 750, image: "🥜" },
    { id: 189, name: "Dried Black Beans", price: 1.99, category: "Canned Goods", rating: 4.5, reviews: 600, image: "🫘" },
    { id: 190, name: "Dried Lentils", price: 2.19, category: "Canned Goods", rating: 4.6, reviews: 650, image: "🥣" },
    { id: 191, name: "Dried Chickpeas", price: 2.29, category: "Canned Goods", rating: 4.5, reviews: 550, image: "🫘" },
    { id: 192, name: "Vegetable Broth", price: 2.79, category: "Canned Goods", rating: 4.7, reviews: 1200, image: "🍲" },
    { id: 193, name: "Red Cooking Wine", price: 7.99, category: "Condiments & Spices", rating: 4.2, reviews: 400, image: "🍷" },
    { id: 194, name: "White Cooking Wine", price: 7.99, category: "Condiments & Spices", rating: 4.2, reviews: 400, image: "🥂" },
    { id: 195, name: "Hoisin Sauce", price: 3.99, category: "Condiments & Spices", rating: 4.6, reviews: 700, image: "🍶" },
    { id: 196, name: "Fish Sauce", price: 4.49, category: "Condiments & Spices", rating: 4.5, reviews: 650, image: "🐟" },
    { id: 197, name: "Oyster Sauce", price: 4.29, category: "Condiments & Spices", rating: 4.4, reviews: 600, image: "🦪" },
    { id: 198, name: "Rice Vinegar", price: 3.49, category: "Condiments & Spices", rating: 4.7, reviews: 800, image: "🍚" },
    { id: 199, name: "Grapeseed Oil", price: 8.99, category: "Condiments & Spices", rating: 4.5, reviews: 500, image: "🍇" },
    { id: 200, name: "Avocado Oil", price: 9.99, category: "Condiments & Spices", rating: 4.8, reviews: 900, image: "🥑" },
    { id: 201, name: "Chili Oil", price: 6.99, category: "Condiments & Spices", rating: 4.6, reviews: 750, image: "🌶️" },
    { id: 202, name: "Almond Butter", price: 7.99, category: "Snacks", rating: 4.7, reviews: 1000, image: "🥜" },
    { id: 203, name: "Strawberry Jam", price: 3.49, category: "Snacks", rating: 4.5, reviews: 850, image: "🍓" },
    { id: 204, name: "Ranch Dressing", price: 3.99, category: "Condiments & Spices", rating: 4.4, reviews: 900, image: "🥗" },
    { id: 205, name: "Italian Dressing", price: 3.79, category: "Condiments & Spices", rating: 4.3, reviews: 800, image: "🥗" },
    { id: 206, name: "Caesar Dressing", price: 4.29, category: "Condiments & Spices", rating: 4.5, reviews: 750, image: "🥗" },
    { id: 207, name: "Agave Nectar", price: 5.49, category: "Condiments & Spices", rating: 4.6, reviews: 600, image: "🍯" },
    { id: 208, name: "Sweet Relish", price: 2.19, category: "Condiments & Spices", rating: 4.3, reviews: 400, image: "🥒" },
    { id: 209, name: "Taco Seasoning", price: 1.99, category: "Condiments & Spices", rating: 4.7, reviews: 1100, image: "🌮" },
    { id: 210, name: "Poultry Seasoning", price: 2.49, category: "Condiments & Spices", rating: 4.5, reviews: 700, image: "🍗" },
    { id: 211, name: "Ranch Seasoning", price: 2.29, category: "Condiments & Spices", rating: 4.6, reviews: 800, image: "🥗" },
    { id: 212, name: "White Pepper", price: 3.99, category: "Condiments & Spices", rating: 4.4, reviews: 500, image: "⚪" },
    { id: 213, name: "Celery Seed", price: 2.99, category: "Condiments & Spices", rating: 4.3, reviews: 300, image: "🌱" },
    { id: 214, name: "Mustard Seed", price: 2.79, category: "Condiments & Spices", rating: 4.2, reviews: 250, image: "🌰" },
    { id: 215, name: "Fennel Seed", price: 3.29, category: "Condiments & Spices", rating: 4.1, reviews: 200, image: "🌿" },
    { id: 216, name: "Cardamom", price: 6.99, category: "Condiments & Spices", rating: 4.8, reviews: 400, image: "🌿" },
    { id: 217, name: "Cloves", price: 4.99, category: "Condiments & Spices", rating: 4.6, reviews: 350, image: "🌿" },
    { id: 218, name: "Sea Salt", price: 3.49, category: "Condiments & Spices", rating: 4.8, reviews: 1500, image: "🧂" },
    { id: 219, name: "Pink Himalayan Salt", price: 4.49, category: "Condiments & Spices", rating: 4.7, reviews: 1200, image: "🧂" },
    { id: 220, name: "Nutritional Yeast", price: 5.99, category: "Condiments & Spices", rating: 4.5, reviews: 600, image: "🧀" },
    { id: 221, name: "MSG", price: 3.99, category: "Condiments & Spices", rating: 4.0, reviews: 200, image: "✨" },
    { id: 222, name: "Frozen Pizza", price: 7.99, category: "Frozen Foods", rating: 4.3, reviews: 1500, image: "🍕" },
    { id: 223, name: "Frozen Lasagna", price: 8.99, category: "Frozen Foods", rating: 4.2, reviews: 1000, image: "🍝" },
    { id: 224, name: "Frozen Burritos", price: 2.99, category: "Frozen Foods", rating: 4.0, reviews: 800, image: "🌯" },
    { id: 225, name: "Frozen Waffles", price: 3.49, category: "Frozen Foods", rating: 4.5, reviews: 900, image: "🧇" },
    { id: 226, name: "Frozen Pancakes", price: 3.29, category: "Frozen Foods", rating: 4.4, reviews: 850, image: "🥞" },
    { id: 227, name: "Breakfast Sausages", price: 4.99, category: "Frozen Foods", rating: 4.6, reviews: 700, image: "🌭" },
    { id: 228, name: "Frozen Asparagus", price: 3.99, category: "Frozen Foods", rating: 4.5, reviews: 600, image: "🥦" },
    { id: 229, name: "Frozen Brussels Sprouts", price: 3.79, category: "Frozen Foods", rating: 4.4, reviews: 550, image: "🥬" },
    { id: 230, name: "Frozen Cauliflower", price: 3.49, category: "Frozen Foods", rating: 4.3, reviews: 500, image: "🥦" },
    { id: 231, name: "Ice Cream", price: 5.99, category: "Frozen Foods", rating: 4.8, reviews: 2000, image: "🍦" },
    { id: 232, name: "Frozen Yogurt", price: 4.99, category: "Frozen Foods", rating: 4.7, reviews: 1500, image: "🍨" },
    { id: 233, name: "Frozen Pies", price: 6.99, category: "Frozen Foods", rating: 4.5, reviews: 1000, image: "🥧" },
    { id: 234, name: "Bacon", price: 6.99, category: "Meat", rating: 4.7, reviews: 1200, image: "🥓" },
    { id: 235, name: "Pork Loin", price: 9.99, category: "Meat", rating: 4.5, reviews: 800, image: "🍖" },
    { id: 236, name: "Beef Steaks", price: 15.99, category: "Meat", rating: 4.8, reviews: 1500, image: "🥩" },
    { id: 237, name: "Beef Roasts", price: 12.99, category: "Meat", rating: 4.6, reviews: 900, image: "🍖" },
    { id: 238, name: "Whole Chicken", price: 7.99, category: "Meat", rating: 4.5, reviews: 1000, image: "🍗" },
    { id: 239, name: "Chicken Thighs", price: 5.99, category: "Meat", rating: 4.6, reviews: 1100, image: "🍗" },
    { id: 240, name: "Chicken Wings", price: 6.99, category: "Meat", rating: 4.4, reviews: 950, image: "🐔" },
    { id: 241, name: "Cod Fillet", price: 11.99, category: "Fish & Seafood", rating: 4.7, reviews: 800, image: "🐟" },
    { id: 242, name: "Tilapia Fillet", price: 9.99, category: "Fish & Seafood", rating: 4.5, reviews: 700, image: "🐟" },
    { id: 243, name: "Scallops", price: 18.99, category: "Fish & Seafood", rating: 4.8, reviews: 600, image: "🦐" },
    { id: 244, name: "Tempeh", price: 3.99, category: "Meat", rating: 4.3, reviews: 400, image: "🌱" },
    { id: 245, name: "Edamame", price: 2.99, category: "Meat", rating: 4.2, reviews: 350, image: "🌱" },
    { id: 93, name: "Frozen Mixed Vegetables", price: 2.19, category: "Frozen Foods", rating: 4.3, reviews: 1100, image: "🥦" },
    { id: 94, name: "Frozen Berries", price: 3.99, category: "Frozen Foods", rating: 4.6, reviews: 900, image: "🍓" },
    { id: 95, name: "Frozen Shrimp", price: 9.99, category: "Fish & Seafood", rating: 4.5, reviews: 700, image: "🦐" },
    { id: 96, name: "Bread/Rolls", price: 3.29, category: "Bread & Bakery", rating: 4.4, reviews: 500, image: "🍞" },

    // Oils & Fats (Expanded)
    { id: 97, name: "Coconut Oil", price: 6.99, category: "Condiments & Spices", rating: 4.6, reviews: 800, image: "🥥" },
    { id: 98, name: "Sesame Oil", price: 4.99, category: "Condiments & Spices", rating: 4.5, reviews: 600, image: "🍶" },

    // Baking Essentials (Expanded)
    { id: 99, name: "Brown Sugar", price: 2.79, category: "Condiments & Spices", rating: 4.6, reviews: 1200, image: "🍬" },
    { id: 100, name: "Confectioner's Sugar", price: 2.19, category: "Condiments & Spices", rating: 4.5, reviews: 900, image: "🍬" },
    { id: 101, name: "Vanilla Extract", price: 5.99, category: "Bread & Bakery", rating: 4.7, reviews: 1300, image: "🍮" },
    { id: 102, name: "Almond Extract", price: 4.99, category: "Bread & Bakery", rating: 4.6, reviews: 500, image: "🌰" },
    { id: 103, name: "Chocolate Chips", price: 3.99, category: "Bread & Bakery", rating: 4.8, reviews: 1800, image: "🍫" },
    { id: 104, name: "Cocoa Powder", price: 4.49, category: "Bread & Bakery", rating: 4.7, reviews: 1000, image: "🍫" },
    { id: 105, name: "Cornstarch", price: 1.99, category: "Bread & Bakery", rating: 4.3, reviews: 700, image: "🍚" },

    // Other Essentials
    { id: 106, name: "Kosher Salt", price: 3.49, category: "Condiments & Spices", rating: 4.7, reviews: 1500, image: "🧂" },
    { id: 107, name: "Cooking Spray", price: 2.99, category: "Condiments & Spices", rating: 4.4, reviews: 900, image: "🍳" },
    { id: 108, name: "Capers", price: 3.29, category: "Canned Goods", rating: 4.2, reviews: 300, image: "🫙" },
    { id: 109, name: "Anchovy Paste", price: 4.99, category: "Condiments & Spices", rating: 4.1, reviews: 200, image: "🐟" },
    { id: 110, name: "Olives", price: 4.49, category: "Canned Goods", rating: 4.6, reviews: 500, image: "🫒" },
    { id: 111, name: "Sun-Dried Tomatoes", price: 5.99, category: "Canned Goods", rating: 4.7, reviews: 600, image: "🍅" },
    { id: 112, name: "Dried Fruits", price: 3.49, category: "Snacks", rating: 4.5, reviews: 700, image: "🍇" },
    { id: 113, name: "Nuts", price: 3.99, category: "Snacks", rating: 4.6, reviews: 800, image: "🌰" },
    { id: 114, name: "Seeds", price: 6.99, category: "Snacks", rating: 4.8, reviews: 900, image: "🌱" }
  ];

  // Canonical ingredient mapping for grouping similar products
  const canonicalIngredientMap = {
    tomato: [
      'Fresh Tomatoes',      // Default representative for tomato group
      'Tomato',
      'Canned Diced Tomatoes',
      'Sun-Dried Tomatoes',
      'Tomato Sauce',
      'Tomato Paste',
      'Tomatillo',
      'Marinara Sauce',
      'Ketchup',
    ],
    cheese: [
      'Cheddar Cheese',
      'Mozzarella Cheese',
      'Feta Cheese',
      'Swiss Cheese',
      'Parmesan Cheese',
      'Cream Cheese',
      'Other Cheese',
    ],
    vinegar: [
      'Vinegar',
      'Red Wine Vinegar',
      'Apple Cider Vinegar',
      'Balsamic Vinegar',
      'Rice Vinegar',
    ],
    oil: [
      'Olive Oil',
      'Vegetable Oil',
      'Coconut Oil',
      'Sesame Oil',
      'Grapeseed Oil',
      'Avocado Oil',
      'Chili Oil',
    ],
    'leafy greens': [
      'Spinach',
      'Romaine Lettuce',
      'Green Leaf Lettuce',
      'Kale',
      'Frozen Spinach',
    ],
    milk: [
      'Milk',
      'Almond Milk',
      'Soy Milk',
      'Oat Milk',
    ],
    lettuce: [
      'Romaine Lettuce',
      'Green Leaf Lettuce',
      'Spinach',
      'Kale',
      'Frozen Spinach',
    ],
    pepper: [
      'Bell Peppers',
      'Fresh Bell Peppers',
      'Canned Green Chiles',
      'Cayenne Pepper',
      'Crushed Red Pepper Flakes',
      'Chili Powder',
      'Paprika',
      'Smoked Paprika',
    ],
    beans: [
      'Canned White Beans',
      'Canned Black Beans',
      'Canned Kidney Beans',
      'Canned Garbanzo Beans',
      'Dried Black Beans',
      'Dried Lentils',
      'Dried Chickpeas',
      'Lentils',
      'Split Peas',
    ],
    bread: [
      'Bread/Rolls',
      'Bread Flour',
      'Cake Flour',
      'Whole Wheat Flour',
      'All-Purpose Flour',
      'Gluten-Free Flour Blend',
    ],
    sugar: [
      'Granulated Sugar',
      'Brown Sugar',
      'Confectioner\'s Sugar',
      'Maple Syrup',
      'Honey',
      'Agave Nectar',
      'Molasses',
      'Corn Syrup',
    ],
    flour: [
      'All-Purpose Flour',
      'Bread Flour',
      'Cake Flour',
      'Whole Wheat Flour',
      'Gluten-Free Flour Blend',
    ],
    pasta: [
      'Pasta',
      'Spaghetti',
      'Penne',
      'Farfalle',
      'Lasagna Noodles',
    ],
    // New canonical groups for noodles and lasagna
    noodle: [
      'Pasta',
      'Spaghetti',
      'Penne',
      'Farfalle',
      // intentionally NOT including 'Lasagna Noodles'
    ],
    noodles: [
      'Pasta',
      'Spaghetti',
      'Penne',
      'Farfalle',
      // intentionally NOT including 'Lasagna Noodles'
    ],
    lasagna: [
      'Lasagna Noodles'
    ],
    chocolate: [
      'Chocolate Chips',
      'White Chocolate Chips',
      'Peanut Butter Chips',
    ],
    broth: [
      'Chicken Stock',
      'Beef Stock',
      'Vegetable Broth',
    ],
    'deli meats': [
      'Sliced Turkey',
      'Sliced Ham',
      'Salami',
    ],
    chicken: [
      'Chicken Breasts',
      'Chicken Thighs',
      'Chicken Wings',
      'Whole Chicken',
    ],
    beef: [
      'Ground Beef',
      'Beef Steaks',
      'Beef Roasts',
    ],
    pork: [
      'Pork Chops',
      'Pork Loin',
      'Bacon',
      'Sausage',
    ],
  };

  function ShopMart() {
  
  // State variables
  const [cart, setCart] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
    const allCategories = React.useMemo(() => [
    'all',
    ...new Set(standardizedProducts.map(product => product.category))
  ], []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('ingredient'); // 'ingredient' or 'recipe'
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(25); // Default to 25 products per page for 5 columns
  const [productsPerPageMobile, setProductsPerPageMobile] = useState(10); // Default to 10 products per page for mobile
  const [isMobile, setIsMobile] = useState(false);
  
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [isSearchButtonPressed, setIsSearchButtonPressed] = useState(false);
  
  // Add at the top of the ShopMart function:
  const [showThankYou, setShowThankYou] = useState(false);
  const [lastTotal, setLastTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Enhanced recipe ingredient filtering with canonical mapping and expansion support
  const [expandedIngredients, setExpandedIngredients] = useState({});

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    const handleScroll = () => {
      if (window.innerWidth <= 600) {
        setShowScrollTop(window.scrollY > 120);
      } else {
        setShowScrollTop(false);
      }
    };
    
    // Add touch event handling for better mobile experience
    const handleTouchStart = (e) => {
      // Add haptic feedback for iOS devices
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  React.useEffect(() => {
    if (isMobile) {
      setProductsPerPage(productsPerPageMobile);
    } else {
      setProductsPerPage(25); // Reset to default for desktop
    }
  }, [isMobile, productsPerPageMobile]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Mobile-specific improvements
    if (window.innerWidth <= 600) {
      // Haptic feedback for scroll to top
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
  };

  // Filtering and Sorting Logic using useMemo
    const recipeProductList = React.useMemo(() => {
    if (recipeIngredients.length === 0) return [];

    const productMap = new Map();
    const seenCanonicalKeys = new Set();

    recipeIngredients.forEach(ingredient => {
      const lowerIngredient = ingredient.toLowerCase();
      let canonicalKey = null;

      if (canonicalIngredientMap[lowerIngredient]) {
        canonicalKey = lowerIngredient;
      } else if (canonicalIngredientMap[lowerIngredient.replace(/s$/, '')]) {
        canonicalKey = lowerIngredient.replace(/s$/, '');
      }

      if (!canonicalKey) {
        for (const key in canonicalIngredientMap) {
          if (canonicalIngredientMap[key].some(val => val.toLowerCase() === lowerIngredient)) {
            canonicalKey = key;
            break;
          }
        }
      }

      if (canonicalKey) {
        if (!seenCanonicalKeys.has(canonicalKey)) {
          const showAll = expandedIngredients[canonicalKey];
          const productNames = showAll ? canonicalIngredientMap[canonicalKey] : [canonicalIngredientMap[canonicalKey][0]];
          const products = productNames.map(name => 
            standardizedProducts.find(p => p.name.toLowerCase() === name.toLowerCase())
          ).filter(Boolean);

          products.forEach(p => productMap.set(p.id, p));
          seenCanonicalKeys.add(canonicalKey);
        }
      } else {
        const products = standardizedProducts.filter(p =>
          p.name.toLowerCase().includes(lowerIngredient) || lowerIngredient.includes(p.name.toLowerCase())
        );
        products.forEach(p => productMap.set(p.id, p));
      }
    });

    return Array.from(productMap.values());
  }, [recipeIngredients, expandedIngredients]);

    const filteredProducts = React.useMemo(() => {
    if (recipeIngredients.length > 0) {
      return recipeProductList;
    }

    let newFilteredProducts = [...standardizedProducts];

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
      } else if (sortBy === 'category') {
        const catCompare = a.category.localeCompare(b.category);
        if (catCompare !== 0) return catCompare;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return sortedProducts;
  }, [currentCategory, searchTerm, searchType, recipeIngredients, sortBy, recipeProductList]);

  // Replace generateStars with SVG version
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<FullStar key={`full-${i}`} />);
    if (hasHalfStar) stars.push(<HalfStar key="half" />);
    for (let i = 0; i < emptyStars; i++) stars.push(<EmptyStar key={`empty-${i}`} />);
    return stars;
  };

  

  

  // Pagination Logic
  const currentProducts = filteredProducts.slice(0, currentPage * productsPerPage);
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

    // Mobile-specific improvements
    if (window.innerWidth <= 600) {
      // Haptic feedback for search initiation
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
      
      // Visual feedback for search button
      setIsSearchButtonPressed(true);
      setTimeout(() => {
        setIsSearchButtonPressed(false);
      }, 200); // Revert after 200ms
      
      // Hide keyboard on mobile after search
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.blur();
      }
    }

    if (searchType === 'recipe') {
      try {
        const response = await fetch(`https://us-central1-capstonesearchbar.cloudfunctions.net/searchRecipes/?query=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.ingredients) {
          
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

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  

  const addToCart = (productId) => {
    const product = standardizedProducts.find(p => p.id === productId);
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
    
    // Mobile-specific feedback
    if (window.innerWidth <= 600) {
      // Visual feedback for mobile users
      const cartIcon = document.querySelector('.cart-icon');
      if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
          cartIcon.style.transform = 'scale(1)';
        }, 200);
      }
      
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
    
    // Mobile-specific improvements
    if (window.innerWidth <= 600) {
      if (!isCartOpen) {
        // Opening cart - prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Closing cart - restore body scroll
        document.body.style.overflow = '';
      }
    }
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
    setLastTotal(total);
    setShowThankYou(true);
    setCart([]);
    setIsCartOpen(false);
    
    // Mobile-specific improvements
    if (window.innerWidth <= 600) {
      // Restore body scroll when closing cart
      document.body.style.overflow = '';
      
      // Haptic feedback for successful checkout
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  

  // Add this function inside ShopMart:
  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
    
    // Mobile-specific improvements
    if (window.innerWidth <= 600) {
      // Restore body scroll when closing cart
      document.body.style.overflow = '';
      
      // Haptic feedback for clearing cart
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  // --- Generalized normalization and grouping for all canonical ingredients ---
  const canonicalGroups = {};
  const nonCanonicalIngredients = [];

  const canonicalKeys = Object.keys(canonicalIngredientMap);

  recipeIngredients.forEach(ingredient => {
    const lowerIngredient = ingredient.toLowerCase();
    let matchedGroup = null;
    for (const key of canonicalKeys) {
      // If the ingredient contains the canonical group keyword (e.g., 'cheese', 'pepper', etc.)
      if (lowerIngredient.includes(key)) {
        matchedGroup = key;
        break;
      }
    }
    if (matchedGroup) {
      if (!canonicalGroups[matchedGroup]) canonicalGroups[matchedGroup] = [];
      canonicalGroups[matchedGroup].push(ingredient);
    } else {
      nonCanonicalIngredients.push(ingredient);
    }
  });

  const normalizedIngredients = [];
  Object.keys(canonicalGroups).forEach(groupKey => {
    normalizedIngredients.push({
      groupKey,
      displayName: canonicalIngredientMap[groupKey][0],
      isCanonical: true,
      variations: canonicalGroups[groupKey],
    });
  });
  nonCanonicalIngredients.forEach(ingredient => {
    normalizedIngredients.push({
      groupKey: ingredient.toLowerCase(),
      displayName: ingredient,
      isCanonical: false,
      variations: [ingredient],
    });
  });

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">
              <img src="/crossmark-logo.png" alt="Crossmark Logo" style={{ height: '1.6rem', objectFit: 'contain' }} />
            </div>
          </div>

          <div className="header-center">
            <div className="toggle-switch">
              <button
                className={`toggle-option${searchType === 'ingredient' ? ' selected' : ''}`}
                onClick={() => {
                  setSearchType('ingredient');
                  setCurrentCategory('all');
                  setSearchTerm('');
                  setRecipeIngredients([]);
                  setCurrentPage(1);
                }}
                type="button"
                aria-pressed={searchType === 'ingredient'}
              >
                🛒 Ingredient
              </button>
              <button
                className={`toggle-option${searchType === 'recipe' ? ' selected' : ''}`}
                onClick={() => {
                  setSearchType('recipe');
                  setCurrentCategory('all');
                  setSearchTerm('');
                  setRecipeIngredients([]);
                  setCurrentPage(1);
                }}
                type="button"
                aria-pressed={searchType === 'recipe'}
              >
                👨‍🍳 Recipe
              </button>
            </div>
            <div className="search-input-group">
              <input
                type="text"
                className="search-input"
                placeholder={`Search for ${searchType === 'recipe' ? 'recipes' : 'ingredients'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              {searchTerm && (
                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                  &times;
                </button>
              )}
            </div>
            <button className={`search-btn ${isSearchButtonPressed ? 'pressed' : ''}`} onClick={handleSearch}>
              🔍 Search
            </button>
            <button className="return-all-btn" onClick={() => handleCategoryFilter('all')}>🗑️</button>
          </div>

          <div className="header-right">
            <button className="cart-icon" onClick={toggleCart}>
              🛒<span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </button>
            {/* Scroll-to-Top Button (bottom left on mobile) */}
            {showScrollTop && (
              <button
                className="scroll-top-btn"
                onClick={handleScrollToTop}
                aria-label="Scroll to top"
              >
                ⬆︎
              </button>
            )}
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
            <option value="category">Category</option>
          </select>
        </div>
        {!isMobile && (
          <div className="filter-group">
            <label>Products per page:</label>
            <select className="filter-select" value={productsPerPage} onChange={handleProductsPerPageChange}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        )}
        {!isMobile && filteredProducts.length > 0 && (
          <div className="pagination-top">
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        )}
      </div>

      {/* Products Container */}
      <div className="products-container">
        {currentProducts.length > 0 ? (
          <div className="products-grid">
            {/* If recipeIngredients are active, group by canonical ingredient */}
            {recipeIngredients.length > 0 ? (
              (() => {
                const productCards = [];
                const renderedProductIds = new Set();

                normalizedIngredients.forEach(({ groupKey, displayName, isCanonical, variations }) => {
                  let products = [];
                  if (isCanonical) {
                    const showAll = expandedIngredients[groupKey];
                    const productNames = showAll ? canonicalIngredientMap[groupKey] : [canonicalIngredientMap[groupKey][0]];
                    products = productNames.map(name =>
                      standardizedProducts.find(p =>
                        p.name.toLowerCase().replace(/s$/, '') === name.toLowerCase().replace(/s$/, '')
                      )
                    ).filter(Boolean);
                  } else {
                    products = standardizedProducts.filter(p =>
                      p.name.toLowerCase().includes(displayName.toLowerCase()) ||
                      displayName.toLowerCase().includes(p.name.toLowerCase())
                    );
                  }
                  products = products.filter(p => !renderedProductIds.has(p.id));
                  if (products.length > 0) {
                    products.forEach((product, idx) => {
                      renderedProductIds.add(product.id);
                      productCards.push(
                        <div className="product-card" key={product.id} onClick={() => setSelectedProduct(product)} tabIndex={0} role="button" aria-label={`View details for ${product.name}`}
                          onKeyPress={e => { if (e.key === 'Enter') setSelectedProduct(product); }}
                        >
                          <div className="product-image" aria-hidden="true">{product.image}</div>
                          <div className="product-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                            <h3 className="product-title">{product.name}</h3>
                            <div style={{ height: 28, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, width: '100%' }}>
                              {idx === 0 && isCanonical && canonicalIngredientMap[groupKey].length > 1 && (
                                <>
                                  <span style={{ fontWeight: 600, fontSize: 15 }}>{displayName}</span>
                                  <button
                                    className="expand-btn"
                                    style={{ fontSize: 13, color: '#2474E6', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                                    onClick={e => { e.stopPropagation(); setExpandedIngredients(prev => ({ ...prev, [groupKey]: !prev[groupKey] })); }}
                                  >
                                    {expandedIngredients[groupKey] ? 'Show less' : `Show all ${canonicalIngredientMap[groupKey].length} options`}
                                  </button>
                                  {/* Show variations if expanded */}
                                  {expandedIngredients[groupKey] && variations.length > 1 && (
                                    <ul style={{ margin: '8px 0 0 0', padding: 0, listStyle: 'disc inside', color: '#888', fontSize: 13 }}>
                                      {variations.map((v, i) => <li key={i}>{v}</li>)}
                                    </ul>
                                  )}
                                </>
                              )}
                              {(idx !== 0 || !isCanonical || canonicalIngredientMap[groupKey].length <= 1) && (
                                <div style={{ height: 28 }}></div>
                              )}
                            </div>
                            <hr className="divider" style={{ border: 'none', borderTop: '2px solid #E02B2B', margin: '8px 0 10px 0', width: '100%' }} />
                            <div className="product-price" style={{ fontWeight: 600, fontSize: '1.08rem', color: '#003366', marginBottom: 8, textAlign: 'left', width: '100%' }}>${product.price.toFixed(2)}</div>
                            <div className="product-rating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 8, width: '100%' }}>
                              <span className="stars" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginBottom: 2 }}>{generateStars(product.rating)}</span>
                              <span style={{ display: 'flex', alignItems: 'center', marginLeft: 2, marginTop: 0 }} aria-label="rating and reviews">
                                <span style={{ fontWeight: 600, fontSize: 14, color: '#003366', marginRight: 8 }}>{product.rating.toFixed(1)}</span>
                                <span className="rating-text" style={{ fontSize: 13, color: '#888' }}>
                                  ({product.reviews.toLocaleString()} reviews)
                                </span>
                              </span>
                            </div>
                            <button
                              className="add-to-cart"
                              style={{
                                width: '100%',
                                marginTop: 'auto',
                                fontWeight: 700,
                                fontSize: '1rem',
                                borderRadius: 6,
                                background: addedToCart[product.id] ? '#2ecc40' : '#003366',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 0',
                                transition: 'background 0.2s, transform 0.18s cubic-bezier(0.4,1.2,0.6,1)',
                                transform: addedToCart[product.id] ? 'scale(1.08)' : 'scale(1)'
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                addToCart(product.id);
                                setAddedToCart(prev => ({ ...prev, [product.id]: true }));
                                setTimeout(() => setAddedToCart(prev => ({ ...prev, [product.id]: false })), 1000);
                              }}
                              aria-label={`Add ${product.name} to cart`}
                              disabled={addedToCart[product.id]}
                            >
                              {addedToCart[product.id] ? 'Added to Cart!' : 'Add to Cart'}
                            </button>
                          </div>
                        </div>
                      );
                    });
                  }
                });
                return productCards;
              })()
            ) : (
              // Default rendering if not in recipe search mode
              currentProducts.map(product => {
                const added = !!addedToCart[product.id];
                const handleAddToCart = (e) => {
                  e.stopPropagation();
                  addToCart(product.id);
                  setAddedToCart(prev => ({ ...prev, [product.id]: true }));
                  setTimeout(() => setAddedToCart(prev => ({ ...prev, [product.id]: false })), 1000);
                };
                return (
                  <div className="product-card" key={product.id} onClick={() => setSelectedProduct(product)} tabIndex={0} role="button" aria-label={`View details for ${product.name}`}
                    onKeyPress={e => { if (e.key === 'Enter') setSelectedProduct(product); }}
                  >
                    <div className="product-image" aria-hidden="true">{product.image}</div>
                    <div className="product-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                      <h3 className="product-title">{product.name}</h3>
                      <div style={{ height: 28, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, width: '100%' }}>
                        {/* This space is intentionally left blank to align with the recipe search results */}
                      </div>
                      <hr className="divider" style={{ border: 'none', borderTop: '2px solid #E02B2B', margin: '8px 0 10px 0', width: '100%' }} />
                      <div className="product-price" style={{ fontWeight: 600, fontSize: '1.08rem', color: '#003366', marginBottom: 8, textAlign: 'left', width: '100%' }}>${product.price.toFixed(2)}</div>
                      <div className="product-rating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 8, width: '100%' }}>
                        <span className="stars" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginBottom: 2 }}>{generateStars(product.rating)}</span>
                        <span style={{ display: 'flex', alignItems: 'center', marginLeft: 2, marginTop: 0 }} aria-label="rating and reviews">
                          <span style={{ fontWeight: 600, fontSize: 14, color: '#003366', marginRight: 8 }}>{product.rating.toFixed(1)}</span>
                          <span className="rating-text" style={{ fontSize: 13, color: '#888' }}>
                            ({product.reviews.toLocaleString()} reviews)
                          </span>
                        </span>
                      </div>
                      <button
                        className="add-to-cart"
                        style={{
                          width: '100%',
                          marginTop: 'auto',
                          fontWeight: 700,
                          fontSize: '1rem',
                          borderRadius: 6,
                          background: added ? '#2ecc40' : '#003366',
                          color: '#fff',
                          border: 'none',
                          padding: '10px 0',
                          transition: 'background 0.2s, transform 0.18s cubic-bezier(0.4,1.2,0.6,1)',
                          transform: added ? 'scale(1.08)' : 'scale(1)'
                        }}
                        onClick={handleAddToCart}
                        aria-label={`Add ${product.name} to cart`}
                        disabled={added}
                      >
                        {added ? 'Added to Cart!' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Bottom Pagination / Load More */}
      {filteredProducts.length > 0 && (
        <div className="pagination-bottom">
          {isMobile ? (
            currentPage * productsPerPage < filteredProducts.length && (
              <button
                className="load-more-btn"
                onClick={loadMore}
              >
                Load More
              </button>
            )
          ) : (
            totalPages > 1 && (
              <>
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
              </>
            )
          )}
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="cart-modal" style={{ display: isCartOpen ? 'flex' : 'none' }} onClick={(e) => { if (e.target.className === 'cart-modal') toggleCart(); }}>
          <div
            className="cart-content"
            style={
              window.innerWidth <= 600
                ? {} // On mobile, use only CSS for sizing/positioning
                : {}
            }
          >
            <div className="cart-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Shopping Cart</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  style={{
                    background: 'none',
                    color: '#E02B2B',
                    border: '1px solid #E02B2B',
                    borderRadius: 5,
                    padding: '6px 12px',
                    fontSize: 14,
                    cursor: 'pointer',
                    fontWeight: 600,
                    marginRight: 4,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button className="close-cart" onClick={toggleCart}>×</button>
              </div>
            </div>
            <div>
              <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 12 }}>
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
            </div>
            <div className="cart-total" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div className="total-amount">Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</div>
              <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}

      {showThankYou && (
        <div className="cart-modal" style={{ display: 'flex', zIndex: 2000 }}>
          <div className="cart-content" style={{ maxWidth: 400, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: '#2474E6', marginBottom: 16 }}>Thank You for Your Purchase!</h2>
            <div style={{ fontSize: 18, marginBottom: 24 }}>Your total is <span style={{ fontWeight: 700 }}>${lastTotal.toFixed(2)}</span></div>
            <button
              className="checkout-btn"
              style={{ minWidth: 120 }}
              onClick={() => setShowThankYou(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="cart-modal" style={{ display: 'flex', zIndex: 2100 }} onClick={e => { if (e.target.className === 'cart-modal') setSelectedProduct(null); }}>
          <div className="cart-content" style={{ maxWidth: 400, textAlign: 'center', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <button className="close-cart" style={{ position: 'absolute', top: 12, right: 12 }} onClick={() => setSelectedProduct(null)}>×</button>
            <div className="product-image" style={{ fontSize: 80, margin: '0 auto 12px auto' }}>{selectedProduct.image}</div>
            <h2 style={{ color: '#2474E6', marginBottom: 8 }}>{selectedProduct.name}</h2>
            <div style={{ fontWeight: 600, fontSize: 18, color: '#003366', marginBottom: 8 }}>${selectedProduct.price.toFixed(2)}</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginBottom: 2 }}>{generateStars(selectedProduct.rating)}</span>
              <span style={{ display: 'flex', alignItems: 'center', marginLeft: 2, marginTop: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#003366', marginRight: 8 }}>{selectedProduct.rating.toFixed(1)}</span>
                <span style={{ fontSize: 13, color: '#888' }}>({selectedProduct.reviews.toLocaleString()} reviews)</span>
              </span>
            </div>
            <div style={{ fontSize: 15, color: '#888', marginBottom: 12 }}>Category: {selectedProduct.category}</div>
            <button
              className="add-to-cart"
              style={{
                width: '100%',
                marginTop: 12,
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: 6,
                background: addedToCart[selectedProduct.id] ? '#2ecc40' : '#003366',
                color: '#fff',
                border: 'none',
                padding: '10px 0',
                transition: 'background 0.2s, transform 0.18s cubic-bezier(0.4,1.2,0.6,1)',
                transform: addedToCart[selectedProduct.id] ? 'scale(1.08)' : 'scale(1)'
              }}
              onClick={() => {
                addToCart(selectedProduct.id);
                setAddedToCart(prev => ({ ...prev, [selectedProduct.id]: true }));
                setTimeout(() => setAddedToCart(prev => ({ ...prev, [selectedProduct.id]: false })), 1000);
              }}
              aria-label={`Add ${selectedProduct.name} to cart`}
              disabled={addedToCart[selectedProduct.id]}
            >
              {addedToCart[selectedProduct.id] ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default ShopMart;
