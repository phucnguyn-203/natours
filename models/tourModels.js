const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true,
            minLength: [10, 'A Tour name must be greater than or equal 10'],
            maxLength: [40, 'A tour name must be less than or equal 40'],
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, 'A tour must have duration'],
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have group size'],
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have difficulty'],
            enum: {
                values: ['easy', 'medium', 'difficult'],
                message: '{VALUE} is not supported',
            },
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'A rating must be above 1.0'],
            max: [5, 'A rating must be below 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have price'],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (value) {
                    // This keyword only point to current document when new creation
                    return value < this.price;
                },
                message: 'disscount price ({VALUE}) should be below regular price',
            },
        },
        secretTour: {
            type: Boolean,
            default: false,
        },
        summary: {
            type: String,
            required: [true, 'A tour must have summary'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have image cover'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        startDates: [Date],
        startLocation: {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
            },
            description: String,
            coordinates: [Number],
            address: String,
        },
        locations: [
            {
                type: {
                    type: String,
                    default: 'Point',
                    enum: ['Point'],
                },
                description: String,
                coordinates: [Number],
                day: Number,
            },
        ],
        guides: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

// DOCUMENT MIDDLEWARE: run before .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    // this.start = Date.now();
    next();
});

tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt',
    });
    next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    // console.log(this.pipeline());
    next();
});

// VIRTUAL POPULATE
tourSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'tour',
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
