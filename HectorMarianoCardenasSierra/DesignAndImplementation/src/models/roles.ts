import mongoose from 'mongoose';

interface RoleAttrs {
    name: string;
    description: string;
}

interface RoleDoc extends mongoose.Document {
    name: string;
    description: string;
}

interface RoleModel extends mongoose.Model<RoleDoc> {
    build(attrs: RoleAttrs): RoleDoc
}

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

roleSchema.statics.build = (attrs: RoleAttrs) => {
    return new Role(attrs);
}
export const Role = mongoose.model<RoleDoc, RoleModel>('Role', roleSchema);