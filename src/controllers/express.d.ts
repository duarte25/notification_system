import { IUsuario } from "./models/Usuario";
import { IBoard } from "../models/Board";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      validateResult: {
        tarefa?: ITarefas;
        usuario?: IUsuario;
        board?: IBoard;
      };
    }
  }
}