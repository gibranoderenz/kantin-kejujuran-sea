import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { formatRupiah } from "../utils/FormatRupiah";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    await axios({
      method: "get",
      url: `/api/kantin/${id}`,
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data);
        } else if (res.status === 404) {
        }
      })
      .catch((err) => navigate("/tidak-ada", { replace: true }));
  };

  const handleBuy = async () => {
    await axios({
      method: "delete",
      url: `/api/kantin/${id}`,
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 204) {
          navigate("/kotak-uang", { replace: true });
          alert("Berhasil membeli barang! Jangan lupa setor ke Kotak Uang ya!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-1/2 mx-auto my-10 p-10 border-2 rounded-xl shadow-md font-inter">
      {/* header */}
      <div className="mb-5">
        <p className="text-3xl font-bold mb-3 text-center">{product?.name}</p>
      </div>
      <div>
        <div className="flex justify-center mb-5">
          <img
            className="w-1/2 rounded-xl"
            src={product?.photo}
            alt={product?.name}
          />
        </div>

        <div className="flex justify-between">
          {/* keterangan produk */}
          <div>
            {/* deskripsi */}
            <div className="mb-3">
              <p className="font-bold mb-2">Deskripsi</p>
              <p className="bg-gray-200 p-5 rounded-lg w-fit">
                {product?.description}
              </p>
            </div>
            {/* harga */}
            <div className="mb-3">
              <p className="font-bold mb-2">Harga</p>
              <p className="bg-blue-200 p-5 rounded-lg w-fit">
                {formatRupiah(product?.price)}
              </p>
            </div>
            {/* timestamp */}
            <div>
              {/* reference: https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/*/}
              {/* reference: https://www.w3schools.com/jsref/jsref_tolocalestring.asp */}
              <p className="font-bold mb-2">Dipost</p>
              <p className="bg-orange-200 p-5 rounded-lg w-fit">
                {new Date(product?.created).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                <br />
                {/* reference: https://stackoverflow.com/questions/29042911/how-do-i-split-the-date-and-time-into-two-elements */}
                {new Date(product?.created).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          {/* button */}
          <button
            className="rounded-full bg-green-300 px-7 py-3 place-self-end font-semibold"
            onClick={() => handleBuy()}
          >
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
