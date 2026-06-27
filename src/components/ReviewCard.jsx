const renderStars = (rating) => {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
};

function ReviewCard({ review }) {
  const { name, review: text, date } = review;
  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <div className="flex gap-3.5 py-4 border-b border-gray-100 last:border-b-0">
      <div className="shrink-0 w-[42px] h-[42px] rounded-full bg-navy text-white flex items-center justify-center font-semibold text-base">
        {avatarLetter}
      </div>
      <div className="grow">
        <div className="flex justify-between items-baseline gap-2 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-0.5">
          <span className="font-semibold text-sm text-gray-900">{name}</span>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {date}
          </span>
        </div>
        <p className="text-amber tracking-wider text-[13px] my-1">
          {renderStars(5)}
        </p>
        <p className="text-[13px] text-gray-600 leading-relaxed mt-1">
          {text}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;