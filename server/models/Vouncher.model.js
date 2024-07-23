const mongoose = require('mongoose')

const VouncherShema = new mongoose.Schema({
    CouponCode : {
        type : String,
    },
    descountpercent : {
        type : Number,
    },
    isActive : {
        type : Boolean,
    },
    
})

const Vouncher = mongoose.model('Vouncher',VouncherShema)
module.exports = Vouncher