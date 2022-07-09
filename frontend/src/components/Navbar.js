import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const navbarOptionsStyle = "font-extrabold hover:underline";
  const buttonStyle =
    "flex justify-center items-center rounded-full bg-blue-700 w-fit px-4 py-3 text-white font-semibold";

  const handleLogout = async () => {
    await axios({
      method: "post",
      url: "/api/logout/",
      data: user,
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(null);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex bg-blue-200 p-4 justify-around font-inter">
      {/* Logo */}
      <Link to={`/`}>
        <div className="bg-white w-fit p-3 ml-3 rounded-3xl">
          <p className="text-3xl font-bold text-blue-800">Kantin Kejujuran</p>
          <p className="text-xl font-bold text-blue-800">oleh SD SEA Sentosa</p>
        </div>
      </Link>

      {/* Links to other functionalities */}
      <div className="flex w-2/5 justify-around my-auto items-center">
        <Link to={`kantin/`} className={navbarOptionsStyle}>
          Kantin
        </Link>
        <Link to={`kotak-uang/`} className={navbarOptionsStyle}>
          Kotak Uang
        </Link>

        {user !== null && (
          <p className={buttonStyle}>
            {`${user.username} #${user.student_ID}`}
          </p>
        )}

        {user === null ? (
          <Link to={`masuk/`} className={buttonStyle}>
            Log In
          </Link>
        ) : (
          <>
            <button
              className={buttonStyle + " bg-red-600"}
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
