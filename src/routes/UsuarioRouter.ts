import UsuarioController from '../controllers/UsuarioController';
import { wrapException } from '../utils/wrapException';
import express from 'express';

const router = express.Router();

router
  .get("/users", wrapException(UsuarioController.listarUsuario))
  .get("/users/:id", wrapException(UsuarioController.listarUsuarioID))
  .post("/users", wrapException(UsuarioController.CriarUsuario))
  .patch("/users/:id", wrapException(UsuarioController.alterarUsuario))
  .delete("/users/:id", wrapException(UsuarioController.deletarUsuario));

export default router;