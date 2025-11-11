
import NotificacaoController from '../controllers/NotificacaoController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { wrapException } from '../utils/wrapException';
import { Router } from 'express';

const router = Router();

router
  .post('/notifications', AuthMiddleware, wrapException(NotificacaoController.criarNotificacao))
  .get('/notifications/user/:id', AuthMiddleware, wrapException(NotificacaoController.listarNotificacao))
  .patch('/notifications/:id/read', AuthMiddleware, wrapException(NotificacaoController.marcarComoLidaNotificacao))
  .delete('/notifications/:id', AuthMiddleware, wrapException(NotificacaoController.deletarNotificacao))
  .get('/notifications/user/:id/unread', AuthMiddleware, wrapException(NotificacaoController.getContagemNaoLidas))

export default router;
