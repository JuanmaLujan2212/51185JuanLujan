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
    },
    documents:{
        type:[
            {
                name:{type:String,required:true},
                reference:{type:String,required:true}
            }
        ],
        default:[]
    },
    last_connection:{
        type:Date,
        default: null
    },
    status:{
        type:String,
        require:true,
        enums:["completo","incompleto","pendiente"],
        default:"pendiente"
    },
    avatar:{
        type:String,
        default:""
    }


})

const userModel = mongoose.model(collection, schema);

export default userModel;