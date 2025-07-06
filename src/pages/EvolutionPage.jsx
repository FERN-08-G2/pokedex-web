import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaCaretDown } from "react-icons/fa";

function EvolutionPage() {
  const [generations, setGenerations] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedGen, setSelectedGen] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [detailedList, setDetailedList] = useState([]);

  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  const typeColors = {
    fire: "from-orange-400 to-red-500",
    water: "from-blue-400 to-blue-600",
    grass: "from-green-400 to-green-600",
    electric: "from-yellow-300 to-yellow-500",
    psychic: "from-pink-400 to-pink-600",
    ice: "from-cyan-300 to-cyan-500",
    dragon: "from-purple-500 to-purple-700",
    dark: "from-gray-700 to-gray-900",
    fairy: "from-pink-300 to-pink-500",
    normal: "from-gray-300 to-gray-500",
    fighting: "from-red-600 to-red-800",
    flying: "from-indigo-300 to-indigo-500",
    poison: "from-purple-400 to-purple-600",
    ground: "from-yellow-600 to-yellow-800",
    rock: "from-yellow-700 to-yellow-900",
    bug: "from-green-500 to-green-700",
    ghost: "from-indigo-500 to-indigo-700",
    steel: "from-gray-400 to-gray-600",
  };

  const favoritePokemon = [
    { name: "pikachu", id: "25" },
    { name: "charizard", id: "6" },
  ];

  useEffect(() => {
    fetchGenerations();
    fetchTypes();
  }, []);

  useEffect(() => {
    if (selectedGen) {
      fetchPokemonByGeneration(selectedGen);
    } else {
      setPokemonList([]);
    }
  }, [selectedGen]);

  useEffect(() => {
    fetchDetailedList();
  }, [pokemonList]);

  const fetchGenerations = async () => {
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/generation/");
      setGenerations(res.data.results);
    } catch (err) {
      console.error("Failed to fetch generations", err);
    }
  };

  const fetchTypes = async () => {
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/type/");
      const filteredTypes = res.data.results.filter(
        (type) => !["shadow", "unknown"].includes(type.name)
      );
      setTypes(filteredTypes);
    } catch (err) {
      console.error("Failed to fetch types", err);
    }
  };

  const fetchPokemonByGeneration = async (genName) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/generation/${genName}`);
      const species = res.data.pokemon_species;
      const sortedSpecies = species.sort((a, b) => a.name.localeCompare(b.name));
      const mapped = sortedSpecies.map((p) => {
        const id = p.url.split("/").filter(Boolean).pop();
        return { name: p.name, id };
      });
      setPokemonList(mapped);
    } catch (err) {
      console.error("Failed to fetch Pokémon by generation", err);
    }
  };

  const fetchDetailedList = async () => {
    try {
      const detailed = await Promise.all(
        pokemonList.map(async (p) => {
          try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
            return {
              ...p,
              types: res.data.types.map((t) => t.type.name),
              forms: res.data.forms.map((f) => f.name),
            };
          } catch {
            return { ...p, types: [], forms: [] };
          }
        })
      );

      const withFavorites = [
        ...favoritePokemon.map((fav) => ({
          ...fav,
          types: ["electric"], // Hardcoded for Pikachu and Charizard
          forms: ["default"],
        })),
        ...detailed.filter((d) => !favoritePokemon.some((f) => f.name === d.name)),
      ];

      setDetailedList(withFavorites);
    } catch (err) {
      console.error("Failed to fetch Pokémon details", err);
    }
  };

  const filteredList = detailedList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || p.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const formatKebabCase = (text) => {
    return text
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 overflow-auto">
      <h1 className="text-3xl font-medium mb-6">Evolution Pokémon</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search Input with icon */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Pokémon"
            className="w-64 h-12 pl-10 pr-4 py-2.5 bg-gray-800 rounded-lg text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Generation Dropdown with icon */}
        <div className="relative">
          <select
            onChange={(e) => setSelectedGen(e.target.value)}
            className="appearance-none w-64 h-12 px-4 py-3 bg-gray-800 text-gray-300 rounded-lg pr-10"
          >
            <option value="">Any Generation</option>
            {generations.map((gen, index) => (
              <option key={gen.name} value={gen.name}>
                Gen {romanNumerals[index] || index + 1}
              </option>
            ))}
          </select>
          <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Type Dropdown with icon */}
        <div className="relative">
          <select
            onChange={(e) => setSelectedType(e.target.value)}
            className="appearance-none w-56 h-12 px-4 py-2.5 bg-gray-800 text-gray-300 rounded-lg pr-10"
          >
            <option value="">Any Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.toUpperCase()}
              </option>
            ))}
          </select>
          <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Card List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredList.map((pokemon) => {
          const type1 = pokemon.types?.[0];
          const type2 = pokemon.types?.[1];

          const color1 = typeColors[type1]?.split(" ")[0] || "from-slate-500";
          const color2 = typeColors[type2]?.split(" ")[1] || "to-slate-400";
          const bgClass = `bg-gradient-to-br ${color1} ${color2}`;

          return (
            <div
              key={`${pokemon.id}-${pokemon.name}`}
              className={`p-3 ${bgClass} rounded-[10px] outline-slate-400 flex justify-between items-center`}
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">{formatKebabCase(pokemon.name)}</h2>
                <p className="text-slate-200">
                  #{pokemon.id.padStart?.(4, "0") ?? pokemon.id}
                </p>
                <p className="text-white text-sm">
                  {pokemon.types?.map(formatKebabCase).join(", ") || "-"}
                </p>
                <p className="text-white text-sm">
                  {pokemon.forms?.map(formatKebabCase).join(", ") || "-"}
                </p>
              </div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-24 h-24 object-contain"
              />
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <p className="text-gray-400 col-span-full">
            No Pokémon found for selected filter.
          </p>
        )}
      </div>
    </div>
  );
}

export default EvolutionPage;
