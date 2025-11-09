import Usuario from "../models/Usuario";
import bcrypt from "bcryptjs";
import faker from "faker-br";

// Definindo o tipo da função, especificando que 'quantidade' é um número
export default async function usuarioSeed(quantidade: number): Promise<void> {
  const usuariosCriados = [];

  // Usuário fixo (não dentro do loop)
  usuariosCriados.push({
    nome: "Admin",
    email: "admin@gmail.com",
    senha: bcrypt.hashSync("Dev@1234")
  });

  // Criando os usuários de forma dinâmica
  for (let i = 0; i < quantidade; i++) {
    // Usando faker-br para gerar o CPF e nome completo manualmente
    const nome = `${faker.name.firstName()} ${faker.name.lastName()}`;
    usuariosCriados.push({
      nome,
      email: faker.internet.email(),
      senha: bcrypt.hashSync("Dev@1234")
    });
  }

  // Inserindo os usuários na coleção do MongoDB
  await Usuario.insertMany(usuariosCriados);

  console.log((quantidade + 1) + " Usuários inseridos");
}