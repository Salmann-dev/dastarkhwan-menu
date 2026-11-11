export type Dish = {
  id: string;
  firstWord: string;
  secondWord: string;
  rankLabel: string;
  rating: number;
  price: number;
  chef: string;
  kitchen: string;
  description: string;
  ingredients: string[];
  likes: number;
  image: string;
  accent: string;
};

export const dishes: Dish[] = [
  {
    id: "chicken-biryani",
    firstWord: "CHICKEN",
    secondWord: "BIRYANI",
    rankLabel: "#1 Most loved dish",
    rating: 4.9,
    price: 650,
    likes: 128,
    chef: "Chef Minahil",
    kitchen: "Demo Kitchen One",
    description: "Fragrant rice layered with spiced chicken and golden onions.",
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Fried onions",
      "Saffron",
      "Biryani masala",
    ],
    accent: "#E8A838",
    image: "/dishes/chicken-biryani.png",
  },
  {
    id: "chicken-karahi",
    firstWord: "CHICKEN",
    secondWord: "KARAHI",
    rankLabel: "#2 Most loved dish",
    rating: 4.8,
    price: 1450,
    likes: 112,
    chef: "Chef Salman",
    kitchen: "Demo Kitchen Two",
    description:
      "Chicken cooked in a wok with tomatoes, ginger and green chilies.",
    ingredients: [
      "Chicken",
      "Tomatoes",
      "Ginger",
      "Green chilies",
      "Garlic",
      "Fresh coriander",
    ],
    accent: "#C0392B",
    image: "/dishes/chicken-karahi.png",
  },
  {
    id: "beef-nihari",
    firstWord: "BEEF",
    secondWord: "NIHARI",
    rankLabel: "#3 Most loved dish",
    rating: 4.7,
    price: 980,
    likes: 96,
    chef: "Chef Rameen",
    kitchen: "Demo Kitchen Three",
    description: "A slow-cooked, rich beef stew served hot with naan.",
    ingredients: [
      "Beef",
      "Ginger",
      "Whole spices",
      "Flour",
      "Ghee",
      "Lemon",
    ],
    accent: "#8B5A3C",
    image: "/dishes/beef-nihari.png",
  },
  {
    id: "chapli-kebab",
    firstWord: "CHAPLI",
    secondWord: "KEBAB",
    rankLabel: "#4 Most loved dish",
    rating: 4.6,
    price: 580,
    likes: 84,
    chef: "Chef Maryam",
    kitchen: "Demo Kitchen Four",
    description: "Crispy, flat minced meat patties with crunchy spices.",
    ingredients: [
      "Minced beef",
      "Onion",
      "Tomato",
      "Coriander seeds",
      "Pomegranate seeds",
      "Green chilies",
    ],
    accent: "#7A8B3C",
    image: "/dishes/chapli-kebab.png",
  },
  {
    id: "seekh-kebab",
    firstWord: "SEEKH",
    secondWord: "KEBAB",
    rankLabel: "#5 Most loved dish",
    rating: 4.7,
    price: 720,
    likes: 90,
    chef: "Chef Bilal",
    kitchen: "Demo Kitchen Five",
    description: "Juicy minced meat skewers grilled until smoky and tender.",
    ingredients: [
      "Minced meat",
      "Onion",
      "Garlic",
      "Cumin",
      "Red chili",
      "Mint chutney",
    ],
    accent: "#8E2C48",
    image: "/dishes/seekh-kebab.png",
  },
  {
    id: "haleem",
    firstWord: "BEEF",
    secondWord: "HALEEM",
    rankLabel: "#6 Most loved dish",
    rating: 4.5,
    price: 550,
    likes: 72,
    chef: "Chef Sana",
    kitchen: "Demo Kitchen Six",
    description: "A thick, creamy mix of lentils, wheat and tender meat.",
    ingredients: [
      "Wheat",
      "Lentils",
      "Beef",
      "Fried onions",
      "Ginger",
      "Lemon",
    ],
    accent: "#D4813B",
    image: "/dishes/haleem.png",
  },
];
