const mongoose = require('mongoose');

const exerciseDataSchema = new mongoose.Schema({
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    id: String,
    name: String,
    target: String,
}, {
    collection: "exercisedata",
    methods: {
        formatName() {
            return this.name.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        },
        formatEquipment() {
            return this.equipment.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        },
        formatTarget() {
            return this.target.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
    }
});

exerciseDataSchema.statics.getTargetOptions = function() {
    return this.distinct('target');
}

exerciseDataSchema.statics.getEquipmentOptions = function() {
    return this.distinct('equipment');
}

exerciseDataSchema.statics.getBodyPartOptions = function() {
    return this.distinct('bodyPart');
}

module.exports = mongoose.model('ExerciseData', exerciseDataSchema);

