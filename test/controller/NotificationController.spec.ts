import { Request, Response } from 'express';
import { jest } from '@jest/globals';

// Mock dos módulos ANTES do import real
jest.unstable_mockModule('../../src/services/NotificacaoService', () => ({
  default: {
    criarNotificacao: jest.fn(),
    marcarComoLidaNotificacao: jest.fn(),
  },
}));

jest.unstable_mockModule('../../src/utils/mensagens', () => ({
  sendResponse: jest.fn(),
}));

// Imports REAIS (assíncronos, por causa do ESM)
const { default: NotificacaoService } = await import('../../src/services/NotificacaoService');
const { sendResponse } = await import('../../src/utils/mensagens');
const { default: NotificacaoController } = await import('../../src/controllers/NotificacaoController');

describe('NotificacaoController.criarNotificacao', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        usuario_id: '690fca40ae911346df075721',
        mensagem: 'Mensagem de teste',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    jest.clearAllMocks();
  });

  it('deve criar uma notificação e retornar status 201', async () => {
    const mockNotificacao = { id: 1, ...req.body };

    // Declaramos explicitamente o tipo do mock
    const mockCriarNotificacao = NotificacaoService
      .criarNotificacao as unknown as jest.MockedFunction<
      (dados: any) => Promise<any>
    >;

    mockCriarNotificacao.mockResolvedValue(mockNotificacao);

    await NotificacaoController.criarNotificacao(req as Request, res as Response);

    expect(mockCriarNotificacao).toHaveBeenCalledWith(req.body);
    expect(sendResponse).toHaveBeenCalledWith(res, 201, { data: mockNotificacao });
  });
});

describe('NotificacaoController.marcarComoLidaNotificacao', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: { id: '64b2f9a5e1e3c2d44fbc1234' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    jest.clearAllMocks();
  });

  it('deve marcar a notificação como lida e retornar status 200', async () => {
    const mockResult = { id: req.params!.id, lida: true };

    // 🔸 Define o tipo e o comportamento do mock
    const mockMarcarComoLida = NotificacaoService
      .marcarComoLidaNotificacao as unknown as jest.MockedFunction<
      (id: string) => Promise<any>
    >;

    mockMarcarComoLida.mockResolvedValue(mockResult);

    // 🔸 Executa o controller
    await NotificacaoController.marcarComoLidaNotificacao(req as Request, res as Response);

    // 🔸 Verifica se chamou o service corretamente
    expect(mockMarcarComoLida).toHaveBeenCalledWith(req.params!.id);

    // 🔸 Verifica se a resposta foi enviada corretamente
    expect(sendResponse).toHaveBeenCalledWith(res, 200, { data: mockResult });
  });
});