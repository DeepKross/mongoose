import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 400,
        },
        subtitle: {
            type: String,
            minlength: 5
        },
        description: {
            type: String,
            minlength: 5,
            maxlength: 5000,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['sport', 'games', 'history']
        }
    },
    {
        timestamps: true,
    });

const Article = mongoose.model('Article', articleSchema);

export default Article;
