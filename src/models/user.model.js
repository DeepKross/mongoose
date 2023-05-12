import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 60,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        email: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['writer', 'admin', 'guest']
    },
    age: {
        type: Number,
        max: 99,
    },
    numberOfArticles: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

userSchema.pre('save', function (next) {
    this.fullName = this.firstName + ' ' + this.lastName;
    if(this.age < 1){
        this.age = 1;
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
