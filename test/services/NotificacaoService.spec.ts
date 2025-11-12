import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/repository/NotificacaoRepository', () => ({
  default: {
    criarNotificacao: jest.fn(),
    marcarComoLidaNotificacao: jest.fn(),
    getContagemNaoLidas: jest.fn(),
    listarNotificacao: jest.fn(),
    deletarNotificacao: jest.fn(), 
  },
}));
jest.unstable_mockModule('../../src/models/Notificacao', () => ({ default: { findById: jest.fn() } }));

describe('NotificacaoService.criarNotificacao', () => {
  let NotificacaoRepository: any;
  let NotificacaoService: any;
  let mockCriarNotificacao: jest.MockedFunction<any>;

  beforeEach(async () => {
    const notificacaoModelModule = await import('../../src/models/Notificacao');
    const NotificacaoModel = notificacaoModelModule.default;

    const repoModule = await import('../../src/repository/NotificacaoRepository');
    NotificacaoRepository = repoModule.default;

    const serviceModule = await import('../../src/services/NotificacaoService');
    NotificacaoService = serviceModule.default;

    jest.clearAllMocks(); 
    (NotificacaoModel.findById as jest.Mock).mockClear();
    (NotificacaoRepository.marcarComoLidaNotificacao as jest.Mock).mockClear();
    (NotificacaoRepository.getContagemNaoLidas as jest.Mock).mockClear();
    (NotificacaoRepository.listarNotificacao as jest.Mock).mockClear();

    mockCriarNotificacao = NotificacaoRepository.criarNotificacao;
  });

  test('service cria notificacao valida e chama repository', async () => {
    const dto = { usuario_id: '507f1f77bcf86cd799439011', mensagem: 'ok' } as any;

    mockCriarNotificacao.mockResolvedValue(dto);

    const result = await NotificacaoService.criarNotificacao(dto);

    expect(mockCriarNotificacao).toHaveBeenCalledTimes(1);
    expect(mockCriarNotificacao).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });
});

describe('NotificacaoService.marcarComoLidaNotificacao', () => {
  let NotificacaoService: any;
  let NotificacaoRepository: any;
  let NotificacaoModel: any;

  beforeEach(async () => {
    const repoModule = await import('../../src/repository/NotificacaoRepository');
    NotificacaoRepository = repoModule.default;

    const serviceModule = await import('../../src/services/NotificacaoService');
    NotificacaoService = serviceModule.default;

    const modelModule = await import('../../src/models/Notificacao');
    NotificacaoModel = modelModule.default; 

    jest.clearAllMocks();
  });

  it('deve marcar uma notificação como lida e chamar o repositório', async () => {
    const notificacaoId = '60c72b2f9b1e8a001f8e4d2a';
    const notificacaoMock = { id: notificacaoId } as any;
    const notificacaoAtualizadaMock = { id: notificacaoId };

    NotificacaoModel.findById.mockResolvedValue(notificacaoMock);

    NotificacaoRepository.marcarComoLidaNotificacao.mockResolvedValue(notificacaoAtualizadaMock);

    const result = await NotificacaoService.marcarComoLidaNotificacao(notificacaoId);

    expect(NotificacaoModel.findById).toHaveBeenCalledWith(notificacaoId);
    expect(NotificacaoRepository.marcarComoLidaNotificacao).toHaveBeenCalledWith(notificacaoId);
    expect(result).toEqual(notificacaoAtualizadaMock);
  });
});