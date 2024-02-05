/** @format */
"use client";

import React from "react";
import { MovieType } from "../Type";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Image from "next/image";
import parse from "html-react-parser";
import dateFormat from "dateformat";
import { FaStar } from "react-icons/fa6";

type Props = {};

// ... (previous imports and code)

export default function MoviPage({
  params,
}: {
  params: { movie: string | number };
}) {
  const api = "https://api.tvmaze.com/show";

  const { isLoading, error, data } = useQuery<MovieType>({
    queryKey: ["movies"],
    queryFn: () =>
      fetch(`https://api.tvmaze.com/shows/${params.movie}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Check if data and data.image are defined before accessing 'original'
  const imageUrl = data?.image?.original || "";

  return (
    <div>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <Navbar />
        <div className="md:flex gap-5 sm:flex-col">
          <Image
            height={600}
            width={600}
            className="w-[528px] h-[339px] object-cover mt-4 rounded-md"
            src={imageUrl}
            alt="movie"
          />
          <section className=" mt-4 p-3">
            <h2 className="text-4xl font-bold">{data?.name}</h2>
            <p>{parse(data?.summary ?? "")}</p>

            <div className=" flex gap-3 items-center mt-3 text-gray-400">
              <p>{dateFormat(data?.premiered, "yyyy")}</p>
              <p>{data?.averageRuntime}</p>
              <p className=" flex items-center justify-between">
                <FaStar className=" text-yellow-500" />
                {data?.rating?.average}/10
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

{
  /* <h3 className="text-2xl font-bold">
              Rating: {data?.rating?.average}
            </h3>
            <h3 className="text-2xl font-bold">Premiered: {data?.premiered}</h3>
            <h3 className="text-2xl font-bold">Status: {data?.status}</h3>
            <h3 className="text-2xl font-bold">Language: {data?.language}</h3>
            <h3 className="text-2xl font-bold">
              Genres: {data?.genres?.join(", ")}
            </h3> */
}
