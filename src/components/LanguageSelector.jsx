import { useState } from "react";

export default function LanguageSelector({ selectedLang }) {
  const [selected, setSelected] = useState("en");

  function handleChange(e) {
    setSelected(e);
    selectedLang(e);
  }

  return (
    <div className="w-35 my-2">
      <select
        id="lang"
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        className="select bg-white text-black"
      >
        <option disabled={true}>Choose Language</option>
        <option value={"en"}>English</option>
        <option value={"ja"}>日本語</option>
      </select>
    </div>
  );
}
