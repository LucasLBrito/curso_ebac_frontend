// ***********************************************
// cypress/support/commands.js
//
// Comandos customizados do Cypress.
// Adicione aqui novos comandos para reutilizar nos testes.
// ***********************************************

/**
 * Comando personalizado para adicionar um contato
 * Uso: cy.adicionarContato('Nome', 'email@test.com', '(11) 99999-9999')
 */
Cypress.Commands.add('adicionarContato', (nome, email, telefone) => {
  cy.get('input[placeholder="Nome"]').type(nome)
  cy.get('input[placeholder="E-mail"]').type(email)
  cy.get('input[placeholder="Telefone"]').type(telefone)
  cy.get('button.adicionar').click()
})

/**
 * Comando personalizado para editar o último contato da lista
 * Uso: cy.editarUltimoContato('Novo Nome', 'novo@email.com', '(21) 88888-0000')
 */
Cypress.Commands.add('editarUltimoContato', (nome, email, telefone) => {
  cy.get('ul li.contato').last().find('button.edit').click()
  cy.get('input[placeholder="Nome"]').clear().type(nome)
  cy.get('input[placeholder="E-mail"]').clear().type(email)
  cy.get('input[placeholder="Telefone"]').clear().type(telefone)
  cy.get('button.alterar').click()
})

/**
 * Comando personalizado para remover o último contato da lista
 * Uso: cy.removerUltimoContato()
 */
Cypress.Commands.add('removerUltimoContato', () => {
  cy.get('ul li.contato').last().find('button.delete').click()
})
