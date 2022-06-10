/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
var faker = require('faker-br');


describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios',
          }).then((response) => {
               expect(response.body.usuarios[1].nome).to.equal('Artur Felipe Albuquerque Portela')
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(30)
          })
     });

     it.only('Deve cadastrar um usuário com sucesso', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "carlos Andre",
                    "email": "andre_qa@gmail.com",
                    "password": "teste",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               failOnStatusCode: false,
               body: {
                    "nome": "Paulo Mesquita",
                    "email": "paulomesquita@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request({
               method: 'PUT',
               url: `usuarios/SOW18hI2b0KlNaPo`,
               body:
               {
                    "nome": "Fulano da Silva",
                    "email": "beltrano@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
               }
          }).then(response => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Registro alterado com sucesso')
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request({
               method: 'DELETE',
               url: `usuarios/VEEYJTQOZXVFhhhd`
          }).then(response => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Registro excluído com sucesso')
          })
     });


});
