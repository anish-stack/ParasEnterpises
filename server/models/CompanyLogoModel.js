const mongoose = require('mongoose');

const CompanyLogoSchema = new mongoose.Schema({
  image: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
});

const CompanyLogo = mongoose.model('CompanyLogo', CompanyLogoSchema);

module.exports = CompanyLogo;
