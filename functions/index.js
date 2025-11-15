const functions = require("firebase-functions");

const fetch = require("node-fetch");
 
exports.createOrder = functions.https.onCall(async (data, context) => {

  try {

    const { amount, customerId } = data;
 
    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {

      method: "POST",

      headers: {

        "x-client-id": "Api",

        "x-client-secret": "process.env.API_KEY",

        "Content-Type": "application/json",

        "x-api-version": "2022-09-01",

      },

      body: JSON.stringify({

        order_id: "order_" + Date.now(),

        order_amount: amount,

        order_currency: "INR",

        customer_details: {

          customer_id: customerId,

          customer_name: "User",

          customer_phone: "9999999999",

          customer_email: "test@gmail.com",

        },

      }),

    });
 
    const json = await response.json();

    return json;  // <======= IMPORTANT

  } catch (err) {

    console.error(err);

    throw new functions.https.HttpsError("internal", "Error creating order");

  }

});

 