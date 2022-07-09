import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContext";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);

  const { user } = useContext(LoginContext);

  const navigate = useNavigate();
  const defaultInputStyle =
    "border-2 rounded-lg px-4 py-2 w-full mt-2 hover:ring-blue-300 hover:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 invalid:border-red-600 shadow-sm peer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("seller", `${user.username} #${user.student_ID}`);
    formData.append("photo", photo);
    formData.append("description", description);
    formData.append("price", price);
    // reference: https://www.youtube.com/watch?v=xtQ74HKTOwY
    await axios({
      method: "post",
      url: "/api/kantin/",
      data: formData,
      // reference: https://docs.djangoproject.com/en/4.0/ref/csrf/
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/kantin", { replace: true });
          alert("Berhasil menambahkan barang ke kantin!");
        }
      })
      .catch((err) => alert("Silakan memasukkan data yang valid!"));
  };

  return (
    <div className="flex justify-center font-inter">
      <div>
        {/* Header */}
        <p className="text-center text-3xl font-bold my-8">
          Asik banget jualan!
        </p>
        {/* Form */}
        <form className="px-20 py-3">
          <div className="mb-5">
            <label htmlFor="name" className="font-semibold">
              Nama Produk
            </label>
            <br />
            <input
              name="name"
              type="text"
              minLength={3}
              maxLength={30}
              className={defaultInputStyle}
              placeholder="Contoh: Ayam Geprek Saos Asam Manis (3-30 karakter)"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="photo" className="font-semibold">
              Foto Produk
            </label>
            <br />
            <input
              name="photo"
              type="file"
              accept="image/*"
              className={defaultInputStyle}
              required
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="font-semibold">
              Deskripsi Produk
            </label>
            <br />
            <textarea
              name="description"
              className={defaultInputStyle}
              value={description}
              placeholder="Tulis deskripsi seefektif mungkin, ya! (10-255 karakter)"
              rows={5}
              minLength={10}
              maxLength={255}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="price" className="font-semibold">
              Harga Produk
            </label>
            <br />
            <div className="flex items-center">
              <p className="font-bold text-xl mr-3">Rp</p>
              <input
                name="price"
                value={price}
                type="number"
                placeholder="Jangan mahal-mahal biar laku :D"
                className={defaultInputStyle}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="disabled:bg-slate-200 bg-green-500 px-5 py-2 rounded-xl text-white font-semibold"
              disabled={
                name.length < 3 ||
                name.length > 30 ||
                photo === null ||
                description.length < 10 ||
                description.length > 255 ||
                price <= 0
              }
              onClick={(e) => handleSubmit(e)}
            >
              Tambah!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
