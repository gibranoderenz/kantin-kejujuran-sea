import React from "react";
import animation404 from "../assets/94992-error-404.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="font-inter text-center mt-12">
      {/* Header */}
      <Lottie animationData={animation404} className="h-96" />
      <p className="font-semibold text-2xl mt-5 my-8">
        Maaf, halaman yang dituju tidak ditemukan.
      </p>
      <Link to={"/kantin/"} className="p-3 bg-blue-600 text-white rounded-xl">
        Kembali ke Kantin
      </Link>
    </div>
  );
};

export default Page404;
