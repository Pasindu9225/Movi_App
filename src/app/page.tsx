"use client";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { useQuery } from "@tanstack/react-query";
import { MovieType } from "./Type";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favoritemoviesAtom } from "./atom";
export default function Home() {
  const api = "https://api.tvmaze.com/show";

  const [favoritemovies, setfavoritemovies] = useAtom(favoritemoviesAtom);
  const [search, setSearch] = useState("");

  const {
    isLoading,
    error,
    refetch,
    data: movisData,
  } = useQuery<MovieType[]>({
    queryKey: ["singlemovies"],
    queryFn: () => fetch(api).then((res) => res.json()),
  });

  console.log("data-", movisData);

  const data = search
    ? movisData?.filter((d) =>
        d.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : movisData;

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  function addToFavorite(d: MovieType) {
    setfavoritemovies((pre) => [...pre, d]);
  }
  function removeFavorite(d: MovieType) {
    setfavoritemovies((pre) => pre.filter((movie) => movie.id !== d.id));
  }

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="">
      <main className=" max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <Navbar />
        <div className=" max-w-7xl px-2 mx-auto flex flex-col gap-8">
          <Searchbar
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <section className=" flex flex-wrap gap-3 justify-between">
            {data?.map((d, i) => (
              <Card
                addToFavorite={() => addToFavorite(d)}
                removeFavorite={() => removeFavorite(d)}
                d={d}
                id={d.id}
                key={i}
                movieImg={d.image.original}
                name={d.name}
                rating={d.rating.average}
                year={d.premiered}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

// npm i @tanstack/react-query
// npm install react-icons
