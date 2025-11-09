import Notificacao from "../models/Notificacao";
import redisClient from "../config/db_redis";
import Usuario from "../models/Usuario";
import faker from "faker-br";

export default async function notificacaoSeed(quantidade: number): Promise<void> {

  await Notificacao.deleteMany({});

  const keys = await redisClient.keys('unread_count:*');
  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  const usuarios = await Usuario.find().select("_id");

  if (usuarios.length === 0) {
    console.log("Nenhum usuário encontrado. Crie usuários primeiro.");
    return;
  }

  const notificacoesParaCriar = [];

  for (const usuario of usuarios) {
    for (let i = 0; i < quantidade; i++) {
      notificacoesParaCriar.push({
        usuario_id: usuario._id,
        mensagem: faker.lorem.sentence()
      });
    }
  }

  await Notificacao.insertMany(notificacoesParaCriar);

  console.log("Atualizando contadores no Redis (um por um)...");

  for (const usuario of usuarios) {
    await redisClient.incrBy(`unread_count:${usuario._id.toString()}`, quantidade);
  }

  console.log(`Total de ${notificacoesParaCriar.length} notificações inseridas!`);
  console.log(`Contadores do Redis atualizados para ${usuarios.length} usuários.`);
}