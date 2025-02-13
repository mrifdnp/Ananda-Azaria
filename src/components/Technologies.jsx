import { RiReactjsLine } from "react-icons/ri";
import { FaLaravel, FaNodeJs, FaFlutter } from "react-icons/fa6";
import { TbBrandKotlin, TbBrandNextjs } from "react-icons/tb";
import { motion } from "framer-motion";

const iconVariants = (duration) => ({
    initial: { y: -10 },
    animate: {
        y: [10, -10],
        transition: {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
});

const technologies = [
    { icon: <RiReactjsLine className="text-7xl text-cyan-400" />, link: "https://react.dev/" },
    { icon: <TbBrandKotlin className="text-7xl text-purple-400" />, link: "https://kotlinlang.org/" },
    { icon: <FaLaravel className="text-7xl text-red-600" />, link: "https://laravel.com/" },
    { icon: <TbBrandNextjs className="text-7xl text-slate-100" />, link: "https://nextjs.org/" },
    { icon: <FaNodeJs className="text-7xl text-green-500" />, link: "https://nodejs.org/" },
    { icon: <FaFlutter className="text-7xl text-cyan-400" />, link: "https://flutter.dev/" }
];

const Technologies = () => {
    return (
        <div className="border-b border-neutral-900 pb-24">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.5 }}
                className="my-20 text-center text-4xl">
                Technologies
            </motion.h1>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                className="flex flex-wrap items-center justify-center gap-4">
                {technologies.map((tech, index) => (
                    <motion.a
                        key={index}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={iconVariants(index + 2)}
                        initial="initial"
                        animate="animate"
                        className="rounded-2xl border-4 border-neutral-800 p-4 hover:scale-110 transition-transform">
                        {tech.icon}
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
};

export default Technologies;
