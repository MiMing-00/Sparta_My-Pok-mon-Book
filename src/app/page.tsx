import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Link href="/pokemonList">
        <h1 className="m-4 p-4 border-4 border-dotted border-red-400 rounded-xl hover:shadow-md">
          <span>포</span>
          <span className="text-red-600">켓</span>
          <span className="text-yellow-400">몬</span>
          <span className="text-green-600"> 도감</span>으로 이동
        </h1>
      </Link>
    </main>
  );
}
