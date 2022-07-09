import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const idIsValid = (id) => {
  // check first three digits to last two digits
  let first_three = id.substring(0, 3);
  let last_two = id.substring(3, 5);
  if (sumString(first_three) !== parseInt(last_two)) {
    return false;
  }
  return true;
};

const sumString = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += parseInt(str[i]);
  }
  return sum;
};

const Daftar = () => {
  const [studentId, setStudentId] = useState("");
  const [validId, setValidId] = useState(false);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();
  const formData = new FormData();

  const handleRegister = (e) => {
    e.preventDefault();
    formData.append("student_ID", studentId);
    formData.append("username", username);
    formData.append("password", password1);
    registerUser();
  };

  const registerUser = async () => {
    await axios({
      method: "post",
      url: "/api/register/",
      data: formData,
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/masuk", { replace: true });
          alert("Berhasil mendaftarkan akun baru!");
        }
      })
      .catch((err) => console.log(err));
  };

  const defaultInputStyle =
    "border-2 rounded-lg px-4 py-2 w-full mt-2 hover:ring-blue-300 hover:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 invalid:border-red-600 shadow-sm peer";

  return (
    <div className="my-10 flex justify-center font-inter">
      <div>
        <p className="text-center font-bold text-2xl mb-5">
          Daftar menjadi anggota Kantin untuk memulai penjelajahanmu di Kantin!
        </p>
        <form className="px-20 py-3">
          <div className="mb-5">
            <label htmlFor="studentId" className="font-semibold">
              ID Mahasiswa
            </label>
            <br />
            <input
              name="studentId"
              type="text"
              maxLength={5}
              className={defaultInputStyle}
              placeholder="Contoh: 41207"
              required
              value={studentId}
              pattern="[0-9]{5}"
              onChange={(e) => {
                setStudentId(e.target.value);
                if (idIsValid(e.target.value)) {
                  setValidId(true);
                } else {
                  setValidId(false);
                }
              }}
            />
            <p className="hidden peer-invalid:inline-block text-red-700 font-semibold mt-2">
              ID harus memiliki 5 digit angka.
            </p>
            <p
              className={`text-red-700 font-semibold mt-2 ${
                validId ? "hidden" : "block"
              }`}
            >
              Jumlah 3 digit pertama ID harus sama dengan 2 digit terakhir ID.
            </p>
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <br />
            <input
              name="username"
              type="text"
              className={defaultInputStyle}
              placeholder="Contoh: jagobanget99"
              required
              minLength={3}
              maxLength={12}
              pattern="A-Za-z0-9{3-12}"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="hidden peer-invalid:inline-block text-red-700 font-semibold mt-2">
              Username yang valid memuat
              <br />
              <li>Karakter alphanumeric</li> <li>3-12 karakter</li>
            </p>
          </div>
          <div className="mb-5">
            <label htmlFor="password1" className="font-semibold">
              Password
            </label>
            <br />
            <input
              name="password1"
              type="password"
              className={defaultInputStyle}
              required
              value={password1}
              // reference: https://www.w3schools.com/tags/att_input_pattern.asp
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={(e) => setPassword1(e.target.value)}
            />
            <div className="hidden peer-invalid:inline-block text-red-700 font-semibold mt-2">
              <p>Password harus setidaknya memuat:</p>
              <li>1 angka</li>
              <li>1 huruf kecil</li>
              <li>Setidaknya 8 karakter</li>
            </div>
          </div>
          <div>
            <label htmlFor="password2" className="font-semibold">
              Ulangi Password
            </label>
            <br />
            <input
              name="password2"
              type="password"
              className={defaultInputStyle}
              required
              pattern={password1}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <p className="hidden peer-invalid:inline-block text-red-700 font-semibold mt-2">
              Password harus sama.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="disabled:bg-slate-200 bg-blue-600 px-5 py-2 rounded-xl mt-5 text-white font-semibold"
              disabled={
                studentId.length != 5 ||
                username < 3 ||
                username > 12 ||
                password1.length < 8 ||
                password2 !== password1
              }
              onClick={(e) => handleRegister(e)}
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Daftar;
