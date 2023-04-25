import React from "react";

import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { ClipLoader } from "react-spinners";

import {
  useGetProductByIdQuery,
  useProductQuantityChangeMutation,
  useGetProductsByCategoryQuery,
} from "../features/api/productApi";
import { useAddToCartMutation, useGetCartQuery } from "../features/api/cart";

import Recomendation from "../Component/Recomendation";
import Review from "../Component/Review";
import Button from "../Component/Button";
import Container from "../Component/Container";
import Counter from "../Component/Counter";
import Colors from "../Component/Colors";
import ProductImageSlider from "../Component/ProductImageSlider";

function Product() {
  const { _id } = useParams();
  console.log("product id", _id);
  const [addToCart, { isLoadingg }] = useAddToCartMutation();
  const [productQuantityChange] = useProductQuantityChangeMutation();
  const { data: cart } = useGetCartQuery();
  console.log("cart in product page", cart);
  const {
    data: singleProduct,
    isLoading,
    error,
    isError,
  } = useGetProductByIdQuery(_id);
  const { data: category } = useGetProductsByCategoryQuery(10);
  console.log("category", category);
  // const { data } = console.log("singleproduct", singleProduct);
  // console.log("function", addToCart);

  const addToCartHandle = (singleProduct) => {
    addToCart(singleProduct);
  };
  const incrementQuantityHandler = (item) => {
    let newQuantity = item.quantity + 1;

    productQuantityChange({ ...item, quantity: newQuantity });

    return newQuantity;
  };

  const decrementQuantityHandler = (item) => {
    let newQuantity = item.quantity - 1;
    if (newQuantity <= 1) {
      newQuantity = 1;
    }
    productQuantityChange({ ...item, quantity: newQuantity });
    return newQuantity;
  };
  const widthOfButton = () => {
    if (window.innerWidth < 640) {
      return "full";
    } else if (window.innerWidth < 768) {
      return "full";
    } else if (window.innerWidth < 1024) {
      return "full";
    } else {
      return "96";
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader color="#316C57" height={5} width={200} />
      </div>
    );
  if (isError) return <p>{error.status}</p>;
  return (
    <div className="bg-gray-50 pt-10">
      <Container>
        {singleProduct.data ? (
          <div
            key={singleProduct._id}
            className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 justify-center  lg:justify-between pt-5 mt-10"
          >
            <ProductImageSlider images={singleProduct.data.images} />
            <div className="text-gray-800 flex flex-col justify-between p-2 lg:p-0  mt-20 sm:mt-28 md:mt-52 lg:mt-0 2xl:pl-2">
              <div className=" ">
                <p className="font-semibold text-2xl">
                  {singleProduct.data.productName}
                </p>
                <p className="bg-gray-100 py-1 px-5 text-greeen rounded-sm w-fit mt-5 font-semibold">
                  {singleProduct?.data.category}
                  {console.log("category", singleProduct.data.category)}
                </p>
              </div>
              <p className="mt-2 lg:mt-0">{singleProduct.data.description}</p>
              <div className="mt-2 lg:mt-0">
                <Colors colors={singleProduct.data.color} />
              </div>
              <div className="mt-2 lg:mt-0 flex justify-between items-center sm:w-96">
                <p className=" font-semibold text-greeen text-lg">
                  {singleProduct.data.price}.00 $
                </p>
                <Counter
                  data={singleProduct.data}
                  increment={() => incrementQuantityHandler(singleProduct.data)}
                  decrement={() => decrementQuantityHandler(singleProduct.data)}
                />
              </div>

              <div className="mt-2 lg:mt-0 flex justify-between items-center">
                {" "}
                <Button
                  onClick={() => addToCartHandle(singleProduct.data)}
                  text={
                    !isLoadingg ? (
                      "Add to cart"
                    ) : (
                      <div className="flex justify-center items-center">
                        <ClipLoader
                          color="#F8FAFC"
                          size={20}
                          speedMultiplier={0.5}
                        />
                      </div>
                    )
                  }
                  width={widthOfButton()}
                />
              </div>
            </div>
          </div>
        ) : null}

        <Recomendation />
        <Review />
      </Container>
    </div>
  );
}

export default Product;
