import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            // Small stagger makes the dots follow each other closely
            staggerChildren: 0.1,
        },
    },
};

const dotVariants: Variants = {
    initial: { y: 0, opacity: 0.3, scale: 0.7 },
    animate: {
        // We use a slightly longer duration (0.5s) but snappy easing
        y: [0, -10, 0],
        opacity: [0.3, 1, 0.3],
        scale: [0.7, 1, 0.7],
        transition: {
            duration: 0.5,
            repeat: Infinity,
            // "circIn" or "easeOut" makes the "pop" feel more intentional
            ease: "easeInOut",
            // This ensures the loop repeats exactly where it started
            repeatDelay: 0.2,
        },
    },
};

export default function SmoothLoader() {
    return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 rounded-[2.5rem] p-10">
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex space-x-2"
            >
                {/* Using a single color and consistent glow for a "cleaner" look */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        variants={dotVariants}
                        className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                    />
                ))}
            </motion.div>
        </div>
    );
}
