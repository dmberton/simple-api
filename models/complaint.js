const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
  id: String,
  date: Date,
  contact: {
    firstName: String,
    lastName: String,
    type: String
  },
  complaint: String,
  comment: String,
}, { collection: 'complaints' });

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;