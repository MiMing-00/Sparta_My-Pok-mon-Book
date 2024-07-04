import { PokemonDetail } from "../_components/PokemonDetail";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: Props) {
  try {
    const res = await fetch(
      `https://sparta-my-pok-mon-book-xvzw.vercel.app/api/pokemons/${id}`
    );
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
