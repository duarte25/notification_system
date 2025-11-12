# Sistema de Notificações

Esta é uma API RESTful para um sistema de gerenciamento de notificações de usuários, desenvolvida em Node.js com TypeScript. O projeto segue uma arquitetura em camadas, utiliza MongoDB para persistência de dados e Redis para cache de contagem de notificações.

## Funcionalidades

- Criação de notificações para um usuário.
- Listagem paginada de notificações por usuário.
- Marcação de uma notificação como lida.
- Remoção de uma notificação.
- Contagem em tempo real de notificações não lidas por usuário utilizando Redis.

## Decisões Arquiteturais

1.  **Arquitetura em Camadas (Layered Architecture)**: O projeto foi estruturado em `Controllers`, `Services` e `Repository` para garantir a separação de responsabilidades (SoC).
    -   **Controllers**: Responsáveis por receber as requisições HTTP, validar os dados de entrada e orquestrar o fluxo, delegando a lógica de negócio para os serviços.
    -   **Services**: Contêm a lógica de negócio da aplicação. Eles são agnósticos em relação ao protocolo HTTP e à forma como os dados são persistidos.
    -   **Repository**: Camada de abstração do acesso aos dados. É o único local que interage diretamente com o banco de dados (MongoDB) e o cache (Redis), isolando o restante da aplicação dos detalhes de implementação da persistência.

2.  **Persistência de Dados**:
    -   **MongoDB**: Escolhido pela sua flexibilidade com esquemas (Schema-less), o que é ideal para um sistema de notificações que pode evoluir para ter diferentes tipos e formatos de mensagens. A biblioteca `Mongoose` foi utilizada para modelagem dos dados e interação com o banco.
    -   **Redis**: Utilizado como um cache rápido para a contagem de notificações não lidas por usuário. Operações de `INCR` e `DECR` são atômicas e extremamente performáticas, evitando consultas custosas ao MongoDB para obter essa contagem frequentemente.

3.  **Configuração**: A configuração da aplicação (como strings de conexão e portas) é gerenciada através de variáveis de ambiente com o auxílio da biblioteca `dotenv`, seguindo os princípios do The Twelve-Factor App.

4.  **Testes**:
    -   **Testes Unitários**: Focados em testar as camadas de `Service` e `Controller` de forma isolada, utilizando `jest` e mocks para as dependências.

## Como Executar Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- Git

### Passos

1.  Clone o repositório:
    ```bash
    git clone git@github.com:duarte25/notification_system.git
    cd notification_system
    ```

2.  Inicie os contêineres do MongoDB, Redis e o APP com Docker Compose:
    ```bash
    docker-compose up -d
    ```

A API estará disponível em `http://localhost:3020`.

## Como Rodar os Testes

Para executar todos os testes (unitários), rode o comando:

```bash
npm test
```

## Documentação da API (Swagger)

A API de Notificações possui uma interface **Swagger** para facilitar testes e exploração dos endpoints.  
O Swagger está disponível localmente em:

```bash
http://localhost:3020/api-docs
```

### Autenticação

Esta API utiliza **token JWT** para autenticação. Para fazer requisições autenticadas:

1. **Obtenha o token**
   - Acesse o endpoint de login (`/auth/login` ou equivalente) no Swagger.
   - Preencha suas credenciais e execute o request.
   - O Swagger retornará um **token JWT**.

2. **Autorize no Swagger**
   - Clique no botão **Authorize** no topo da interface do Swagger.
   - Cole o token no campo de autorização no formato:
     ```
     Bearer <seu_token>
     ```
   - Clique em **Authorize** para aplicar o token a todas as requisições autenticadas.

3. **Executar requisições**
   - Acesse qualquer endpoint (ex.: `/notifications`).
   - Preencha parâmetros ou corpo da requisição, se necessário.
   - Clique em **Execute**.
   - O Swagger mostrará o **request enviado** e a **resposta recebida**.

> ⚠️ Todos os endpoints que requerem autenticação só funcionarão se o token estiver ativo e válido.
