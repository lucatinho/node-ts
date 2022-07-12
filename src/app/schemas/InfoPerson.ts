import {model, Document} from 'mongoose';
import mongoose from "mongoose";

import {BeneficioSocialType} from "../enum/cadatro-aluno/beneficioSocial-type.enum";
import {EstadoCivilType} from "../enum/cadatro-aluno/estadoCivil-type.enum";
import {GeneroType} from "../enum/cadatro-aluno/genero-type.enum";
import {EtniaType} from "../enum/cadatro-aluno/etnia-type.enum";
import {EscolaridadeType} from "../enum/cadatro-aluno/escolaridade-type.enum";
import {ExperienciaProfissionalType} from "../enum/cadatro-aluno/experiencia_profissional-type.enum";

interface InfoPersonInterface extends Document {
    nome: String;
    sobrenome: String;
    email: String;
    cpf: String;
    rg: String;
    data_nascimento: Date;

    estado_civil: EstadoCivilType;
    genero: GeneroType;
    etnia: EtniaType;
    escolaridade: EscolaridadeType;
    experiencia_profissional: ExperienciaProfissionalType;
    beneficio_social: BeneficioSocialType;

    celular: String;
    linkedin: String;
    facebook: String;
    instagram: String;
    github: String;

    endereco: Array<any>;
    informacoes_sociais: Object;
    informacoes_de_personalidade: Object;
    informacoes_tecnicas: Object;
    informacoes_criativas: Object;
}

const InfoPersonSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    cpf: {
        type: String,
        unique: true,
        require: true
    },
    rg: {
        type: String,
        unique: true,
        require: true
    },
    data_nascimento: {
        type: Date,
        require: true
    },
    estado_civil: {
        type: Number,
        enum: EstadoCivilType,
        require: true
    },
    genero: {
        type: Number,
        enum: GeneroType,
        require: true
    },
    etnia: {
        type: Number,
        enum: EtniaType,
        require: true
    },
    escolaridade: {
        type: Number,
        enum: EscolaridadeType,
        require: true
    },
    experiencia_profissional: {
        type: Number,
        enum: ExperienciaProfissionalType,
        require: true
    },
    beneficio_social: {
        type: Number,
        enum: BeneficioSocialType,
        require: true
    },
    celular: {
        type: String,
        require: true
    },
    linkedin: {
        type: String,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    github: {
        type: String,
    },
    endereco: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Endereco'
    },
    informacoes_sociais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPersonSociais'
    },
    informacoes_de_personalidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPersonPersonalidade'
    },
    informacoes_tecnicas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPersonTecnico'
    },
    informacoes_criativas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPersonCriativa'
    }
});


export default model<InfoPersonInterface>('InfoPerson', InfoPersonSchema)
