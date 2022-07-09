import React, { useContext } from "react";
import Lottie from "lottie-react";
import friends from "../assets/38964-group-of-people-communicating.json";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { HiInbox } from "react-icons/hi";
import { HiLightBulb } from "react-icons/hi";
import { LoginContext } from "../contexts/LoginContext";

const Home = () => {
  const { user } = useContext(LoginContext);
  return (
    <div className="font-inter">
      {/* Header */}
      <p className="text-center text-4xl font-extrabold mt-10">
        Selamat datang di Kantin Kejujuran
        {user !== null ? `, ${user?.username}!` : "!"}
      </p>
      {/* About */}
      <div className="mt-10 bg-yellow-200 flex justify-evenly p-8 items-center">
        <p className="text-3xl w-96 p-3">
          Kejujuran adalah suatu hal yang menyatukan kita dan memberi rasa{" "}
          <div className="hover:bg-blue-600 hover:text-white hover:p-3 hover:rounded-2xl duration-100">
            percaya satu dengan yang lain.
          </div>
          <br />
          Kantin kami juga percaya akan hal itu.
        </p>
        <Lottie animationData={friends} className="h-96" />
      </div>
      {/* Features */}
      <div className="bg-orange-200 px-8 py-20 mt-10">
        <p className="text-2xl font-thin bg-orange-500 p-3 rounded-lg w-fit mx-auto text-white mb-20">
          Di Kantin Kejujuran, kamu dapat:
        </p>
        <div className="flex text-center">
          <div className="w-1/5 px-4 py-8 bg-red-500 rounded-xl mx-auto">
            <HiShoppingCart size={40} color="white" className="mx-auto mb-3" />
            <p className="text-white">Membeli dan menjual barang di Kantin</p>
          </div>
          <div className="w-1/5 px-4 py-8 bg-green-500 rounded-xl mx-auto">
            <HiInbox size={40} color="white" className="mx-auto mb-3" />
            <p className="text-white">
              Menyetor dan mengambil uang di Kotak Uang
            </p>
          </div>
          <div className="w-1/5 px-4 py-8 bg-blue-500 rounded-xl mx-auto">
            <HiLightBulb size={40} color="white" className="mx-auto mb-3" />
            <p className="text-white">
              Belajar untuk membudidayakan kejujuran {":)"}
            </p>
          </div>
        </div>
        {user === null ? (
          <p className="text-2xl font-thin mt-20 text-center">
            Eits, tapi masuk atau daftar dulu{" "}
            <Link
              to={"masuk"}
              className="underline hover:bg-orange-300 hover:p-3 hover:rounded-xl duration-100"
            >
              di sini
            </Link>
            , ya!😁
          </p>
        ) : (
          <p className="text-2xl mt-20 text-center">
            Karena sudah login, kamu boleh mengakses fitur Kantin dengan lengkap
            ya, {user.username}!
          </p>
        )}
      </div>
      {/* Endquote */}
      <div className="p-32 text-center text-2xl bg-green-300 mt-10">
        <p>Semangat dalam petulanganmu di Kantin Kejujuran!</p>
        <p>Apapun yang terjadi, kejujuran harus diutamakan.</p>
      </div>
      {/* Footer */}
      <div className="bg-blue-900 p-16 text-white flex justify-between items-center">
        <div>
          <p>Kantin Kejujuran oleh SD SEA Sentosa</p>
          <p>Gibrano Fabien Derenz</p>
          <p>2022</p>
        </div>
        <div>
          <p>Made in passion with Django and React 💖</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
