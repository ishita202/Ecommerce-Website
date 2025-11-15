import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";  // your firebase config
// import { getAuth } from "firebase/auth";

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");
  const [showModal, setShowModal] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {

  const fetchOrders = async () => {

    if (!user) return;
 
    const q = query(

      collection(db, "orders"),

      where("userId", "==", user.uid)

    );
 
    const snap = await getDocs(q);
 
    const orderList = snap.docs.map(doc => ({

      id: doc.id,

      ...doc.data(),

    }));
 
    setOrders(orderList);

  };
 
  fetchOrders();

}, [user]);

 

 

  const [formData, setFormData] = useState({
    name: user?.displayName || user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes to both context & localStorage
  const handleSave = () => {
    const updatedUser = {
      ...user,
      displayName: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      dob: formData.dob,
    };

    updateProfile(updatedUser);
    alert("Profile updated successfully!");
    setShowModal(false);
  };

  const getInitials = (name, email) => {
    if (name && name.trim()) {
      const parts = name.trim().split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    } else if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  if (!user) {
    return (
      <div className="profile-login-message">
        <h2>Please log in to view your profile.</h2>
        <button className="btn-primary" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  const initials = getInitials(user.displayName || user.name, user.email);

  return (
    <div className="profile-wrapper">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="sidebar-header">
          <div className="avatar-circle">{initials}</div>
          <h3 className="username">{user.displayName || user.name || "User"}</h3>
          <p className="email">{user.email}</p>
        </div>

        <ul className="sidebar-menu">
          <li
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile Details
          </li>
          <li
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => setActiveSection("orders")}
          >
            My Orders
          </li>
          <li
            className={activeSection === "transactions" ? "active" : ""}
            onClick={() => setActiveSection("transactions")}
          >
            My Transactions
          </li>
          <li className="logout" onClick={logout}>
            Logout
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="profile-content">
        {activeSection === "profile" && (
          <section className="profile-section">
            <h2 className="section-title">Profile Details</h2>

            <div className="profile-info">
              <div className="info-row">
                <span className="label">Full Name:</span>
                <span className="value">{formData.name || "Not added"}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Mobile Number:</span>
                <span className="value">{formData.mobile || "Not added"}</span>
              </div>
              <div className="info-row">
                <span className="label">Gender:</span>
                <span className="value">{formData.gender || "Not added"}</span>
              </div>
              <div className="info-row">
                <span className="label">Date of Birth:</span>
                <span className="value">{formData.dob || "Not added"}</span>
              </div>
            </div>

            <button className="btn-edit" onClick={() => setShowModal(true)}>
              Edit Profile
            </button>
          </section>
        )}
            {activeSection === "orders" && (
            <section className="profile-section">
            <h2 className="section-title">My Orders</h2>
            
                {orders.length === 0 ? (
            <p className="empty-msg">You have no recent orders yet.</p>

                ) : (
            <div className="orders-list">

                    {orders.map(order => (
            <div key={order.id} className="order-card">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Amount:</strong> ₹{order.amount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> 

                          {" "}

                          {order.createdAt?.toDate

                            ? order.createdAt.toDate().toLocaleString()

                            : ""}
            </p>
            </div>

                    ))}
            </div>

                )}
            </section>

            )}

 

        {activeSection === "transactions" && (
          <section className="profile-section">
            <h2 className="section-title">My Transactions</h2>
            <p className="empty-msg">No transactions found.</p>
          </section>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Profile</h3>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
