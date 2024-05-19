const mongoose = require("mongoose");

const canHoSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true,
        },

        soNha: {
            type: String,
            required: true,
        },

        dienTich: {
            type: Number,
            required: true
        },
        
        chatLuong: {
            type: Date,
            required: true
        },
        diaChi: {
            type: String,
            required: true
        },
        maKhuVuc: {
            type: String,
            required: true
        },
    }
)

module.exports = mongoose.models.CanHo || mongoose.model("CanHo",canHoSchema)