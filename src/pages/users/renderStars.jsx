import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons

const renderStars = (averageRating) => {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={`full-${index}`} className="text-button-color" />
            ))}
            {hasHalfStar && <FaStarHalfAlt className="text-button-color" />}
            {[...Array(emptyStars)].map((_, index) => (
                <FaStar key={`empty-${index}`} className="text-gray-300" />
            ))}
        </div>
    );
};
export { renderStars };
