import { respostaOK } from "../config/docsUtils.js";

const authPaths = {
  "/auth/login": {
    post: {
      tags: ["Autenticacao"],
      summary: "Fazer login",
      description: `É necessário fazer login antes de utilizar as rotas do sistema.<br>
            <b>Credencial de usuários cadastrados para teste: test@gmail.com</b>
            <p>Senha de todos os usuários: Dev@1234</p>
            `,
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginPOST"
            }
          }
        }
      },
      responses: respostaOK(200, "Autenticado", "#/components/schemas/RespostaLogin")
    }
  }
};

export default authPaths;