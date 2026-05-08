# Projeto de Testes E2E — Agenda de Contatos

Projeto de testes automatizados utilizando **Cypress** para validar as funcionalidades da aplicação [Agenda de Contatos (EBAC)](https://ebac-agenda-contatos-tan.vercel.app/).

## 📋 Funcionalidades Testadas

| Funcionalidade | Descrição |
|---|---|
| ✅ **Inclusão** | Adicionar um novo contato com nome, e-mail e telefone |
| ✅ **Alteração** | Editar os dados de um contato existente |
| ✅ **Remoção** | Excluir um contato da lista |

## 🛠 Tecnologias

- [Cypress](https://www.cypress.io/) v13+
- Node.js

## 🚀 Como executar os testes

### Pré-requisitos

- Node.js instalado (v16+)
- npm instalado

### Instalação

```bash
npm install
```

### Executar testes em modo interativo (GUI)

```bash
npm run cypress:open
```

### Executar testes em modo headless (terminal)

```bash
npm run cypress:run
```

## 📁 Estrutura do projeto

```
curso_ebac_frontend/
├── cypress/
│   ├── e2e/
│   │   └── agenda_contatos.cy.js   # Arquivo de testes E2E
│   ├── support/
│   │   ├── commands.js             # Comandos personalizados do Cypress
│   │   └── e2e.js                  # Configuração global de suporte
├── cypress.config.js               # Configuração do Cypress
├── package.json
└── README.md
```

## 🧪 Cenários de teste

### Inclusão de contato
- Verificação da visibilidade do formulário de inclusão
- Adição de novo contato e validação na lista
- Verificação da limpeza dos campos após inclusão
- Atualização do contador de contatos

### Alteração de contato
- Carregamento dos dados no formulário ao clicar em Editar
- Exibição dos botões Salvar e Cancelar no modo de edição
- Salvamento correto das alterações
- Cancelamento da edição sem alterar os dados

### Remoção de contato
- Remoção do contato e atualização da lista
- Atualização do contador após remoção
- Verificação de que o contato não aparece mais na lista
- Comportamento com lista completamente vazia
