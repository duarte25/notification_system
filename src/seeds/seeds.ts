import notificacaoSeed from "./notificacaoSeed";
import redisClient from "../config/db_redis";
import usuarioSeed from "./usuarioSeed";
import db from "../config/db_config";

let quantidade: number = 50; // Defina a quantidade como um número

await db.conectarBanco();

await db.getCollection("usuarios").deleteMany(); 
await db.getCollection("notificacoes").deleteMany(); 

await usuarioSeed(quantidade);
await notificacaoSeed(quantidade);

// Desconectar do banco de dados
await db.desconetarBanco(); // Certificar de aguardar o fechamento da conexão

await redisClient.disconnect();

console.log("Seeds concluídos. Conexões fechadas.");