import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { paginationProduct } from "../app/features/Product/actions";
import { useProduct } from "../hooks";

export default function ProductPagination() {
  const Product = useProduct();
  const dispatch = useDispatch();

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => {
          dispatch(paginationProduct(e.selected));
        }}
        pageRangeDisplayed={3}
        pageCount={Math.ceil(Product.totalItems / Product.perPage)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex"
        activeClassName="bg-indigo-600 text-white"
        previousClassName="flex justify-center items-center border border-r-0 border-indigo-600 px-4 rounded-l-lg hover:text-white hover:bg-indigo-600"
        pageLinkClassName="h-12 w-12 flex hover:text-white hover:bg-indigo-600 justify-center items-center border border-r-0 border-indigo-600"
        nextClassName="flex justify-center items-center hover:text-white hover:bg-indigo-600 border border-indigo-600 px-4 rounded-r-lg"
      />
    </>
  );
}
