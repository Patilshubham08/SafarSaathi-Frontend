import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Luggage, Camera, BookOpen, Shirt } from "lucide-react";

const ScrollScenery = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const beachOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
    const mountainOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const cityOpacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

    const suitcaseY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
    const suitcaseScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
    const suitcaseRotate = useTransform(scrollYProgress, [0.1, 0.3], [0, -10]);

    const shirtY = useTransform(scrollYProgress, [0.3, 0.5], [0, -150]);
    const shirtX = useTransform(scrollYProgress, [0.3, 0.5], [0, -100]);
    const shirtOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);

    const cameraY = useTransform(scrollYProgress, [0.4, 0.6], [0, -200]);
    const cameraX = useTransform(scrollYProgress, [0.4, 0.6], [0, 50]);
    const cameraOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);

    const passportY = useTransform(scrollYProgress, [0.5, 0.7], [0, -180]);
    const passportX = useTransform(scrollYProgress, [0.5, 0.7], [0, 120]);
    const passportOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);

    const textOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
    const textScale = useTransform(scrollYProgress, [0.8, 0.95], [0.8, 1]);

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <motion.div style={{ opacity: beachOpacity }} className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Beach"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <motion.div style={{ opacity: mountainOpacity }} className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Mountains"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <motion.div style={{ opacity: cityOpacity }} className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="City"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        style={{ y: suitcaseY, scale: suitcaseScale, rotate: suitcaseRotate }}
                        className="text-white"
                    >
                        <Luggage size={120} strokeWidth={1.5} className="drop-shadow-2xl" />
                    </motion.div>

                    <motion.div
                        style={{ y: shirtY, x: shirtX, opacity: shirtOpacity }}
                        className="absolute text-blue-100"
                    >
                        <Shirt size={40} />
                    </motion.div>

                    <motion.div
                        style={{ y: cameraY, x: cameraX, opacity: cameraOpacity }}
                        className="absolute text-gray-200"
                    >
                        <Camera size={40} />
                    </motion.div>

                    <motion.div
                        style={{ y: passportY, x: passportX, opacity: passportOpacity }}
                        className="absolute text-amber-100"
                    >
                        <BookOpen size={40} />
                    </motion.div>

                    <motion.div
                        style={{ opacity: textOpacity, scale: textScale }}
                        className="absolute text-center"
                    >
                        <h1 className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl">
                            One platform. <br />
                            <span className="text-blue-400">Endless journeys.</span>
                        </h1>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 1 }}
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                >
                    <h2 className="text-white text-6xl md:text-8xl font-black mb-4 tracking-tighter drop-shadow-lg">
                        SafarSaathi
                    </h2>
                    <p className="text-white/80 text-xl font-medium uppercase tracking-widest">
                        Scroll to start your journey
                    </p>
                </motion.div>

                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
                >
                    <div className="w-1 h-12 bg-white/20 rounded-full relative overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 48] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-1/3 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollScenery;
