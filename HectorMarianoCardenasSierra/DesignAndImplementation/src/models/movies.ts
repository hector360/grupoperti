import mongoose from 'mongoose';

interface MovieAttrs {
    title: string;
    description: string;
    director: string;
    releaseYear: number;
    genre: string;
}

interface MovieDoc extends mongoose.Document {
    title: string;
    description: string;
    director: string;
    releaseYear: number;
    genre: string;
}

interface MovieModel extends mongoose.Model<MovieDoc> {
    build(attrs: MovieAttrs): MovieDoc
}

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    director: {
        type: String,
    },
    releaseYear: {
        type: String,
    },
    genre: {
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

movieSchema.statics.build = (attrs: MovieAttrs) => {
    return new Movie(attrs);
}
export const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);