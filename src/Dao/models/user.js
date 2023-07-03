import mongoose from 'mongoose';

const collection = 'User';

const schema = new mongoose.Schema({
    first_name: String,
    last_name:String,
    email:String,
    rol: {
        type: String,
        default: "user"
    },
    age: Number,
    password: String,
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Carts"
    }

})

const userModel = mongoose.model(collection, schema);

export default userModel;