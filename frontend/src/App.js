import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Kantin from "./pages/Kantin";
import Home from "./pages/Home";
import Product from "./pages/Product";
import KotakUang from "./pages/KotakUang";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import { LoginContext } from "./contexts/LoginContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  // user is initially not set to null so the useEffect
  // can have a chance to check the userAuth status
  const [user, setUser] = useState({});
  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    await axios({
      method: "get",
      url: "/api/get-user/",
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <LoginContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kantin/" element={<Kantin />} />
          <Route
            path="/kantin/tambah/"
            element={
              user !== null ? <AddProduct /> : <Navigate to={"/masuk/"} />
            }
          />
          <Route
            path="/kantin/:id/"
            element={user !== null ? <Product /> : <Navigate to={"/masuk/"} />}
          />
          <Route
            path="/kotak-uang/"
            element={
              user !== null ? <KotakUang /> : <Navigate to={"/masuk/"} />
            }
          />
          <Route
            path="/masuk/"
            element={user === null ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/daftar/"
            element={user === null ? <Register /> : <Navigate to={"/"} />}
          />
          <Route path="/tidak-ada/" element={<Page404 />} />
          <Route path="*" element={<Navigate to={"/tidak-ada/"} />} />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
