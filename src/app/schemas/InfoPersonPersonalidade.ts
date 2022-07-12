import {model, Document} from 'mongoose';
import mongoose from "mongoose";

import {PersonalidadeType} from "../enum/cadatro-aluno/personalidade-type.enum";
import {InteresseType} from "../enum/cadatro-aluno/interesse-type.enum";
import {InfanciaType} from "../enum/cadatro-aluno/infancia-type.enum";
import {SucessoType} from "../enum/cadatro-aluno/sucesso-type.enum";
import {FamiliaType} from "../enum/cadatro-aluno/familia-type.enum";
import {ImportanciaEscolhidoType} from "../enum/cadatro-aluno/importanciaEscolhido-type.enum";
import {SouMaisType} from "../enum/cadatro-aluno/souMais-type.enum";
import {SouPoucoType} from "../enum/cadatro-aluno/souPouco-type.enum";

interface InfoPersonPersonalidadeInterface extends Document {
    teste_personalidade: PersonalidadeType;
    interesse: InteresseType;
    infancia: InfanciaType;
    ter_sucesso: SucessoType;
    familia: FamiliaType;
    importancia_da_formacao: ImportanciaEscolhidoType;
    sou_mais: SouMaisType;
    sou_menos: SouPoucoType;
}

const InfoPersonPersonalidadeSchema = new mongoose.Schema({
    teste_personalidade: {
        type: Number,
        enum: PersonalidadeType,
        require: true
    },
    interesse: {
        type: Number,
        enum: InteresseType,
        require: true
    },
    infancia: {
        type: Number,
        enum: InfanciaType,
        require: true
    },
    ter_sucesso: {
        type: Number,
        enum: SucessoType,
        require: true
    },
    familia: {
        type: Number,
        enum: FamiliaType,
        require: true
    },
    importancia_da_formacao: {
        type: Number,
        enum: ImportanciaEscolhidoType,
        require: true
    },
    sou_mais: {
        type: Number,
        enum: SouMaisType,
        require: true
    },
    sou_menos: {
        type: Number,
        enum: SouPoucoType,
        require: true
    },
    inforPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPerson'
    }
});


export default model<InfoPersonPersonalidadeInterface>('InfoPersonPersonalidade', InfoPersonPersonalidadeSchema)
