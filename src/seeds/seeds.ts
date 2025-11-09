import usuarioSeed from "./usuarioSeed";
import db from "../config/db_config";

let quantidade: number = 50; // Defina a quantidade como um número

// Conectando ao banco de dados
await db.conectarBanco();

await db.getCollection("usuarios").deleteMany(); 

// Chama a função para inserir os usuários
await usuarioSeed(quantidade);

// Desconectar do banco de dados
await db.desconetarBanco(); // Certifique-se de aguardar o fechamento da conexão