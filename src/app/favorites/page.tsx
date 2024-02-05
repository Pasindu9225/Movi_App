"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useAtom } from "jotai";
import { favoritemoviesAtom } from "../atom";
import { MovieType } from "../Type";

const FavoriteMoviesPage = () => {
  const [favoritemovies, setfavoritemovies] = useAtom(favoritemoviesAtom);

  function addToFavorite(d: MovieType) {
    setfavoritemovies((prev) => [...prev, d]);
  }

  function removeFavorite(d: MovieType) {
    setfavoritemovies((prev) => prev.filter((movie) => movie.id !== d.id));
  }

  console.log("favoritemovies:", favoritemovies);

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
      <Navbar />

      <section className="flex flex-wrap gap-3 justify-between">
        {favoritemovies?.map((d, i) => (
          <Card
            addToFavorite={() => addToFavorite(d)}
            removeFavorite={() => removeFavorite(d)}
            d={d}
            id={d.id}
            key={i}
            movieImg={d.image?.original || ""} // Handle potential undefined
            name={d.name}
            rating={d.rating?.average || 0} // Handle potential undefined
            year={d.premiered || ""}
          />
        ))}
      </section>
    </main>
  );
};

export default FavoriteMoviesPage;
