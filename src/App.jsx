import React from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
function App() {
  return (
    <div>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <MovieProvider>
          <NavBar />
          <main className="p-6">
            <div className="movies-panel">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Favorites" element={<Favorites />} />
              </Routes>
            </div>
          </main>
        </MovieProvider>
      </div>
    </div>
  );
}

export default App;
