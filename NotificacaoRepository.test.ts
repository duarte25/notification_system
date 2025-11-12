import mongoose from "mongoose";
import Notificacao from "./src/models/Notificacao";
import Usuario from "./src/models/Usuario";
import NotificacaoRepository from "./src/repository/NotificacaoRepository";
import redisClient from "./src/config/db_redis";

// Mock do redisClient
jest.mock("../config/db_redis", () => ({
  incr: jest.fn(),
  decr: jest.fn(),
  get: jest.fn(),
}));

describe("NotificacaoRepository", () => {
  let usuario: any;

  beforeAll(async () => {
    // Limpa a base antes de começar
    await Notificacao.deleteMany({});
    await Usuario.deleteMany({});

    // Cria um usuário para os testes
    usuario = await Usuario.create({
      nome: "Usuário de Teste",
      email: "teste@example.com",
      senha: "123",
    });
  });

  afterEach(async () => {
    // Limpa as notificações e reseta os mocks após cada teste
    await Notificacao.deleteMany({});
    jest.clearAllMocks();
  });

  describe("criarNotificacao", () => {
    it("deve criar uma notificação e incrementar o contador no Redis", async () => {
      const data = {
        usuario_id: usuario._id,
        mensagem: "Nova notificação de teste",
      };

      const notificacao = await NotificacaoRepository.criarNotificacao(data as any);

      expect(notificacao).toBeDefined();
      expect(notificacao.mensagem).toBe(data.mensagem);
      expect(notificacao.usuario_id.toString()).toBe(data.usuario_id.toString());
      expect(redisClient.incr).toHaveBeenCalledWith(`unread_count:${usuario._id.toString()}`);

      const notificacaoNoDb = await Notificacao.findById(notificacao._id);
      expect(notificacaoNoDb).not.toBeNull();
    });
  });

  describe("marcarComoLidaNotificacao", () => {
    it("deve marcar uma notificação como lida e decrementar o contador no Redis se não estiver lida", async () => {
      const novaNotificacao = await Notificacao.create({
        usuario_id: usuario._id,
        mensagem: "Notificação para marcar como lida",
        lida: false,
      });

      const notificacaoAtualizada = await NotificacaoRepository.marcarComoLidaNotificacao(novaNotificacao._id.toString());

      expect(notificacaoAtualizada).toBeDefined();
      expect(notificacaoAtualizada?.lida).toBe(true);
      expect(redisClient.decr).toHaveBeenCalledWith(`unread_count:${usuario._id.toString()}`);
    });

    it("não deve decrementar o contador no Redis se a notificação já estiver lida", async () => {
      const novaNotificacao = await Notificacao.create({
        usuario_id: usuario._id,
        mensagem: "Notificação já lida",
        lida: true,
      });

      await NotificacaoRepository.marcarComoLidaNotificacao(novaNotificacao._id.toString());

      expect(redisClient.decr).not.toHaveBeenCalled();
    });

    it("deve retornar null se a notificação não existir", async () => {
      const idInexistente = new mongoose.Types.ObjectId();
      const resultado = await NotificacaoRepository.marcarComoLidaNotificacao(idInexistente.toString());
      expect(resultado).toBeNull();
    });
  });

  describe("deletarNotificacao", () => {
    it("deve deletar uma notificação e decrementar o contador se não estiver lida", async () => {
      const novaNotificacao = await Notificacao.create({
        usuario_id: usuario._id,
        mensagem: "Notificação para deletar",
        lida: false,
      });

      const removida = await NotificacaoRepository.deletarNotificacao(novaNotificacao._id.toString());

      expect(removida).toBeDefined();
      expect(redisClient.decr).toHaveBeenCalledWith(`unread_count:${usuario._id.toString()}`);
      const notificacaoNoDb = await Notificacao.findById(removida?._id);
      expect(notificacaoNoDb).toBeNull();
    });
  });

  describe("getContagemNaoLidas", () => {
    it("deve retornar a contagem de notificações não lidas do Redis", async () => {
      (redisClient.get as jest.Mock).mockResolvedValue("5");
      const contagem = await NotificacaoRepository.getContagemNaoLidas(usuario._id.toString());
      expect(contagem).toBe(5);
      expect(redisClient.get).toHaveBeenCalledWith(`unread_count:${usuario._id.toString()}`);
    });
  });
});
