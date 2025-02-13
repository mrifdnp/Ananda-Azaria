
import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/about.png";
import letter from "../assets/letter.png";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-900 pb-10 min-h-screen">
      <h1 className="my-20 text-center pb-10 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-5xl tracking-tight text-transparent">
        Hi! I got something for you
      </h1>
      <div className="flex flex-wrap justify-center">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-1 flex justify-center items-center"
        >
          <motion.img
            className="rounded-2xl object-cover transform rotate-[-10deg] cursor-pointer scale-50"
            src={aboutImg}
            alt="about"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setIsOpen(true)}
          />
        </motion.div>
      </div>

      {/* Modal untuk menampilkan gambar letter */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-lg font-bold"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <motion.img
              className="rounded-2xl max-w-full max-h-screen"
              src={letter}
              alt="letter"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
