import { useEffect, useState } from "react";
import CardDetail from "../components/CardDetail";
import { EvolDetailCard } from "../components/CardDetail";

export default function DetailsPages() {
    const [pokemon, setPokemon] = useState(null);
    const [descript, setDescript] = useState("");
    const [evolNames, setEvolNames] = useState([]);


    useEffect(() => {
        async function getData() {
            const resPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
            const dataPokemon = await resPokemon.json();

            const resSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/1/");
            const dataSpecies = await resSpecies.json();

            const flavor = dataSpecies.flavor_text_entries;
            const foundFlavor = flavor.find(item => item.language.name === "en");
            const descriptEn = foundFlavor ? foundFlavor.flavor_text : "";

            const evoUrl = dataSpecies.evolution_chain.url;
            const resEvo = await fetch(evoUrl);
            const dataEvo = await resEvo.json();

            const evo1 = dataEvo.chain?.species?.name;
            const evo2 = dataEvo.chain?.evolves_to?.[0]?.species?.name;
            const evo3 = dataEvo.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name;

            const evol = [evo1, evo2, evo3].filter(Boolean);

            setPokemon(dataPokemon)
            setDescript(descriptEn)
            setEvolNames(evol);
        }
        getData();
    }, []);


    if (!pokemon) return <><div>loading...</div></>
    return (

        <>
            <main className="min-h-screen bg-[url(./assets/bg-detail.png)] bg-cover">
            <div className="flex flex-col items-center">

                <CardDetail pokemon={pokemon} descript={descript} />
            </div>
            <div className="w-full max-w-5xl mx-auto mt-10 px-4">
                <h3 className="text-white text-2xl font-bold mb-4">Evolution</h3>
                <EvolDetailCard evolNames={evolNames} />
            </div>
            </main>
        </>
    );
}