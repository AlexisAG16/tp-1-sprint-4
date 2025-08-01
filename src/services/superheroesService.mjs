import superheroesRepository from '../repository/superheroesRepository.mjs';

export async function obtenerSuperheroePorId(id)
{
    const obtenerId = await superheroesRepository.obtenerPorId(id);
    //console.log(obtenerId);

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