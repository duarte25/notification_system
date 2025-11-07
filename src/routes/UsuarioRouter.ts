import UsuarioController from '../controllers/UsuarioController';
import { wrapException } from '../utils/wrapException';
import express from 'express';

const router = express.Router();

router
  // .get("/users", wrapException(UsuarioController.listUserController))
  // .get("/users/:id", wrapException(UsuarioController.findUser))
  .post("/users", wrapException(UsuarioController.CriarUsuario))
  .patch("/users/:id",wrapException(UsuarioController.alterarUsuario))
  // .delete("/users/:id", wrapException(UsuarioController.deleteUser));

export default router;