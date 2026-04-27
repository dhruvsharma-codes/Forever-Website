// import React, { useState, useContext, useEffect } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";

// const EyeIcon = ({ show }) =>
//   show ? (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   ) : (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   );

// const ProfilePage = () => {
//   const { token, navigate, backendUrl } = useContext(ShopContext);
//   const [activeTab, setActiveTab] = useState("details");
//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [profileLoading, setProfileLoading] = useState(true);
//   const [profile, setProfile] = useState({ name: "", email: "" });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // Fetch real profile data from backend API
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!token) {
//         setProfileLoading(false);
//         return;
//       }
//       try {
//         const res = await axios.post(
//           `${backendUrl}/api/user/profile`,
//           {},
//           { headers: { token } },
//         );
//         if (res.data.success) {
//           setProfile({ name: res.data.user.name, email: res.data.user.email });
//         }
//       } catch (err) {
//         console.log("Profile fetch error:", err);
//       } finally {
//         setProfileLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [token, backendUrl]);

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword)
//       return toast.error("New passwords do not match");
//     if (passwordData.newPassword.length < 6)
//       return toast.error("Password must be at least 6 characters");

//     let userId = null;
//     try {
//       if (token) {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         userId = payload.id;
//       }
//     } catch (err) {
//       console.log("Token decode error:", err);
//     }

//     if (!userId) return toast.error("Session expired. Please login again.");

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/user/change-password`,
//         {
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword,
//           userId,
//         },
//         { headers: { token } },
//       );
//       if (res.data.success) {
//         toast.success("Password changed successfully!");
//         setPasswordData({
//           currentPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         });
//       } else {
//         toast.error(res.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error changing password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!token)
//     return (
//       <div
//         style={{
//           minHeight: "60vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 16,
//           background: "#F0E8DF",
//         }}
//       >
//         <p style={{ color: "#7A4A38", fontSize: "1rem" }}>
//           Please login to view your profile.
//         </p>
//         <motion.button
//           onClick={() => navigate("/login")}
//           whileHover={{ scale: 1.04 }}
//           whileTap={{ scale: 0.96 }}
//           style={{
//             background: "#C96A42",
//             color: "#F7EFE6",
//             border: "none",
//             borderRadius: 8,
//             padding: "10px 24px",
//             fontSize: "0.85rem",
//             fontWeight: 700,
//             cursor: "pointer",
//           }}
//         >
//           Go to Login
//         </motion.button>
//       </div>
//     );

//   const initials = profile.name
//     ? profile.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2)
//     : profile.email
//       ? profile.email[0].toUpperCase()
//       : "U";

//   const inputBase = {
//     width: "100%",
//     background: "#F7EFE6",
//     border: "1.5px solid #EDD8C4",
//     borderRadius: 8,
//     padding: "0.65rem 2.8rem 0.65rem 1rem",
//     fontSize: "0.88rem",
//     color: "#3D2318",
//     outline: "none",
//     boxSizing: "border-box",
//     fontFamily: "inherit",
//     transition: "border-color 0.2s",
//   };

//   return (
//     <>
//       <style>{`
//                 .pp-tab { flex:1; background:none; border:none; padding:0.9rem 1rem; font-size:0.78rem; font-weight:700; letter-spacing:0.06em; cursor:pointer; color:#7A4A38; transition:color 0.2s, background 0.2s; position:relative; font-family:inherit; }
//                 .pp-tab.active { color:#C96A42; background:rgba(201,106,66,0.06); }
//                 .pp-tab.active::after { content:''; position:absolute; bottom:-1.5px; left:0; right:0; height:2px; background:#C96A42; border-radius:2px 2px 0 0; }
//                 .pp-tab:hover:not(.active) { background:rgba(201,106,66,0.04); color:#B05830; }
//                 .pp-inp:focus { border-color:#C96A42 !important; box-shadow:0 0 0 3px rgba(201,106,66,0.1); }
//                 .pp-inp::placeholder { color:#B0957E; }
//                 .pp-page { min-height:80vh; background:#F0E8DF; padding:3rem 1.5rem; display:flex; justify-content:center; align-items:flex-start; }
//             `}</style>

