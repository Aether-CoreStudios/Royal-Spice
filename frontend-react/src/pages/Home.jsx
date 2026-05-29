import Hero from "../components/Hero";
import { motion } from "framer-motion";

function Home() {
  return (
    <div
      style={{
        background: "#0B0F19",
        color: "white",
        paddingTop: "160px",
      }}
    >
      {/* HERO */}

      <Hero />

      {/* ABOUT SECTION */}

      <section
        style={{
          padding: "100px 10%",
          display: "flex",
          justifyContent: "space-between",
          gap: "60px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <p
            style={{
              color: "#C8973A",
              letterSpacing: "3px",
              marginBottom: "20px",
            }}
          >
            ABOUT ROYAL SPICE
          </p>

          <h1
            style={{
              fontSize: "55px",
              marginBottom: "25px",
            }}
          >
            A Luxury Dining Experience
          </h1>

          <p
            style={{
              color: "#aaa",
              lineHeight: "1.9",
              fontSize: "18px",
            }}
          >
            Royal Spice blends timeless culinary traditions with modern
            elegance. Every dish is carefully crafted by our expert chefs using
            premium ingredients, rich spices, and unforgettable presentation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Restaurant"
            style={{
              width: "100%",
              borderRadius: "25px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          />
        </motion.div>
      </section>

      {/* CHEF SECTION */}

      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          padding: "100px 10%",
          background: "#111827",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#C8973A",
            letterSpacing: "3px",
            marginBottom: "20px",
          }}
        >
          OUR CHEFS
        </p>

        <h1
          style={{
            fontSize: "55px",
            marginBottom: "60px",
          }}
        >
          Meet Our Experts
        </h1>

        <div
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {chefs.map((chef, index) => (
            <motion.div
              whileHover={{
                y: -18,
                scale: 1.05,
                rotate: "1deg",
              }}
              key={index}
              style={{
                width: "300px",
                background: "#0F172A",
                borderRadius: "25px",
                overflow: "hidden",
                border: "1px solid #333",
                transition: "0.3s",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={chef.image}
                alt={chef.name}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "25px" }}>
                <h2>{chef.name}</h2>

                <p
                  style={{
                    color: "#C8973A",
                  }}
                >
                  {chef.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* STATS SECTION */}

      <section
        style={{
          padding: "100px 10%",
          background: "#0B0F19",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "30px",
          }}
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              style={{
                background: "#111827",
                padding: "40px",
                borderRadius: "25px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              <h1
                style={{
                  fontSize: "55px",
                  color: "#C8973A",
                  marginBottom: "15px",
                }}
              >
                {item.number}
              </h1>

              <p
                style={{
                  color: "#aaa",
                  fontSize: "18px",
                  letterSpacing: "1px",
                }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* TESTIMONIALS */}

      <section
        style={{
          padding: "100px 10%",
          background: "#111827",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#C8973A",
            letterSpacing: "3px",
            marginBottom: "20px",
          }}
        >
          TESTIMONIALS
        </p>

        <h1
          style={{
            fontSize: "55px",
            marginBottom: "70px",
          }}
        >
          What Our Guests Say
        </h1>

        <div
          style={{
            display: "flex",
            gap: "35px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              style={{
                width: "320px",
                background: "#0F172A",
                padding: "35px",
                borderRadius: "25px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              <h2
                style={{
                  color: "#C8973A",
                  marginBottom: "20px",
                }}
              >
                ★★★★★
              </h2>

              <p
                style={{
                  color: "#bbb",
                  lineHeight: "1.8",
                  marginBottom: "25px",
                }}
              >
                {item.review}
              </p>

              <h3>{item.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
      {/* FOOTER */}

      <footer
        style={{
          padding: "50px",
          textAlign: "center",
          background: "#05070D",
          color: "#777",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2
          style={{
            color: "#C8973A",
            marginBottom: "15px",
          }}
        >
          Royal Spice
        </h2>

        <p>Luxury Dining Experience • Premium Restaurant</p>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          © 2026 Royal Spice Restaurant
        </p>
      </footer>
    </div>
  );
}
const stats = [
  {
    number: "15+",
    label: "Years Experience",
  },
  {
    number: "50K+",
    label: "Happy Customers",
  },
  {
    number: "120+",
    label: "Premium Dishes",
  },
  {
    number: "5★",
    label: "Luxury Rating",
  },
];
const testimonials = [
  {
    name: "Sophia Williams",
    review:
      "Absolutely the best luxury dining experience. The atmosphere and food were unforgettable.",
  },
  {
    name: "James Anderson",
    review:
      "Premium quality service with amazing dishes. Highly recommended for fine dining lovers.",
  },
  {
    name: "Emma Johnson",
    review:
      "Elegant interiors, delicious food, and outstanding hospitality. Truly five-star experience.",
  },
];
const chefs = [
  {
    name: "Chef Antonio",
    role: "Master Chef",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf",
  },
  {
    name: "Chef Olivia",
    role: "Dessert Specialist",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  },
  {
    name: "Chef Daniel",
    role: "Italian Cuisine Expert",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0",
  },
];

export default Home;
