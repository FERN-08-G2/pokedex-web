import React, { useEffect, useState } from "react";
import { BaseApi } from "../api/BaseApi";
import NavbarSec from "../components/navbar";
import logo from "../assets/pokedexHero.png";
import { BiSearch } from "react-icons/bi";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import PaginationControls from "../components/PaginationControls";
import PokemonCollectionModal from "../components/PokemonCollectionModal";

export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataCollectionList, setDataCollectionList] = useState(null);

  const limit = 20;

  const getData = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = response.data;
      const result = response.data.results;

      const pokemonData = [];
      for (let i = 0; i < result.length; i++) {
        const pokemonResponse = await axios.get(result[i].url);
        const speciesResponse = await axios.get(
          pokemonResponse.data.species.url
        );

        const description = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );

        pokemonData.push({
          ...pokemonResponse.data,
          description: description
            ? description.flavor_text
            : "No description available",
        });
      }

      setData(pokemonData);
      setTotalPages(Math.ceil(data.count / limit));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
    getData(page);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-[url(./assets/bg-detail.png)] bg-repeat min-h-screen">
      <NavbarSec />

      {/* serachbar */}
      <div className="flex flex-col  justify-center items-center">
        <img src={logo} alt="logo" className=" w-1/2 lg:w-1/4 " />
        <div className="flex justify-center items-center w-11/12 lg:w-1/2 mx-auto pt-6">
          <div className="bg-white rounded-xl border-1 border-gray-500 flex flex-row justify-between p-2 pr-4 item-center w-full">
            <input
              type="text"
              className="w-full text-lg lg:text-xl px-4 outline-none text-black placeholder:text-black/50"
              placeholder="Search"
            />
            <BiSearch className="text-pink-600 font-bold text-4xl" />
          </div>
        </div>
      </div>

      {/* Item Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 lg:px-12 py-8 lg:py-20">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((item, index) => {
            const typeColors = {
              fire: "from-orange-500 to-red-600",
              water: "from-blue-500 to-blue-700",
              grass: "from-green-500 to-green-700",
              electric: "from-yellow-400 to-yellow-600",
              psychic: "from-pink-500 to-pink-700",
              ice: "from-cyan-400 to-cyan-600",
              dragon: "from-purple-600 to-purple-800",
              dark: "from-gray-800 to-gray-950",
              fairy: "from-pink-400 to-pink-600",
              normal: "from-gray-400 to-gray-600",
              fighting: "from-red-700 to-red-900",
              flying: "from-indigo-400 to-indigo-600",
              poison: "from-purple-500 to-purple-700",
              ground: "from-yellow-700 to-yellow-900",
              rock: "from-yellow-800 to-yellow-950",
              bug: "from-green-600 to-green-800",
              ghost: "from-indigo-600 to-indigo-800",
              steel: "from-gray-500 to-gray-700",
            };

            const type1 = item.types[0].type.name;
            const type2 = item.types[1]?.type.name;

            const color1 = typeColors[type1]?.split(" ")[0] || "from-slate-500";
            const color2 = typeColors[type2]?.split(" ")[1] || "to-slate-400";
            const bgClass = `bg-gradient-to-br ${color1} ${color2}`;
            return (
              <ItemCard
                key={index}
                data={item}
                onClickSave={(i) => setDataCollectionList(i)}
                bgClass={bgClass}
              />
            );
          })
        )}
      </div>

      {/* pagination control */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* modal show collection */}
      {dataCollectionList && (
        <PokemonCollectionModal
          dataCollectionList={dataCollectionList}
          setDataCollectionList={setDataCollectionList}
        />
      )}
    </div>
  );
}
