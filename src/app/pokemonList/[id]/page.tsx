import { PokemonDetail } from "../_components/PokemonDetail";
import type { Metadata, ResolvingMetadata } from "next";

// TODO 메타 데이터 관련
// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(): Promise<Metadata> {
//   fetch data
//   const data = await fetch(`https://jsonplaceholder.typicode.com/todos/1`).then(
//     (res) => res.json()
//   );

//   return {
//     title: data.title,
//     description: `${data.title}에 대한 내용`,
//   };
// }

// 1. page 워닝 경고 삭제
// 2. 메타 데이터를 위해서 패치로 한 번 더 불러오는 게 맞는 방안인지?_동적으로 쓰고 있음/
// 3. 유즈 쿼리를 지금 알맞게 쓴 것이 맞는지?

const PokemonDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  return (
    <>
      <PokemonDetail id={id} />
    </>
  );
};

export default PokemonDetailPage;
