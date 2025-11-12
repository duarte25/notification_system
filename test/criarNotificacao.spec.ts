import { jest } from '@jest/globals';
import { Request, Response } from 'express';

// 🔹 Mock dos módulos ANTES do import real
jest.unstable_mockModule('../src/services/NotificacaoService', () => ({
  default: {
    criarNotificacao: jest.fn(),
  },
}));

jest.unstable_mockModule('../src/utils/mensagens', () => ({
  sendResponse: jest.fn(),
}));

// 🔹 Imports REAIS (assíncronos, por causa do ESM)
const { default: NotificacaoService } = await import('../src/services/NotificacaoService');
const { sendResponse } = await import('../src/utils/mensagens');
const { default: NotificacaoController } = await import('../src/controllers/NotificacaoController');

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

    // 🔹 Aqui o segredo: declaramos explicitamente o tipo do mock
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
