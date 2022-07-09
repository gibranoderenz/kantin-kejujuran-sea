import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { formatRupiah } from "../utils/FormatRupiah";

const KotakUang = () => {
  let [kotakUang, setKotakUang] = useState(0);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    await axios({
      method: "get",
      url: "/api/kotak-uang/",
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 200) {
          setKotakUang(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const saveBalance = async () => {
    await axios({
      method: "put",
      url: "/api/kotak-uang/",
      data: { balance: kotakUang.balance },
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 200) {
          setKotakUang(res.data);
          alert("Berhasil menyimpan uang!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = () => {
    const received = prompt("Mau setor berapa?");
    if (received === null || received.length === 0) {
      alert("Silakan isi nominal yang sesuai!");
    } else {
      kotakUang.balance += parseInt(received);
      saveBalance();
    }
  };

  const handleSubtract = () => {
    const taken = prompt("Mau tarik berapa?");
    if (taken === null || taken.length === 0) {
      alert("Silakan isi nominal yang sesuai!");
    } else if (kotakUang.balance - taken < 0) {
      alert("Tidak boleh menarik lebih dari saldo Kantin!");
    } else {
      kotakUang.balance -= parseInt(taken);
      saveBalance();
    }
  };

  return (
    <div className="flex justify-center font-inter">
      <div>
        {/* Header */}
        <p className="text-center text-3xl font-bold my-8">
          Budidayakan kejujuran, ya! 😁
        </p>
        {/* Kotak Uang */}
        <div>
          {/* Saldo Kantin */}
          <div className="border-2 rounded-lg p-7 mx-auto">
            <div>
              <p className="text-lg font-semibold text-gray-400">
                Saldo Kantin
              </p>
              <p className="text-3xl font-bold">
                {formatRupiah(kotakUang.balance)}
              </p>
            </div>
            <div className="flex flex-col w-fit mt-10">
              <button
                className="bg-orange-300 px-6 py-3 rounded-2xl mb-3 font-semibold"
                onClick={() => handleAdd()}
              >
                Setor
              </button>
              <button
                className="bg-purple-300 py-3 rounded-2xl font-semibold"
                onClick={() => handleSubtract()}
              >
                Tarik
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KotakUang;
