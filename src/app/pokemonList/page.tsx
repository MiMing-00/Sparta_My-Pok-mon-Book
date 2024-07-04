"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import type { Pokemon } from "@/types/type.pokemon";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE: number = 20;

const PokemonPage = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isPending, error } = useQuery<{
    data: Pokemon[];
    hasNextPage: boolean;
    totalPages: number;
  }>({
    queryKey: ["pokemons", page],
    queryFn: async (): Promise<{
      data: Pokemon[];
      hasNextPage: boolean;
      totalPages: number;
    }> => {
      const res = await axios.get(`/api/pokemons?page=${page}`);
      const { data, hasNextPage, totalPages } = res.data;
      return { data, hasNextPage, totalPages };
    },
  });

  if (isPending || !data) {
    return <Loading text="전설의 포켓몬을 확인해보세요!" />;
  }

  if (error) {
    return <div>eRRROOROROOROOOOO!!!!!!!!!!</div>;
  }

  const totalPages: number = Math.ceil(151 / ITEMS_PER_PAGE);

  return (
    <>
      <h1 className="text-xl text-center font-bold mt-4">Pokémon</h1>
      <ul className="grid text-center justify-items-center grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-[320px]:grid-cols-1">
        {data?.data.map((item) => (
          <Link href={`/pokemonList/${item.id}`} key={item.id}>
            <li
              className={`border-2 boder-soild p-4 m-4 hover:shadow-xl bg-white ${
                item.base_experience >= 290 && item.id > 143 && item.id !== 149
                  ? "border-rainbow "
                  : "border-black"
              }`}
            >
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
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </>
  );
};

export default PokemonPage;
