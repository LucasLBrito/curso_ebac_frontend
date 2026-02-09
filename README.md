# Exercício ES6 - Conceitos de POO

## Descrição

Este projeto é um exercício desenvolvido para o curso da EBAC, focado na aplicação de conceitos de Programação Orientada a Objetos (POO) utilizando JavaScript (ES6). Ele demonstra a criação de classes, objetos, construtores e métodos, especificamente com um exemplo de gerenciamento de alunos e suas notas.

## Funcionalidades

- **Definição de Classe `aluno`**: Uma classe `aluno` é definida com propriedades como `nome`, `idade` e `nota`.
- **Método `aprovado()`**: A classe `aluno` inclui um método que verifica se o aluno foi aprovado com base em sua nota (nota maior ou igual a 6).
- **Criação de Objetos**: Múltiplos objetos `aluno` são instanciados com diferentes dados.
- **Iteração e Exibição**: O projeto itera sobre um array de alunos, exibindo suas informações e o status de aprovação/reprovação no console.

## Tecnologias Utilizadas

- **JavaScript (ES6)**: Linguagem de programação principal.
- **Babel**: Utilizado para transpilar o código ES6 para uma versão compatível com navegadores mais antigos, garantindo maior compatibilidade.

## Como Rodar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/LucasLBrito/curso_ebac_frontend.git
    cd curso_ebac_frontend/exercicio_es6
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Transpile o código**:
    ```bash
    npm run build
    ```
    Este comando irá transpilar os arquivos JavaScript da pasta `src` para a pasta `dist`.

4.  **Execute o projeto**:
    Abra o arquivo `index.html` (se houver, ou crie um para importar o `dist/main.js`) em seu navegador, ou execute o arquivo `dist/main.js` diretamente em um ambiente Node.js.

## Estrutura do Projeto

```
. 
├── package.json
├── package-lock.json
├── src/
│   └── main.js
└── dist/ (gerado após `npm run build`)
    └── main.js
```

## Autor

- LucasLBrito
