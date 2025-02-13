
import { motion } from "framer-motion";
import collage from "../assets/collage.jpg";

const Contact = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h1 
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="my-20 text-center text-4xl"
      >
        Special Mention
      </motion.h1>
      <div className="flex flex-wrap justify-center">
             <motion.div
               whileInView={{ opacity: 1, x: 0 }}
               initial={{ opacity: 0, x: -100 }}
               transition={{ duration: 0.5 }}
               className="w-full lg:w-1/2 lg:p-1 flex justify-center items-center"
             >
               <motion.img
                 className="rounded-2xl object-cover transform rotate-[-10deg] cursor-pointer scale-50"
                 src={collage}
                 alt="about"
                 animate={{ scale: [1, 1.05, 1] }}
              
                 whileHover={{ scale: 1.2 }}
                
               />
             </motion.div>
           </div>
      <div>
      </div>
    </div>
  );
};

export default Contact;
