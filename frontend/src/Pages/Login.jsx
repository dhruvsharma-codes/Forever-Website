import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  // Restore token from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (!token && saved) setToken(saved);
  }, []);

  return (
    <>
      <style>{`
                .login-page {
                    min-height:80vh; display:flex; align-items:center; justify-content:center;
                    background: linear-gradient(160deg,#F7EFE6 60%,#EDD8C4 100%);
                    padding: 2rem 1rem;
                }
                .login-input {
                    width:100%; background:#F7EFE6; border:1.5px solid #EDD8C4;
                    border-radius:10px; padding:11px 16px; font-size:0.88rem;
                    color:#3D2318; outline:none; transition:border-color 0.25s, box-shadow 0.25s;
                    box-sizing:border-box; font-family:inherit;
                }
                .login-input::placeholder { color:#98A98E; }
                .login-input:focus { border-color:#C96A42; box-shadow:0 0 0 3px rgba(201,106,66,0.12); }
                .login-link {
                    color:#98A98E; cursor:pointer; transition:color 0.2s;
                    font-size:0.8rem; text-decoration:none; background:none; border:none; font-family:inherit;
                }
                .login-link:hover { color:#C96A42; }
                .login-link.accent { color:#C96A42; font-weight:600; }
                .login-link.accent:hover { color:#A3512F; }
            `}</style>

      <div className="login-page">
        <motion.form
          onSubmit={onSubmitHandler}
          style={{
            background: "#F7EFE6",
            border: "1.5px solid #EDD8C4",
            borderRadius: 20,
            padding: "2.5rem 2rem",
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 8px 40px rgba(61,35,24,0.12)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <h1
              style={{
                fontFamily: "'Georgia',serif",
                fontSize: "2rem",
                color: "#7A4A38",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {currentState}
            </h1>
            <motion.span
              style={{
                flex: 1,
                height: 2,
                background: "linear-gradient(90deg,#C96A42,transparent)",
                borderRadius: 2,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          <AnimatePresence>
            {currentState === "Sign Up" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
              >
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="login-input"
                  placeholder="Full Name"
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="login-input"
            placeholder="Email Address"
            required
          />

          <div style={{ position: "relative" }}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              className="login-input"
              style={{ paddingRight: 44 }}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 13,
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
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: -4,
            }}
          >
            <button type="button" className="login-link">
              Forgot password?
            </button>
            {currentState === "Login" ? (
              <button
                type="button"
                onClick={() => setCurrentState("Sign Up")}
                className="login-link accent"
              >
                Create account
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentState("Login")}
                className="login-link accent"
              >
                Already have an account?
              </button>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            style={{
              width: "100%",
              background: loading ? "#EDAC8E" : "#C96A42",
              color: "#F7EFE6",
              border: "none",
              borderRadius: 50,
              padding: 13,
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 6,
              boxShadow: "0 4px 16px rgba(201,106,66,0.3)",
              fontFamily: "inherit",
              transition: "background 0.2s",
            }}
          >
            {loading
              ? "Please wait…"
              : currentState === "Login"
                ? "Sign In"
                : "Create Account"}
          </motion.button>
        </motion.form>
      </div>
    </>
  );
};

export default Login;
