const express = require("express");

const cors = require("cors");

const axios = require("axios");
 
// ---------- FIREBASE ADMIN SETUP ----------

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
 
admin.initializeApp({

  credential: admin.credential.cert(serviceAccount),

});
 
const db = admin.firestore();

// ------------------------------------------
 
const app = express();

app.use(express.json());

app.use(cors({ origin: true }));
 
// ---------- CASHFREE SANDBOX KEYS ----------

const CF_APP_ID = "API_KEY";

const CF_SECRET_KEY = "Secret_API";

const CF_BASE_URL = "https://sandbox.cashfree.com/pg/orders";

// ------------------------------------------
 
 
// ---------- CREATE CASHFREE PAYMENT SESSION ----------

async function createCashfreeSession(amount, customer) {
 
  const payload = {

    order_amount: amount,

    order_currency: "INR",

    customer_details: {

      customer_id: customer.id,

      customer_phone: customer.phone,

      customer_email: customer.email

    }

  };
 
  const headers = {

    "Content-Type": "application/json",

    "x-api-version": "2022-09-01",

    "x-client-id": CF_APP_ID,

    "x-client-secret": CF_SECRET_KEY

  };
 
  const response = await axios.post(CF_BASE_URL, payload, { headers });
 
  return response.data;

}

// -----------------------------------------------------
 
 
// ---------- API: CREATE ORDER ----------

app.post("/createOrder", async (req, res) => {

  try {

    const { amount, customerId, customerPhone, customerEmail } = req.body;
 
    if (!amount || !customerId) {

      return res.status(400).json({ error: "amount & customerId required" });

    }
 
    if (!customerPhone || !customerEmail) {

      return res.status(400).json({ 

        error: "customerPhone & customerEmail required" 

      });

    }
 
    // 1️⃣ Create Cashfree session

    const order = await createCashfreeSession(amount, {

      id: customerId,

      phone: customerPhone,

      email: customerEmail

    });
 
    if (!order.payment_session_id) {

      console.log("Cashfree Response Error:", order);

      return res.status(500).json({

        error: "Cashfree did not return payment_session_id",

      });

    }
 
    // 2️⃣ Save order to Firestore

    await db.collection("orders").add({

      userId: customerId,

      amount: amount,

      status: "PENDING",

      payment_session_id: order.payment_session_id,

      createdAt: new Date(),

    });
 
    console.log("Order saved:", order.payment_session_id);
 
    // 3️⃣ Return session details to frontend

    res.json(order);
 
  } catch (err) {

    console.error("SERVER ERROR:", err.response?.data || err.message);

    res.status(500).json({

      error: err.response?.data || err.message,

    });

  }

});

// -----------------------------------------------------
 
 
// ---------- START SERVER ----------

app.listen(7001, () => {

  console.log("Server running on http://localhost:7001");

});

 