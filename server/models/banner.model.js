const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image: {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
    },
    active:{
        type:Boolean,
        default:true
    }
}, { timestamps : true });

module.exports = mongoose.model("BannerDetails",BannerSchema);
