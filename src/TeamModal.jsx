function TeamModal({ selectedPersonajes, isModalOpen, closeModal, handleRemove }) {
    
    
    if (!isModalOpen) {
        return <></> // Retorna un fragmento vacío
    }

    return (
        <div className="fixed inset-0  bg-opacity-90 flex justify-center items-center z-50">
            <div className="bg-sky-900 p-6 rounded-lg w-11/12 max-w-2xl relative">
                
                {/* Botón para cerrar el modal */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-white text-2xl"
                >
                    &times;
                </button>

                {/* Título del modal */}
                <h2 className="text-white text-2xl text-center font-mono font-bold mb-4">My Team</h2>

                {/* Lista de personajes seleccionados */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedPersonajes.length === 0 ? (
                        
                        // Contenedor del mensaje
                        <div className="col-span-full flex justify-center items-center min-h-[200px]">
                            <p className="text-white text-center font-mono font-semibold">No characters in the team.</p>
                        </div>
                    ) : (
                        selectedPersonajes.map((personaje) => (
                            <div key={personaje.uuid} className="bg-gray-800 p-4 rounded-lg relative">
                                <img
                                    src={personaje.fullPortrait}
                                    alt={personaje.displayName}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <h3 className="text-white text-center mt-2">
                                    {personaje.displayName}
                                </h3>
                                
                                {/* Botón para eliminar personaje */}
                                <button
                                    onClick={() => handleRemove(personaje.uuid)}
                                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700 transition duration-300"
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeamModal