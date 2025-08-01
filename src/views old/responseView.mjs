export function renderizarSuperheroe(superheroe)
{
    return {
        id: superheroe.id,
        nombreSuperHeroe: superheroe.nombreSuperHeroe,
        nombreReal: superheroe.nombreReal,
        edad: superheroe.edad,
        planetaOrigen: superheroe.planetaOrigen,
        debilidad: superheroe.debilidad,
        poderes: superheroe.poderes,
        aliados: superheroe.aliados,
        enemigos: superheroe.enemigos
    };
}

export function renderizarListaSuperheroes(superHeroes)
{
    return superHeroes.map(superheroe => renderizarSuperheroe(superheroe));
}