import React, { useEffect, useState } from "react";
import { BaseApi } from "../api/BaseApi";
import NavbarSec from "../components/navbar";
import logo from "../assets/pokedexHero.png";
import { BiSearch } from "react-icons/bi";
import ItemCard from "../components/ItemCard";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

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
    <div className="bg-[url(./assets/bg-detail.png)] bg-cover">
      <NavbarSec />

      {/* serachbar */}
      <div className="flex flex-col  justify-center items-center">
        <img src={logo} alt="logo" className="w-1/2" />
        <div className="flex justify-center items-center w-1/2 mx-auto pt-6">
          <div className="bg-white rounded-full border-1 border-gray-500 flex flex-row justify-between p-2 item-center w-full">
            <input
              type="text"
              className="outline-none text-black placeholder:text-black/50"
              placeholder="search"
            />
            <BiSearch className="text-black text-2xl" />
          </div>
        </div>
      </div>

      {/* Item Card */}
      <div className="grid grid-cols-4 gap-4 px-12 py-20">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((item, index) => {
            return <ItemCard key={index} data={item} />;
          })
        )}
      </div>
    </div>
  );
}
