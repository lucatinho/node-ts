import {model, Document} from 'mongoose';
import mongoose from "mongoose";

import {EscolaridadeType} from "../enum/escolaridade-type.enum";
import {GeneroType} from "../enum/genero-type.enum";
import {EtniaType} from "../enum/etnia-type.enum";
import {OrientacaoType} from "../enum/orientacao-type.enum";
import {RendaType} from "../enum/renda-type.enum";
import {ExperienciaProfissionalType} from "../enum/experiencia_profissional-type.enum";
import {EstadoCivilType} from "../enum/estadoCivil-type.enum";
import {QtdFilhosType} from "../enum/qtdFilhos-type.enum";

interface InfoPersonPersonalidadeInterface extends Document {
   teste_personalidade: Number;
   interesse: Number;
   infancina: Number;
   ter_sucesso: Number;
   familia: Number;
   importancia_da_formacao: Number;
   sou_mais: Number;
   sou_menos: Number;
}

const InfoPersonPersonalidadeSchema = new mongoose.Schema({
    endereco: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Endereco'
    },

});


export default model<InfoPersonPersonalidadeInterface>('InfoPersonPersonalidade', InfoPersonPersonalidadeSchema)
