import { StarProps } from "@/@types";

const Star = ({
  onRate,
  full,
  half,
  onHoverIn,
  onHoverOut,
  size,
  color,
}: StarProps) => {
  const renderStar = () => {
    if (full) {
      return (
        <svg
          height={size}
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={color}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else if (half) {
      return (
        <svg
          height={size}
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={color}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path
            d="M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38 .38-3.32 2.88 1 4.28L12 15.4z"
            fill="#fff"
          />
        </svg>
      );
    } else {
      return (
        <svg
          height={size}
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill="#fff"
          />
        </svg>
      );
    }
  };

  return (
    <span
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onClick={onRate}
      role="button"
      className={`cursor-pointer`}
    >
      {renderStar()}
    </span>
  );
};

export default Star;
