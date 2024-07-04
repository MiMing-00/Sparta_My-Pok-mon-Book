import { PokemonDetail } from "../_components/PokemonDetail";
import type { Metadata, ResolvingMetadata } from "next";
import { metadata } from "../../layout";

// TODO 메타 데이터 관련
type Props = {
  params: { id: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params: { id } }: Props) {
  // fetch data
  try {
    const res = await fetch(`http://localhost:3000/api/pokemons/${id}`);
    const data = await res.json();
    return {
      title: data.korean_name,
      description: `${data.korean_name}의 정보이다`,
    };
  } catch (error) {
    console.log(error);
  }
}

const PokemonDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <PokemonDetail id={id} />
    </>
  );
};

export default PokemonDetailPage;
