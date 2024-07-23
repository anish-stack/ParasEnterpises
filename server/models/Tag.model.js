const mongoose = require('mongoose')

const TagsSchema = new mongoose.Schema({
    tagName: {
        type: String,
    },
    tagColour:{
        type: String,
    }
})

const Tag = mongoose.model('Tag',TagsSchema)
module.exports = Tag;