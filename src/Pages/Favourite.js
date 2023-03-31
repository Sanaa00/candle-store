import React from "react";
import { useSelector } from "react-redux";
import Container from "../Component/Container";
import CandleCard from "../Component/CandleCard";
import emptyBag from "../images/EmptyBag.png";
function Favourite() {
  const fav = useSelector((state) => state.favourite.fav);
  console.log(fav, "favourite page");
  return (
    <Container>
      <div className="min-h-screen">
        <p className="text-2xl font-semibold text-greeen my-5">Favourite</p>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-between items-center"> */}
        {fav.length === 0 ? (
          <div className="flex justify-center items-center">
            <img
              alt="empty bag"
              src={emptyBag}
              className="w-2/4 h-fit object-cover"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-between items-center ">
            {fav.map((candle) => {
              return <CandleCard candle={candle} key={candle.id} />;
            })}
          </div>
        )}{" "}
      </div>

      {/* <div className="container mx-auto flex justify-center my-10"> */}
      {/* <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          className="flex gap-5"
          previousLabel="< "
          nextLabel=" >"
          pageClassName="text-gray-800 mx-2 "
          activeClassName="text-gray-800 border-b-2 border-gray-800 "
          renderOnZeroPageCount={null}
        /> */}
      {/* </div> */}
    </Container>
  );
}

export default Favourite;
