import React, { useEffect, useState } from "react";
import { BaseApi } from "../api/BaseApi";
import NavbarSec from "../components/navbar";
import logo from "../assets/pokedexHero.png";
import { BiSearch } from "react-icons/bi";

export default function Home() {
  // const [data, setData] = useState([])

  // const getData = async () => {
  //   try {
  //     const response = await BaseApi.get('/pokemon') // harus liat dokumentasi ya pakai end pointnya apa
  //     console.log(response.data) //liat dulu hasil datanya gmna biar bisa masuk dalam komponen atau loopingnya yaa (.map())
  //     setData(response.data.results)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => { // pakai useeffect jika di perlukan saat pertama kali di render di broweser nya ya
  //   getData()
  // }, [])

  return (
    <div className="">
      <NavbarSec />

      {/* serachbar */}
      <div className="flex flex-col justify-center items-center">
        <img src={logo} alt="logo" className="w-1/2" />
        <div className="flex justify-center items-center w-1/2 mx-auto">
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
    </div>
  );
}
