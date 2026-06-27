const CATEGORIES = [
  "Thai",
  "Seafood",
  "Japanese",
  "Italian",
  "American",
  "Mexican",
  "Steak House",
  "Western",
];

const PRICE_RANGES = ["$", "$$", "$$$"];

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const getRestaurantCategory = (id) => {
  const hash = hashString(id);
  return CATEGORIES[hash % CATEGORIES.length];
};

export const getRestaurantPriceRange = (id) => {
  const hash = hashString(id + "price");
  return PRICE_RANGES[hash % PRICE_RANGES.length];
};

export const getRestaurantOpenStatus = (id) => {
  const hash = hashString(id + "open");
  return hash % 4 !== 0;
};