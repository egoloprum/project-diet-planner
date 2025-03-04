export const defaultDiets = [
  {
    name: "Anything",
    exclusion: "Nothing",
    icon: "Sandwich",
    excludeList: []
  },
  {
    name: "Keto",
    exclusion: "Legumes, Starchy Vegetables, Grains",
    icon: "Wheat",
    excludeList: ['Beans', 'Lentils', 'Peas', 'Potato', 'Yam', 'Corn', 'Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa']
  },
  {
    name: "Mediterranean",
    exclusion: "Red Meat, Starchy Vegetables, Fruit juice",
    icon: "Cherry",
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Potato', 'Yam', 'Corn', 'Fruit juice']
  },
  {
    name: "Paleo",
    exclusion: "Dairy, Grains, Legumes, Soy, Starchy Vegetables",
    icon: "Drumstick",
    excludeList: ['Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese', 'Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa',
      'Beans', 'Lentils', 'Peas', 'Soy', 'Tofu', 'Potato', 'Yam'
    ]
  },
  {
    name: "Vegan",
    exclusion: "Red Meat, Poultry, Shellfish, Fish, Dairy, Eggs, Mayo, Honey",
    icon: "Vegan",
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Chicken', 'Turkey', 'Shellfish', 'Fish', 'Salmon', 'Tuna', 'Tilapia',
      'Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese', 'Eggs', 'Mayo', 'Honey'
    ]
  },
  {
    name: "Vegetarian",
    exclusion: "Red Meat, Poultry, Shellfish",
    icon: "LeafyGreen",
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Chicken', 'Turkey', 'Shellfish']
  },
] 
