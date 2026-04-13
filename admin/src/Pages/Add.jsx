import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message || "Product Added Successfully");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  const toggleSize = (s) =>
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s],
    );

  return (
    <>
      <style>{`
                .add-page {
                    padding: 2rem;
                    max-width: 760px;
                }

                .add-page-title {
                    color: #8B5A4A;
                    font-family: 'Georgia', serif;
                    font-size: 1.4rem;
                    margin-bottom: 1.8rem;
                    padding-bottom: 14px;
                    border-bottom: 2px solid #E8D5C4;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .add-page-title::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 20px;
                    background: #D4755B;
                    border-radius: 2px;
                }

                .form-label {
                    display: block;
                    font-size: 0.74rem;
                    color: #A8B5A0;
                    letter-spacing: 0.14em;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }

                .form-input, .form-textarea, .form-select {
                    background: #FFFDF9;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-size: 0.86rem;
                    color: #8B5A4A;
                    outline: none;
                    transition: border-color 0.25s, box-shadow 0.25s;
                    width: 100%;
                }

                .form-input::placeholder, .form-textarea::placeholder { color: #A8B5A0; }

                .form-input:focus, .form-textarea:focus, .form-select:focus {
                    border-color: #D4755B;
                    box-shadow: 0 0 0 3px rgba(212, 117, 91, 0.1);
                }

                .form-textarea { resize: vertical; min-height: 90px; }

                .form-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23D4755B' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    padding-right: 36px;
                    cursor: pointer;
                }

                /* UPLOAD */
                .upload-grid {
                    display: flex;
                    gap: 12px;
                }

                .upload-box {
                    width: 88px;
                    height: 88px;
                    border: 1.5px dashed #D4755B;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    background: #FFFDF9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .upload-box:hover {
                    border-color: #8B5A4A;
                    box-shadow: 0 4px 14px rgba(212, 117, 91, 0.15);
                }

                .upload-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* SIZES */
                .size-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    background: #E8D5C4;
                    color: #8B5A4A;
                    font-size: 0.8rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s, transform 0.15s;
                    border: 1.5px solid transparent;
                    letter-spacing: 0.04em;
                    user-select: none;
                }

                .size-btn:hover { transform: translateY(-2px); }

                .size-btn.active {
                    background: #D4755B;
                    color: #FFFDF9;
                    border-color: #D4755B;
                }

                /* BESTSELLER */
                .bestseller-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 16px;
                    background: #FFFDF9;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: border-color 0.2s;
                }

                .bestseller-row:hover { border-color: #D4755B; }

                .bestseller-checkbox {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border: 2px solid #E8D5C4;
                    border-radius: 5px;
                    background: #FFFDF9;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s;
                    position: relative;
                    flex-shrink: 0;
                }

                .bestseller-checkbox:checked {
                    background: #D4755B;
                    border-color: #D4755B;
                }

                .bestseller-checkbox:checked::after {
                    content: '✓';
                    position: absolute;
                    color: white;
                    font-size: 11px;
                    top: -1px;
                    left: 3px;
                }

                .bestseller-label {
                    color: #8B5A4A;
                    font-size: 0.86rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                /* SUBMIT */
                .add-submit-btn {
                    background: #D4755B;
                    color: #FFFDF9;
                    border: none;
                    border-radius: 50px;
                    padding: 13px 40px;
                    font-size: 0.82rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
                    box-shadow: 0 4px 16px rgba(212, 117, 91, 0.3);
                    margin-top: 8px;
                }

                .add-submit-btn:hover {
                    background: #8B5A4A;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(139, 90, 74, 0.3);
                }

                .form-section {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    width: 100%;
                }
            `}</style>

      <form onSubmit={onSubmitHandler} className="add-page flex flex-col gap-5">
        <h2 className="add-page-title">Add New Product</h2>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="form-label">Product Images</label>
          <div className="upload-grid">
            {[
              { state: image1, setter: setImage1, id: "image1" },
              { state: image2, setter: setImage2, id: "image2" },
              { state: image3, setter: setImage3, id: "image3" },
              { state: image4, setter: setImage4, id: "image4" },
            ].map(({ state, setter, id }) => (
              <label key={id} htmlFor={id} className="upload-box">
                <img
                  src={!state ? assets.upload_area : URL.createObjectURL(state)}
                  alt="upload"
                />
                <input
                  onChange={(e) => setter(e.target.files[0])}
                  type="file"
                  id={id}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="form-label">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-input"
            style={{ maxWidth: "500px" }}
            type="text"
            placeholder="e.g. Classic Linen Shirt"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="form-label">Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-textarea"
            style={{ maxWidth: "500px" }}
            placeholder="Describe the product..."
            required
          />
        </div>

        {/* CATEGORY / SUBCATEGORY / PRICE */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div style={{ minWidth: "150px" }}>
            <label className="form-label">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="form-select"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div style={{ minWidth: "150px" }}>
            <label className="form-label">Sub-Category</label>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subcategory}
              className="form-select"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div style={{ minWidth: "120px" }}>
            <label className="form-label">Price (₹)</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="form-input"
              type="number"
              placeholder="250"
              required
            />
          </div>
        </div>

        {/* SIZES */}
        <div>
          <label className="form-label">Available Sizes</label>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <div
                key={s}
                onClick={() => toggleSize(s)}
                className={`size-btn ${sizes.includes(s) ? "active" : ""}`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* BESTSELLER */}
        <div className="bestseller-row" style={{ maxWidth: "260px" }}>
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
            className="bestseller-checkbox"
          />
          <label className="bestseller-label" htmlFor="bestseller">
            {" "}
            Mark as Bestseller
          </label>
        </div>

        <div>
          <button className="add-submit-btn" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </>
  );
};

export default Add;
