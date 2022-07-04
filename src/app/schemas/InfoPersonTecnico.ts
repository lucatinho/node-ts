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

interface InfoPersonTecnicoInterface extends Document {
   ambiente_estudo: Number;
   tem_computador: Number;
   qual_so: Number;
   processador: Number;
   memoria: Number;
   conhecimento_informatica: Number;
}

const InfoPersonTecnicoSchema = new mongoose.Schema({
    endereco: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Endereco'
    },

});


export default model<InfoPersonTecnicoInterface>('InfoPersonTecnico', InfoPersonTecnicoSchema)
