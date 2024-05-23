const mongoose = require("mongoose");

const CCCDSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true,
        },

        soCCCD: {
            type: String,
            required: true,
            unique: true
        },

        hoTen: {
            type: String,
            required: true,
        },
        
        ngayHetHan: {
            type: Date,
            required: true
        },

        dacDiemNhanDang: {
            type: String,
            required: true
        },

        noiCap: {
            type: String,
            required: true,
        },
        
        ngayCap:{
            type: Date,
            required: true,
        }
    }
)

module.exports = mongoose.models.CCCD || mongoose.model("CCCD",CCCDSchema)