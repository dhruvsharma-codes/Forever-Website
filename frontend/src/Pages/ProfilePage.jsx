import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const EyeIcon = ({ show }) =>
  show ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const ProfilePage = () => {
  const { token, navigate, backendUrl } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("details");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch real profile data from backend API
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setProfileLoading(false);
        return;
      }
      try {
        const res = await axios.post(
          `${backendUrl}/api/user/profile`,
          {},
          { headers: { token } },
        );
        if (res.data.success) {
          setProfile({ name: res.data.user.name, email: res.data.user.email });
        }
      } catch (err) {
        console.log("Profile fetch error:", err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [token, backendUrl]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return toast.error("New passwords do not match");
    if (passwordData.newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    let userId = null;
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.id;
      }
    } catch (err) {
      console.log("Token decode error:", err);
    }

    if (!userId) return toast.error("Session expired. Please login again.");

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          userId,
        },
        { headers: { token } },
      );
      if (res.data.success) {
        toast.success("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  if (!token)
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#F0E8DF",
        }}
      >
        <p style={{ color: "#7A4A38", fontSize: "1rem" }}>
          Please login to view your profile.
        </p>
        <motion.button
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: "#C96A42",
            color: "#F7EFE6",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Go to Login
        </motion.button>
      </div>
    );

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile.email
      ? profile.email[0].toUpperCase()
      : "U";

  const inputBase = {
    width: "100%",
    background: "#F7EFE6",
    border: "1.5px solid #EDD8C4",
    borderRadius: 8,
    padding: "0.65rem 2.8rem 0.65rem 1rem",
    fontSize: "0.88rem",
    color: "#3D2318",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <style>{`
                .pp-tab { flex:1; background:none; border:none; padding:0.9rem 1rem; font-size:0.78rem; font-weight:700; letter-spacing:0.06em; cursor:pointer; color:#7A4A38; transition:color 0.2s, background 0.2s; position:relative; font-family:inherit; }
                .pp-tab.active { color:#C96A42; background:rgba(201,106,66,0.06); }
                .pp-tab.active::after { content:''; position:absolute; bottom:-1.5px; left:0; right:0; height:2px; background:#C96A42; border-radius:2px 2px 0 0; }
                .pp-tab:hover:not(.active) { background:rgba(201,106,66,0.04); color:#B05830; }
                .pp-inp:focus { border-color:#C96A42 !important; box-shadow:0 0 0 3px rgba(201,106,66,0.1); }
                .pp-inp::placeholder { color:#B0957E; }
                .pp-page { min-height:80vh; background:#F0E8DF; padding:3rem 1.5rem; display:flex; justify-content:center; align-items:flex-start; }
            `}</style>

      <div className="pp-page">
        <motion.div
          style={{
            background: "#F7EFE6",
            border: "1.5px solid #EDD8C4",
            borderRadius: 20,
            width: "100%",
            maxWidth: 520,
            overflow: "hidden",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* TOP BANNER */}
          <div
            style={{
              background:
                "linear-gradient(130deg,#EDD8C4 0%,#F7EFE6 60%,#C2CDB8 100%)",
              padding: "2rem 2rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              borderBottom: "1.5px solid #EDD8C4",
            }}
          >
            <motion.div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#C96A42",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#F7EFE6",
                border: "3px solid #F7EFE6",
                flexShrink: 0,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.25 }}
            >
              {profileLoading ? "…" : initials}
            </motion.div>
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#3D2318",
                  margin: 0,
                }}
              >
                {profileLoading ? "Loading…" : profile.name || "My Account"}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#7A4A38", marginTop: 3 }}>
                {profileLoading ? "" : profile.email}
              </p>
            </div>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", borderBottom: "1.5px solid #EDD8C4" }}>
            {[
              ["details", "LOGIN DETAILS"],
              ["password", "CHANGE PASSWORD"],
            ].map(([tab, label]) => (
              <button
                key={tab}
                className={`pp-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* BODY */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              style={{ padding: "2rem" }}
              initial={{ opacity: 0, x: activeTab === "details" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "details" ? 20 : -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* ── LOGIN DETAILS TAB ── */}
              {activeTab === "details" && (
                <div>
                  {[
                    { label: "Full Name", value: profile.name || "—" },
                    { label: "Email Address", value: profile.email || "—" },
                    {
                      label: "Account Status",
                      value: (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#5CB85C",
                              display: "inline-block",
                            }}
                          />
                          Active
                        </span>
                      ),
                    },
                    { label: "Login Method", value: "Email & Password" },
                  ].map(({ label, value }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "#C96A42",
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        {label}
                      </p>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#3D2318",
                          background: "#F0E8DF",
                          border: "1.5px solid #EDD8C4",
                          borderRadius: 8,
                          padding: "0.65rem 1rem",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {value}
                      </div>
                    </motion.div>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "rgba(201,106,66,0.07)",
                      border: "1px solid rgba(201,106,66,0.22)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C96A42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "#7A4A38",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Use the "Change Password" tab to update your login
                      password.
                    </p>
                  </div>

                  <motion.button
                    onClick={() => setActiveTab("password")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%",
                      background: "#C96A42",
                      color: "#F7EFE6",
                      border: "none",
                      borderRadius: 8,
                      padding: "0.75rem",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Change Password →
                  </motion.button>
                </div>
              )}

              {/* ── CHANGE PASSWORD TAB ── */}
              {activeTab === "password" && (
                <form onSubmit={handlePasswordChange}>
                  {[
                    {
                      label: "Current Password",
                      key: "currentPassword",
                      show: showCurrent,
                      toggle: () => setShowCurrent(!showCurrent),
                    },
                    {
                      label: "New Password",
                      key: "newPassword",
                      show: showNew,
                      toggle: () => setShowNew(!showNew),
                      hint: "Minimum 6 characters",
                    },
                    {
                      label: "Confirm New Password",
                      key: "confirmPassword",
                      show: showConfirm,
                      toggle: () => setShowConfirm(!showConfirm),
                    },
                  ].map(({ label, key, show, toggle, hint }, i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "#C96A42",
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        {label}
                      </p>
                      <div
                        style={{
                          position: "relative",
                          marginBottom: hint ? 6 : "1.25rem",
                        }}
                      >
                        <input
                          type={show ? "text" : "password"}
                          className="pp-inp"
                          style={inputBase}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          value={passwordData[key]}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              [key]: e.target.value,
                            })
                          }
                          required
                        />
                        <button
                          type="button"
                          onClick={toggle}
                          style={{
                            position: "absolute",
                            right: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#7A4A38",
                            display: "flex",
                            padding: 0,
                          }}
                        >
                          <EyeIcon show={show} />
                        </button>
                      </div>
                      {hint && (
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#98A98E",
                            marginBottom: "1.25rem",
                          }}
                        >
                          {hint}
                        </p>
                      )}
                      {key === "confirmPassword" &&
                        passwordData.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                              fontSize: "0.75rem",
                              color:
                                passwordData.newPassword ===
                                passwordData.confirmPassword
                                  ? "#5CB85C"
                                  : "#C96A42",
                              marginTop: -8,
                              marginBottom: "1.25rem",
                            }}
                          >
                            {passwordData.newPassword ===
                            passwordData.confirmPassword
                              ? "✓ Passwords match"
                              : "✗ Passwords do not match"}
                          </motion.p>
                        )}
                    </motion.div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%",
                      background: loading ? "#EDAC8E" : "#C96A42",
                      color: "#F7EFE6",
                      border: "none",
                      borderRadius: 8,
                      padding: "0.75rem",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      cursor: loading ? "not-allowed" : "pointer",
                      marginTop: 4,
                      fontFamily: "inherit",
                      transition: "background 0.2s",
                    }}
                  >
                    {loading ? "Updating…" : "Update Password"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePage;
