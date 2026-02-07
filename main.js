/**
 * GUIA MESTRE DE ORIENTAÇÃO A OBJETOS EM JAVASCRIPT
 * 
 * Este código demonstra os 4 pilares da OO:
 * 1. Abstração: Classes base que não podem ser instanciadas.
 * 2. Herança: Classes que estendem funcionalidades de outras.
 * 3. Encapsulamento: Proteção de dados com campos privados (#).
 * 4. Polimorfismo: Métodos com o mesmo nome, mas comportamentos diferentes.
 */

// --- 1. ABSTRAÇÃO ---
class EntidadeSistema {
    constructor(nome) {
        if (this.constructor === EntidadeSistema) {
            throw new Error("Erro: 'EntidadeSistema' é uma classe abstrata e não pode ser instanciada.");
        }
        this.nome = nome;
        this.id = Math.floor(Math.random() * 1000);
    }

    // Método que deve ser implementado pelas subclasses
    descrever() {
        throw new Error("O método 'descrever()' deve ser implementado.");
    }
}

// --- 2. ENCAPSULAMENTO & HERANÇA ---
class Usuario extends EntidadeSistema {
    #senha; // Campo privado (Encapsulamento)

    constructor(nome, email, senha) {
        super(nome);
        this.email = email;
        this.#senha = senha;
    }

    // Método público para validar acesso sem expor a senha
    validarAcesso(email, senha) {
        return this.email === email && this.#senha === senha;
    }

    descrever() {
        return `Usuário: ${this.nome} (ID: ${this.id}) - Email: ${this.email}`;
    }
}

// --- 3. POLIMORFISMO (E mais Herança) ---
class Produto extends EntidadeSistema {
    constructor(nome, preco) {
        super(nome);
        this.preco = preco;
    }

    // Método que será sobrescrito (Polimorfismo)
    calcularDesconto() {
        return this.preco * 0.05; // Desconto padrão: 5%
    }

    descrever() {
        return `Produto: ${this.nome} - Preço: R$${this.preco.toFixed(2)}`;
    }
}

class Eletronico extends Produto {
    constructor(nome, preco, garantiaMeses) {
        super(nome, preco);
        this.garantiaMeses = garantiaMeses;
    }

    // Polimorfismo: Implementação específica para eletrônicos
    calcularDesconto() {
        return this.preco * 0.10; // Eletrônicos: 10%
    }

    testar() {
        return `Testando circuitos do ${this.nome}... Status: OK!`;
    }
}

class Alimento extends Produto {
    constructor(nome, preco, dataValidade) {
        super(nome, preco);
        this.dataValidade = dataValidade;
    }

    // Polimorfismo: Implementação específica para alimentos
    calcularDesconto() {
        return this.preco * 0.15; // Alimentos: 15%
    }

    verificarValidade() {
        return `O produto ${this.nome} vence em: ${this.dataValidade}`;
    }
}

class Servico extends EntidadeSistema {
    constructor(nome, valorHora) {
        super(nome);
        this.valorHora = valorHora;
    }

    descrever() {
        return `Serviço: ${this.nome} - Valor/Hora: R$${this.valorHora}`;
    }

    executar(horas) {
        return `Executando ${this.nome} por ${horas}h. Total: R$${(this.valorHora * horas).toFixed(2)}`;
    }
}

// --- 4. INSTANCIAÇÃO DE OBJETOS (Múltiplas formas) ---

// A. Instanciação Clássica
const user1 = new Usuario("Carlos Silva", "carlos@email.com", "senha123");
const tv = new Eletronico("Smart TV 55'", 3500, 12);
const notebook = new Eletronico("MacBook Air", 8000, 24);
const maca = new Alimento("Maçã Gala", 5.50, "2026-05-20");
const consultoria = new Servico("Consultoria TI", 250);

// B. Factory Function (Função Fábrica)
function criarAlimento(nome, preco, validade) {
    return new Alimento(nome, preco, validade);
}
const banana = criarAlimento("Banana Nanica", 4.00, "2026-03-10");

// --- TESTANDO O CÓDIGO ---

console.log("=== TESTE DE ENCAPSULAMENTO ===");
console.log(user1.descrever());
console.log("Senha é acessível diretamente?", user1.senha); // undefined
console.log("Login correto?", user1.validarAcesso("carlos@email.com", "senha123"));

console.log("\n=== TESTE DE POLIMORFISMO (DESCONTOS VARIADOS) ===");
const itens = [tv, notebook, maca, banana];
itens.forEach(item => {
    console.log(`${item.nome} -> Desconto Aplicado: R$${item.calcularDesconto().toFixed(2)}`);
});

console.log("\n=== TESTE DE MÉTODOS ESPECÍFICOS ===");
console.log(tv.testar());
console.log(maca.verificarValidade());
console.log(consultoria.executar(10));
