import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddress } from "../../../app/api/address";
import { addCartItem } from "../../../app/features/cart/actions";
import {
  fetchCategory,
  fetchProduct,
  fetchTag
} from "../../../app/features/Product/actions";
import CardProduct from "../../../components/CardProduct";
import { useAuth, useCart, useProduct } from "../../../hooks";

const Products = () => {
  const Product = useProduct();
  const dispatch = useDispatch();
  const cart = useCart();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const Auth = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchCategory());
    dispatch(fetchTag());
  }, [dispatch]);

  useEffect(() => {
    const totalPage = [];
    Array.from({ length: Math.ceil(Product.count / 8) }).map((_, index) =>
      totalPage.push(index + 1)
    );
    setPages(totalPage);
  }, [Product.count]);

  const productPagination = async (currentPage) => {
    const skipPage = (currentPage - 1) * Product.limit;
    const query = `skip=${skipPage}`;
    dispatch(fetchProduct(query));
    setCurrentPage(currentPage);
  };

  const addToCart = (product) => {
    const proccesAdd = async () => {
      const response = await getAddress("/delivery-addresses");
      if (!response.length) return navigate("/dashboard/address");
      const productAlreadyExists = cart.item.filter(
        (item) => item.product === product._id
      );
      if (!productAlreadyExists.length) {
        const { name, image_url, price, _id: productId } = product;
        const item = {
          name,
          price,
          image_url,
          qty: 1,
          user: Auth._id,
          product: productId,
        };
        dispatch(addCartItem(item));
      }
    };
    Auth.authentication ? proccesAdd() : navigate("/login");
  };

  return (
    <>
      <div className="mx-auto w-11/12 max-w-[1100px]">
        {Product.products.length ? (
          <div className="mx-auto grid w-8/12 grid-cols-1 md:w-full md:grid-cols-2 md:gap-x-8 md:gap-y-5 lg:grid-cols-4">
            {Product.products.map((product) => (
              <CardProduct
                key={product._id}
                image={product.image_url}
                title={product.name}
                category={product.category.name}
                tags={product.tags}
                price={product.price}
                addToCartAction={() => addToCart(product)}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 grid w-8/12 grid-cols-1 md:w-full md:grid-cols-2 md:gap-x-8 md:gap-y-5 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="mx-auto h-[500px] w-full animate-pulse rounded-lg bg-gray-200"
              ></div>
            ))}
          </div>
        )}
        <div className="mt-10 mb-10">
          <button
            disabled={currentPage === 1}
            onClick={() => productPagination(currentPage - 1)}
            className="rounded-lg border px-5 py-2 disabled:text-gray-400"
          >
            Previos
          </button>
          <div className="mx-3 inline-block">
            {pages.map((value, i) => (
              <button
                key={i}
                onClick={() => {
                  productPagination(value);
                }}
                className={`${
                  value === currentPage && "text-gray-400"
                } rounded-lg border px-5 py-2`}
              >
                {value}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === pages.length}
            onClick={() => productPagination(currentPage + 1)}
            className="rounded-lg border px-5 py-2 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
