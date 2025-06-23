import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImSpinner8 } from "react-icons/im";
import type { Movie } from "./types/Movie";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Row } from "./components/Row";
import { useFetch } from "./hooks/useFetch"; // <-- REMOVE "1000"!
import { TrailerModal } from "./components/TrailerModal";

// Loading Spinner Component
const Loading = () => (
  <motion.div
    className="flex items-center justify-center min-h-screen bg-black text-white text-2xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div // <-- REMOVE "1000"!
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      <ImSpinner8 size={48} />
    </motion.div>
  </motion.div>
);

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [myList, setMyList] = useState<Movie[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const trendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  const actionUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`;

  const { data: trending, loading: loadingTrending } = useFetch(trendingUrl);
  const { data: topRated, loading: loadingTopRated } = useFetch(topRatedUrl);
  const { data: action, loading: loadingAction } = useFetch(actionUrl);

  // Combine all movies for search dropdown
  const allMovies = [...(trending || []), ...(topRated || []), ...(action || [])];
  const filteredMovies = search
    ? allMovies.filter((movie) =>
        (movie.title || movie.name || "").toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle movie selection from dropdown
  const handleMovieSelect = (movie: Movie) => setSelectedMovie(movie);

  // Fetch recommendations when selectedMovie changes
  useEffect(() => {
    if (selectedMovie?.id) {
      const fetchRecommendations = async (id: number) => {
        try {
          const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          setRecommendations(data.results || []);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };
      fetchRecommendations(selectedMovie.id);
    }
  }, [selectedMovie, apiKey]);

  // Smooth scroll to top when movie is selected
  useEffect(() => {
    if (selectedMovie) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedMovie]);

  // Add/remove from My List
  const addToMyList = (movie: Movie) => {
    if (myList.some((m) => m.id === movie.id)) {
      setMyList((prev) => prev.filter((m) => m.id !== movie.id));
      setToastMessage("Removed from your list!");
    } else {
      setMyList((prev) => [...prev, movie]);
      setToastMessage("Added to your list!");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // <-- REMOVE "1000"!
  };

  // Loading state
  if (loadingTrending || loadingTopRated || loadingAction) return <Loading />;
  if (!trending || !topRated || !action)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-2xl">
        Failed to load data.
      </div>
    );

  const heroMovie = selectedMovie || trending[0];
  const filterMovies = (movies: Movie[]) =>
    search
      ? movies.filter((movie) =>
          (movie.title || movie.name || "").toLowerCase().includes(search.toLowerCase())
        )
      : movies;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar at the top */}
      <Navbar
        search={search}
        setSearch={setSearch}
        filteredMovies={filteredMovies}
        onMovieSelect={handleMovieSelect}
      />
      {/* Hero section */}
      <Hero movie={heroMovie as Movie} />
      {/* Movie rows */}
      <div className="p-8">
        <Row title="Trending Now" movies={filterMovies(trending)} onAddToMyList={addToMyList} />
        <Row title="Top Rated" movies={filterMovies(topRated)} onAddToMyList={addToMyList} />
        <Row title="Action Movies" movies={filterMovies(action)} onAddToMyList={addToMyList} />
        {recommendations.length > 0 && (
          <Row title="Because you watched..." movies={recommendations} onAddToMyList={addToMyList} />
        )}
        {myList.length > 0 && (
          <Row title="My List" movies={myList} onAddToMyList={addToMyList} />
        )}
      </div>
      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Trailer modal */}
      {showTrailer && selectedMovie && (
        <TrailerModal movie={selectedMovie} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
}
