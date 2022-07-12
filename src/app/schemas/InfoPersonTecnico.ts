import {model, Document} from 'mongoose';
import mongoose from "mongoose";

import {AmbienteType} from "../enum/cadatro-aluno/ambiente-type.enum";
import {ComputadorType} from "../enum/cadatro-aluno/computador-type.enum";
import {SistemaOperacionalType} from "../enum/cadatro-aluno/sistemaOperacional-type.enum";
import {ProcessadorType} from "../enum/cadatro-aluno/processador-type.enum";
import {MemoriaType} from "../enum/cadatro-aluno/memoria-type.enum";
import {TempoFormacaoType} from "../enum/cadatro-aluno/tempoFormacao-type.enum";
import {DominioInformaticaType} from "../enum/cadatro-aluno/dominioInformatica-type.enum";

interface InfoPersonTecnicoInterface extends Document {
    ambiente_estudo: AmbienteType;
    tem_computador: ComputadorType;
    qual_so: SistemaOperacionalType;
    processador: ProcessadorType;
    memoria: MemoriaType;
    tempo_formacao: TempoFormacaoType;
    conhecimento_informatica: DominioInformaticaType;
    inforPerson: Object;
}

const InfoPersonTecnicoSchema = new mongoose.Schema({
    ambiente_estudo: {
        type: Number,
        enum: AmbienteType,
        require: true
    },
    tem_computador: {
        type: Number,
        enum: ComputadorType,
        require: true
    },
    qual_so: {
        type: Number,
        enum: SistemaOperacionalType,
        require: true
    },
    processador: {
        type: Number,
        enum: ProcessadorType,
        require: true
    },
    memoria: {
        type: Number,
        enum: MemoriaType,
        require: true
    },
    tempo_formacao: {
        type: Number,
        enum: TempoFormacaoType,
        require: true
    },
    conhecimento_informatica: {
        type: Number,
        enum: DominioInformaticaType,
        require: true
    },
    inforPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPerson'
    }
});


export default model<InfoPersonTecnicoInterface>('InfoPersonTecnico', InfoPersonTecnicoSchema)
