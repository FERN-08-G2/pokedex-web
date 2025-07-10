import React, { useEffect, useState } from "react";
import NavbarSec from "../components/navbar";
import Swal from "sweetalert2";

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const save = localStorage.getItem("favorites");
    if (save) {
      setFavorites(JSON.parse(save));
    }
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure remove this pokemon from collection?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const save = localStorage.getItem("favorites");
      if (!save) return;

      const data = JSON.parse(save);
      const filtered = data.filter((item) => String(item.id) !== String(id));
      localStorage.setItem("favorites", JSON.stringify(filtered));
      setFavorites(filtered);

      Swal.fire({
        title: "Deleted!",
        text: "Pokemon has been removed from favorites.",
        icon: "success",
      });
    }
  };


  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("collections");
    if (saved) {
      setCollections(JSON.parse(saved));
    }
  }, []);

  const handleDeleteFromCollection = (collectionName, pokemonId) => {
    const saved = localStorage.getItem("collections");
    if (!saved) return;

    const collections = JSON.parse(saved);
    const updated = collections.map((col) => {
      if (col.name === collectionName) {
        return {
          ...col,
          pokemons: col.pokemons.filter((p) => p.id !== pokemonId),
        };
      }
      return col;
    });

    localStorage.setItem("collections", JSON.stringify(updated));
    setCollections(updated);
  };
  const handleDeleteCollection = async (collectionName) => {
    const confirmed = await Swal.fire({
      title: `Delete "${collectionName}"?`,
      text: "Are you sure want to remove this collection?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    });

    if (confirmed.isConfirmed) {
      const saved = localStorage.getItem("collections");
      let updated = [];

      if (saved) {
        const collections = JSON.parse(saved);
        updated = collections.filter(col => col.name !== collectionName);
        localStorage.setItem("collections", JSON.stringify(updated));
        setCollections(updated);
      }

      await Swal.fire({
        title: "Deleted!",
        text: `Collection "${collectionName}" has been deleted.`,
        icon: "success",
      });
    }
  };


  return (
    <div>
      <NavbarSec />

      <div className="w-[1440px] h-[1024px] relative bg-white overflow-hidden">
        {/* Background Merah */}
        <div className="w-full h-full absolute bg-red-600" />

        {/* Konten Utama */}
        <div className="absolute left-[44px] top-[34px] flex gap-10">
          {/* Sidebar */}
          <div className="w-48 flex flex-col items-center gap-4">
            {/* Tombol New Playlist */}
            <div className="w-full p-3 bg-red-800 rounded-[51px] flex justify-center items-center gap-3">
              <div className="w-6 h-6 bg-white rounded" />
              <span className="text-white text-sm font-semibold">
                New playlist
              </span>
            </div>

            {/* Playlist Items */}
            <div className="w-40 h-44 flex gap-2.5">
              <div className="flex flex-col items-end gap-2">
                {[1, 2].map((_, i) => (
                  <div
                    key={i}
                    className="w-full px-3 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                  >
                    <div className="text-slate-200 text-sm font-semibold">
                      Your Likes
                    </div>
                    <div className="text-slate-200 text-xs">Autoplaylist</div>
                  </div>
                ))}
              </div>
              <div className="w-1 h-44 bg-zinc-300 rounded-lg" />
            </div>
          </div>

          {/* Konten Koleksi */}
          <div className="w-[1112px] flex flex-col gap-7">
            {/* Filter Tags */}
            <div className="flex gap-2.5">
              <span className="px-4 py-1.5 bg-white rounded-lg text-red-800 text-xs">
                Gen 1
              </span>
              <span className="px-4 py-1.5 bg-red-800 rounded-lg text-white text-xs">
                Dragon
              </span>
              <span className="px-4 py-1.5 bg-red-800 rounded-lg text-white text-xs">
                Fire
              </span>
            </div>

            {/* SECTION 1 - FAVORITES */}
            {/* <div className="flex flex-wrap gap-6">
              {favorites.length === 0 ? (
                <p className="text-white text-base capitalize">
                  no collection
                </p>
              ) : (
                favorites.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-80 bg-stone-500 rounded-[20px] shadow-md p-4 flex flex-col gap-2"
                  >
                    <img
                      className="w-32 h-28"
                      src={
                        item.sprites?.other["official-artwork"].front_default ||
                        ""
                      }
                      alt={item.name}
                    />
                    <div className="text-white text-2xl font-bold capitalize">
                      {item.name}
                    </div>
                    <div className="text-white text-base font-bold">
                      #{item.id}
                    </div>
                    <p className="text-white text-xs">
                      {item.description || "No Description Available"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {item.types?.map((typeObj, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-lime-300 rounded-full text-white text-[9px] font-medium"
                        >
                          {typeObj.type.name}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 px-3 py-1.5 rounded text-xs text-white mt-2"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div> */}

            {/* SECTION 2 - COLLECTIONS */}
            {collections.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-5">
                {/* Header Koleksi */}
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://placehold.co/48x48"
                      alt={`Profile ${col.name}`}
                    />
                    <div className="flex flex-col gap-0.5">
                      <div className="text-white text-base">Dion</div>
                      <div className="text-white text-2xl font-bold">
                        {col.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleDeleteCollection(col.name)}
                      className="bg-red-500 text-xs text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <div className="w-10 h-10 rotate-180 bg-zinc-300 rounded-lg" />
                    <div className="w-10 h-10 bg-zinc-300 rounded-lg" />
                  </div>
                </div>


                {/* Card Row */}
                <div className="flex gap-9 overflow-hidden">
                  {col.pokemons.length === 0 && (
                    <p className="text-white text-base">
                      No Pokemons in this collection.
                    </p>
                  )}
                  {col.pokemons.map((item, i) => (
                    <div
                      key={i}
                      className="w-80 bg-stone-500 rounded-[20px] shadow-md p-4 flex flex-col gap-2"
                    >
                      <img
                        className="w-32 h-28"
                        src={
                          item.sprites?.other["official-artwork"]
                            .front_default || ""
                        }
                        alt={item.name}
                      />
                      <div className="text-white text-2xl font-bold capitalize">
                        {item.name}
                      </div>
                      <div className="text-white text-base font-bold">
                        #{item.id}
                      </div>
                      <p className="text-white text-xs">
                        {item.description || "No Description Available"}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {item.types?.map((typeObj, j) => (
                          <span
                            key={j}
                            className="px-3 py-1.5 bg-lime-300 rounded-full text-white text-[9px] font-medium"
                          >
                            {typeObj.type.name}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteFromCollection(col.name, item.id)
                        }
                        className="bg-red-500 px-3 py-1.5 rounded text-xs text-white mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
