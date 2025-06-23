import type { Movie } from "../types/Movie";
import { motion } from "framer-motion";

export const Hero = ({ movie }: { movie: Movie }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", damping: 15, stiffness: 120 }}
    className="relative h-[90vh]"
  >
    <img
      className="w-full h-full object-cover"
      src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
      alt={movie?.title || movie?.name || ""}
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl font-bold text-white"
      >
        {movie?.title || movie?.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-white mt-2 max-w-md"
      >
        {movie?.overview}
      </motion.p>
    </div>
  </motion.div>
);
