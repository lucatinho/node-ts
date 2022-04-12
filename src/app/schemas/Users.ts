import {Schema, model, Document} from 'mongoose';
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserInterface extends Document {
    name?: string;
    email?: string;
    password?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    createdAt?: Date;

    fullName(): string;
}

// const UserSchema = new Schema({
//     email: String,
//     firstName: String,
//     lastname: String
// }, {
//     timestamps: true
// })

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// const User = mongoose.model('User', UserSchema);
// module.exports = User;


UserSchema.methods.fullName = function (): string {
    return this.name + ' ' + this.email;
}

export default model<UserInterface>('User', UserSchema)
