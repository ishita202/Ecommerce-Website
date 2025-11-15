const functions = require("firebase-functions");
const fetch = require("node-fetch");
 
exports.createOrder = functions.https.onRequest(async (req, res) => {
  try {
    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "x-client-id": "YOUR_CLIENT_ID",         // from Cashfree dashboard
        "x-client-secret": "YOUR_CLIENT_SECRET", // keep secure!
        "Content-Type": "application/json",
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify({
        order_id: "order_" + Date.now(),
        order_amount: 100.0,
        order_currency: "INR",
        customer_details: {
          customer_id: "123",
          customer_name: "Aditya",
          customer_email: "aditya@example.com",
          customer_phone: "9999999999",
        },
      }),
    });
 
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});