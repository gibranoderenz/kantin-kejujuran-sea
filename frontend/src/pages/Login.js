import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import axios from "axios";

const Masuk = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const defaultInputStyle =
    "border-2 rounded-lg px-4 py-2 w-full mt-2 hover:ring-blue-300 hover:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 invalid:border-red-600 shadow-sm peer";

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", studentId);
    formData.append("password", password);
    await axios({
      method: "post",
      url: "/api/login/",
      data: formData,
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          navigate("/kantin", { replace: true });
          alert("Berhasil masuk ke kantin!");
        }
      })
      .catch((err) => alert("Silakan masukkan ID dan password yang valid."));
  };

  return (
    <div className="my-10 flex justify-center font-inter">
      <div>
        <p className="text-center font-bold text-2xl mb-5">
          Log in ke Kantin untuk memulai penjelajahanmu di kantin!
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
              placeholder="Silakan isi ID-mu."
              required
              value={studentId}
              pattern="[0-9]{5}"
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <br />
            <input
              name="password"
              type="password"
              className={defaultInputStyle}
              required
              value={password}
              placeholder="Silakan isi password-mu."
              // reference: https://www.w3schools.com/tags/att_input_pattern.asp
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <p>
              Belum punya akun?{" "}
              <Link
                to={`/daftar/`}
                className="text-blue-600 underline font-semibold hover:bg-blue-200 duration-100"
              >
                Daftar di sini.
              </Link>
            </p>
            <button
              className="disabled:bg-slate-200 bg-blue-600 px-5 py-2 rounded-xl text-white font-semibold"
              disabled={studentId.length != 5 || password.length < 8}
              onClick={(e) => handleLogin(e)}
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Masuk;
