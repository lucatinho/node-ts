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

interface InfoPersonSociaisInterface extends Document {
    dependentes: Number;
    qtd_pessoas_que_moram_junto: Number;
    tipo_residencia: Number;
    situacao_residencia: Number;
    construcao_residencia: Number;
    residencia_possui: Number;
    provedor: Number;
    desempregados: Number;
    renda: RendaType;
}

const InfoPersonSociaisSchema = new mongoose.Schema({
    endereco: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Endereco'
    },

});


export default model<InfoPersonSociaisInterface>('InfoPersonSociais', InfoPersonSociaisSchema)
