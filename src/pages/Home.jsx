import { useEffect, useMemo, useState } from "react";
import { getRestaurants, searchRestaurant } from "../service/api";
import RestaurantCard from "../components/RestaurantCard";
import FilterBar from "../components/FilterBar";
import {
  getRestaurantCategory,
  getRestaurantPriceRange,
  getRestaurantOpenStatus,
} from "../utils/restaurantMeta";

const DEFAULT_FILTERS = {
  openNow: false,
  price: "",
  category: "",
};

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const trimmedKeyword = searchKeyword.trim();

    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      setError(null);

      const request = trimmedKeyword
        ? searchRestaurant(trimmedKeyword)
        : getRestaurants();

      request
        .then((data) => setRestaurants(data))
        .catch(() => setError("Failed to fetch restaurants."))
        .finally(() => setIsLoading(false));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const isOpen = getRestaurantOpenStatus(restaurant.id);
      const price = getRestaurantPriceRange(restaurant.id);
      const category = getRestaurantCategory(restaurant.id);

      if (filters.openNow && !isOpen) return false;
      if (filters.price && filters.price !== price) return false;
      if (filters.category && filters.category !== category) return false;

      return true;
    });
  }, [restaurants, filters]);

  const handleClearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchKeyword("");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 max-[1024px]:px-5 max-[1024px]:py-7 max-[480px]:px-4 max-[480px]:py-5">
      <h1 className="text-3xl font-bold mb-5 max-[768px]:text-2xl">
        Restaurants
      </h1>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        onClearAll={handleClearAll}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
      />

      {isLoading && (
        <p className="text-center py-16 text-sm text-gray-400">Loading...</p>
      )}

      {!isLoading && error && (
        <p className="text-center py-16 text-sm text-gray-400">{error}</p>
      )}

      {!isLoading && !error && filteredRestaurants.length === 0 && (
        <p className="text-center py-16 text-sm text-gray-400">
          No restaurants found.
        </p>
      )}

      {!isLoading && !error && filteredRestaurants.length > 0 && (
        <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-2 max-[1024px]:gap-4 max-[480px]:grid-cols-1 max-[480px]:gap-3.5">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;