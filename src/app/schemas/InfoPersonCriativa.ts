import {model, Document} from 'mongoose';
import mongoose from "mongoose";

import {Numero14Type} from "../enum/cadatro-aluno/numero1-4-type.enum";
import {GostaFazerType} from "../enum/cadatro-aluno/gostaFazer-type.enum";
import {PoderesType} from "../enum/cadatro-aluno/poderes-type.enum";
import {PreferenciaMusicalType} from "../enum/cadatro-aluno/preferenciaMusical-type.enum";
import {FastFoodType} from "../enum/cadatro-aluno/fastFood-type.enum";
import {LugarViverType} from "../enum/cadatro-aluno/lugarViver-type.enum";
import {IncomodoType} from "../enum/cadatro-aluno/incomodo-type.enum";
import {GratidaoType} from "../enum/cadatro-aluno/gratidao-type.enum";
import {LembradoType} from "../enum/cadatro-aluno/lembrado-type.enum";

interface InfoPersonCriativaInterface extends Document {
    atraencia: Numero14Type;
    gosta_de_fazer: GostaFazerType;
    super_poder: PoderesType;
    preferencia_musical: PreferenciaMusicalType;
    fast_food: FastFoodType;
    viver: LugarViverType;
    incomodo: IncomodoType;
    gratidao: GratidaoType;
    lembrado: LembradoType;
    inforPerson: Object;
}

const InfoPersonCriativaSchema = new mongoose.Schema({
    atraencia: {
        type: Number,
        enum: Numero14Type,
        require: true
    },
    gosta_de_fazer: {
        type: Number,
        enum: GostaFazerType,
        require: true
    },
    super_poder: {
        type: Number,
        enum: PoderesType,
        require: true
    },
    preferencia_musical: {
        type: Number,
        enum: PreferenciaMusicalType,
        require: true
    },
    fast_food: {
        type: Number,
        enum: FastFoodType,
        require: true
    },
    viver: {
        type: Number,
        enum: LugarViverType,
        require: true
    },
    incomodo: {
        type: Number,
        enum: IncomodoType,
        require: true
    },
    gratidao: {
        type: Number,
        enum: GratidaoType,
        require: true
    },
    lembrado: {
        type: Number,
        enum: LembradoType,
        require: true
    },
    inforPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPerson'
    }

});


export default model<InfoPersonCriativaInterface>('InfoPersonCriativa', InfoPersonCriativaSchema)
