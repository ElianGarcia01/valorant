import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Body({ personajes, handleFavorite, openModal }) {

    // Estado del input serch
    const [search, setSearch] = useState("")

    // Estado del filtro selected
    const [roleSeleccionado, setRolSeleccionado] = useState("")

    // Estado para renderizar personajes filtrados
    const [personajesFiltrados, setPersonajesFiltrados] = useState([])


    // Funcion para asignar valores al input search
    function handleSearchChange(event) {
        setSearch(event.target.value)
    }

    // Funcion para asignar valores al selected
    function handleRolChange(event) {
        setRolSeleccionado(event.target.value)
    }

    // Filtro de personajes
    useEffect(() => {
        setPersonajesFiltrados(personajes.filter((personaje) => {
            const coincideTexto = personaje.displayName.toLowerCase()
                .includes(search.toLowerCase())
            const coincideRol = roleSeleccionado == "" || personaje.role?.displayName == roleSeleccionado
            return coincideTexto && coincideRol
        }))
    }, [search, personajes, roleSeleccionado])


    // Condicional para mostar Skeletons mientras carga la solicitud fetch
    const isLoading = personajes.length === 0
    if (isLoading) {
        return (
            <div className="flex flex-wrap justify-center gap-6 p-8">
                {Array(9).fill(0).map((_, i) => (
                    <div key={i} className="w-40 h-56">
                        <Skeleton height={140} width="100%" />
                        <Skeleton width={100} height={20} />
                        <Skeleton width={30} height={30} circle />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 bg-[url('https://esports.as.com/2020/05/12/valorant/VALORANT_1354374560_392609_1440x810.png')] bg-contain bg-center">

            {/* TITULO PRINCIPAL */}
            <div className="text-center w-full p-8">
                <h1 className="font-bold font-mono text-5xl text-gray-300 border-b-2 p-8 md:mt-20">VALORANT AGENTS</h1>
                <h4 className="font-mono font-semibold text-gray-300 border-b-2 p-8 mb-6">Welcome to your Valorant Agent Centre! Here you can explore all the characters, learn about their abilities and team up with your favourites. Ready to dominate the battlefield?</h4>
            </div>

            {/* Contenedor de filtros */}
            <div className="flex justify-center">
                <div className="flex flex-col md:flex-row justify-around w-full p-4 gap-3">
                    {/* Boton para abrir y cerrar el Modal */}
                    <div className="flex justify-center">
                        <button
                            onClick={openModal}
                            className="bg-red-500/80 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 font-mono font-semibold w-1/3 md:w-auto"
                        >
                            My Team
                        </button>
                    </div>
                    <input
                        className="bg-gray-900/70 text-white text-center px-4 py-2 rounded-lg hover:bg-gray-800/80 transition duration-300 font-mono font-normal placeholder:text-gray-300 w-full md:w-auto"
                        type="search"
                        placeholder="Search for agents ..."
                        onChange={handleSearchChange}
                    />
                    <select
                        onChange={handleRolChange}
                        className="px-4 py-2 rounded-lg bg-gray-700/70 text-white text-center font-mono font-medium w-full md:w-auto"
                    >
                        <option value="">Select a role</option>
                        {[...new Set(personajes.filter((personaje) => personaje.role !== null).map((personaje) => personaje.role.displayName))].map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Contenedor de las Cards */}
            <div className="flex flex-wrap justify-center gap-6 p-8">
                {personajesFiltrados.length === 0 ?
                    <p className="text-gray-200 text-center text-2xl font-mono font-bold"> NO AGENTS FOUND, TRY ANOTHER SEARCH.</p>
                    : personajesFiltrados.map((personaje) => (
                        <Card key={personaje.uuid} personaje={personaje} handleFavorite={handleFavorite} />
                    ))}
            </div>
        </div>
    )
}

function Card({ personaje, handleFavorite }) {
    return (
        <div
            className="w-40 h-[310px] bg-gray-800 rounded-lg shadow-lg overflow-hidden transform
            transition duration-300 hover:scale-110 hover:shadow-xl flex justify-center items-center"
            style={{ backgroundImage: `url('${personaje.background}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="relative w-full h-3/4 ">
                <img
                    className="w-full h-full object-cover object-center"
                    src={personaje.displayIcon}
                    alt={personaje.displayName}
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity flex items-center justify-center">
                    <button
                        className="bg-red-600 px-4 py-2 text-white font-semibold rounded"
                        onClick={() => handleFavorite(personaje.uuid)}
                    >
                        Add to Team
                    </button>
                </div>
                <div className="text-center text-white font-mono font-bold text-lg p-2 border-t border-gray-700">
                    <h2>{personaje.displayName}</h2>
                </div>
            </div>

        </div>
    )
}

export default Body
