# Nota explicativa — Branch oo_js

Esta branch (oo_js) contém um exemplo didático em JavaScript que demonstra os quatro pilares da Orientação a Objetos (OO) de forma prática e comentada.

Resumo do conteúdo
- Arquivo principal: `main.js` — implementação de classes que ilustram Abstração, Herança, Encapsulamento e Polimorfismo.
- Objetos demonstrados: Usuário, Produto, Eletrônico, Alimento e Serviço.
- Estilo: código com comentários, exemplos de instanciação clássica e factory function, e logs de teste no console.

O que esta nota explica
1) Abstração
- A classe base `EntidadeSistema` funciona como uma classe abstrata: se você tentar instanciá-la diretamente, o código lança um erro proposital informando que não é permitida a instanciação.

2) Encapsulamento
- Campos privados são usados com a sintaxe `#` (ex.: `#senha` em `Usuario`), protegendo dados sensíveis.
- A senha não é acessível diretamente (acessar `user.senha` retorna `undefined`), mas existe um método público `validarAcesso` para verificar credenciais.

3) Herança
- `Usuario`, `Produto` e `Servico` estendem `EntidadeSistema`.
- `Eletronico` e `Alimento` estendem `Produto`, reaproveitando atributos e métodos.

4) Polimorfismo
- Método `calcularDesconto()` é definido em `Produto` e sobrescrito em `Eletronico` e `Alimento` para comportamentos distintos (10% e 15% respectivamente).
- Polimorfismo permite iterar sobre uma lista de itens e chamar `calcularDesconto()` sem verificar o tipo concreto.

Como executar
- Requisitos: Node.js (versão que suporte campos privados, v12+; recomenda-se v14+).
- Passos:
  1. Certifique-se de estar na branch `oo_js`.
  2. Coloque `main.js` na raiz da branch (ou ajuste o caminho).
  3. Execute: `node main.js`
  4. Observe os logs no console: testes de encapsulamento, cálculo de descontos e métodos específicos.

Observações
- O código é didático e não deve ser usado em produção tal quale; serve para ensino e experimentação.
- Se quiser, posso adicionar comentários adicionais, testes automatizados (ex.: Jest) ou converter em módulos ES/TypeScript.

Autor
- LucasLBrito