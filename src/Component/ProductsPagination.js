import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import CandleCard from "./CandleCard";
import { BarLoader } from "react-spinners";
import {
  // useGetProductsQuery,
  useGetProductsByCategoryQuery,
  // useGetProductsBySearchQuery,
  useGetProductsQuery,
} from "../features/api/productApi";

function ProductsPagination({ products, isError, isLoading, error }) {
  // const { data, isLoading, error, isError } = useGetProductsQuery();
  // const {
  //   data: products,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetProductsQuery("simple");
  // console.log("products", products, isLoading, isError, error);
  // const { data: category } = useGetProductsByCategoryQuery();
  // console.log("category", category);
  const itemPerPageWindowSize = () => {
    if (window.innerWidth < 640) {
      return 6;
    } else if (window.innerWidth < 768) {
      return 9;
    } else {
      return 12;
    }
  };
  console.log(products, "productsssssssssss");

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = itemPerPageWindowSize();
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setCurrentItems(products?.data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products?.data?.length / itemsPerPage));
  }, [endOffset, itemOffset, itemsPerPage, products]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products?.data?.length;
    setItemOffset(newOffset);
  };
  {
    console.log(currentItems);
  }
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader color="#316C57" height={5} width={200} />
      </div>
    );
  if (isError) return <p>{error}</p>;
  return (
    <div className="min-h-screen pt-5">
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-between items-center ">
        {currentItems?.map((candle) => {
          return <CandleCard candle={candle} key={candle._id} />;
        })}
      </div>
      <div className="container mx-auto flex justify-center py-10">
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          className="flex gap-5 items-center"
          previousLabel={
            <BsArrowLeftCircle className="w-6 h-6 text-gray-800" />
          }
          nextLabel={<BsArrowRightCircle className="w-6 h-6 text-gray-800" />}
          pageClassName="text-gray-800 mx-2"
          activeClassName="text-gray-800 border-b-2 border-gray-800 "
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default ProductsPagination;
