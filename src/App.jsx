import { useEffect, useState } from 'react'
import './App.css'
import Body from './Body'
import Navbar from './Navbar'
import TeamModal from './TeamModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

async function fetchApi(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en la Api", error)
  }
}

function App() {
  const [personajes, setPersonajes] = useState([]) // Estado para setear los personajes
  const [selectedPersonajes, setSelectedPersonajes] = useState([]) // Estado para almacenar las cards agregadas al Team
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar el modal

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true)

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false)

  // UseEffect de una sola carga para llamar traer la informacion de la API
  useEffect(() => {
    async function fetchData() {
      const data = await fetchApi("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
      const newData = data.data.map(objeto => {
        return {
          ...objeto, isStarred: false
        };
      })
      setPersonajes(newData)
    }
    fetchData()
  }, [])

  // Función para agregar un personaje al equipo
  const handleFavorite = (id) => {
    // Verifica si el personaje ya está en el equipo
    const isAlreadySelected = selectedPersonajes.some((p) => p.uuid === id)
  
    if (isAlreadySelected) {
      // Si ya está en el equipo, muestra un mensaje de advertencia
      toast.warning("Este personaje ya ha sido agregado en el equipo.")
    } else {
      // Si no está en el equipo y hay espacio, lo agrega
      if (selectedPersonajes.length < 5) {
        
        // Encuentra el personaje en la lista de personajes
        const personajeToAdd = personajes.find((p) => p.uuid === id)
  
        // Agrega el personaje al equipo
        setSelectedPersonajes([...selectedPersonajes, personajeToAdd])
  
        // Muestra un mensaje de éxito
        toast.success("Personaje agregado al equipo.")

      } else {

        // Si ya hay 5 personajes, muestra un mensaje de error
        toast.error("Has alcanzado el límite de 5 personajes por equipo.")
      }
    }
  }

  console.log(personajes);
  

  // Función para eliminar un personaje del equipo
  const handleRemove = (id) => {
    setSelectedPersonajes((objeto) =>
      objeto.filter((personaje) => personaje.uuid !== id)
    )
  }

  return (
    <>
      <Navbar />
      <Body personajes={personajes} handleFavorite={handleFavorite} openModal={openModal} />
      <TeamModal
        selectedPersonajes={selectedPersonajes}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleRemove={handleRemove}
      />
      <ToastContainer />
    </>
  )
}

export default App