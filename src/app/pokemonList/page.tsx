"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import type { Pokemon } from "@/types/type.pokemon";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/Loading";

const PokemonPage = () => {
  const { data, isPending, error } = useQuery<Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/pokemons");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isPending || !data) {
    return <Loading />;
  }

  if (error) {
    return <div>eRRROOROROOROOOOO!!!!!!!!!!</div>;
  }

  return (
    <>
      <h1 className="text-xl text-center font-bold mt-4">Pokémon</h1>
      <ul className="grid text-center justify-items-center grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-[320px]:grid-cols-1">
        {data?.map((item) => (
          <Link href={`/pokemonList/${item.id}`} key={item.id}>
            <li className="border-2 boder-soild border-black p-4 m-4 rounded-xl hover:shadow-xl bg-white">
              <div>No. {item.id}</div>
              <Image
                src={item.sprites.front_default}
                alt={item.name}
                width={150}
                height={150}
              />
              <div className="font-medium">{item.korean_name}</div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default PokemonPage;
