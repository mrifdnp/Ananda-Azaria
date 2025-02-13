import { useState } from "react";
import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const Experience = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Moments
      </motion.h1>

      <div>
        {EXPERIENCES.map((experience, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4"
            >
              <p className="mb-2 text-sm text-neutral-900">{experience.year}</p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold">
                {experience.role} -{" "}
                <span className="text-sm text-purple-900">
                  {experience.company}
                </span>
              </h6>
              <p className="mb-4 text-neutral-900">{experience.description}</p>

              {/* Grid untuk menampilkan gambar dan video */}
              {experience.media && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-3">
                  {experience.media.map((mediaSrc, mediaIndex) => (
                    <motion.div key={mediaIndex} whileHover={{ scale: 1.1 }}>
                      {mediaSrc.endsWith(".mp4") ? (
                        <video
                          src={mediaSrc}
                          className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer"
                          onClick={() => {
                            setSelectedMedia(mediaSrc);
                            setIsVideo(true);
                          }}
                          muted
                          loop
                          autoPlay
                        />
                      ) : (
                        <img
                          src={mediaSrc}
                          alt={`moment-${index}-${mediaIndex}`}
                          className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer"
                          onClick={() => {
                            setSelectedMedia(mediaSrc);
                            setIsVideo(false);
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Modal untuk menampilkan media yang diperbesar */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative">
            {isVideo ? (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl"
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Expanded"
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl"
              />
            )}
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 text-lg font-bold shadow-md"
              onClick={() => setSelectedMedia(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