//       <div className="pp-page">
//         <motion.div
//           style={{
//             background: "#F7EFE6",
//             border: "1.5px solid #EDD8C4",
//             borderRadius: 20,
//             width: "100%",
//             maxWidth: 520,
//             overflow: "hidden",
//           }}
//           initial={{ opacity: 0, y: 40, scale: 0.97 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//         >
//           {/* TOP BANNER */}
//           <div
//             style={{
//               background:
//                 "linear-gradient(130deg,#EDD8C4 0%,#F7EFE6 60%,#C2CDB8 100%)",
//               padding: "2rem 2rem 1.5rem",
//               display: "flex",
//               alignItems: "center",
//               gap: "1.25rem",
//               borderBottom: "1.5px solid #EDD8C4",
//             }}
//           >
//             <motion.div
//               style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: "50%",
//                 background: "#C96A42",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "1.3rem",
//                 fontWeight: 700,
//                 color: "#F7EFE6",
//                 border: "3px solid #F7EFE6",
//                 flexShrink: 0,
//               }}
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 300, delay: 0.25 }}
//             >
//               {profileLoading ? "…" : initials}
//             </motion.div>
//             <div>
//               <p
//                 style={{
//                   fontSize: "1.1rem",
//                   fontWeight: 700,
//                   color: "#3D2318",
//                   margin: 0,
//                 }}
//               >
//                 {profileLoading ? "Loading…" : profile.name || "My Account"}
//               </p>
//               <p style={{ fontSize: "0.8rem", color: "#7A4A38", marginTop: 3 }}>
//                 {profileLoading ? "" : profile.email}
//               </p>
//             </div>
//           </div>

//           {/* TABS */}
//           <div style={{ display: "flex", borderBottom: "1.5px solid #EDD8C4" }}>
//             {[
//               ["details", "LOGIN DETAILS"],
//               ["password", "CHANGE PASSWORD"],
//             ].map(([tab, label]) => (
//               <button
//                 key={tab}
//                 className={`pp-tab ${activeTab === tab ? "active" : ""}`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* BODY */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               style={{ padding: "2rem" }}
//               initial={{ opacity: 0, x: activeTab === "details" ? -20 : 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: activeTab === "details" ? 20 : -20 }}
//               transition={{ duration: 0.25, ease: "easeInOut" }}
//             >
//               {/* ── LOGIN DETAILS TAB ── */}
//               {activeTab === "details" && (
//                 <div>
//                   {[
//                     { label: "Full Name", value: profile.name || "—" },
//                     { label: "Email Address", value: profile.email || "—" },
//                     {
//                       label: "Account Status",
//                       value: (
//                         <span
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 8,
//                           }}
//                         >
//                           <span
//                             style={{
//                               width: 8,
//                               height: 8,
//                               borderRadius: "50%",
//                               background: "#5CB85C",
//                               display: "inline-block",
//                             }}
//                           />
//                           Active
//                         </span>
//                       ),
//                     },
//                     { label: "Login Method", value: "Email & Password" },
//                   ].map(({ label, value }, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.06 }}
//                     >
//                       <p
//                         style={{
//                           fontSize: "0.72rem",
//                           fontWeight: 700,
//                           letterSpacing: "0.1em",
//                           color: "#C96A42",
//                           textTransform: "uppercase",
//                           marginBottom: 6,
//                         }}
//                       >
//                         {label}
//                       </p>
//                       <div
//                         style={{
//                           fontSize: "0.9rem",
//                           color: "#3D2318",
//                           background: "#F0E8DF",
//                           border: "1.5px solid #EDD8C4",
//                           borderRadius: 8,
//                           padding: "0.65rem 1rem",
//                           marginBottom: "1.25rem",
//                         }}
//                       >
//                         {value}
//                       </div>
//                     </motion.div>
//                   ))}

//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 10,
//                       background: "rgba(201,106,66,0.07)",
//                       border: "1px solid rgba(201,106,66,0.22)",
//                       borderRadius: 8,
//                       padding: "10px 14px",
//                       marginBottom: "1.5rem",
//                     }}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="#C96A42"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       style={{ flexShrink: 0 }}
//                     >
//                       <circle cx="12" cy="12" r="10" />
//                       <line x1="12" y1="8" x2="12" y2="12" />
//                       <line x1="12" y1="16" x2="12.01" y2="16" />
//                     </svg>
//                     <p
//                       style={{
//                         fontSize: "0.78rem",
//                         color: "#7A4A38",
//                         lineHeight: 1.5,
//                         margin: 0,
//                       }}
//                     >
//                       Use the "Change Password" tab to update your login
//                       password.
//                     </p>
//                   </div>

