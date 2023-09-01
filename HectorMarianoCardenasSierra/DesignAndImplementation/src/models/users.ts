import mongoose from 'mongoose';
import { Password } from '../service/password';

interface UserAttrs {
    name: string;
    email: string;
    password: string
    roleId: string;
}

interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string
    roleId: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done()
});
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}
export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
