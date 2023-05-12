import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getArticles = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const getArticleById = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const createArticle = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.owner);
        console.log(user);
        if (!user) {
            return res.status(404).json({message: 'Owner not found'});
        }

        await User.findByIdAndUpdate(req.body.owner, { numberOfArticles: user.numberOfArticles + 1 });

        const article = await Article.create(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        next(err);
    }
}

export const updateArticleById = async (req, res, next) => {
    try {
        //In params should be field `userId` for imitaion of user auth
        const articleId = req.params.id;
        const { title, subtitle, description } = req.body;
        const ownerId = req.body.userId; // Here must be user auth but instead we use the user id from the request

        // Find the article by its ID and populate the owner field
        const article = await Article.findOne({ _id: articleId }).populate('owner');

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        //console.log(article.owner.id);
        // Check if the authenticated user is the owner of the article
        if (article.owner.id !== ownerId) {
            return res.status(403).json({ message: 'You are not authorized to update this article' });
        }

        // Update the article document
        if(title){
            article.title = title;
        }
        if(subtitle){
            article.subtitle = subtitle;
        }
        if(description){
            article.description = description;
        }
        await article.save();

        res.status(200).json({ message: 'Article updated successfully', article });
    } catch (err) {
        next(err);
    }
}

export const deleteArticleById = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}
