import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PiTelevisionDuotone } from "react-icons/pi";
import dateFormat from "dateformat";
import { FaRegBookmark } from "react-icons/fa";
import { MovieType } from "../Type";
import { favoritemoviesAtom } from "../atom";
import { useAtom } from "jotai";
import { FaBookmark } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  movieImg: string;
  year: string;
  rating: number;
  name: string;
  id: number;
  d: MovieType;
  addToFavorite: (d: MovieType) => void;
  removeFavorite: (d: MovieType) => void;
};

export default function Card(props: Props) {
  const [animationParents] = useAutoAnimate();
  const [favoritemovies, setfavoritemovies] = useAtom(favoritemoviesAtom);

  const isfavoritemovies = favoritemovies.some(
    (movie) => movie?.id === props.d.id
  );

  function handleFavorite() {
    if (isfavoritemovies) {
      props.removeFavorite(props.d);
    } else {
      props.addToFavorite(props.d);
    }
  }

  return (
    <div className="relative">
      <div
        ref={animationParents}
        onClick={handleFavorite}
        className=" h-7 w-7 bg-black/60 absolute top-0 right-0 m-2 rounded-full flex justify-center items-center p-1"
      >
        {isfavoritemovies ? <FaBookmark /> : <FaRegBookmark />}
      </div>
      <Link href={`/${props.id}`} className=" flex flex-col gap-1 ">
        <div className=" h-[154px] w-[275px] bg-gray-400 rounded-md overflow-hidden">
          <Image
            height={400}
            width={400}
            className=" w-full h-full object-cover"
            src={props.movieImg}
            alt="Movi image"
          />
        </div>
        <div className=" text-sm flex gap-3 items-center text-gray-500">
          <div className="">{dateFormat(props.year, "yyyy")}</div>
          <div className=" flex gap-2 items-center">
            <PiTelevisionDuotone />
            <span>Tv Series</span>
            <p>{props.rating}</p>
          </div>
        </div>
        <p>{props.name}</p>
      </Link>
    </div>
  );
}
