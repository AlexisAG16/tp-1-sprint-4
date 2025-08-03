import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import {connectDB} from './config/dbconfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';

// Manejo de promesas no capturadas (Unhandled Promise Rejection)
// Esto debe ir al inicio del archivo para atrapar cualquier error global.
process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa no capturada:', reason.message || reason);
    // Nota: Por lo general, es seguro dejar que la aplicación se caiga para
    // que el gestor de procesos (como Render) la reinicie,
    // pero puedes elegir manejarlo de forma diferente.
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const loggerMiddleware = (req,res,next) =>
{
    console.log(`Peticion Recibida: ${req.body} ${req.url}`);
    next();
};

try {
    connectDB();
    console.log('Intentando conectar a la base de datos...');
} catch (error) {
    console.error('Error FATAL al conectar a la base de datos:', error);
}
//connectDB();

app.use(loggerMiddleware);

// para peticiones post en formularios
app.use(bodyParser.urlencoded({ extended: true }));

// convertir metodos de formularios a put o delete
app.use(methodOverride('_method'));

// parsea los datos JSON que se envian en http
app.use(express.json());

// vistas ejs
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


// express ejs layouts
app.set('layout','layout');
app.use(expressLayouts);

// para traer estilos al server
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Superhéroes',
    });
});

app.use('/api',superHeroRoutes);

// Manejador de errores global
// Este middleware capturará cualquier error no manejado en las rutas
// y enviará una respuesta de error controlada al cliente.
app.use((err, req, res, next) => {
    console.error('Error no controlado:', err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor.';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.use((req,res) => {
    res.status(404).send({mensaje:"Ruta no encontrada"});
});

app.listen(PORT,()=>
{
    console.log(`Servidor escuchando en el puerto ${PORT} , en http://localhost:${PORT}/api/`);
});