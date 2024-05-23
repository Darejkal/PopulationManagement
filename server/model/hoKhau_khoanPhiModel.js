const mongoose = require("mongoose");
const hoGiaDinh_KhoanPhiSchema = new mongoose.Schema(
    {   
        idHoKhau: {
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
hoGiaDinh_KhoanDongGopSchema.index(
    {idHoKhau:1,idKhoanPhi:1},{unique:true}
)
module.exports = mongoose.models.HoGiaDinh_KhoanPhi || mongoose.model("HoGiaDinh_KhoanPhi",hoGiaDinh_KhoanPhiSchema)