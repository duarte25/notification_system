import authPaths from "../routes/auth.js";
import { readFile } from "fs/promises";
import authSchemas from "../schemas/authSchema.js";
import usuarioSchemas from "../schemas/usuarioSchema.js";
import usuarioPaths from "../routes/usuario.js";
import notificacaoPaths from "../routes/notificacao.js";
import notificacaoSchemas from "../schemas/notificacaoSchema.js";

// para ficar o url certo do swagger sem precisar mudar
const getServersInCorrectOrder = () => {
  const devUrl = { url: process.env.SWAGGER_DEV_URL || "http://localhost:" + process.env.PORT };
  const prodUrl = { url: process.env.SWAGGER_PROD_URL };

  if (process.env.NODE_ENV === "production") return [prodUrl, devUrl];
  else return [devUrl, prodUrl];
};

const json = JSON.parse(await readFile("./package.json", "utf8"));
const getSwaggerOptions = () => {
  return {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API Notification System",
        version: json.version,
        description: "API Notification System\n\nÉ necessário autenticar com token JWT antes de utilizar a maioria das rotas, faça isso na rota /login com e-mail de usuário e senha válido\n\nMais informações em (https://github.com/duarte25/notification_system)",
        contact: {
          name: "Projeto Notification system",
          email: "duarte.guga2025@gmail.com",
        },
      },
      servers: getServersInCorrectOrder(),
      tags: [
        {
          name: "Autenticacao",
          description: "Rotas de autenticação"
        },
      ],
      paths: {
        ...authPaths,
        ...usuarioPaths,
        ...notificacaoPaths
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        },
        schemas: {
          ...authSchemas,
          ...usuarioSchemas,
          ...notificacaoSchemas
        }
      },
    },
    apis: ["./src/routes/*.js"]
  };
};

export default getSwaggerOptions;