"use client";

import Loading from "@/app/components/Loading";
import type { Pokemon } from "@/types/type.pokemon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PokemonDetail = ({ id }: { id: string }) => {
  const {
    data: pokemon,
    isPending,
    error,
  } = useQuery<Pokemon>({
    queryKey: ["pokemonDetail", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/pokemons/${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!id,
  });

  if (isPending || !pokemon) {
    return <Loading text="포켓몬아 안녕!" />;
  }

  if (error) {
    console.log(error);
    return <div>ERRRRRRRRRRRR</div>;
  }

  return (
    <div
      className={`w-1/2 xl:w-1/2 md:w-1/2 sm:w-2/3 min-[320px]:w-full flex flex-col bg-white border-2 p-4 mx-auto my-4 text-center justify-center ${
        pokemon.base_experience >= 290 && pokemon.id > 143 && pokemon.id !== 149
          ? "border-rainbow "
          : "border-black"
      }`}
    >
      <div>
        No. <span className="font-bold">{pokemon.id}</span>
      </div>
      {pokemon.sprites.front_default && (
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={150}
          height={150}
          className="mx-auto"
        />
      )}
      <div className="font-normal">{pokemon.korean_name}</div>
      <div>
        <span>키:{pokemon.height}</span>
        <span>몸무게: {pokemon.weight}</span>
      </div>
      <div>
        <span>
          {pokemon.types.map((item, index) => (
            <span key={index} className="mr-2">
              {item.type.korean_name}
            </span>
          ))}
        </span>
      </div>
      <div>
        <div>{pokemon.korean_name}의 기술</div>
        <div>
          {pokemon.moves.map((item, index) => (
            <span key={index} className="mr-4 whitespace-nowrap">
              {item.move.korean_name}
            </span>
          ))}
        </div>
      </div>
      <Link href="/pokemonList">
        <button className="border-2 border-solid bg-blue-600 text-white font-bold m-2 px-4 py-2 rounded-xl hover:bg-blue-400">
          뒤로 가기
        </button>
      </Link>
    </div>
  );
};
