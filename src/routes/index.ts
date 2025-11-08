import logRoutes from "../middlewares/logRoutesMiddleware";
import { Application, Request, Response } from "express";
import notificacoes from "../routes/NotificacaoRouter";
import usuarios from "../routes/UsuarioRouter";


const routes = (app: Application) => {

  app.use(logRoutes);

  app.route("/").get((req: Request, res: Response): void => {
    res.status(200).redirect("/docs");
  });

  app.use(
    usuarios,
    notificacoes
  );

};

export default routes;
