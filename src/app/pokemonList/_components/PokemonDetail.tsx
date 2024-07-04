"use client";

import Loading from "@/app/components/Loading";
import type { Pokemon } from "@/types/type.pokemon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PokemonDetail = ({ id }: { id: string }) => {
  // console.log("컴포넌트 실행", id);

  //내가 보고 있는 도메인의 url의 id를 추출해서 변수에 저장 -> 변수를 토대로 useQuery 호출
  //id를 가지고 오는 건 서버 / 활용하는 건 클라이언트

  const {
    data: pokemon,
    isPending,
    isError,
  } = useQuery<Pokemon>({
    queryKey: ["pokemonDetail", id],

    // 비동기라서 언디파인드도 해줘야 하는 것일까
    queryFn: async ({ queryKey }) => {
      // console.log("쿼리펑션 실행");
      // 아이디를 굳이 추출해야 할까? 이걸로 메타 데이터를 전달할 수 있을까?
      const [_, id] = queryKey;
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
    return <Loading />;
  }

  if (isError) {
    console.log(isError);
    return <div>ERRRRRRRRRRRR</div>;
  }

  return (
    <div className="w-1/2 xl:w-1/2 md:w-1/2 sm:w-2/3 min-[320px]:w-full flex flex-col bg-white border-black border-2 p-4 mx-auto my-4 rounded-2xl text-center justify-center">
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
