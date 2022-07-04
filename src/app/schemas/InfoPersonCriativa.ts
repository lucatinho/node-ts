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

interface InfoPersonCriativaInterface extends Document {
   atraencia: Number;
   gosta_de_fazer: Number;
   super_poder: Number;
   preferencia_musical: Number;
   fast_food: Number;
   viver: Number;
   incomodo: Number;
   gratidao: Number;
   lembrado: Number;
}

const InfoPersonCriativaSchema = new mongoose.Schema({
    endereco: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Endereco'
    },

});


export default model<InfoPersonCriativaInterface>('InfoPersonCriativa', InfoPersonCriativaSchema)
