import {
    crearSuperheroe,
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    actualizarSuperheroe,
    eliminarSuperHeroe
} from '../services/superheroesService.mjs';

import { Types } from 'mongoose'; // Para validar IDs de MongoDB

/*
const commonNavbarLinks = [
    { text: 'Inicio', href:'/api/', icon: '/icons/home.svg'},
    { text: 'Superhéroes', href:'/api/heroes', icon: '/icons/heroe.png'},
    { text: 'Agregar Nuevo', href:'/api/formAgregarHero', icon: '/icons/agregar.png'},
    { text: 'Acerca de', href:'/api/about', icon: '/icons/info.svg'},
    { text: 'Contacto', href:'/api/contact', icon: '/icons/contact.svg'},
];
*/

// ----------------------------------------------------
// CONTROLADORES DE LECTURA (GET)
// ----------------------------------------------------

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;

        // Validar que el ID sea un ObjectId válido de Mongoose
        if (!Types.ObjectId.isValid(id)) {
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'ID de superhéroe no válido.' });
            }
            return res.status(400).send('ID de superhéroe no válido.');
        }

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            if (req.accepts('json')) {
                return res.status(404).json({ message: 'Superhéroe no encontrado.' });
            }
            return res.status(404).send('Superhéroe no encontrado.');
        }

        if (req.accepts('html')) {
            // Si el cliente prefiere HTML, redirige al dashboard principal
            res.redirect('/api/heroes');
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON, envía los datos del superhéroe.
            res.json(superheroe);
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en obtenerSuperheroePorIdController:', error);
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();

        if (req.accepts('html')) {
            // Si el cliente prefiere HTML (navegador), renderiza el dashboard
            res.render('dashboard', { superheroes: superheroes });
            //res.render('dashboard', { superheroes, title: 'Lista de Superhéroes', navbarLinks: commonNavbarLinks });
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON (Postman), envía los datos
            res.json(superheroes);
        } else {
            // Si no se soporta el tipo de contenido, responde con 406 Not Acceptable
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en obtenerTodosLosSuperheroesController:', error);
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            if (req.accepts('json')) {
                return res.status(404).json({ mensaje: 'No se encontraron superhéroes con ese atributo.' });
            }
            return res.status(404).send('No se encontraron superhéroes con ese atributo.');
        }

        if (req.accepts('html')) {
            // Para HTML, renderiza el dashboard con los resultados filtrados
            res.render('dashboard', { superheroes });
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON, envía los datos.
            res.json(superheroes);
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en buscarSuperheroesPorAtributoController:', error);
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {
            if (req.accepts('json')) {
                return res.status(404).json({ mensaje: 'No se encontraron superhéroes mayores de 30 años.' });
            }
            return res.status(404).send('No se encontraron superhéroes mayores de 30 años.');
        }

        if (req.accepts('html')) {
            // Renderiza el dashboard con los resultados filtrados
            res.render('dashboard', { superheroes });
        } else if (req.accepts('json')) {
            // Si el cliente prefiere JSON, envía los datos.
            res.json(superheroes);
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en obtenerSuperheroesMayoresDe30Controller:', error);
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

// ----------------------------------------------------
// CONTROLADORES DE FORMULARIOS (Siempre HTML)
// ----------------------------------------------------

export async function formAgregarHeroController(req, res) {
    // Este siempre es para el navegador, así que siempre renderiza HTML
    res.render('agregarHero');
    //res.render('agregarHero', { title: 'Agregar Nuevo Superhéroe', navbarLinks: commonNavbarLinks });
}

export async function formActualizarHeroeController(req, res) {
    try {
        const { id } = req.params;
        // Validar que el ID sea un ObjectId válido de Mongoose
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID de superhéroe no válido para edición.');
        }
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado para editar.');
        }

        res.render('editarHero', { info: superheroe });
        //res.render('editarHero', { info: superheroe, title: `Editar Superhéroe: ${superheroe.nombreSuperHeroe}`, navbarLinks: commonNavbarLinks });
    } catch (error) {
        console.error('Error en formActualizarHeroeController:', error);
        res.status(500).send('Error interno al cargar el formulario de edición.');
    }
}

export async function confirmarEliminacionController(req, res) {
    try {
        const { id } = req.params;
        // Validar que el ID sea un ObjectId válido de Mongoose
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID de superhéroe no válido para confirmación.');
        }

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado para confirmar eliminación.');
        }

        res.render('confirmar-eliminacion', { info: superheroe });
        //res.render('confirmarEliminacion', { info: superheroe, title: `Confirmar Eliminación: ${superheroe.nombreSuperHeroe}`, navbarLinks: commonNavbarLinks });
    } catch (error) {
        console.error('Error en confirmarEliminacionController:', error);
        res.status(500).send({ mensaje: 'Error interno al cargar la página de confirmación.' });
    }
}

// ----------------------------------------------------
// CONTROLADORES DE ESCRITURA (POST, PUT, DELETE)
// ----------------------------------------------------

export async function agregarHeroController(req, res) {
    try {
        const body = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };

        const nuevoSuperheroe = await crearSuperheroe(body);

        if (req.accepts('html')) {
            res.redirect('/api/heroes'); // Redirige al dashboard HTML
        } else if (req.accepts('json')) {
            res.status(201).json(nuevoSuperheroe); // Responde con el héroe creado y status 201 (Created)
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en agregarHeroController:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'Errores de validación', errors });
            } else {
                return res.status(400).send('Error de validación: ' + errors.join(', '));
            }
        }
        res.status(500).send({ mensaje: 'Error al crear un superhéroe nuevo', error: error.message });
    }
}

