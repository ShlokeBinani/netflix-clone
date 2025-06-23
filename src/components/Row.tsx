import type { Movie } from "../types/Movie";
import { motion, AnimatePresence } from "framer-motion";
import { Thumbnail } from "./Thumbnail";

export const Row = ({
  title,
  movies,
  onAddToMyList,
}: {
  title: string;
  movies: Movie[];
  onAddToMyList?: (movie: Movie) => void;
}) => (
  <div className="my-8">
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-bold text-white mb-4"
    >
      {title}
    </motion.h2>
    <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
      <AnimatePresence>
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Thumbnail movie={movie} onAddToMyList={onAddToMyList} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);
