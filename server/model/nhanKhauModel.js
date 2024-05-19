const mongoose = require("mongoose");

const nhanKhauSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
            unique: true
        },

        hoTen: {
            type: String,
            required: true,
        },

        bietDanh: {
            type: String,
            required: true
        },

        ngaySinh: {
            type: Date,
            required: true,
        },

        gioiTinh: {
            type: String,
            required: true,
        },

        soCCCD: {
            type: String,
            required: true,
        },

        nguyenQuan: {
            type: String,
            required: true
        },

        tonGiao: {
            type: String,
            required: true
        },

        danToc: {
            type: String,
            required: true,
        },

        quocTich: {
            type: String,
            required: true
        },

        hoChieuSo: {
            type: String
        },

        noiThuongTru: {
            type: String,
            required: true
        },
        
        diaChiHienTai: {
            type: String,
            required: true
        },

        trinhDoHocVan: {
            type: String,
            required: true,
        },

        trinhDoChuyenMon: {
            type: String,
            required: true,
        },

        ngheNghiep: {
            type: String,
            required: true,
        },

        noiLamViec: {
            type: String,
            required: true
        },
        
        idHoKhau: {
            type: String,
            required: true,
            unique: true,
        },   
        
        quanHeVoiChuHo: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.models.NhanKhau || mongoose.model("NhanKhau",nhanKhauSchema)