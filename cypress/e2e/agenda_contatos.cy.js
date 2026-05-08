/// <reference types="cypress" />

/**
 * Testes E2E - Agenda de Contatos
 * Aplicação: https://ebac-agenda-contatos-tan.vercel.app/
 *
 * Cobrindo as funcionalidades:
 *  - Inclusão de contato
 *  - Alteração de contato
 *  - Remoção de contato
 */

describe('Agenda de Contatos', () => {
  // Dados de teste reutilizáveis
  const contatoOriginal = {
    nome: 'Lucas Teste',
    email: 'lucas.teste@email.com',
    telefone: '(11) 91234-5678',
  }

  const contatoAtualizado = {
    nome: 'Lucas Atualizado',
    email: 'lucas.atualizado@email.com',
    telefone: '(11) 99999-0000',
  }

  // Visita a página antes de cada teste
  beforeEach(() => {
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
      // Captura a quantidade atual de contatos na lista
      cy.get('ul li.contato').then((listaAntes) => {
        const quantidadeAntes = listaAntes.length

        // Preenche o formulário
        cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
        cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
        cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)

        // Clica em Adicionar
        cy.get('button.adicionar').click()

        // Verifica que a lista cresceu em 1
        cy.get('ul li.contato').should('have.length', quantidadeAntes + 1)

        // Verifica que os dados do novo contato aparecem na lista
        cy.get('ul li.contato').last().should('contain', contatoOriginal.nome)
        cy.get('ul li.contato').last().should('contain', contatoOriginal.email)
        cy.get('ul li.contato').last().should('contain', contatoOriginal.telefone)
      })
    })

    it('deve limpar os campos do formulário após adicionar o contato', () => {
      cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)

      cy.get('button.adicionar').click()

      // Os campos devem estar vazios após a inclusão
      cy.get('input[placeholder="Nome"]').should('have.value', '')
      cy.get('input[placeholder="E-mail"]').should('have.value', '')
      cy.get('input[placeholder="Telefone"]').should('have.value', '')
    })

    it('deve atualizar o contador de contatos (h2) após a inclusão', () => {
      // Captura o número atual do contador (ex: "3 contatos na agenda")
      cy.get('h2').invoke('text').then((textoAntes) => {
        const qtdAntes = parseInt(textoAntes.match(/\d+/)?.[0] || '0')

        cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
        cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
        cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)
        cy.get('button.adicionar').click()

        cy.get('h2').invoke('text').then((textoDepois) => {
          const qtdDepois = parseInt(textoDepois.match(/\d+/)?.[0] || '0')
          expect(qtdDepois).to.equal(qtdAntes + 1)
        })
      })
    })
  })

  // ──────────────────────────────────────────────────────────────
  // 2. ALTERAÇÃO DE CONTATO
  // ──────────────────────────────────────────────────────────────
  describe('Alteração de contato', () => {
    // Adiciona um contato antes de cada teste de alteração
    beforeEach(() => {
      cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)
      cy.get('button.adicionar').click()
    })

    it('deve carregar os dados do contato no formulário ao clicar em Editar', () => {
      // Clica no botão Editar do último contato adicionado
      cy.get('ul li.contato').last().find('button.edit').click()

      // Os campos devem estar preenchidos com os dados do contato
      cy.get('input[placeholder="Nome"]').should('have.value', contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').should('have.value', contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').should('have.value', contatoOriginal.telefone)
    })

    it('deve exibir os botões Salvar e Cancelar no modo de edição', () => {
      cy.get('ul li.contato').last().find('button.edit').click()

      cy.get('button.alterar').should('be.visible').and('contain', 'Salvar')
      cy.get('button.cancelar').should('be.visible').and('contain', 'Cancelar')
      // O botão Adicionar não deve estar visível no modo de edição
      cy.get('button.adicionar').should('not.exist')
    })

    it('deve salvar as alterações do contato ao clicar em Salvar', () => {
      cy.get('ul li.contato').last().find('button.edit').click()

      // Limpa e preenche com novos dados
      cy.get('input[placeholder="Nome"]').clear().type(contatoAtualizado.nome)
      cy.get('input[placeholder="E-mail"]').clear().type(contatoAtualizado.email)
      cy.get('input[placeholder="Telefone"]').clear().type(contatoAtualizado.telefone)

      cy.get('button.alterar').click()

      // O contato deve aparecer com os dados atualizados na lista
      cy.get('ul li.contato').last().should('contain', contatoAtualizado.nome)
      cy.get('ul li.contato').last().should('contain', contatoAtualizado.email)
      cy.get('ul li.contato').last().should('contain', contatoAtualizado.telefone)

      // Os dados antigos não devem mais aparecer no contato editado
      cy.get('ul li.contato').last().should('not.contain', contatoOriginal.nome)
    })

    it('deve cancelar a edição e restaurar o formulário ao clicar em Cancelar', () => {
      cy.get('ul li.contato').last().find('button.edit').click()

      // Modifica o campo mas não salva
      cy.get('input[placeholder="Nome"]').clear().type('Nome Temporário')

      // Clica em Cancelar
      cy.get('button.cancelar').click()

      // O botão Adicionar deve voltar a aparecer
      cy.get('button.adicionar').should('be.visible')

      // O contato original não deve ter sido alterado na lista
      cy.get('ul li.contato').last().should('contain', contatoOriginal.nome)
    })
  })

  // ──────────────────────────────────────────────────────────────
  // 3. REMOÇÃO DE CONTATO
  // ──────────────────────────────────────────────────────────────
  describe('Remoção de contato', () => {
    // Adiciona um contato antes de cada teste de remoção
    beforeEach(() => {
      cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
      cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)
      cy.get('button.adicionar').click()
    })

    it('deve remover o contato da lista ao clicar em Deletar', () => {
      cy.get('ul li.contato').then((listaAntes) => {
        const quantidadeAntes = listaAntes.length

        // Clica no botão Deletar do último contato
        cy.get('ul li.contato').last().find('button.delete').click()

        // A lista deve ter um item a menos
        cy.get('ul li.contato').should('have.length', quantidadeAntes - 1)
      })
    })

    it('deve atualizar o contador de contatos após a remoção', () => {
      cy.get('h2').invoke('text').then((textoAntes) => {
        const qtdAntes = parseInt(textoAntes.match(/\d+/)?.[0] || '0')

        cy.get('ul li.contato').last().find('button.delete').click()

        cy.get('h2').invoke('text').then((textoDepois) => {
          const qtdDepois = parseInt(textoDepois.match(/\d+/)?.[0] || '0')
          expect(qtdDepois).to.equal(qtdAntes - 1)
        })
      })
    })

    it('não deve mostrar o contato removido na lista', () => {
      // Garante que o contato está na lista
      cy.get('ul li.contato').last().should('contain', contatoOriginal.nome)

      // Remove o contato
      cy.get('ul li.contato').last().find('button.delete').click()

      // O nome do contato removido não deve mais aparecer na lista
      cy.get('ul').should('not.contain', contatoOriginal.nome)
    })

    it('deve exibir a lista vazia quando todos os contatos forem removidos', () => {
      // Remove todos os contatos da lista
      cy.get('ul li.contato').then(($itens) => {
        $itens.each(() => {
          cy.get('ul li.contato').first().find('button.delete').click()
        })

        // Após remover todos, a lista não deve ter mais itens
        cy.get('ul li.contato').should('not.exist')
      })
    })
  })
})
