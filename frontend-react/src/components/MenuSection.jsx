function MenuSection() {
  const dishes = [
    {
      name: "Truffle Steak",
      price: "$42",
      desc: "Premium grilled steak with truffle butter",
    },
    {
      name: "Firewood Pizza",
      price: "$28",
      desc: "Stone baked artisan pizza",
    },
    {
      name: "Seafood Pasta",
      price: "$35",
      desc: "Fresh seafood in creamy garlic sauce",
    },
  ];

  return (
    <div
      style={{
        background: "#111",
        color: "white",
        padding: "80px 40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#C8973A",
          marginBottom: "50px",
        }}
      >
        Signature Menu
      </h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {dishes.map((dish, index) => (
          <div
            key={index}
            style={{
              background: "#1A1A1A",
              padding: "30px",
              width: "280px",
              borderRadius: "20px",
              border: "1px solid #333",
            }}
          >
            <h2 style={{ color: "#F5F0E8" }}>{dish.name}</h2>

            <p style={{ color: "#999", margin: "15px 0" }}>{dish.desc}</p>

            <h3 style={{ color: "#C8973A" }}>{dish.price}</h3>

            <button
              style={{
                marginTop: "20px",
                background: "#C8973A",
                border: "none",
                padding: "12px 20px",
                borderRadius: "30px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuSection;
