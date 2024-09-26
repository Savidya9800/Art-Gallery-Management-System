const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const visitorSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    tickets: [ticketSchema],
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});



// Virtual field to calculate total amount
visitorSchema.virtual('totalAmount').get(function() {
    return this.tickets.reduce((acc, ticket) => acc + (ticket.count * ticket.price), 0);
});

// Ensure virtual fields are serialized
visitorSchema.set('toJSON', { virtuals: true });
visitorSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Visitor", visitorSchema);