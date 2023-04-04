import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

import {
  useDeleteFromFavMutation,
  useAddToFavMutation,
  useToggleFavMutation,
} from "../features/api/favourite";

function CandleCard({ candle }) {
  const [addToFav] = useAddToFavMutation();
  const [deleteFromFav] = useDeleteFromFavMutation();
  const [toggleFav] = useToggleFavMutation();

  const addToFavHandler = (item) => {
    toggleFav({ ...item, favourite: !item.favourite });
    addToFav(item);
  };

  const deleteFromFavHandler = (item) => {
    toggleFav({ ...item, favourite: !item.favourite });
    deleteFromFav(item);
  };

  return (
    <div
      key={candle.id}
      className="hover:shadow-lg hover:duration-500 duration-500 rounded m-2 border"
    >
      <div className="relative">
        <img
          alt="candles"
          src={candle.url}
          className="w-full h-52 object-cover relative  rounded-t"
        />
        <div className="absolute top-2 right-2 bg-gray-50 w-7 h-7 rounded-full flex justify-center items-center">
          {candle.favourite === false ? (
            <button onClick={() => addToFavHandler(candle)}>
              {" "}
              <AiOutlineHeart className="w-6 h-6 text-red-500" />
            </button>
          ) : (
            <button onClick={() => deleteFromFavHandler(candle)}>
              {" "}
              <AiFillHeart className="w-6 h-6 text-red-500" />
            </button>
          )}
        </div>{" "}
      </div>
      <div className="p-2 text-gray-800">
        <Link to={`/products/${candle.id}`} className="w-full h-fit">
          <p className="font-semibold text-gray-800 text-lg">{candle.name}</p>
          {/* <p className="font-semibold text-gray-800">{candle.name}</p> */}
          <StarRatings
            rating={candle.rating}
            changeRating={null}
            numberOfStars={5}
            starRatedColor={"#FDCC0D"}
            name="rating"
            className="grid grid-cols-5 w-6 h-6"
            starSpacing="1"
            starDimension="18"
          />
          <p className=" text-greeen mt-1  font-medium text-lg">
            {candle.price}$
          </p>
        </Link>
      </div>
    </div>
  );
}

export default CandleCard;
