import {expect} from 'chai';
import UserDTO from '../../../src/dto/usersDTO.js';
describe("Prueba del dto de users", ()=>{
    it("se debe unificar el first_name con el last_name en una propiedad name", async()=>{
        const userMock={
            first_name:'Candela',
            last_name:'Mena',
            email:'c@gmail.com',
            password:'1234',
            age:12,
            role:'user'
        };

        const result= new UserDTO(userMock)

        expect(result.name).to.be.equal(`${userMock.first_name} ${userMock.last_name}`);
        expect(result.first_name).to.be.undefined
        expect(result.last_name).to.be.undefined
    })
})
