export default function CardDetail({ pokemon, descript }) {
    const statLabels = {
        "hp": "HP",
        "attack": "ATK",
        "defense": "DEF",
        "special-attack": "SpA",
        "special-defense": "SpD",
        "speed": "SPD"
    };
    return (
        <>
            <div className="flex justify-center items-center mt-50">
                <div className="bg-emerald-500 rounded-2xl p-4 flex w-[950px]">
                    <div className="w-1/2 flex items-center justify-center">
                        <img
                            src={pokemon.sprites.front_default} alt={pokemon.name}
                            className="w-[500px]"
                        />
                    </div>

                    <div className="flex flex-col justify-center pl-4">

                        <div className="text-sm font-bold">
                            #{pokemon.id}
                        </div>
                        <div className="font-bold text-xl">
                            {pokemon.name}
                        </div>

                        <div className="flex gap-2 mb-2">
                            {pokemon.types.map((type, i) => (
                                <span key={i} className="bg-lime-300/70 px-2 py-1 rounded text-xs font-semibold capitalize">
                                    {type.type.name}
                                </span>
                            ))}
                        </div>

                        <div className="text-xs my-4">
                            {descript}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2 mb-4 w-full max-w-[400px]">

                            <div className="bg-lime-300/70 rounded-md px-3 py-2 flex justify-between items-center">
                                <span className="text-sm font-bold text-white">Height</span>
                                <span className="text-sm font-normal text-white">{pokemon.height / 10} m</span>
                            </div>

                            <div className="bg-lime-300/70 rounded-md px-3 py-2 flex justify-between items-center">
                                <span className="text-sm font-bold text-white">Weight</span>
                                <span className="text-sm font-normal text-white">{pokemon.weight / 10} kg</span>
                            </div>
                        </div>

                        <h3 className="font-semibold text-white text-xl mb-1">Stats</h3>
                        <div className="grid grid-cols-2 gap-3 max-w-[400px]">
                            {pokemon.stats.map((stat, index) => {
                                const label = statLabels[stat.stat.name];
                                let bgColor = null;

                                if (label === "HP") {
                                    bgColor = "bg-red-500";
                                } else if (label === "ATK") {
                                    bgColor = "bg-orange-400";
                                } else if (label === "DEF") {
                                    bgColor = "bg-yellow-300";
                                } else if (label === "SpA") {
                                    bgColor = "bg-cyan-300";
                                } else if (label === "SpD") {
                                    bgColor = "bg-lime-300";
                                } else if (label === "SPD") {
                                    bgColor = "bg-pink-300"
                                }

                                return (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center rounded px-3 py-2 font-bold text-white ${bgColor}`}
                                    >
                                        <span>{label}</span>
                                        <span>{stat.base_stat}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="font-semibold text-sm mb-1">Abilities</p>
                        <div className="flex gap-4">
                            {pokemon.abilities.map((item, i) => (
                                <button key={i} className="bg-lime-300/70 rounded px-6 py-2 font-bold text-white capitalize">
                                    {item.ability.name}
                                </button>
                            ))}
                        </div>

                    </div>
                </div >
            </div>
        </>
    )
}

export function EvolDetailCard({ evolNames }) {
    const nameToId = {
        bulbasaur: 1,
        ivysaur: 2,
        venusaur: 3,
    };
    const imageSizes = ["w-[70px]", "w-[90px]", "w-[120px]"];

    return (
        <div className="flex items-center justify-around mt-6 p-2">
            {evolNames.map((name, i) => (
                <div key={i}>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${nameToId[name]}.png`}
                        alt=""
                        className={`${imageSizes[i]}`}
                    />
                </div>
            ))}
        </div>
    );
}