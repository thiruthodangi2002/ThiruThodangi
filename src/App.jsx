import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import emailjs from "emailjs-com";
import "./index.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [longHairImages, setLongHairImages] = useState([]);
  const [shortHairImages, setShortHairImages] = useState([]);
  const [navOpen, setNavOpen] = useState(false);
  const [showLongHair, setShowLongHair] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const username = "thiruthodangi2002";
    const repo = "ThiruThodangi";
    const folder = "gallery";

    fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}`)
      .then((res) => res.json())
      .then((data) => {
        const longHair = [];
        const shortHair = [];

        data.forEach((file) => {
          if (file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            const imageUrl = `https://cdn.jsdelivr.net/gh/${username}/${repo}/${folder}/${file.name}`;
            if (file.name.toLowerCase().includes("long")) {
              longHair.push(imageUrl);
            } else if (file.name.toLowerCase().includes("short")) {
              shortHair.push(imageUrl);
            }
          }
        });

        setLongHairImages(longHair);
        setShortHairImages(shortHair);
      })
      .catch((err) => console.error("Failed to fetch images:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_svc5v1n",
        "template_lyq1cjh",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "TClvfqrzHuKZejqA3"
      )
      .then(() => {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Failed to send. Try again later.");
      });
  };

  return (
    <div className="bg-white text-gray-800 font-poppins">
      {/* Navbar */}
      <header className="sticky top-0 bg-white shadow-md z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#home"
            className="text-2xl font-bold hover:text-black transition"
          >
            Thiru Thodangi
          </a>
          <div className="md:hidden">
            <button onClick={() => setNavOpen(!navOpen)} className="text-2xl">
              {navOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <ul
            className={`md:flex gap-6 font-medium text-sm md:text-base absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ${
              navOpen ? "flex flex-col items-center z-40" : "hidden md:flex"
            }`}
          >
            <li>
              <a
                href="#home"
                onClick={() => setNavOpen(false)}
                className="hover:text-black py-2 px-4 block"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => setNavOpen(false)}
                className="hover:text-black py-2 px-4 block"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={() => setNavOpen(false)}
                className="hover:text-black py-2 px-4 block"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setNavOpen(false)}
                className="hover:text-black py-2 px-4 block"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-[92vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(https://cdn.jsdelivr.net/gh/thiruthodangi2002/ThiruThodangi/gallery/short4.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        {/* Centered Text */}
        <div className="relative z-20 text-center px-4 md:px-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-3xl md:text-5xl font-extrabold"
          >
            A Fresh Face with Fierce Passion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-3 text-base md:text-xl"
          >
            I’m <strong>Thiru Thodangi</strong> — aspiring model open to brand
            shoots, editorials, and collabs.
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/thiruthodangi2002/ThiruThodangi/gallery/short3.webp"
          alt="Thiru profile"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
        <div>
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            I'm <strong>Thiru Thodangi</strong>, a fresh model breaking into
            fashion with creativity and confidence. I bring raw talent, bold
            presence, and expressive energy to every shoot. If you’re looking
            for a unique edge—let’s make something remarkable.
          </p>
        </div>
      </section>

      {/* Gallery Toggle */}
      <section
        id="gallery"
        className="py-20 px-6 md:px-10 lg:px-20 bg-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Gallery</h2>
        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setShowLongHair(true)}
            className={`px-4 py-2 rounded-full border ${
              showLongHair ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Long Hair
          </button>
          <button
            onClick={() => setShowLongHair(false)}
            className={`px-4 py-2 rounded-full border ${
              !showLongHair ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Short Hair
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(showLongHair ? longHairImages : shortHairImages).map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Hair ${i}`}
              className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105 "
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12"
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Let’s Collaborate</h2>
          <p className="text-lg text-gray-600">
            I'm open to brand work, lookbooks, creative shoots, and campaigns.
            Drop me a message and let’s make something iconic.
          </p>
          <div className="text-gray-700 space-y-2">
            <p className="flex items-center gap-3">
              <FaInstagram /> @mr_thiru_2002
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope /> thiruthodangi@gmail.com
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-lg">
          {sent ? (
            <p className="text-green-500 text-lg text-center">
              Message sent successfully!
            </p>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-2 border rounded"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-300 text-sm font-medium"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        <div className="space-x-3">
          <a
            href="https://instagram.com/mr_thiru_2002"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black inline-flex items-center gap-1"
          >
            <FaInstagram /> @mr_thiru_2002
          </a>
          |
          <a
            href="mailto:thiruthodangi@gmail.com"
            className="hover:text-black inline-flex items-center gap-1"
          >
            <FaEnvelope /> thiruthodangi@gmail.com
          </a>
        </div>
        <p className="mt-2">
          © {new Date().getFullYear()} Thiru Thodangi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
