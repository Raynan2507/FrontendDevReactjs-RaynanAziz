import { Link } from "react-router-dom";
import { getImageUrl } from "../service/api";
import {
  getRestaurantCategory,
  getRestaurantPriceRange,
  getRestaurantOpenStatus,
} from "../utils/restaurantMeta";

const renderStars = (rating) => {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
};

function RestaurantCard({ restaurant }) {
  const { id, name, pictureId, rating } = restaurant;
  const category = getRestaurantCategory(id);
  const priceRange = getRestaurantPriceRange(id);
  const isOpen = getRestaurantOpenStatus(id);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <img
        className="w-full aspect-[4/3] object-cover bg-gray-200 max-[480px]:aspect-video"
        src={getImageUrl(pictureId)}
        alt={name}
      />
      <div className="px-3.5 pt-3 pb-1 grow">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1">
          {name}
        </h3>
        <p className="text-amber tracking-wider text-sm mb-1.5">
          {renderStars(rating)}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
          <span>{category}</span>
          <span className="text-gray-300">•</span>
          <span>{priceRange}</span>
          <span
            className={`font-semibold ${
              isOpen ? "text-success" : "text-danger"
            }`}
          >
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </p>
      </div>
      <Link
        to={`/restaurant/${id}`}
        className="block mx-3.5 mt-3 mb-3.5 py-2.5 text-center bg-navy text-white text-xs font-semibold tracking-wide rounded-md transition-colors hover:bg-navy-light"
      >
        LEARN MORE
      </Link>
    </div>
  );
}

export default RestaurantCard;