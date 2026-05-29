import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

function Menu() {
  const { addToCart } = useContext(CartContext);

  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  return (
    <div
      style={{
        background: "#070B14",
        minHeight: "100vh",
        color: "white",
        paddingTop: "160px",
      }}
    >
      {/* HERO SECTION */}

      <div
        style={{
          height: "420px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(7,11,20,1))",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "relative",
            zIndex: 5,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#C8973A",
              letterSpacing: "5px",
              marginBottom: "15px",
            }}
          >
            LUXURY DINING EXPERIENCE
          </p>

          <h1
            style={{
              fontSize: "70px",
              fontWeight: "bold",
            }}
          >
            Our Signature Menu
          </h1>
        </motion.div>
      </div>

      {/* SEARCH */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          padding: "0 20px",
        }}
      >
        <input
          type="text"
          placeholder="Search your favorite dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "18px 25px",
            borderRadius: "50px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#111827",
            color: "white",
            outline: "none",
            fontSize: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      {/* CATEGORY FILTER */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "18px",
          flexWrap: "wrap",
          marginTop: "40px",
          padding: "0 20px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "14px 30px",
              borderRadius: "40px",
              border:
                selectedCategory === category ? "2px solid #E5C06B" : "none",
              cursor: "pointer",
              background: selectedCategory === category ? "#C8973A" : "#111827",

              color: selectedCategory === category ? "black" : "white",

              fontWeight: "bold",
              fontSize: "15px",
              transition: "0.3s",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FOOD GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,380px))",

          justifyContent: "center",

          gap: "35px",

          padding: "80px 5%",
        }}
      >
        {menuItems
          .filter((item) =>
            selectedCategory === "All"
              ? true
              : item.category === selectedCategory,
          )

          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          )

          .map((item) => (
            <motion.div
              key={item._id}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#111827",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                position: "relative",
              }}
            >
              {/* BADGE */}

              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  zIndex: 5,
                  background: "#C8973A",
                  color: "black",
                  padding: "8px 18px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {item.category}
              </div>

              {/* IMAGE */}

              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* CONTENT */}

              <div
                style={{
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "28px",
                    }}
                  >
                    {item.name}
                  </h2>

                  <h2
                    style={{
                      color: "#C8973A",
                    }}
                  >
                    ₹{item.price}
                  </h2>
                </div>

                <p
                  style={{
                    color: "#aaa",
                    lineHeight: "1.8",
                    marginTop: "15px",
                    minHeight: "60px",
                  }}
                >
                  {item.description}
                </p>

                {/* BUTTON */}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    addToCart({
                      _id: item._id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  style={{
                    marginTop: "25px",
                    width: "100%",
                    padding: "16px",
                    border: "none",
                    borderRadius: "18px",
                    background: "linear-gradient(135deg,#C8973A,#E5C06B)",

                    color: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "17px",

                    boxShadow: "0 0 25px rgba(200,151,58,0.45)",
                  }}
                >
                  Add To Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export default Menu;
