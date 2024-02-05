import { atom } from "jotai";
import { MovieType } from "./Type";

export const favoritemoviesAtom = atom<MovieType[]>([]);
