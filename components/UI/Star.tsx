import { StarProps } from "@/@types";

const Star = ({
  onRate,
  full,
  onHoverIn,
  onHoverOut,
  size,
  color,
}: StarProps) => {
  return (
    <span
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onClick={onRate}
      role="button"
      className={`cursor-pointer h-${size} w-${size}`}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="30"
          viewBox="0 0 32 30"
          fill={color}
        >
          <path d="M16 0.75L21.0032 9.86365L31.2169 11.8057L24.0954 19.3804L25.4046 29.6943L16 25.262L6.59544 29.6943L7.90461 19.3804L0.783095 11.8057L10.9968 9.86365L16 0.75Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="30"
          viewBox="0 0 32 30"
          fill="none"
        >
          <path
            d="M16 0.5L21.0032 9.61365L31.2169 11.5557L24.0954 19.1304L25.4046 29.4443L16 25.012L6.59544 29.4443L7.90461 19.1304L0.783095 11.5557L10.9968 9.61365L16 0.5Z"
            fill="#CED4DA"
          />
        </svg>
      )}
    </span>
  );
};

export default Star;
