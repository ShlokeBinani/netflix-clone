import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";

type TrailerModalProps = {
  movie: { id: number; title?: string; name?: string };
  onClose: () => void;
};

export const TrailerModal = ({ movie, onClose }: TrailerModalProps) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const trailer = data.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
    fetchTrailerKey();
  }, [movie.id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="relative w-4/5 max-w-4xl bg-black rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-2xl hover:text-red-500 z-10"
          >
            ×
          </button>
          {trailerKey ? (
            <YouTube videoId={trailerKey} opts={{ height: "390", width: "100%" }} />
          ) : (
            <div className="text-white text-center p-8">Trailer not available</div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
