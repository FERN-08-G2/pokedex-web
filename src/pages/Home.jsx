import React, { useEffect, useState } from "react";
import { BaseApi } from "../api/BaseApi";
import NavbarSec from "../components/navbar";
import logo from "../assets/pokedexHero.png";
import { BiSearch } from "react-icons/bi";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import PaginationControls from "../components/PaginationControls";

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
    <div className="bg-[url(./assets/bg-detail.png)] bg-cover min-h-screen">
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
        <div
          onClick={() => setDataCollectionList(null)}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm md:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 capitalize">
              Hero Name : {dataCollectionList?.name}
            </h2>
            {/* <p className="text-black">
              ini di isi dari data collection nya ada apa aja yang dari local
              storage
            </p> */}

            {/* untuk input checkbox harus bisa validasi bahwa cek isinya jika sudha lebih dari 6 hero
             maka tidak bisa di tambhakan ke collection tersebut. checklistnya cuma bisa di 1 nama */}
            <ul>
              <li className="flex items-center">
                <input type="checkbox" />
                <span className="text-black ml-2">name</span> // dari local
                storage
              </li>
              <li className="flex items-center">
                <input type="checkbox" />
                <span className="text-black ml-2">name</span> // dari local
                storage
              </li>
              <li className="flex items-center">
                <input type="checkbox" />
                <span className="text-black ml-2">name</span> // dari local
                storage
              </li>
            </ul>

            <div className="flex  justify-between">
              <button
                onClick={() => setDataCollectionList(null)}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setDataCollectionList(null)}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                New Collection
              </button>
              <button
                onClick={() => setDataCollectionList(null)}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Save To Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
