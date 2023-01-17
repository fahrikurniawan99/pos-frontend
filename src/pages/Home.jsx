import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategory } from "../app/api/category";
import { getTag } from "../app/api/tag";
import {
  getAllProduct,
  getProductByCategory,
  getProductByTag,
} from "../app/features/Product/actions";
import HomeNavigation from "../components/HomeNavigation";
import ProductDisplay from "../components/ProductDisplay";
import ProductFilter from "../components/ProductFilter";
import ProductPagination from "../components/ProductPagination";
import { useProduct } from "../hooks";

const Home = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const Product = useProduct();
  const [post, setPost] = useState([]);

  const fetchTags = useCallback((url) => {
    getTag(url)
      .then((res) => setTags(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(getAllProduct());
    getCategory("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
    fetchTags("/tags");
    axios("https://jsonplaceholder.typicode.com/posts").then((res) =>
      setPost(res.data)
    );
  }, [fetchTags, dispatch]);

  const categorySelectHandler = (value) => {
    let url = value === "all" ? "/tags" : `/tags?category=${value}`;
    setCurrentCategory(value);
    fetchTags(url);
    dispatch(getProductByCategory(value));
  };

  const tagSelectHandler = (value) => {
    dispatch(getProductByTag(value, currentCategory));
  };

  return (
    <div className="bg-gray-5 min-h-screen space-y-5 lg:space-y-10">
      <HomeNavigation />
      <ProductFilter
        categories={categories}
        tags={tags}
        categoriesSelected={(category) => categorySelectHandler(category)}
        currentTag={(value) => tagSelectHandler(value)}
      />

      {!Product.data.length ? (
        <div className="container mx-auto grid w-8/12 gap-10 md:w-full md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((e, i) => (
            <div
              key={i}
              className="h-[400px] w-full animate-pulse rounded-xl bg-gray-300"
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div className="container mx-auto">
            <ProductDisplay />
          </div>
        </>
      )}
      <div className="container mx-auto pb-10">
        <ProductPagination data={post} />
      </div>
    </div>
  );
};

export default Home;