//                   <motion.button
//                     onClick={() => setActiveTab("password")}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     style={{
//                       width: "100%",
//                       background: "#C96A42",
//                       color: "#F7EFE6",
//                       border: "none",
//                       borderRadius: 8,
//                       padding: "0.75rem",
//                       fontSize: "0.85rem",
//                       fontWeight: 700,
//                       letterSpacing: "0.08em",
//                       cursor: "pointer",
//                       fontFamily: "inherit",
//                     }}
//                   >
//                     Change Password →
//                   </motion.button>
//                 </div>
//               )}

//               {/* ── CHANGE PASSWORD TAB ── */}
//               {activeTab === "password" && (
//                 <form onSubmit={handlePasswordChange}>
//                   {[
//                     {
//                       label: "Current Password",
//                       key: "currentPassword",
//                       show: showCurrent,
//                       toggle: () => setShowCurrent(!showCurrent),
//                     },
//                     {
//                       label: "New Password",
//                       key: "newPassword",
//                       show: showNew,
//                       toggle: () => setShowNew(!showNew),
//                       hint: "Minimum 6 characters",
//                     },
//                     {
//                       label: "Confirm New Password",
//                       key: "confirmPassword",
//                       show: showConfirm,
//                       toggle: () => setShowConfirm(!showConfirm),
//                     },
//                   ].map(({ label, key, show, toggle, hint }, i) => (
//                     <motion.div
//                       key={key}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.07 }}
//                     >
//                       <p
//                         style={{
//                           fontSize: "0.72rem",
//                           fontWeight: 700,
//                           letterSpacing: "0.1em",
//                           color: "#C96A42",
//                           textTransform: "uppercase",
//                           marginBottom: 6,
//                         }}
//                       >
//                         {label}
//                       </p>
//                       <div
//                         style={{
//                           position: "relative",
//                           marginBottom: hint ? 6 : "1.25rem",
//                         }}
//                       >
//                         <input
//                           type={show ? "text" : "password"}
//                           className="pp-inp"
//                           style={inputBase}
//                           placeholder={`Enter ${label.toLowerCase()}`}
//                           value={passwordData[key]}
//                           onChange={(e) =>
//                             setPasswordData({
//                               ...passwordData,
//                               [key]: e.target.value,
//                             })
//                           }
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={toggle}
//                           style={{
//                             position: "absolute",
//                             right: 12,
//                             top: "50%",
//                             transform: "translateY(-50%)",
//                             background: "none",
//                             border: "none",
//                             cursor: "pointer",
//                             color: "#7A4A38",
//                             display: "flex",
//                             padding: 0,
//                           }}
//                         >
//                           <EyeIcon show={show} />
//                         </button>
//                       </div>
//                       {hint && (
//                         <p
//                           style={{
//                             fontSize: "0.75rem",
//                             color: "#98A98E",
//                             marginBottom: "1.25rem",
//                           }}
//                         >
//                           {hint}
//                         </p>
//                       )}
//                       {key === "confirmPassword" &&
//                         passwordData.confirmPassword && (
//                           <motion.p
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             style={{
//                               fontSize: "0.75rem",
//                               color:
//                                 passwordData.newPassword ===
//                                 passwordData.confirmPassword
//                                   ? "#5CB85C"
//                                   : "#C96A42",
//                               marginTop: -8,
//                               marginBottom: "1.25rem",
//                             }}
//                           >
//                             {passwordData.newPassword ===
//                             passwordData.confirmPassword
//                               ? "✓ Passwords match"
//                               : "✗ Passwords do not match"}
//                           </motion.p>
//                         )}
//                     </motion.div>
//                   ))}

//                   <motion.button
//                     type="submit"
//                     disabled={loading}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     style={{
//                       width: "100%",
//                       background: loading ? "#EDAC8E" : "#C96A42",
//                       color: "#F7EFE6",
//                       border: "none",
//                       borderRadius: 8,
//                       padding: "0.75rem",
//                       fontSize: "0.85rem",
//                       fontWeight: 700,
//                       letterSpacing: "0.08em",
//                       cursor: loading ? "not-allowed" : "pointer",
//                       marginTop: 4,
//                       fontFamily: "inherit",
//                       transition: "background 0.2s",
//                     }}
//                   >
//                     {loading ? "Updating…" : "Update Password"}
//                   </motion.button>
//                 </form>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;






import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const EyeIcon = ({ show }) => show ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const ProfilePage = () => {
  const { token, navigate, backendUrl } = useContext(ShopContext);
  const [tab, setTab] = useState("details");
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [profileLoading, setProfileLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  useEffect(() => {
    if (!token) { setProfileLoading(false); return; }
    axios.post(`${backendUrl}/api/user/profile`, {}, { headers: { token } })
      .then(res => { if (res.data.success) setProfile({ name: res.data.user.name, email: res.data.user.email }); })
      .catch(err => console.log(err))
      .finally(() => setProfileLoading(false));
  }, [token, backendUrl]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirmPassword) return toast.error("Passwords don't match");
    if (pw.newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    let userId = null;
    try { userId = JSON.parse(atob(token.split(".")[1])).id; } catch {}
    if (!userId) return toast.error("Session expired. Please login again.");
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/user/change-password`, { ...pw, userId }, { headers: { token } });
      if (res.data.success) { toast.success("Password changed successfully!"); setPw({ currentPassword: "", newPassword: "", confirmPassword: "" }); }
      else toast.error(res.data.message || "Something went wrong");
    } catch (err) { toast.error(err.response?.data?.message || "Error changing password"); }
    finally { setLoading(false); }
  };

  if (!token) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ fontSize: "3rem", opacity: 0.35 }}>🔒</div>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--bark)", fontSize: "1rem", fontWeight: 500 }}>Please login to view your profile.</p>
      <motion.button onClick={() => navigate("/login")} className="btn-terra" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        Sign In →
      </motion.button>
    </div>
  );

  const initials = profile.name
    ? profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : profile.email?.[0]?.toUpperCase() || "U";

  const inputStyle = {
    width: "100%", background: "white", border: "1.5px solid var(--cream-deeper)",
    borderRadius: "var(--radius-md)", padding: "12px 44px 12px 16px",
    fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--espresso)",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.18s, box-shadow 0.18s",
  };

  return (
    <>
      <style>{`
        .pp-page { min-height: 80vh; background: radial-gradient(ellipse at 30% 50%, rgba(201,106,66,0.05) 0%, transparent 55%), var(--cream); padding: 3rem 1rem; display: flex; justify-content: center; align-items: flex-start; }
        .pp-card { background: rgba(250,247,242,0.9); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1.5px solid rgba(212,197,176,0.7); border-radius: var(--radius-xl); width: 100%; max-width: 500px; overflow: hidden; box-shadow: var(--shadow-xl); }
        .pp-tab { flex: 1; background: none; border: none; padding: 11px 12px; font-family: var(--font-body); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; color: var(--mist); transition: color 0.2s, background 0.2s; position: relative; }
        .pp-tab.active { color: var(--terra); background: rgba(201,106,66,0.05); }
        .pp-tab.active::after { content: ""; position: absolute; bottom: -1.5px; left: 0; right: 0; height: 2px; background: var(--terra); border-radius: 2px 2px 0 0; }
        .pp-tab:hover:not(.active) { color: var(--bark); background: rgba(201,106,66,0.03); }
        .pp-field-label { font-family: var(--font-body); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--terra); display: block; margin-bottom: 6px; }
        .pp-field-value { font-family: var(--font-body); font-size: 0.9rem; color: var(--espresso); background: var(--cream-dark); border: 1.5px solid var(--cream-deeper); border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 18px; }
        .pp-input-focus:focus { border-color: var(--terra) !important; box-shadow: 0 0 0 3px rgba(201,106,66,0.1) !important; }
        .pp-input-focus::placeholder { color: var(--mist); }
      `}</style>

      <div className="pp-page">
        <motion.div
          className="pp-card"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Banner */}
          <div style={{ background: "linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 50%, var(--bark) 100%)", padding: "2rem 2rem 1.75rem", display: "flex", alignItems: "center", gap: "1.25rem", position: "relative", overflow: "hidden" }}>
            {/* Dot grid */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(250,247,242,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

            <motion.div
              style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--terra)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--cream)", border: "3px solid rgba(250,247,242,0.2)", flexShrink: 0, position: "relative" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.25 }}
            >
              {profileLoading ? "…" : initials}
            </motion.div>

            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--cream)", margin: 0, letterSpacing: "-0.01em" }}>
                {profileLoading ? "Loading…" : profile.name || "My Account"}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(250,247,242,0.6)", marginTop: 3 }}>
                {profileLoading ? "" : profile.email}
              </p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 6, fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, color: "rgba(250,247,242,0.6)", background: "rgba(250,247,242,0.1)", border: "1px solid rgba(250,247,242,0.18)", borderRadius: "var(--radius-full)", padding: "3px 10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Active
              </span>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1.5px solid var(--cream-deeper)", background: "var(--cream)" }}>
            {[["details", "Account Details"], ["password", "Change Password"]].map(([t, label]) => (
              <button key={t} className={`pp-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                {label}
              </button>
            ))}
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              style={{ padding: "2rem" }}
              initial={{ opacity: 0, x: tab === "details" ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === "details" ? 16 : -16 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
            >
              {/* ── Details tab ── */}
              {tab === "details" && (
                <div>
                  {[
                    { label: "Full Name", value: profile.name || "—" },
                    { label: "Email Address", value: profile.email || "—" },
                    { label: "Account Status", value: "✅ Active & Verified" },
                    { label: "Login Method", value: "Email & Password" },
                  ].map(({ label, value }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <label className="pp-field-label">{label}</label>
                      <div className="pp-field-value">{value}</div>
                    </motion.div>
                  ))}

                  <div style={{ background: "rgba(201,106,66,0.06)", border: "1px solid rgba(201,106,66,0.18)", borderRadius: "var(--radius-md)", padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>💡</span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--bark)", lineHeight: 1.55, margin: 0 }}>
                      Use the "Change Password" tab to update your login credentials securely.
                    </p>
                  </div>

                  <motion.button onClick={() => setTab("password")} className="btn-terra" style={{ width: "100%", justifyContent: "center" }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    Change Password →
                  </motion.button>
                </div>
              )}

              {/* ── Password tab ── */}
              {tab === "password" && (
                <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {[
                    { key: "currentPassword", label: "Current Password", showKey: "current", hint: null },
                    { key: "newPassword", label: "New Password", showKey: "new", hint: "Minimum 6 characters" },
                    { key: "confirmPassword", label: "Confirm New Password", showKey: "confirm", hint: null },
                  ].map(({ key, label, showKey, hint }, i) => (
                    <motion.div key={key} style={{ marginBottom: 16 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                      <label className="pp-field-label">{label}</label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPw[showKey] ? "text" : "password"}
                          className="pp-input-focus"
                          style={inputStyle}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          value={pw[key]}
                          onChange={e => setPw(prev => ({ ...prev, [key]: e.target.value }))}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(prev => ({ ...prev, [showKey]: !prev[showKey] }))}
                          style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--mist)", display: "flex", padding: 0 }}
                        >
                          <EyeIcon show={showPw[showKey]} />
                        </button>
                      </div>
                      {hint && <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--mist)", marginTop: 4 }}>{hint}</p>}
                      {key === "confirmPassword" && pw.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", marginTop: 4, color: pw.newPassword === pw.confirmPassword ? "#4a7c59" : "#ef4444", fontWeight: 600 }}
                        >
                          {pw.newPassword === pw.confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="btn-terra"
                    style={{ width: "100%", justifyContent: "center", marginTop: 8, opacity: loading ? 0.75 : 1 }}
                    whileHover={!loading ? { scale: 1.01 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 14, height: 14, border: "2px solid rgba(250,247,242,0.4)", borderTopColor: "var(--cream)", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                        Updating…
                      </>
                    ) : "Update Password"}
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