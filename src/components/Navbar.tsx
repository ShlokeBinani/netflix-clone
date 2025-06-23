import type { Movie } from "../types/Movie";
import { FaFilm } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type NavbarProps = {
  search: string;
  setSearch: (val: string) => void;
  filteredMovies: Movie[];
  onMovieSelect: (movie: Movie) => void;
};

export const Navbar = ({
  search,
  setSearch,
  filteredMovies,
  onMovieSelect,
}: NavbarProps) => {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-black text-white sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <FaFilm size={36} color="red" />
        <span className="text-2xl font-bold">NETFLIX</span>
      </div>
      {/* Search Bar with Dropdown */}
      <div className="relative flex-1 flex justify-center">
        <motion.input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white outline-none w-72 border border-gray-700 focus:border-red-500 transition-all duration-200"
          whileFocus={{ scale: 1.04, boxShadow: "0 0 0 2px #ef4444" }}
        />
        <div className="absolute top-full left-0 w-full pt-1 z-50">
          <AnimatePresence>
            {search && (
              <motion.ul
                className="bg-gray-900 rounded shadow-lg max-h-60 overflow-y-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1 }}
              >
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => ( // <-- REMOVE "1000"!
                    <motion.li
                      key={movie.id}
                      onClick={() => {
                        setSearch(movie.title || movie.name || "");
                        onMovieSelect(movie);
                      }}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      whileHover={{ scale: 1.02, backgroundColor: "#ef4444" }}
                    >
                      {movie.title || movie.name}
                    </motion.li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400">No results</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Sign In Button */}
      <div className="flex-shrink-0">
        <motion.button
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
      </div>
    </nav>
  );
};
