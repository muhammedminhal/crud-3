var mongoose= require('mongoose')

studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    age:{
        type:Number,
        required:true
    },
    place:{
        type:String,
        required:true
    }
});

mongoose.model('student',studentSchema);