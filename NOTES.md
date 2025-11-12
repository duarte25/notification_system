# Notas sobre o Projeto

Este arquivo contém anotações sobre decisões de design (trade-offs), pontos que não foram implementados por restrição de tempo e sugestões para próximos passos.

## Trade-offs

1.  **Uso de Redis para Contagem**:
    -   **Decisão**: A contagem de notificações não lidas é mantida em cache no Redis.
    -   **Trade-off**: Essa abordagem oferece uma performance excelente para uma operação que seria muito frequente em um front-end (ex: exibir um "sininho" com o número de notificações). O contraponto é a introdução de mais uma tecnologia no stack, aumentando a complexidade da infraestrutura e a necessidade de garantir a consistência entre o Redis e o MongoDB (o que foi feito nas operações de criação, leitura e deleção).

## Pontos Não Implementados (por falta de tempo)

- **Autenticação de Usuários e API**: Não foi implementado um sistema completo de permissões. Atualmente, os endpoints aceitam `usuario_id` no payload ou URL, permitindo que um usuário acesse dados de outro. Não há suporte a grupos ou roles.
-   **Endpoints Adicionais**: Funcionalidades como "marcar todas as notificações como lidas" ou "limpar notificações lidas" não foram implementadas, mas seriam muito úteis para a experiência do usuário.
- **Testes Mais Abrangentes**: Foram feitos apenas testes unitários básicos. Idealmente, o sistema deveria ter testes de integração e ponta a ponta para garantir robustez.

## Próximos Passos Sugeridos

1. **Implementar testes mais completos**
    - Adicionar testes de integração e ponta a ponta para cobrir cenários reais de uso.
2. **Implementar Soft Delete**
    - Alterar o schema da notificação para incluir um campo `deletedAt`.
    - Ajustar métodos de remoção e listagem para suportar soft delete.
3. **WebSockets para Notificações em Tempo Real**
    - Integrar `socket.io` para "empurrar" novas notificações para o cliente.