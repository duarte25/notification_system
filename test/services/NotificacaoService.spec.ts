import { jest } from '@jest/globals';

// 1. Mantenha a definição do mock aqui no topo
jest.unstable_mockModule('../../src/repository/NotificacaoRepository', () => ({
  default: { criarNotificacao: jest.fn() },
}));

// 2. Remova os 'await import' daqui

describe('NotificacaoService.criarNotificacao', () => {
  let NotificacaoRepository: any;
  let NotificacaoService: any;
  let mockCriarNotificacao: jest.MockedFunction<any>; // Referência para o mock

  beforeEach(async () => {
    // 3. Importe os módulos AQUI DENTRO (na ordem correta)
    
    // Primeiro, importe o repositório JÁ MOCKADO
    const repoModule = await import('../../src/repository/NotificacaoRepository');
    NotificacaoRepository = repoModule.default;

    // Segundo, importe o serviço (que agora vai usar o repo mockado)
    const serviceModule = await import('../../src/services/NotificacaoService');
    NotificacaoService = serviceModule.default;

    // 4. Limpe os mocks e pegue a referência da função
    jest.clearAllMocks(); // Limpa chamadas anteriores
    mockCriarNotificacao = NotificacaoRepository.criarNotificacao;
  });

  test('service cria notificacao valida e chama repository', async () => {
    const dto = { usuario_id: '507f1f77bcf86cd799439011', mensagem: 'ok' } as any;

    // 5. Defina o retorno do mock para ESTE teste
    mockCriarNotificacao.mockResolvedValue(dto);

    // 6. Execute o serviço
    const result = await NotificacaoService.criarNotificacao(dto);

    // 7. Faça as asserções
    expect(mockCriarNotificacao).toHaveBeenCalledTimes(1);
    expect(mockCriarNotificacao).toHaveBeenCalledWith(dto); // Boa prática
    expect(result).toEqual(dto);
  });
});