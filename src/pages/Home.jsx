import React, { useEffect, useState } from "react";
import { BaseApi } from "../api/BaseApi";
import NavbarSec from "../components/navbar";

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
    </div>
  );
}
