import superHero from '../models/superheroe.mjs';
import SuperHero from '../models/superheroe.mjs'
import IRepository from './iRepository.mjs';

class SuperHeroRepository extends IRepository
{
    async obtenerPorId(id)
    {
        const encontrarPorId = await SuperHero.findById(id);
        console.log(encontrarPorId);

        return encontrarPorId;
    }

    // Parte del CRUD para obtener o leer todos
    async obtenerTodos()
    {
        const superheroeEncontrado = await SuperHero.find({});

        return superheroeEncontrado;
    }

    async buscarPorAtributo(atributo, valor) 
    {
    const schemaType = SuperHero.schema.paths[atributo].instance;
    let query;

    if (schemaType === 'Number') {
    query = { [atributo]: parseInt(valor) };
    if (isNaN(query[atributo])) {
      return [];
    }
    } else {
    query = { [atributo]: { $regex: valor, $options: 'i' } };
    }

    const atributoValor = await SuperHero.find(query);
    return atributoValor;
}

    async obtenerMayoresDe30() 
    {
        //console.log('Estoy en la capa de repositorio en obtener mayores de 30');
        const superheroeEncontrado = await SuperHero.find
        ({
        edad: { $gt: 30 },
        planetaOrigen: 'Tierra',
        $expr: { $gte: [{ $size: "$poderes" }, 2]}
        // poderes: { $exists: true, $size: { $gte: 2 }},
        });
        return superheroeEncontrado;
    }

    // CRUD

    async crearHero(objetoSuperheroe)
    {
        const nuevoHeroe = new SuperHero(objetoSuperheroe);
        const heroCreado = await nuevoHeroe.save();
       // res.send(`Nuevo Superheroe creado: ${nuevoHeroe}`);
        console.log(heroCreado);
        return heroCreado;
    }

    async actualizarHeroe(id,datosActualizados)
    {
        const superheroeActualizado = await superHero.findByIdAndUpdate(
            { _id: id }, 
            datosActualizados,
            {
                new: true,        
                runValidators: true 
            }
        );
        return superheroeActualizado;
    }

    async eliminarHeroe(id) {
        const superheroeEliminado = await superHero.findByIdAndDelete(id);
        return superheroeEliminado;
}
}

export default new SuperHeroRepository();