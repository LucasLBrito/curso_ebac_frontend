class aluno {
    constructor(nome, idade, nota) {
        this.nome = nome;
        this.idade = idade;
        this.nota = nota;
    }
    aprovado() {
        if (this.nota >= 6) {
            return "Aprovado";
        } else {
            return "Reprovado";
        }
    }
}

const aluno1 = new aluno("Lucas", 20, 8.5);
const aluno2 = new aluno("Maria", 22, 9.0);
const aluno3 = new aluno("João", 19, 7.5);
const aluno4 = new aluno("Ana", 21, 5.0);
const aluno5 = new aluno("Pedro", 23, 4.5);

const array = [aluno1, aluno2, aluno3, aluno4, aluno5];

array.forEach(aluno => {
    console.log(`Nome: ${aluno.nome}, Idade: ${aluno.idade}, Nota: ${aluno.nota}, ${aluno.aprovado()}`);
});