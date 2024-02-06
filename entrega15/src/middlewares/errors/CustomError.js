export default class CustomError{
    static createError({name='error', message,cause,code=1}){
        let error= new Error(message,{cause});
        error.code=code;
        error.name=name;
        return error;
    };
};