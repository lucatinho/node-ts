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

interface InfoPersonInterface extends Document {
    nome: String;
    sobrenome: String;
    email: String;
    cpf: String;
    rg: String;
    data_nascimento: Date;

    endereco: Array<any>;

    celular: String;
    linkedin: String;
    facebook: String;
    instagram: String;
    github: String;

    estado_civil: EstadoCivilType;
    genero: GeneroType;
    etnia: EtniaType;
    escolaridade: EscolaridadeType;

    experiencia_profissional: ExperienciaProfissionalType;
    beneficio_social: number;

    // informacoes_sociais: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'InfoPersonSociais'
    // }
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
    data_nascimento: {
        type: Date,
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
    escolaridade: {
        type: Number,
        enum: EscolaridadeType,
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
    orientacao: {
        type: Number,
        enum: OrientacaoType,
        require: true
    },
    renda: {
        type: Number,
        enum: RendaType,
        require: true
    },
    empregado: {
        type: Number,
        enum: ExperienciaProfissionalType,
        require: true
    },
    estado_civil: {
        type: Number,
        enum: EstadoCivilType,
        require: true
    },
    qtd_filhos: {
        type: Number,
        enum: QtdFilhosType,
        require: true
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
    }
});


export default model<InfoPersonInterface>('InfoPerson', InfoPersonSchema)
