import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function ItemCard({ data }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleReadMoreClick = () => {
    navigate(`/detail/${data.id}`);
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleSaveToCollection = () => {
    navigate("/my-pokemon"); // ⬅️ ini akan arahkan ke halaman Favourite.jsx
  };

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
            <div className="relative">
              <button
                onClick={togglePopup}
                className="bg-emerald-600 px-4 py-2 rounded-2xl cursor-pointer"
              >
                <MdOutlinePlaylistAdd size={24} />
              </button>

              {/* Popup */}
              {showPopup && (
                <div className="absolute left-0 mt-2 w-96 bg-rose-950 rounded-2xl flex flex-col z-50 shadow-lg">
                  <button
                    onClick={handleSaveToCollection}
                    className="self-stretch h-14 px-6 bg-red-800 rounded-t-2xl flex items-center gap-4 text-white text-lg font-medium hover:bg-red-700 hover:text-white transition-colors"
                  >
                    <FaRegBookmark size={24} />
                    Save to Collection
                  </button>
                  <button className="self-stretch h-16 px-6 bg-red-900 rounded-b-2xl flex items-center gap-4 text-white text-lg font-medium hover:bg-red-700 hover:text-white transition-colors">
                    <MdDoNotDisturbAlt size={26} />
                    Not Interested
                  </button>
                </div>
              )}
            </div>
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
    </div>
  );
}
