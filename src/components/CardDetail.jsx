import axios from "axios";
import { useEffect, useState } from "react";

export default function CardDetail({ pokemon, descript, selectedLang }) {
  const [abilitiesLang, setAbilitiesLang] = useState([]);
  const statLabels = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  const getAbilities = async () => {
    try {
      const abilityDetailPromises = pokemon.abilities.map((ability) =>
        axios.get(ability.ability.url)
      );

      const responses = await Promise.all(abilityDetailPromises);

      const detailedAbilities = responses.map((response) => response.data);

      setAbilitiesLang(detailedAbilities);
    } catch (error) {
      console.error("Error fetching abilities:", error);
    }
  };

  useEffect(() => {
    getAbilities();
  }, []);

  const japanLang = abilitiesLang.map((ability) =>
    ability.names.find((name) => name.language.name === "ja")
  );

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-green-600 rounded-2xl p-4 py-8 flex w-[950px]">
          <div className="w-1/2 flex items-center justify-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-[500px]"
            />
          </div>

          <div className="flex flex-col justify-center pl-4">
            <div className="text-sm font-bold">#{pokemon.id}</div>
            <div className="font-bold text-xl">{pokemon.name}</div>

            <div className="flex gap-2 mb-2">
              {pokemon.types.map((type, i) => (
                <span
                  key={i}
                  className="bg-emerald-600 px-2 py-1 rounded text-xs font-semibold capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="text-xs my-4">{descript}</div>

            <div className="grid grid-cols-2 gap-3 mt-2 mb-4 w-full max-w-[400px]">
              <div className="bg-lime-600/70 rounded-md px-3 py-2 flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  {selectedLang === "ja" ? `身長` : `Height`}
                </span>
                <span className="text-sm font-normal text-white">
                  {pokemon.height / 10} m
                </span>
              </div>

              <div className="bg-lime-600/70 rounded-md px-3 py-2 flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  {selectedLang === "ja" ? `体重` : `Weight`}
                </span>
                <span className="text-sm font-normal text-white">
                  {pokemon.weight / 10} kg
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-white text-xl mb-1">
              {selectedLang === "ja" ? `ステータス` : `Stats`}
            </h3>
            <div className="grid grid-cols-2 gap-3 max-w-[400px]">
              {pokemon.stats.map((stat, index) => {
                const label = statLabels[stat.stat.name];
                let bgColor = null;

                if (label === "HP" || label === "体力") {
                  bgColor = "bg-red-600";
                } else if (label === "ATK") {
                  bgColor = "bg-orange-600";
                } else if (label === "DEF") {
                  bgColor = "bg-yellow-600";
                } else if (label === "SpA") {
                  bgColor = "bg-cyan-600";
                } else if (label === "SpD") {
                  bgColor = "bg-lime-600";
                } else if (label === "SPD") {
                  bgColor = "bg-pink-600";
                }

                const labelJA = {
                  HP: "体力",
                  ATK: "攻撃力",
                  DEF: "防御力",
                  SpA: "特攻",
                  SpD: "特防",
                  SPD: "素早さ",
                };

                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center rounded px-3 py-2 font-bold text-white ${bgColor}`}
                  >
                    <span>
                      {selectedLang === "ja" ? labelJA[label] : label}
                    </span>
                    <span>{stat.base_stat}</span>
                  </div>
                );
              })}
            </div>

            <p className="font-semibold text-xl mt-4 mb-2">
              {selectedLang === "ja" ? `スキル ` : `Abilities`}
            </p>
            <div className="flex gap-4">
              {abilitiesLang.map((item, i) => (
                <button
                  key={i}
                  className="bg-emerald-600 rounded px-6 py-2 font-bold text-white capitalize"
                >
                  {selectedLang === "ja" ? japanLang[i].name : item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function EvolDetailCard({ evolNames }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    let allData = [];

    await Promise.all(
      evolNames.map(async (item) => {
        try {
          const id = item.match(/(\d+)\/$/)[1];
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}/`
          );
          return response.data;
        } catch (error) {
          console.log(error);
        }
      })
    ).then((data) => {
      allData = data;
    });

    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex items-center justify-around mt-6 p-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-4">
          <img
            src={item.sprites.other["official-artwork"].front_default}
            alt={item.name}
            className={`w-24 h-24`}
          />
          <p className="capitalize">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
