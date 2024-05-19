const mongoose = require("mongoose");
const hoGiaDinh_KhoanDongGopSchema = new mongoose.Schema(
    {
        
        idHoKhau: {
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
hoGiaDinh_KhoanDongGopSchema.index(
    {idHoKhau:1,idKhoanDongGop:1},{unique:true}
)
module.exports = mongoose.models.HoGiaDinh_KhoanDongGop || mongoose.model("HoGiaDinh_KhoanDongGop",hoGiaDinh_KhoanDongGopSchema)