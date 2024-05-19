const mongoose = require("mongoose");
const hoGiaDinh_KhoanDongGopSchema = new mongoose.Schema(
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

        idKhoanDongGop: {
            type: Number,
            required: true
        },

        soTien: {
            type: Number,
            required: true
        },

        thoiGianNop: {
            type: Date,
        }
    }
)
module.exports = mongoose.models.HoGiaDinh_KhoanDongGop || mongoose.model("HoGiaDinh_KhoanDongGop",hoGiaDinh_KhoanDongGopSchema)