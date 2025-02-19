
import { useState } from "react"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {setIsMenuOpen(!isMenuOpen)}

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black border-b-2 border-red-600 shadow-lg">

      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1280px-Valorant_logo_-_pink_color_version.svg.png"
            alt="Valorant Logo"
            className="h-10"
          />
        </div>

        {/* Menú de navegación (visible en pantallas grandes) */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <a
              href="#"
              className="text-white hover:text-red-500 font-mono font-bold transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-red-500 font-mono font-bold transition duration-300">
              Agents
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-red-500 font-mono font-bold transition duration-300">
              Maps
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-red-500 font-mono font-bold transition duration-300">
              Armament
            </a>
          </li>
        </ul>

        {/* Ícono de hamburguesa (visible en pantallas pequeñas) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable (visible en pantallas pequeñas) */}
      {isMenuOpen && (
        <div className={`md:hidden bg-gray-800 transition-all duration-300 ${isMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
          } overflow-hidden`}>
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <a
                href="#"
                className="text-white hover:text-red-500 font-semibold transition duration-300"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-white hover:text-red-500 font-semibold transition duration-300"
              >
                Agentes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-red-500 font-semibold transition duration-300"
              >
                Mapas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-red-500 font-semibold transition duration-300"
              >
                Armamento
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar