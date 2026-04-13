import { assets } from "../assets/assets";
import ContactForm from "../Components/Contactform";
import Newsletter from "../Components/Newsletter";
import Title from "../Components/Title";
import { motion } from "framer-motion";

const Contact = () => (
  <>
    <style>{`
            .contact-page { padding-bottom:2rem; }
            .contact-header { padding-top:2.5rem; border-top:2px solid #EDD8C4; text-align:center; margin-bottom:1rem; }
            .contact-img { border-radius:16px; object-fit:cover; box-shadow:0 12px 40px rgba(61,35,24,0.15); }
            .contact-card { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:16px; padding:2rem 2.5rem; display:flex; flex-direction:column; gap:1.2rem; box-shadow:0 4px 16px rgba(61,35,24,0.07); align-self:flex-start; }
            .contact-store { color:#7A4A38; font-size:1rem; font-weight:700; letter-spacing:0.04em; }
            .contact-detail { color:#98A98E; font-size:0.86rem; line-height:1.8; }
            .contact-hr { width:100%; height:1px; background:#EDD8C4; border:none; margin:4px 0; }
            .explore-btn { display:inline-flex; align-items:center; gap:10px; background:transparent; color:#C96A42; border:2px solid #C96A42; padding:12px 28px; font-size:0.78rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; border-radius:50px; cursor:pointer; transition:background 0.3s, color 0.3s, transform 0.2s; align-self:flex-start; font-family:inherit; }
            .explore-btn:hover { background:#C96A42; color:#F7EFE6; transform:translateY(-2px); }

            /* Divider between sections */
            .contact-section-divider {
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, #EDD8C4, transparent);
                margin: 2.5rem 0;
            }
        `}</style>

    <div className="contact-page">
      {/* ── HEADER ── */}
      <div className="contact-header">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* ── STORE INFO + IMAGE ── */}
      <div className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-12 items-start">
        <motion.img
          className="w-full md:max-w-[460px] contact-img"
          src={assets.contact_img}
          alt="contact"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="contact-card flex-1"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="contact-store">Our Store</p>
          <p className="contact-detail">
            857 Munda Mazra
            <br />
            YamunaNagar, Haryana, India
          </p>
          <hr className="contact-hr" />
          <p className="contact-detail">
            <span style={{ color: "#C96A42", fontWeight: 600 }}>Phone:</span>{" "}
            +91 8053103060
          </p>
          <p className="contact-detail">
            <span style={{ color: "#C96A42", fontWeight: 600 }}>Email:</span>{" "}
            forever@shop.com
          </p>
          <p className="contact-detail">
            <span style={{ color: "#C96A42", fontWeight: 600 }}>Hours:</span>{" "}
            Mon–Sat, 9am – 8pm
          </p>
          <hr className="contact-hr" />
          <p className="contact-store">Careers at Forever</p>
          <p className="contact-detail">
            Learn more about our teams and job openings.
          </p>
          <motion.button className="explore-btn" whileTap={{ scale: 0.96 }}>
            Explore Jobs →
          </motion.button>
        </motion.div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="contact-section-divider" />

      {/* ── CONTACT FORM ── */}
      <ContactForm />

      {/* ── NEWSLETTER ── */}
      <Newsletter />
    </div>
  </>
);

export default Contact;
