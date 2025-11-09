import UsuarioController from '../controllers/UsuarioController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { wrapException } from '../utils/wrapException';
import express from 'express';

const router = express.Router();

router
  .get("/users", AuthMiddleware, wrapException(UsuarioController.listarUsuario))
  .get("/users/:id", AuthMiddleware, wrapException(UsuarioController.listarUsuarioID))
  .post("/users", AuthMiddleware, wrapException(UsuarioController.CriarUsuario))
  .patch("/users/:id", AuthMiddleware, wrapException(UsuarioController.alterarUsuario))
  .delete("/users/:id", AuthMiddleware, wrapException(UsuarioController.deletarUsuario));

export default router;