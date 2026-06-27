import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantDetail, getImageUrl } from "../service/api";
import ReviewCard from "../components/ReviewCard";

const renderStars = (rating) => {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
};

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState("foods");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getRestaurantDetail(id)
      .then((data) => setRestaurant(data))
      .catch(() => setError("Failed to fetch restaurant."))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <p className="text-center py-20 text-base text-gray-500">Loading...</p>
    );
  }

  if (error || !restaurant) {
    return (
      <p className="text-center py-20 text-base text-gray-500">
        {error || "Restaurant not found."}
      </p>
    );
  }

  const { name, rating, description, pictureId, categories, menus, customerReviews } =
    restaurant;
  const activeMenuItems = menus?.[activeTab] ?? [];

  return (
    <div className="max-w-[800px] mx-auto px-6 pt-8 pb-16 max-[768px]:px-5 max-[768px]:pt-6 max-[768px]:pb-12 max-[480px]:px-4 max-[480px]:pt-5 max-[480px]:pb-10">
      <img
        className="w-full max-h-[360px] object-cover rounded-lg bg-gray-200 max-[768px]:max-h-[240px]"
        src={getImageUrl(pictureId)}
        alt={name}
      />

      <div className="mt-5">
        <h1 className="text-3xl font-bold text-gray-900 mb-1.5 max-[768px]:text-2xl">
          {name}
        </h1>
        <p className="text-amber tracking-widest text-lg mb-2.5">
          {renderStars(rating)}
        </p>
        <div className="flex gap-2 flex-wrap">
          {categories?.map((category) => (
            <span
              key={category.name}
              className="px-3 py-1 rounded-full bg-blue-50 text-navy text-xs font-semibold"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <section className="mt-9">
        <h2 className="text-xl font-bold text-gray-900 mb-3.5">Menu</h2>
        <div className="flex gap-2 mb-4">
          <button
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
              activeTab === "foods"
                ? "bg-navy border-navy text-white"
                : "bg-white border-gray-300 text-gray-500"
            }`}
            onClick={() => setActiveTab("foods")}
          >
            Foods
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
              activeTab === "drinks"
                ? "bg-navy border-navy text-white"
                : "bg-white border-gray-300 text-gray-500"
            }`}
            onClick={() => setActiveTab("drinks")}
          >
            Drinks
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-2.5 list-none p-0 m-0 max-[480px]:grid-cols-1">
          {activeMenuItems.length === 0 && (
            <li className="text-sm text-gray-400">No items available.</li>
          )}
          {activeMenuItems.map((item) => (
            <li
              key={item.name}
              className="px-3.5 py-2.5 bg-gray-100 rounded-md text-sm text-gray-800"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-9">
        <h2 className="text-xl font-bold text-gray-900 mb-3.5">Reviews</h2>
        {customerReviews?.length === 0 ? (
          <p className="text-sm text-gray-400">No reviews yet.</p>
        ) : (
          customerReviews?.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        )}
      </section>
    </div>
  );
}

export default RestaurantDetail;