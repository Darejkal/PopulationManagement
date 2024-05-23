const HoKhau = require("../model/hoKhauModel");
const asyncHandler = require("express-async-handler");
const nhanKhau = require("../model/nhanKhauModel");
const CanHo = require("../model/canHoModel");
const CCCD = require("../model/CCCDModel");

const getHouseholdBasedOnParams = asyncHandler(async (req, res) => {
    try {
        const chuHo = req.query.idChuHo;
        const querys = {};
        if (chuHo) {
            querys.idChuHo = chuHo;
        }

        const hoKhau = await HoKhau.find(querys);

        res.status(200).send({
            hoKhau,
            message: 'Get households successfully'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error fetching households',
            error: error.message
        });
    }
});

const createHousehold = asyncHandler(async (req, res) => {
    try {
        const hoKhauMoi = await HoKhau.create(req.body);
        res.status(200).send({
            hoKhauMoi,
            message: 'Create household successfully'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error creating household',
            error: error.message
        });
    }
});

const getHouseholds = asyncHandler(async (req, res) => {
    try {
        const hoKhau = await HoKhau.find();
        res.status(200).send({
            hoKhau,
            message: 'Get households successfully'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error fetching households',
            error: error.message
        });
    }
});

const getHouseholdDetail = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const hoKhau = await HoKhau.findById(id).populate('idChuHo');

        res.status(200).send({
            hoKhau,
            message: 'Get household successfully'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error fetching household details',
            error: error.message
        });
    }
});

module.exports = { getHouseholdBasedOnParams, createHousehold, getHouseholds, getHouseholdDetail };