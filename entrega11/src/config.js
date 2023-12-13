import dotenv from 'dotenv';

dotenv.config();

const configs={
    port:process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    privateKey:process.env.PRIVATE_KEY
};

export default configs;