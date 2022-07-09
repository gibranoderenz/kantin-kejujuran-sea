import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import { formatRupiah } from "../utils/FormatRupiah";
import axios from "axios";
import Cookies from "js-cookie";
import emptyAnimation from "../assets/106964-shake-a-empty-box.json";
import Lottie from "lottie-react";

const Kantin = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("-created");
  const [ascendingSort, setAscendingSort] = useState(false);
  const { user } = useContext(LoginContext);

  const filterButtonStyle =
    "mr-3 border-blue-300 border-2 hover:bg-slate-200 active:bg-blue-400 rounded-xl px-3 py-2 ";

  const ascendingButtonStyle =
    "h-12 w-12 stroke-blue-400 hover:fill-slate-200 ";

  useEffect(() => {
    getProducts(sortOption);
  }, []);

  const getProducts = async (sort) => {
    const formData = new FormData();
    formData.append("order_by", sort);
    await axios({
      method: "put",
      url: `/api/kantin/`,
      data: formData,
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 200) {
          setSortOption(sort);
          setProducts(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // if there is at least 1 product registered
  if (products.length !== 0)
    return (
      <div className="mx-16 my-10 font-inter">
        {/* Header */}
        <p className="text-center text-3xl font-bold my-8">
          Jualan kami hari ini.{" "}
          <Link
            className="text-blue-700 hover:bg-blue-200 hover:p-2 hover:rounded-lg hover:underline duration-75"
            to={"tambah"}
          >
            Mau ikut nambahin{user !== null ? `, ${user?.username}?` : "?"}
          </Link>
        </p>
        {/* Products */}
        {/* Filter options */}
        <div className="flex w-fit px-4 mb-6 justify-center items-center">
          <p className="mr-5">Sort berdasarkan:</p>
          {/* created */}
          <button
            className={
              filterButtonStyle +
              (sortOption.endsWith("created") &&
                "bg-blue-300 hover:bg-blue-600 border-black font-semibold")
            }
            onClick={() => {
              if (!sortOption.endsWith("created")) {
                let sort = ascendingSort ? "created" : "-created";
                getProducts(sort);
              }
            }}
          >
            Waktu Dipost
          </button>
          {/* name */}
          <button
            className={
              filterButtonStyle +
              (sortOption.endsWith("name") &&
                "bg-blue-300 hover:bg-blue-600 border-black font-semibold")
            }
            onClick={() => {
              if (!sortOption.endsWith("name")) {
                let sort = ascendingSort ? "name" : "-name";
                getProducts(sort);
              }
            }}
          >
            Nama Produk
          </button>
          {/* descending */}
          <button
            onClick={() => {
              if (ascendingSort) {
                setAscendingSort(false);
                let sort = sortOption.endsWith("created")
                  ? "-created"
                  : "-name";
                getProducts(sort);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                ascendingButtonStyle +
                (!ascendingSort &&
                  "fill-blue-300 stroke-black hover:fill-blue-600")
              }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </button>
          {/* ascending */}
          <button
            onClick={() => {
              if (!ascendingSort) {
                setAscendingSort(true);
                let sort = sortOption.endsWith("created") ? "created" : "name";
                getProducts(sort);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                ascendingButtonStyle +
                (ascendingSort &&
                  "fill-blue-300 stroke-black hover:fill-blue-600")
              }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
          </button>
        </div>

        {/* Product cards */}
        <div className="flex flex-wrap">
          {products.map((product, index) => (
            <div
              key={index}
              className="container my-4 mx-auto rounded-lg bg-yellow-200 w-fit shadow-md"
            >
              <Link to={`${product.id}`}>
                <img
                  src={product.photo}
                  className="rounded-lg object-cover w-96 h-48"
                  alt={product.name}
                />
                <div className="flex items-center justify-between mx-4">
                  <div className="rounded-lg p-3">
                    <p className="font-bold text-md">
                      {product.name.length > 20
                        ? product.name.slice(0, 17) + "..."
                        : product.name}
                    </p>
                    <p className="mb-5">{formatRupiah(product.price)}</p>
                    <p>
                      Dipost:{" "}
                      {new Date(product.created).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p>Penjual: {product.seller}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  // if there isn't any product available
  else
    return (
      <div className="font-inter text-center text-2xl font-semibold mt-10">
        <Lottie animationData={emptyAnimation} className="h-96 mb-5" />
        <p>
          Belum ada barang yang terdaftar di Kantin.{" "}
          <Link
            to={`tambah/`}
            className="text-blue-600 hover:bg-blue-600 hover:p-2 hover:rounded-xl hover:text-white duration-75"
          >
            Mau jadi penjual pertama?
          </Link>
        </p>
      </div>
    );
};

export default Kantin;
