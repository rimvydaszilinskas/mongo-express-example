const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    population: Number
}, {collection: 'cities'});

const City = mongoose.model('City', citySchema);

module.exports = City;
module.exports.getAll = async () => {
    return await City.find();
}
