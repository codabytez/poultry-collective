/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { StarRatingProps } from "@/@types";
import { NextPage } from "next";
import Star from "./Star";
import { useEffect, useState } from "react";
import useAddRating from "@/hooks/useAddRating";
import { useUser } from "@/context/user";
import useGetSellerRatings from "@/hooks/useGetSellerRatings";
import { notify } from "./Toast";
import useGetRatings from "@/hooks/useGetRatings";

const StarRating = ({
  maxRating = 5,
  defaultRating = 0,
  color = "#F59E0B",
  size = 24,
  onSetRating = () => {},
  isCurrentUser,
  seller,
}: StarRatingProps) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const contextUser = useUser();
  const [hasRated, setHasRated] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [totalRating, setTotalRating] = useState(0);
  const [totalUsersRated, setTotalUsersRated] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      if (contextUser?.user?.id && seller?.$id) {
        try {
          const response = await useGetRatings(seller.$id, contextUser.user.id);
          setHasRated(response.documents.length > 0);
          if (response.documents.length > 0) {
            setUserRating(response.documents[0].rating);
          }

          // Fetch all ratings and calculate the total rating
          const allRatingsResponse = await useGetSellerRatings(seller.$id);
          const total = allRatingsResponse.documents.reduce(
            (sum, rating) => sum + rating.rating,
            0
          );
          const average = total / allRatingsResponse.documents.length;
          setTotalRating(average);
          setTotalUsersRated(allRatingsResponse.documents.length);
        } catch (error) {
          throw error;
        }
      }
    };

    fetchRating();
  }, [contextUser?.user, seller]);

  const handleSetRating = async (
    index: number,
    review: string = "No review provided"
  ) => {
    if (hasRated) {
      notify({
        message: "You have already rated this seller",
        type: "error",
      });
      return;
    }

    setRating(index);
    onSetRating(index);

    if (!contextUser?.user?.id) return;
    try {
      await useAddRating(
        index.toString(),
        review,
        contextUser?.user?.id,
        seller?.$id
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {Array.from(Array(maxRating).keys()).map((index) => {
          const ratingToUse = isCurrentUser ? totalRating : userRating;
          if (ratingToUse === null) {
            return null;
          }
          const integerPart = Math.floor(ratingToUse);
          const fractionalPart = ratingToUse - integerPart;

          return (
            <Star
              key={index}
              full={index < integerPart}
              half={index === integerPart && fractionalPart >= 0.5}
              onRate={
                isCurrentUser ? undefined : () => handleSetRating(index + 1)
              }
              onHoverIn={
                isCurrentUser ? () => {} : () => setTempRating(index + 1)
              }
              onHoverOut={isCurrentUser ? () => {} : () => setTempRating(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p className="text-H4-03 font-normal text-cod-gray-cg-200">
        {isCurrentUser
          ? `${totalUsersRated > 0 ? totalUsersRated : null} ${
              totalUsersRated > 1 ? "ratings" : "rating"
            }`
          : hasRated
          ? `${userRating} / ${maxRating} rating`
          : `${rating} / ${maxRating} rating`}
      </p>
    </div>
  );
};

export default StarRating;
