const User = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (object, ...allowedFields) => {
    const newObj = {};
    Object.keys(object).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = object[el];
    });
    return newObj;
};

exports.getAllUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route is not yet defined',
    });
};

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route is not yet defined',
    });
};

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route is not yet defined',
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This roure is not yet defined',
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route is not yet defined',
    });
};

exports.updateMe = catchAsync(async (req, res, next) => {
    //1) Create error if user post password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword'));
    }
    //2) Filtered out unwanted fields name that are not allow to be updated
    const filterBody = filterObj(req.body, 'name', 'email');
    //3) Update user document
    const updateUser = await User.findByIdAndUpdate(req.user._id, filterBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
