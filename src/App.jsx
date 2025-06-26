import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import "./index.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const images = [1, 2, 3, 4, 5, 6];
    setShuffledImages(images.sort(() => 0.5 - Math.random()));
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
      {/* Favicon handled via public/favicon.ico */}

      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#home"
            className="text-2xl font-bold hover:text-black transition"
          >
            Thiru Thodangi
          </a>
          <ul className="flex gap-6 font-medium text-sm md:text-base">
            <li><a href="#home" className="hover:text-black">Home</a></li>
            <li><a href="#about" className="hover:text-black">About</a></li>
            <li><a href="#gallery" className="hover:text-black">Gallery</a></li>
            <li><a href="#contact" className="hover:text-black">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col md:flex-row px-6 md:px-16 py-16 bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <div className="md:w-1/2 flex flex-col justify-center pr-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            A Fresh Face with Fierce Passion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-gray-700"
          >
            I’m <strong>Thiru Thodangi</strong> — an aspiring model with bold energy and a story to tell. Open to brand shoots, editorials and collabs.
          </motion.p>
          <motion.a
            href="#gallery"
            className="mt-6 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition text-sm font-semibold w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            View Portfolio
          </motion.a>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="h-full w-full overflow-hidden rounded-3xl shadow-2xl">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 1800, disableOnInteraction: false }}
              loop
              className="h-full w-full"
            >
              {shuffledImages.map((img) => (
                <SwiperSlide key={img}>
                  <motion.img
                    src={`/gallery/${img}.webp`}
                    alt={`Thiru ${img}`}
                    className="w-full h-[75vh] object-cover"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src={`/gallery/${shuffledImages[0] || 1}.webp`}
          alt="Thiru profile"
          className="rounded-2xl shadow-lg w-full object-cover"
          loading="lazy"
        />
        <div>
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            I'm <strong>Thiru Thodangi</strong>, a fresh model breaking into fashion with creativity and confidence. I bring raw talent, bold presence, and expressive energy to every shoot. If you’re looking for a unique edge—let’s make something remarkable.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-6 md:px-10 lg:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shuffledImages.map((img) => (
            <motion.img
              key={img}
              src={`/gallery/${img}.webp`}
              alt={`Thiru ${img}`}
              loading="lazy"
              className="w-full h-[300px] object-cover rounded-xl shadow-md transition-all duration-500 ease-in-out"
              style={{ filter: "blur(10px)" }}
              onLoad={(e) => (e.currentTarget.style.filter = "none")}
            />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Let’s Collaborate</h2>
          <p className="text-lg text-gray-600">
            I'm open to brand work, lookbooks, creative shoots, and campaigns. Drop me a message and let’s make something iconic.
          </p>
          <div className="text-gray-700 space-y-2">
            <p className="flex items-center gap-3"><FaInstagram /> @mr_thiru_2002</p>
            <p className="flex items-center gap-3"><FaEnvelope /> thiruthodangi@gmail.com</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-lg">
          {sent ? (
            <p className="text-green-500 text-lg text-center">Message sent successfully!</p>
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
          <a href="https://instagram.com/mr_thiru_2002" target="_blank" className="hover:text-black inline-flex items-center gap-1">
            <FaInstagram /> @mr_thiru_2002
          </a>
          |
          <a href="mailto:thiruthodangi@gmail.com" className="hover:text-black inline-flex items-center gap-1">
            <FaEnvelope /> thiruthodangi@gmail.com
          </a>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} Thiru Thodangi. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
