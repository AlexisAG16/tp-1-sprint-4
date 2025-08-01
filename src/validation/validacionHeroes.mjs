import {body} from 'express-validator';

export const validacionHeroe = () =>
    [
        body('nombreSuperHeroe')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Nombre del superheroe requerido')
            .isLength({ min: 3 })
            .withMessage('El nombre del superheroe debe tener al menos 3 caracteres')
            .isLength({ max: 60 })
            .withMessage('El nombre del superheroe no debe exceder los 60 caracteres'),

        body('nombreReal')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Nombre real del superheroe requerido')
            .isLength({ min: 3 })
            .withMessage('El nombre real del superheroe debe tener al menos 3 caracteres')
            .isLength({ max: 60 })
            .withMessage('El nombre real del superheroe no debe exceder los 60 caracteres'),

        body('edad')
            .trim()
            .escape()
            .notEmpty()
            .isInt({ min:0 })
            .withMessage('Edad debe ser requerida'),

        body('poderes')
            .notEmpty() // no esta vacio
            .withMessage('Los poderes son requeridos.')
            .customSanitizer(value => {
            // Si el valor es una cadena, la divide y limpia
                if (typeof value === 'string') {
                    // Divide por coma, recorta espacios y filtra cadenas vacías
                    return value.split(',').map(p => p.trim()).filter(p => p !== '');
                }
                return value;
            })
            .isArray({ min: 1 })
            .withMessage('Poderes debe ser requerido como un array con al menos un elemento'),
        body('poderes.*')
            .trim()
            .escape()
            .isLength({ min: 3, max: 60 })
            .withMessage('Cada poder debe ser una cadena de texto con entre 3 y 60 caracteres'),
            
        body('aliados')
        .customSanitizer(value => {
            // Si el valor es una cadena, la divide y limpia
                if (typeof value === 'string') {
                    // Divide por coma, recorta espacios y filtra cadenas vacías
                    return value.split(',').map(p => p.trim()).filter(p => p !== '');
                }
                return value;
            }),
        body('enemigos')
        .customSanitizer(value => {
            // Si el valor es una cadena, la divide y limpia
                if (typeof value === 'string') {
                    // Divide por coma, recorta espacios y filtra cadenas vacías
                    return value.split(',').map(p => p.trim()).filter(p => p !== '');
                }
                return value;
            }),
    ];