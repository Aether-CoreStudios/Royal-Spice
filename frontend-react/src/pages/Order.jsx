import React, { useState } from "react";
import axios from "axios";

function Order() {
  const [food, setFood] = useState("");
  const [price, setPrice] = useState("");

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: price,
        },
      );

      const order = response.data;

      const options = {
        key: "rzp_test_StDNc3KaC2jMyg",

        amount: order.amount,

        currency: "INR",

        name: "Ember & Oak",

        description: "Food Order Payment",

        order_id: order.id,

        handler: function (response) {
          alert("Payment Successful");

          console.log(response);
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      alert("Payment Failed");
    }
  };

  return (
    <div>
      <h1>Order Page</h1>

      <input
        type="text"
        placeholder="Food Name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Order;
