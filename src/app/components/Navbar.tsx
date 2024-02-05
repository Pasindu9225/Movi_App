"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
  const usePath = usePathname();
  return (
    <div className=" flex max-w-7xl mx-auto w-full justify-between items-end py-4">
      <Link className=" text-4xl md:text-5xl font-bold text-green-500" href="/">
        Movies
      </Link>

      <div className=" flex gap-3">
        <a
          className={`${usePath === "/" && "underline text-green-500"}`}
          href="/"
        >
          Home
        </a>
        <a
          className={`${
            usePath === "/favorites" && "underline text-green-500"
          }`}
          href="/favorites"
        >
          Favorites
        </a>
      </div>
    </div>
  );
}
