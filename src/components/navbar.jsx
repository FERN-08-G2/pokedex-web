import { AiFillHome } from 'react-icons/ai';
import { MdCatchingPokemon } from 'react-icons/md';
import { HiViewList } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import input from 'daisyui/components/input';
import { GiRegeneration } from 'react-icons/gi';


function Logo() {
    return (
        <div className="logo w-[192px] h-[61px]">
            <img src="https://vanilla-web-pokedex.pages.dev/assets/images/pokedex-logo.png" alt="logo" className='' />
        </div>
    )
}

// function PokemonList() {
//     return (
//         async function ListPokemon(params) {

//         }
//     )
// }

function Longsearch() {
    return (
        <>
            <div className="longSearch bg-white rounded-full border-1 border-[#c5c5c5] flex flex-row justify-between p-2 items-center  hidden sm:flex">
                <input type='text' className='outline-none' placeholder='Search'></input>
                <BiSearch />
            </div>
        </>

    )
}

function Smallsearch() {
    return (
        <>
            <div className="smallSearch bg-transparent rounded-full flex flex-row justify-between p-2 items-center">
                <BiSearch className='text-white text-2xl' />
            </div>
        </>

    )
}

function DropdownBtn() {
    return (
        <div className="dropdown relative">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <HiViewList className='text-white text-2xl' />
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow top-[40px] right-0">
                <li className='capitalize'>
                    <a><AiFillHome /> home</a>
                </li>
                <li>
                    <a className='capitalize'><MdCatchingPokemon />pokemon</a>
                </li>
                <li className='capitalize'>
                    <a><GiRegeneration /> generation detail</a>
                </li>
            </ul>
        </div>
    )
}


function NavbarSec() {
    return (
        <nav className="navbar bg-[#DD092F] shadow-sm fixed flex-row d-">
            <div className="navbar-start">
                {/* <div className="logo lg:w-[192px] h-[61px]">
                    <img src="https://vanilla-web-pokedex.pages.dev/assets/images/pokedex-logo.png" alt="logo" className='' />
                </div> */}
                <Logo />

            </div>
            {/* <div className="navbar-center flex sm:hidden">
                
            </div> */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className='capitalize text-white text-[16px]'>
                        <a><AiFillHome /> home</a>
                    </li>
                    <li className='capitalize text-white text-[16px]'>
                        <a><MdCatchingPokemon />pokemon</a>
                    </li>
                    <li className='capitalize text-white text-[16px]'>
                        <a><GiRegeneration /> generation detail</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end lg-hide">
                <Longsearch />
                {/* <Smallsearch />  */}
                <DropdownBtn />
            </div>
        </nav>
    )
}
export default NavbarSec