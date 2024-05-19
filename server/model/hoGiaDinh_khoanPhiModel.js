const mongoose = require("mongoose");
const hoGiaDinh_KhoanPhiSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true
        },
        
        idHoGiaDinh: {
            type: String,
            required: true
        },

        idKhoanPhi: {
            type: Number,
            required: true
        },

        soTien: {
            type: Number,
            required: true
        },

        daNop: {
            type: Boolean,
            required: true,
        },

        thoiGianNop: {
            type: Date,
        }
    }
)
module.exports = mongoose.models.HoGiaDinh_KhoanPhi || mongoose.model("HoGiaDinh_KhoanPhi",hoGiaDinh_KhoanPhiSchema)