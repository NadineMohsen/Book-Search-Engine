const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
   Query:{
      // By adding context to our query, we can retrieve the logged in user without specifically searching for them
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).select('-_v -password');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
   } ,
//    Mutation:{
//        addUser: async(parent, {username,email,password}) => {
//            const user = await User.create({username,email,password})
//            const token = signToken(user);
//            return {user,token}
//        },
//        login: async(parent, {email, password}) => {
//            const user = await User.findOne({email});
//            if(!user){
//             throw new AuthenticationError('Incorrect email or password');
//            }
//            const checkPassword = await user.isCorrectPassword(password);
//            if(!checkPassword) {
//             throw new AuthenticationError('Incorrect email or password');
//            }
//            const token = signToken(user);
//            return(user,token)
//        },
//        saveBook: async(parent, {newBook}, context) => {
//            if(context.user){
//                const updatedUser = await User.findByIdAndUpdate(
//                 {_id: context.user._id},
//                 {$push: {savedBooks: newBook}},
//                 {new: true}
//                );
//                return updatedUser
//            }
//            throw new AuthenticationError('You need to be logged in!');
//        },
//        removeBook: async(parent, {bookId}, context) => {
//            if(context.user){
//                const updatedUser = await User.findByIdAndUpdate(
//                    {_id: context.user._id},
//                    {$pull: {savedBooks: newBook}},
//                    {new: true}
//                );
//                return updatedUser
//            }
//         throw new AuthenticationError('You need to be logged in!');
//        }
//    }
}

module.exports = resolvers;