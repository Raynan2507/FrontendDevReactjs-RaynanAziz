import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurant-api.dicoding.dev",
});

const IMAGE_BASE_URL =
  "https://restaurant-api.dicoding.dev/images/medium/";

export const getImageUrl = (pictureId) =>
  `${IMAGE_BASE_URL}${pictureId}`;

export const getRestaurants = async () => {
  try {
    const response = await api.get("/list");
    return response.data.restaurants;
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    throw error;
  }
};

export const getRestaurantDetail = async (id) => {
  try {
    const response = await api.get(`/detail/${id}`);
    return response.data.restaurant;
  } catch (error) {
    console.error("Failed to fetch restaurant detail:", error);
    throw error;
  }
};

export const searchRestaurant = async (keyword) => {
  try {
    const response = await api.get(`/search?q=${keyword}`);
    return response.data.restaurants;
  } catch (error) {
    console.error("Failed to search restaurant:", error);
    throw error;
  }
};