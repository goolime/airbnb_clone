export function StarRating({ rating }) {

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (

        <div className="flex items-center gap-1">

            {/* Full stars */}
            {[...Array(fullStars)].map((_, index) => (
                <svg key={`full-${index}`} className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <svg key={`empty-${index}`} className="w-4 h-4 fill-none stroke-current text-black" viewBox="0 0 24 24" strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    )
}