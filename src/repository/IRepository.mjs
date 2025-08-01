class IRepository {
    obtenerPorId(id)
    {
        throw new Error ("Metodo 'obtenerPorId()' no implementado");
    }
    obtenerTodos()
    {
        throw new Error ("Metodo 'obtenerTodos()' no implementado");
    }
    buscarPorAtributo(atributo,valor)
    {
        throw new Error ("Metodo 'buscarPorAtributo()' no implementado");
    }
    obtenerMayoresDe30()
    {
        throw new Error ("Metodo 'obtenerMayoresDe30()' no implementado");
    }
    crearHero()
    {
        throw new Error ("Metodo 'crearHero()' no implementado");
    }
    actualizarHeroe()
    {
        throw new Error ("Metodo 'actualizarHeroe()' no implementado");
    }
    eliminarHeroe()
    {
        throw new Error ("Metodo 'eliminarHeroe()' no implementado");
    }
}

export default IRepository;
