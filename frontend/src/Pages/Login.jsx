// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";

// const Login = () => {
//   const [currentState, setCurrentState] = useState("Login");
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (currentState === "Sign Up") {
//         const response = await axios.post(backendUrl + "/api/user/register", {
//           name,
//           email,
//           password,
//         });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem("token", response.data.token);
//           toast.success("Account created!");
//         } else {
//           toast.error(response.data.message);
//         }
//       } else {
//         const response = await axios.post(backendUrl + "/api/user/login", {
//           email,
//           password,
//         });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem("token", response.data.token);
//           toast.success("Welcome back!");
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) navigate("/");
//   }, [token]);

//   // Restore token from localStorage on mount
//   useEffect(() => {
//     const saved = localStorage.getItem("token");
//     if (!token && saved) setToken(saved);
//   }, []);

//   return (
//     <>
//       <style>{`
//                 .login-page {
//                     min-height:80vh; display:flex; align-items:center; justify-content:center;
//                     background: linear-gradient(160deg,#F7EFE6 60%,#EDD8C4 100%);
//                     padding: 2rem 1rem;
//                 }
//                 .login-input {
//                     width:100%; background:#F7EFE6; border:1.5px solid #EDD8C4;
//                     border-radius:10px; padding:11px 16px; font-size:0.88rem;
//                     color:#3D2318; outline:none; transition:border-color 0.25s, box-shadow 0.25s;
//                     box-sizing:border-box; font-family:inherit;
//                 }
//                 .login-input::placeholder { color:#98A98E; }
//                 .login-input:focus { border-color:#C96A42; box-shadow:0 0 0 3px rgba(201,106,66,0.12); }
//                 .login-link {
//                     color:#98A98E; cursor:pointer; transition:color 0.2s;
//                     font-size:0.8rem; text-decoration:none; background:none; border:none; font-family:inherit;
//                 }
//                 .login-link:hover { color:#C96A42; }
//                 .login-link.accent { color:#C96A42; font-weight:600; }
//                 .login-link.accent:hover { color:#A3512F; }
//             `}</style>

//       <div className="login-page">
//         <motion.form
//           onSubmit={onSubmitHandler}
//           style={{
//             background: "#F7EFE6",
//             border: "1.5px solid #EDD8C4",
//             borderRadius: 20,
//             padding: "2.5rem 2rem",
//             width: "100%",
//             maxWidth: 420,
//             boxShadow: "0 8px 40px rgba(61,35,24,0.12)",
//             display: "flex",
//             flexDirection: "column",
//             gap: 16,
//           }}
//           initial={{ opacity: 0, y: 40, scale: 0.97 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//         >
//           {/* Title */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               marginBottom: 8,
//             }}
//           >
//             <h1
//               style={{
//                 fontFamily: "'Georgia',serif",
//                 fontSize: "2rem",
//                 color: "#7A4A38",
//                 margin: 0,
//                 lineHeight: 1,
//               }}
//             >
//               {currentState}
//             </h1>
//             <motion.span
//               style={{
//                 flex: 1,
//                 height: 2,
//                 background: "linear-gradient(90deg,#C96A42,transparent)",
//                 borderRadius: 2,
//               }}
//               initial={{ scaleX: 0, originX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//           </div>

//           <AnimatePresence>
//             {currentState === "Sign Up" && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.28 }}
//               >
//                 <input
//                   onChange={(e) => setName(e.target.value)}
//                   value={name}
//                   type="text"
//                   className="login-input"
//                   placeholder="Full Name"
//                   required
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             className="login-input"
//             placeholder="Email Address"
//             required
//           />

//           <div style={{ position: "relative" }}>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type={showPassword ? "text" : "password"}
//               className="login-input"
//               style={{ paddingRight: 44 }}
//               placeholder="Password"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               style={{
//                 position: "absolute",
//                 right: 13,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 color: "#7A4A38",
//                 display: "flex",
//                 padding: 0,
//               }}
//             >
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 {showPassword ? (
//                   <>
//                     <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//                     <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//                     <line x1="1" y1="1" x2="23" y2="23" />
//                   </>
//                 ) : (
//                   <>
//                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                     <circle cx="12" cy="12" r="3" />
//                   </>
//                 )}
//               </svg>
//             </button>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: -4,
//             }}
//           >
//             <button type="button" className="login-link">
//               Forgot password?
//             </button>
//             {currentState === "Login" ? (
//               <button
//                 type="button"
//                 onClick={() => setCurrentState("Sign Up")}
//                 className="login-link accent"
//               >
//                 Create account
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setCurrentState("Login")}
//                 className="login-link accent"
//               >
//                 Already have an account?
//               </button>
//             )}
//           </div>

//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileHover={{ scale: loading ? 1 : 1.02 }}
//             whileTap={{ scale: loading ? 1 : 0.97 }}
//             style={{
//               width: "100%",
//               background: loading ? "#EDAC8E" : "#C96A42",
//               color: "#F7EFE6",
//               border: "none",
//               borderRadius: 50,
//               padding: 13,
//               fontSize: "0.82rem",
//               fontWeight: 700,
//               letterSpacing: "0.12em",
//               textTransform: "uppercase",
//               cursor: loading ? "not-allowed" : "pointer",
//               marginTop: 6,
//               boxShadow: "0 4px 16px rgba(201,106,66,0.3)",
//               fontFamily: "inherit",
//               transition: "background 0.2s",
//             }}
//           >
//             {loading
//               ? "Please wait…"
//               : currentState === "Login"
//                 ? "Sign In"
//                 : "Create Account"}
//           </motion.button>
//         </motion.form>
//       </div>
//     </>
//   );
// };

// export default Login;















import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const EyeIcon = ({ show }) => show ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const Login = () => {
  const [mode, setMode] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const payload = mode === "Sign Up" ? { name, email, password } : { email, password };
      const res = await axios.post(backendUrl + endpoint, payload);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success(mode === "Sign Up" ? "Welcome to Forever! 🎉" : "Welcome back! 👋");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) navigate("/"); }, [token]);
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (!token && saved) setToken(saved);
  }, []);

  return (
    <>
      <style>{`
        .login-page {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(201,106,66,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(143,168,136,0.06) 0%, transparent 50%),
            var(--cream);
          position: relative;
          overflow: hidden;
        }
        /* Decorative large circle */
        .login-page::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          border: 1px solid rgba(201,106,66,0.08);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .login-page::after {
          content: '';
          position: absolute;
          width: 900px;
          height: 900px;
          border-radius: 50%;
          border: 1px solid rgba(201,106,66,0.04);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .login-card {
          background: rgba(250,247,242,0.85);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1.5px solid rgba(212,197,176,0.6);
          border-radius: var(--radius-xl);
          padding: clamp(2rem, 5vw, 3rem) clamp(2rem, 5vw, 2.75rem);
          width: 100%;
          max-width: 440px;
          box-shadow: 0 32px 80px rgba(44,24,16,0.14), 0 2px 0 rgba(255,255,255,0.6) inset;
          position: relative;
          z-index: 1;
        }
        .login-tab-row {
          display: flex;
          background: var(--cream-dark);
          border-radius: var(--radius-full);
          padding: 4px;
          margin-bottom: 2rem;
        }
        .login-tab {
          flex: 1;
          padding: 9px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-align: center;
          cursor: pointer;
          border: none;
          background: transparent;
          color: var(--mist);
          border-radius: var(--radius-full);
          transition: all 0.22s ease;
        }
        .login-tab.active {
          background: white;
          color: var(--espresso);
          box-shadow: 0 2px 8px rgba(44,24,16,0.1);
        }
        .login-field { margin-bottom: 14px; }
        .login-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 6px;
        }
        .login-input {
          width: 100%;
          background: white;
          border: 1.5px solid var(--cream-deeper);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--espresso);
          outline: none;
          transition: all 0.18s ease;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: var(--mist); }
        .login-input:focus {
          border-color: var(--terra);
          box-shadow: 0 0 0 3px rgba(201,106,66,0.1);
          background: white;
        }
        .login-submit {
          width: 100%;
          background: var(--espresso);
          color: var(--cream);
          border: none;
          border-radius: var(--radius-full);
          padding: 14px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.22s ease;
          box-shadow: 0 4px 20px rgba(44,24,16,0.22);
        }
        .login-submit:hover:not(:disabled) {
          background: var(--terra);
          box-shadow: var(--shadow-terra);
          transform: translateY(-1px);
        }
        .login-submit:disabled {
          background: var(--sand);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        .login-footer-text {
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--mist);
          text-align: center;
          margin-top: 16px;
        }
        .login-footer-link {
          color: var(--terra);
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.78rem;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>

      <div className="login-page">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <motion.p
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 6 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            >
              Welcome to Forever
            </motion.p>
            <motion.h1
              style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--espresso)', margin: 0, letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              {mode === "Login" ? "Sign In" : "Create Account"}
            </motion.h1>
          </div>

          {/* Tab switcher */}
          <div className="login-tab-row">
            {["Login", "Sign Up"].map(t => (
              <button key={t} className={`login-tab${mode === t ? ' active' : ''}`} onClick={() => setMode(t)}>
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit}>
            <AnimatePresence>
              {mode === "Sign Up" && (
                <motion.div
                  className="login-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ overflow: 'hidden' }}
                >
                  <label className="login-label">Full Name</label>
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="login-field">
              <label className="login-label">Email Address</label>
              <input
                className="login-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label className="login-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 44 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mist)', display: 'flex', padding: 0 }}
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
            </div>

            {mode === "Login" && (
              <div style={{ textAlign: 'right', marginBottom: 4, marginTop: -6 }}>
                <button type="button" style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--mist)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              className="login-submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, border: '2px solid rgba(250,247,242,0.4)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Please wait…
                </span>
              ) : mode === "Login" ? "Sign In →" : "Create Account →"}
            </motion.button>
          </form>

          <p className="login-footer-text">
            {mode === "Login" ? "Don't have an account? " : "Already have an account? "}
            <button className="login-footer-link" onClick={() => setMode(mode === "Login" ? "Sign Up" : "Login")}>
              {mode === "Login" ? "Sign up free" : "Sign in"}
            </button>
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--cream-deeper)' }}>
            {['🔒 Secure', '⚡ Fast', '✓ Trusted'].map(b => (
              <span key={b} style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--mist)', fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;