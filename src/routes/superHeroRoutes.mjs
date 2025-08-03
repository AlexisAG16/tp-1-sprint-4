import express from 'express';
import { validacionHeroe } from '../validation/validacionHeroes.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,

    formBuscarPorNombreController,
    formAgregarHeroController,
    formActualizarHeroeController,
    confirmarEliminacionController,

    buscarPorNombreController,
    agregarHeroController,
    actualizarHeroController,
    eliminarHeroController

} from '../controllers/superheroesController.mjs';

const router = express.Router();

/*
const commonNavbarLinks = [
    { text: 'Inicio', href:'/api/', icon: '/icons/home.svg'},
    { text: 'Superhéroes', href:'/api/heroes', icon: '/icons/heroe.png'},
    { text: 'Agregar Nuevo', href:'/api/formAgregarHero', icon: '/icons/agregar.png'},
    { text: 'Acerca de', href:'/api/about', icon: '/icons/info.svg'},
    { text: 'Contacto', href:'/api/contact', icon: '/icons/contact.svg'},
];
router.get('/', (req, res) => {
    res.render('index',
        {
            title: 'Pagina Principal',
            navbarLinks: commonNavbarLinks // Pasa los enlaces comunes
        }
    );
});
router.get('/about', (req, res) => {
    res.render('acercade', {
        title: 'Acerca de Nosotros',
        navbarLinks: commonNavbarLinks // Pasa los enlaces comunes
    });
});
router.get('/contact', (req, res) => {
    res.render('contacto', {
        title: 'Contacto',
        navbarLinks: commonNavbarLinks // Pasa los enlaces comunes
    });
}); */

router.get('/', (req, res) => res.render('index'));

// endpoints de lectura
router.get('/heroes',obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30',obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id',obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor',buscarSuperheroesPorAtributoController);

// Formularios
router.get('/formBuscarPorNombre', formBuscarPorNombreController);
router.get('/formAgregarHero',formAgregarHeroController);
router.get('/formEditarHero/:id',formActualizarHeroeController);
router.get('/confirmarEliminar/:id', confirmarEliminacionController);

router.get('/buscarHeroe', buscarPorNombreController);

// Ruta: Create
router.post('/AgregarHero',
    validacionHeroe(),
    handleValidationErrors ,
    agregarHeroController);

// Ruta: Update
router.put('/ActualizarHero/:id',
    validacionHeroe(),
    handleValidationErrors ,
    actualizarHeroController);

// Ruta: Delete
router.delete('/EliminarHero/:id', eliminarHeroController);

router.get('/about', (req, res) => res.render('acercade'));
router.get('/contact', (req, res) => res.render('contacto'));


export default router;