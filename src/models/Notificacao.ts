import mongoose, { Document, Schema, ObjectId, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface INotificacao extends Document {
  _id: ObjectId;
  usuario_id: ObjectId;
  mensagem: string;
  lida: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICriarNotificacao extends Document {
  usuario_id: ObjectId;
  mensagem: string;
}

const notificacaoSchema: Schema<INotificacao> = new mongoose.Schema(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    mensagem: {
      type: String,
      required: true,
    },
    lida: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    versionKey: "_version",
  }
);

notificacaoSchema.index({ nome: "text" }, { default_language: "pt" });
// Configurações para permitir paginação
notificacaoSchema.plugin(paginate);

// Criando o modelo de Notificacao com o tipo INotificacao e PaginateModel
const Notificacao = mongoose.model<INotificacao, PaginateModel<INotificacao>>("Notificacoes", notificacaoSchema);

export default Notificacao;