import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddress } from "../app/api/delivery-address";
import { ADD_CART_ITEM } from "../app/features/Cart/constants";
import { useAuth, useProduct } from "../hooks";
import ProductCard from "./ProductCard";

const ProductDisplay = () => {
  const Product = useProduct();
  const Auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkDeliveryAddress = () => {
    getAddress("/delivery-addresses", Auth.token)
      .then((res) => {
        if (!res.length) return navigate("/dashboard/delivery-address");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCartHandler = (product) => {
    if (!Auth.token) return navigate("/login");
    checkDeliveryAddress();
    const item = {
      name: product.name,
      qty: 1,
      price: product.price,
      image_url: product.image_url,
      user: Auth.user._id,
      product: product._id,
    };
    dispatch({ type: ADD_CART_ITEM, payload: item });
  };

  return (
    <div className="mx-auto grid w-8/12 grid-cols-1 gap-y-5 md:w-full md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
      {Product.data.map((product) => (
        <ProductCard
          key={product._id}
          image={product.image_url}
          title={product.name}
          category={product.category.name}
          tags={product.tags}
          price={product.price}
          addToCartAction={() => addCartHandler(product)}
        />
      ))}
    </div>
  );
};

export default ProductDisplay;