export async function actualizarHeroController(req, res) {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'ID de superhéroe no válido.' });
            }
            return res.status(400).send('ID de superhéroe no válido.');
        }

        const datosActualizados = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (!superheroeActualizado) {
            if (req.accepts('json')) {
                return res.status(404).json({ message: 'Superhéroe no encontrado para actualizar.' });
            }
            return res.status(404).send('Superhéroe no encontrado para actualizar.');
        }

        if (req.accepts('html')) {
            res.redirect('/api/heroes'); // Redirige al dashboard HTML
        } else if (req.accepts('json')) {
            res.json(superheroeActualizado); // Responde con el héroe actualizado
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en actualizarHeroController:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'Errores de validación', errors });
            } else {
                return res.status(400).send('Error de validación: ' + errors.join(', '));
            }
        }
        res.status(500).send({ mensaje: 'Error al modificar el superhéroe', error: error.message });
    }
}

export async function eliminarHeroController(req, res) {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            if (req.accepts('json')) {
                return res.status(400).json({ message: 'ID de superhéroe no válido.' });
            }
            return res.status(400).send('ID de superhéroe no válido.');
        }

        const superheroeEliminado = await eliminarSuperHeroe(id); // Asegúrate de usar el nombre correcto de la función

        if (!superheroeEliminado) {
            if (req.accepts('json')) {
                return res.status(404).json({ message: 'Superhéroe no encontrado para eliminar.' });
            }
            return res.status(404).send('Superhéroe no encontrado para eliminar.');
        }

        if (req.accepts('html')) {
            res.redirect('/api/heroes'); // Redirige al dashboard HTML
        } else if (req.accepts('json')) {
            res.status(200).json({ message: 'Superhéroe eliminado correctamente', deletedHero: superheroeEliminado }); // Responde con un mensaje y el héroe eliminado
        } else {
            res.status(406).send('Not Acceptable: Solo se soportan respuestas HTML o JSON.');
        }
    } catch (error) {
        console.error('Error en eliminarHeroController:', error);
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe.', error: error.message });
    }
}




/* PARA LAS VISTAS SOLAMENTE Y HTML EN POSTMAN

import{
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30, 
    crearSuperheroe, 
    actualizarSuperheroe,
    eliminarSuperHeroe} 
    from '../services/superheroesService.mjs';

import { renderizarSuperheroe,renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req,res)
{

    try{
            const { id } = req.params;
            const superheroe = await obtenerSuperheroePorId(id);

            if(!superheroe)
            {
                return res.status(404).send({ mensaje: 'Superheroe no encontrado'});
            }

            const superheroeFormateado = renderizarSuperheroe(superheroe);
            res.status(200).json(superheroeFormateado);
        }
    catch(error)
    {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe',error: error.message });
    }
    
}

export async function obtenerTodosLosSuperheroesController(req,res)
{
    try{
            const superheroes = await obtenerTodosLosSuperheroes();

            res.render('dashboard', { superheroes });
        }
    catch(error)
    {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes',error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req,res)
{
    try{
            const {atributo,valor} = req.params;
            const superheroes = await buscarSuperheroesPorAtributo(atributo,valor);

            if(superheroes.length === 0)
            {
                return res.status(404).send(
                { mensaje:'No se encontraron superheroes con ese atributo'});
            }
            const superheroesFormateados = renderizarListaSuperheroes(superheroes);
            

            res.status(200).json(superheroesFormateados);
        }
    catch (error)
    {
        res.status(500).send({mensaje: "Error al buscar los superheroes",error: error.message});
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req,res)
{
    try 
    {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length === 0)
        {
            return res.status(404).send(
                { mensaje : 'No se encontraron superheroes mayores de 30 años'});
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    }
    catch(error)
    {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes mayores de 30',error:error.message});
    }
}

funcion de controlador para crear heroes
export async function agregarHeroController(req,res){
    try
    {
        const body = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };
        const crearSuper = await crearSuperheroe(body);
        console.log(crearSuper);
        res.redirect("http://localhost:3000/api/heroes");
    }
    catch(error)
    {
        res.status(500).send({mensaje:'Error al crear un superheroe nuevo'});
        console.log(error);
    }
}

export async function actualizarHeroController(req,res){
    try
    {
        const {id} = req.params;
        const heroActualizado = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };
        const actualizarSuper = await actualizarSuperheroe(id,heroActualizado);
        console.log(actualizarSuper);
        res.redirect("http://localhost:3000/api/heroes");
    }
    catch(error)
    {
        res.status(500).send({mensaje:'Error al modificar el superheroe'});
        console.log(error);
    }
}

export async function eliminarHeroController(req, res) {
    try {
        const { id } = req.params;

        const superheroeEliminado = await eliminarSuperHeroe(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para eliminar.' });
        }

        res.redirect("http://localhost:3000/api/heroes");
    } catch (error) {
        console.error('Error al eliminar superhéroe:', error);
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe.' });
    }
}


export async function confirmarEliminacionController(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ mensaje: 'ID del superhéroe es requerido para confirmar eliminación.' });
        }

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para confirmar eliminación.' });
        }

        res.render('confirmarEliminacion', { info: superheroe });

    } catch (error) {
        console.error('Error al cargar la página de confirmación de eliminación:', error);
        res.status(500).send({ mensaje: 'Error interno al cargar la página de confirmación.' });
    }
}

// funciones de controlador para formularios
export async function formAgregarHeroController(req,res){
    res.render('agregarHero');
}

export async function formActualizarHeroeController(req,res){
    try{
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
        return res.status(404).send('Superhéroe no encontrado para editar.');
    }

    res.render('editarHero',{info : superheroe});
    } 
    catch (error) {
        console.error('Error al cargar el formulario de edición:', error);
        res.status(500).send('Error interno al cargar el superhéroe.');
    }
} */