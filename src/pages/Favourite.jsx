import React from "react";
import NavbarSec from "../components/navbar";

export default function Favourite() {
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

            {/* SECTION 1 */}
            <div className="flex flex-col gap-5">
              {/* Header Koleksi */}
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://placehold.co/48x48"
                    alt="Profile Dion"
                  />
                  <div className="flex flex-col gap-0.5">
                    <div className="text-white text-base">Dion</div>
                    <div className="text-white text-2xl font-bold">
                      New Collection Bulbasaur
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rotate-180 bg-zinc-300 rounded-lg" />
                  <div className="w-10 h-10 bg-zinc-300 rounded-lg" />
                </div>
              </div>

              {/* Card Row */}
              <div className="flex gap-9 overflow-hidden">
                {[1, 2].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-80 bg-stone-500 rounded-[20px] shadow-md p-4 flex flex-col gap-2"
                  >
                    <img
                      className="w-32 h-28"
                      src=""
                      alt={`Pokemon ${idx + 1}`}
                    />
                    <div className="text-white text-2xl font-bold">
                      Bulbasaur
                    </div>
                    <div className="text-white text-base font-bold">#001</div>
                    <p className="text-white text-xs">
                      A strange seed was planted on its back at birth. The plant
                      sprouts and grows with this Pokémon.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1.5 bg-lime-300 rounded-full text-white text-[9px] font-medium">
                        Grass
                      </span>
                      <span className="px-3 py-1.5 bg-lime-300 rounded-full text-white text-[9px] font-medium">
                        Poison
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2 */}
            <div className="flex flex-col gap-5">
              {/* Header Koleksi */}
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src=""
                    alt="Profile User"
                  />
                  <div className="text-white text-3xl font-bold">
                    Collection Pokemon Dragon
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rotate-180 bg-zinc-300 rounded-lg" />
                  <div className="w-10 h-10 bg-zinc-300 rounded-lg" />
                </div>
              </div>

              {/* Card Row */}
              <div className="flex gap-9 overflow-hidden">
                {[1, 2].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-80 bg-stone-500 rounded-[20px] shadow-md p-4 flex flex-col gap-2"
                  >
                    <div className="text-white text-2xl font-bold">
                      Bulbasaur
                    </div>
                    <div className="text-white text-base font-bold">#001</div>
                    <p className="text-white text-xs">
                      A strange seed was planted on its back at birth. The plant
                      sprouts and grows with this Pokémon.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1.5 bg-lime-300 rounded-full text-white text-[9px] font-medium">
                        Grass
                      </span>
                      <span className="px-3 py-1.5 bg-lime-300 rounded-full text-white text-[9px] font-medium">
                        Poison
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
