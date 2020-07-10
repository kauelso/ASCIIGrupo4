const mongoose = require('../../database'); 
const bcrypt = require('bcryptjs');

const PlantSchema = new mongoose.Schema({
  scientificName: {
    type: String,
  },
  popularName: {
    type: String,
    required: true,
  },
  plantType:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedToUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  isArchived: {
    type: Boolean,
    required: true,
    default: false,
  },
  wateredAt: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment',
  }]
}, { timestamps: true});

const Plant = mongoose.model('Plant', PlantSchema);

module.exports = Plant;