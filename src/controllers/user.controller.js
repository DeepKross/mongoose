import User from '../models/user.model.js';
import Article from "../models/article.model.js";

export const getUsers = async (req, res, next) => {
    try {
        //Select with specific fields
        const users = await User.find({}).select('id fullName email age');

        //sort users by age
        if (req.query.sort === 'asc') {
            users.sort((a, b) => {
                return a.age - b.age;
            });
        } else if (req.query.sort === 'desc') {
            users.sort((a, b) => {
                return b.age - a.age;
            });
        }
        res.status(200).json(users);
    } catch (err) {
        next(err);
        d
    }
}

export const getUserByIdWithArticles = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Find the user by its ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Populate the articles created by the user (only retrieve specified fields)
        const articles = await Article.find({ owner: userId }, 'title subtitle createdAt');

        // Combine the user and article data in the response
        const userData = {
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                age: user.age,
                numberOfArticles: user.numberOfArticles
            },
            articles
        };

        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    //create user
    try {
        const user = await User.create(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export const updateUserById = async (req, res, next) => {
    //edit user document fields (firstName, lastName, age)
    try {
        if(req.body.age || req.body.lastName || req.body.firstName){
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            user.fullName = user.firstName + ' ' + user.lastName;
            res.status(200).json(user);
        }
        else {
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

export const deleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Find the user by its ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the user
        await User.findByIdAndDelete(userId);

        // Remove all articles created by the user
        await Article.deleteMany({ owner: userId });

        res.status(200).json({ message: 'User and associated articles deleted successfully' });
    } catch (error) {
        next(error);
    }
}

