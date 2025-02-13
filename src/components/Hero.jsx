/* eslint-disable react/no-unescaped-entities */
import profilePic from "../assets/profile.png";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Array gambar yang akan ditampilkan
const images = [profilePic, img1, img2, img3, img4, img5, img6];

const Hero = () => {
  const [topZIndex, setTopZIndex] = useState(images.length);
  const [positions, setPositions] = useState(
    images.map(() => ({
      x: Math.random() * 200 - 100, // Posisi awal acak X
      y: Math.random() * 200 - 100, // Posisi awal acak Y
      zIndex: 1, // Default zIndex rendah
      rotate: Math.random() * 30 - 15, // Rotasi acak antara -15 hingga 15 derajat
    }))
  );

  const bringToFront = (index) => {
    setTopZIndex(topZIndex + 1);
    setPositions((prev) =>
      prev.map((pos, i) =>
        i === index ? { ...pos, zIndex: topZIndex + 1 } : pos
      )
    );
  };

  const containerRef = useRef(null);
  const [constraints, setConstraints] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setConstraints({
        top: -offsetHeight / 2,
        left: -offsetWidth / 2,
        right: offsetWidth / 2,
        bottom: offsetHeight / 2,
      });
    }
  }, []);

  // Efek mengetik untuk teks
  const fullText =
    " On this special day, I just want to say one thing: I love you today, tomorrow, and forever";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Kecepatan mengetik (50ms per karakter)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1 className="pb-15 text-6xl font-thin tracking-tight lg:mt-16 lg:text-5xl">
              Dear, Nanda
            </motion.h1>
            <motion.span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-5xl tracking-tight text-transparent">
              Happy Valentine's Day
            </motion.span>
            {/* Efek mengetik ditampilkan di sini */}
            <motion.p className="max-w-xl py-5 font-light tracking-tighter">
              {displayedText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1"
              >
                |
              </motion.span>
            </motion.p>
          </div>
        </div>

        {/* Container untuk gambar-gambar dengan drag constraints */}
        <div
          ref={containerRef}
          className="w-full lg:w-1/2 lg:p-8 relative h-[400px] flex justify-center"
        >
          {constraints &&
            images.map((imgSrc, index) => (
              <motion.img
                key={index}
                className="bg-white shadow-lg p-2 rounded-2xl w-[250px] h-[250px] object-cover cursor-pointer absolute"
                drag
                dragConstraints={constraints} // Batas pergerakan
                initial={{ x: positions[index].x, y: positions[index].y, rotate: positions[index].rotate }}
                animate={{ rotate: positions[index].rotate }} // Rotasi tetap ada setelah drag
                style={{ zIndex: positions[index].zIndex }}
                onMouseDown={() => bringToFront(index)}
                src={imgSrc}
                alt={`profile-${index}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
