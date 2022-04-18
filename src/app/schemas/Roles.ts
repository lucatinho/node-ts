import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface RoleInterface extends Document {
    name: String;
    ativo: boolean;
}

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    ativo: {
        type: Boolean,
        require: true,
        default: false
    }
});


export default model<RoleInterface>('Role', RoleSchema)
