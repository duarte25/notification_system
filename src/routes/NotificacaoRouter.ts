
import NotificacaoController from '../controllers/NotificacaoController';
import { wrapException } from '../utils/wrapException';
import { Router } from 'express';

const router = Router();

router
  .post('/notifications', wrapException(NotificacaoController.criarNotificacao))
  .get('/notifications/user/:id', wrapException(NotificacaoController.listarNotificacao))
  .patch('/notifications/:id/lida', wrapException(NotificacaoController.marcarComoLidaNotificacao))
  .delete('/notifications/:id', wrapException(NotificacaoController.deletarNotificacao))
  .get('/notifications/user/:id/conta-nao-lida', wrapException(NotificacaoController.getContagemNaoLidas))

export default router;
