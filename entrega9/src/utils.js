import {fileURLToPath} from 'url'; // obtiene la ruta de la consola
import { dirname } from 'path'; // traduce la ruta obtenida
import bcrypt from 'bcrypt';

const __filename= fileURLToPath(import.meta.url); //obteniendo la url de forma especifica
const __dirname= dirname(__filename);

const createHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValid=(plainPassword, hashedPassword)=>{
    bcrypt.compareSync(hashedPassword, plainPassword)
}

export{
    __dirname,
    createHash,
    isValid
}