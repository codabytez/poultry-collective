"use client";
import { StarRatingProps } from "@/@types";
import { NextPage } from "next";
import Star from "./Star";
import { useState } from "react";

const StarRating = ({
  maxRating = 5,
  defaultRating = 0,
  color = "#F59E0B",
  size = 24,
  onSetRating = () => {},
}: StarRatingProps) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleSetRating = (index: number) => {
    setRating(index);
    onSetRating(index);
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-1">
        {Array.from(Array(maxRating).keys()).map((index) => (
          <Star
            key={index}
            full={index < (tempRating || rating)}
            onRate={() => handleSetRating(index + 1)}
            onHoverIn={() => setTempRating(index + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p className="text-H4-03 font-normal text-cod-gray-cg-200">
        ({rating} / {maxRating} rating)
      </p>
    </div>
  );
};

export default StarRating;
