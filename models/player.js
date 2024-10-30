const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    score:{
        type:Number,
        default:0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Player', playerSchema);