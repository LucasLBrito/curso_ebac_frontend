/// <reference types="cypress" />

/**
 * Testes E2E - Agenda de Contatos
 * Aplicação: https://ebac-agenda-contatos-tan.vercel.app/
 *
 * Cobrindo as funcionalidades:
 *  - Inclusão de contato
 *  - Alteração de contato
 *  - Remoção de um contato
 */

describe('Agenda de Contatos', () => {
  let contatoOriginal;
  let contatoAtualizado;

  // Visita a página antes de cada teste e gera dados únicos
  beforeEach(() => {
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000)
    contatoOriginal = {
      nome: `Lucas Teste ${uniqueId}`,
      email: `lucas${uniqueId}@cypress.com`,
      telefone: '(11) 91234-5678',
    }
    contatoAtualizado = {
      nome: `Lucas Atualizado ${uniqueId}`,
      email: `lucasat${uniqueId}@cypress.com`,
      telefone: '(11) 99999-0000',
    }
    
    cy.visit('/')
  })

  // ──────────────────────────────────────────────────────────────
  // 1. INCLUSÃO DE CONTATO
  // ──────────────────────────────────────────────────────────────
  describe('Inclusão de contato', () => {
    it('deve exibir o formulário de inclusão na página inicial', () => {
      cy.get('input[placeholder="Nome"]').should('be.visible')
      cy.get('input[placeholder="E-mail"]').should('be.visible')
      cy.get('input[placeholder="Telefone"]').should('be.visible')
      cy.get('button.adicionar').should('be.visible').and('contain', 'Adicionar')
    })

    it('deve adicionar um novo contato ao preencher o formulário e clicar em Adicionar', () => {
      cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)

      cy.get('button.adicionar').click()

      cy.contains(contatoOriginal.nome).should('exist')
      cy.contains(contatoOriginal.email).should('exist')
      cy.contains(contatoOriginal.telefone).should('exist')
    })
  })

  // ──────────────────────────────────────────────────────────────
  // 2. ALTERAÇÃO DE CONTATO
  // ──────────────────────────────────────────────────────────────
  describe('Alteração de contato', () => {
    beforeEach(() => {
      cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)
      cy.get('button.adicionar').click()
      cy.contains(contatoOriginal.nome).should('exist')
    })

    it('deve carregar os dados do contato no formulário ao clicar em Editar', () => {
      // Navega do elemento de texto até o container principal e acha o botão
      cy.contains(contatoOriginal.nome).parent().parent().parent().find('.edit').click()

      cy.get('input[placeholder="Nome"]').should('have.value', contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').should('have.value', contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').should('have.value', contatoOriginal.telefone)
    })

    it('deve salvar as alterações do contato ao clicar em Salvar', () => {
      cy.contains(contatoOriginal.nome).parent().parent().parent().find('.edit').click()

      cy.get('input[placeholder="Nome"]').clear().type(contatoAtualizado.nome)
      cy.get('input[placeholder="E-mail"]').clear().type(contatoAtualizado.email)
      cy.get('input[placeholder="Telefone"]').clear().type(contatoAtualizado.telefone)

      cy.get('button.alterar').click()

      cy.contains(contatoAtualizado.nome).should('exist')
      cy.contains(contatoAtualizado.email).should('exist')
      cy.contains(contatoAtualizado.telefone).should('exist')
      
      // Limpeza
      cy.contains(contatoAtualizado.nome).parent().parent().parent().find('.delete').click()
    })
  })

  // ──────────────────────────────────────────────────────────────
  // 3. REMOÇÃO DE CONTATO
  // ──────────────────────────────────────────────────────────────
  describe('Remoção de contato', () => {
    beforeEach(() => {
      cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)
      cy.get('button.adicionar').click()
      cy.contains(contatoOriginal.nome).should('exist')
    })

    it('deve remover o contato da lista ao clicar em Deletar', () => {
      cy.contains(contatoOriginal.nome).parent().parent().parent().find('.delete').click()

      cy.contains(contatoOriginal.nome).should('not.exist')
    })
  })
})
