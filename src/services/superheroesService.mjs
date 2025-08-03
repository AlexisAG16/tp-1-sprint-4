import superheroesRepository from '../repository/superheroesRepository.mjs';

export async function obtenerSuperheroePorId(id)
{
    const obtenerId = await superheroesRepository.obtenerPorId(id);
    return obtenerId;
}

export async function obtenerTodosLosSuperheroes()
{
    const RepoObtenerTodos = await superheroesRepository.obtenerTodos();

    return RepoObtenerTodos;
}

export async function buscarSuperheroesPorAtributo(atributo,valor)
{
    const atributoVal = await superheroesRepository.buscarPorAtributo(atributo,valor);
    return atributoVal;
}

export async function obtenerSuperheroesMayoresDe30()
{
    return await superheroesRepository.obtenerMayoresDe30();
}

export async function obtenerSuperheroePorNombre(nombre) {
    // El servicio llama a la nueva función del repositorio
    return await superheroesRepository.obtenerPorNombre(nombre);
}

// servicios nuevos
export async function crearSuperheroe(objetoSuperheroe)
{
    return await superheroesRepository.crearHero(objetoSuperheroe);
}

export async function actualizarSuperheroe(id,datos)
{
    return await superheroesRepository.actualizarHeroe(id,datos);
}

export async function eliminarSuperHeroe(id) 
{
    return await superheroesRepository.eliminarHeroe(id);
}