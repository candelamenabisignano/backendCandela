import {fileURLToPath} from 'url'; // obtiene la ruta de la consola
import { dirname } from 'path'; // traduce la ruta obtenida

const __filename= fileURLToPath(import.meta.url); //obteniendo la url de forma especifica
const __dirname= dirname(__filename);

export{
    __dirname
}