import { useState } from "react";
import { motion } from "framer-motion";
import type { Movie } from "../types/Movie";
import { TrailerModal } from "./TrailerModal";

export const Thumbnail = ({
  movie,
  onAddToMyList,
}: {
  movie: Movie;
  onAddToMyList?: (movie: Movie) => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <>
      <motion.div
        className="relative min-w-[180px] rounded overflow-hidden shadow-lg bg-gray-900 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)} // <-- REMOVE "1000"!
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239,68,68,0.5)" }}
        whileTap={{ scale: 0.98 }}
      >
        <img
          className="w-full h-auto object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name || ""}
        />
        {showDetails && (
          <div
            className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-end p-4 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2">{movie.title || movie.name}</h3>
            <p className="text-xs mb-4">{movie.overview?.slice(0, 100)}...</p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // <-- REMOVE "1000"!
                  setShowTrailer(true);
                }}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Watch Trailer
              </button>
              {onAddToMyList && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToMyList(movie);
                  }}
                  className="px-3 py-1 bg-gray-800 text-white rounded flex items-center gap-1"
                >
                  <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    +
                  </motion.span>
                  My List
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
      {showTrailer && (
        <TrailerModal movie={movie} onClose={() => setShowTrailer(false)} />
      )}
    </>
  );
};
