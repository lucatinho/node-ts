import {model, Document} from 'mongoose';
import mongoose from "mongoose";

import {Numero05Type} from "../enum/cadatro-aluno/numero05-type.enum";
import {ProvedorType} from "../enum/cadatro-aluno/provedor-type.enum";
import {SituacaoResidenciaType} from "../enum/cadatro-aluno/situacaoResidencia-type.enum";
import {ResidenciaType} from "../enum/cadatro-aluno/residencia-type.enum";
import {ConstrucaoResidenciaType} from "../enum/cadatro-aluno/construcaoResidencia-type.enum";
import {ResidenciaPossuiType} from "../enum/cadatro-aluno/residenciaPossui-type.enum";
import {RendaType} from "../enum/cadatro-aluno/renda-type.enum";

interface InfoPersonSociaisInterface extends Document {
    dependentes: Numero05Type;
    qtd_pessoas_que_moram_junto: Numero05Type;
    tipo_residencia: ResidenciaType;
    situacao_residencia: SituacaoResidenciaType;
    construcao_residencia: ConstrucaoResidenciaType;
    residencia_possui: ResidenciaPossuiType;
    provedor: ProvedorType;
    desempregados: Numero05Type;
    renda: RendaType;
    inforPerson: Object;
}

const InfoPersonSociaisSchema = new mongoose.Schema({
    dependentes: {
        type: Number,
        enum: Numero05Type,
        require: true
    },
    qtd_pessoas_que_moram_junto: {
        type: Number,
        enum: Numero05Type,
        require: true
    },
    tipo_residencia: {
        type: Number,
        enum: ResidenciaType,
        require: true
    },
    situacao_residencia: {
        type: Number,
        enum: SituacaoResidenciaType,
        require: true
    },
    construcao_residencia: {
        type: Number,
        enum: ConstrucaoResidenciaType,
        require: true
    },
    residencia_possui: {
        type: Number,
        enum: ResidenciaPossuiType,
        require: true
    },
    provedor: {
        type: Number,
        enum: ProvedorType,
        require: true
    },
    desempregados: {
        type: Number,
        enum: Numero05Type,
        require: true
    },
    renda: {
        type: Number,
        enum: RendaType,
        require: true
    },
    inforPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPerson'
    }
});


export default model<InfoPersonSociaisInterface>('InfoPersonSociais', InfoPersonSociaisSchema)
