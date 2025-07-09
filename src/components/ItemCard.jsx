import { useNavigate } from "react-router";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import failedImg from "../assets/Pikachu_29.webp";
import successImg from "../assets/213-2138223_pikachu-vector-angry-pikachu-anime-clipart.png";
import confirmImg from "../assets/drawing-pikachu-yellow-cute-cartoon-vector-970784.webp";


export default function ItemCard({ data, onClickSave }) {
  const navigate = useNavigate();


  const [dataCollectionList, setDataCollectionList] = useState(null);
  const [selectedPokemonIds, setSelectedPokemonIds] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleReadMoreClick = () => {
    navigate(`/detail/${data.id}`);
  };

  const handleNewCollection = async () => {
    const { value: text } = await Swal.fire({
      input: "text",
      inputPlaceholder: "Choose your collection name ..",
      inputAttributes: {
        "aria-label": "Type your collection name here"
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Collection name is required!";
        }
        return null;
      }
    });

    if (text) {
      setNewCollectionName(text);

      const collections = JSON.parse(localStorage.getItem("collections") || "[]");
      const isExist = collections.some((col) => col.name === text);
      if (isExist) {
        Swal.fire({
          title: "Collection already exists!",
          icon: "error",
        });
        return;
      }

      const newCollection = {
        name: text,
        pokemons: [],
      };

      collections.push(newCollection);
      localStorage.setItem("collections", JSON.stringify(collections));

      await Swal.fire({
        title: "Collection Created!",
        text: `Collection "${text}" has been created.`,
        imageUrl: successImg,
        imageWidth: 150,
        imageHeight: 150,
      });
    }
  };

  const handleSaveToCollection = async () => {
    if (!dataCollectionList) return;

    const saved = localStorage.getItem("collections");
    const collections = saved ? JSON.parse(saved) : [];
    const save = localStorage.getItem("favorites");
    const exist = save ? JSON.parse(save) : [];
    const allFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const selectedPokemons = allFavorites.filter((p) =>
      selectedPokemonIds.includes(p.id)
    );

    const isExisting = exist.find(
      (item) => String(item.id) === String(dataCollectionList.id)
    );

    if (!newCollectionName) {
      Swal.fire({
        title: "Please create a collection first!",
        icon: "error",
      });
      return;
    }

    if (selectedPokemonIds.length === 0) {
      Swal.fire({
        title: "Please select at least one Pokémon!",
        icon: "error",
      });
      return;
    }

    if (isExisting) {
      Swal.fire({
        imageUrl: failedImg,
        imageWidth: 100,
        imageHeight: 100,
        title: "Failed!",
        text: "Pokemon already taken.",
      });
      return;
    }

    const result = await Swal.fire({
      imageUrl: confirmImg,
      imageWidth: 150,
      imageHeight: 150,
      title: "Are you sure want to add this Pokemon?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes, i want",
      denyButtonText: `No, i'm not`
    });

    if (result.isConfirmed) {
      const updateData = [...exist, dataCollectionList];
      localStorage.setItem("favorites", JSON.stringify(updateData));

      const exists = collections.find((c) => c.name === newCollectionName);

      if (exists) {
        const updatedPokemons = [
          ...exists.pokemons,
          ...selectedPokemons.filter(
            (newPoke) =>
              !exists.pokemons.some((p) => String(p.id) === String(newPoke.id))
          ),
        ];

        const updatedCollections = collections.map((c) => {
          if (c.name === newCollectionName) {
            return {
              ...c,
              pokemons: updatedPokemons,
            };
          }
          return c;
        });

        localStorage.setItem("collections", JSON.stringify(updatedCollections));
      } else {
        const newCollection = {
          name: newCollectionName,
          pokemons: selectedPokemons,
        };
        collections.push(newCollection);
        localStorage.setItem("collections", JSON.stringify(collections));
      }

      await Swal.fire({
        title: "Pokémon saved to collection!",
        imageUrl: successImg,
        imageWidth: 150,
        imageHeight: 150,
      });

      setSelectedPokemonIds([]);
      setNewCollectionName("");
      setDataCollectionList(null);
    }
  };

  function SaveBtn({ data, openCollectionModal }) {
    return (
      <div className="relative">
        <button
          onClick={() => openCollectionModal(data)}
          className="bg-emerald-600 px-4 py-2 rounded-2xl cursor-pointer"
        >
          <MdOutlinePlaylistAdd size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-green-600 p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          {data?.types.map((item, index) => (
            <div key={index} className="bg-emerald-600 rounded-2xl px-1 py-1">
              {capitalizeFirstLetter(item?.type.name)}
            </div>
          ))}
        </div>
        <h1>#{data?.id}</h1>
      </div>

      <div className="flex w-full items-center gap-1">
        <div className="w-2/3 space-y-4">
          <h1 className="text-4xl font-bold">
            {capitalizeFirstLetter(data?.name)}
          </h1>
          <p>{data?.description}</p>
          <div className="flex gap-4 relative">
            <button
              onClick={handleReadMoreClick}
              className="bg-emerald-600 px-4 py-2 rounded-2xl cursor-pointer"
            >
              Read More
            </button>
            <SaveBtn
              data={data}
              openCollectionModal={(pokemon) => setDataCollectionList(pokemon)}
            />
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <img
            src={data?.sprites.other.dream_world.front_default}
            alt={data?.name}
            className="w-full object-cover"
          />
        </div>
      </div>

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

            <ul className="space-y-2">
              {JSON.parse(localStorage.getItem("favorites") || "[]").map((pokemon) => (
                <li key={pokemon.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={pokemon.id}
                    checked={selectedPokemonIds.includes(pokemon.id)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (e.target.checked) {
                        setSelectedPokemonIds([...selectedPokemonIds, value]);
                      } else {
                        setSelectedPokemonIds(
                          selectedPokemonIds.filter((id) => id !== value)
                        );
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <span className="text-black ml-2 capitalize">
                    {pokemon.name}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between">
              <button
                onClick={() => setDataCollectionList(null)}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleNewCollection}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                New Collection
              </button>
              <button
                onClick={handleSaveToCollection}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
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

