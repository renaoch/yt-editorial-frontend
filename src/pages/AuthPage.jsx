import { motion } from "framer-motion";
import { memo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card"; // Shadcn UI components
import WorldMap from "../components/ui/World-map";

const MemoizedWorldMap = memo(WorldMap);

export default function AuthPage() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
    {
      quote:
        "The intuitive interface makes complex tasks simple. Great for growing teams!",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f",
    },
  ];

  const handleLogin = (role) => {
    window.location.href = `${import.meta.env.VITE_BE_URL}/auth/google/${role}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-start relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4" // You can replace this URL with your video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Section */}
      <section className="py-32 text-center px-4 relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Seamless Video Collaboration
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto text-neutral-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Upload videos effortlessly. Collaborate globally. No downloads needed.
        </motion.p>

        <div className="mt-10 flex gap-6 justify-center flex-wrap">
          <motion.button
            onClick={() => handleLogin("creator")}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 text-white font-semibold rounded-xl shadow-md transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Login as Creator
          </motion.button>
          <motion.button
            onClick={() => handleLogin("editor")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-semibold rounded-xl shadow-md transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Login as Editor
          </motion.button>
        </div>
      </section>

      {/* WorldMap Section */}
      <section className="w-full px-4 py-10">
        <h2 className="text-3xl font-semibold text-center mb-4 text-white">
          Work Remotely From Anywhere
        </h2>
        <p className="text-center text-neutral-300 max-w-xl mx-auto mb-8">
          Perfect for creators and editors across the globe. Your studio is now
          online.
        </p>
        <MemoizedWorldMap
          dots={[
            {
              start: { lat: 64.2008, lng: -149.4937 },
              end: { lat: 34.0522, lng: -118.2437 },
            },
            {
              start: { lat: 64.2008, lng: -149.4937 },
              end: { lat: -15.7975, lng: -47.8919 },
            },
            {
              start: { lat: -15.7975, lng: -47.8919 },
              end: { lat: 38.7223, lng: -9.1393 },
            },
            {
              start: { lat: 51.5074, lng: -0.1278 },
              end: { lat: 28.6139, lng: 77.209 },
            },
            {
              start: { lat: 28.6139, lng: 77.209 },
              end: { lat: 43.1332, lng: 131.9113 },
            },
            {
              start: { lat: 28.6139, lng: 77.209 },
              end: { lat: -1.2921, lng: 36.8219 },
            },
          ]}
        />
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-4 py-20 bg-black">
        <h2 className="text-3xl font-semibold text-center mb-10 text-white">
          Trusted by Professionals Worldwide
        </h2>

        <div className="flex gap-10 justify-center flex-wrap"></div>
      </section>

      {/* Footer Section */}
      <section className="w-full px-4 py-10 bg-black text-center text-white">
        <p>&copy; 2025 Your Company. All Rights Reserved.</p>
      </section>
    </div>
  );
}
