import { Schema, Types, model } from 'mongoose';

const topicSchema = new Schema({
    topicId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    title: {
        type: String,
        required: true,
    },
    notesId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    notes: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    topics: [topicSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = model('Course', courseSchema);

export default Course;
export async function find() {
    return await Course.find();
}
export async function findById(id) {
    return await Course.findById(id);
}
export async function findOne(query) {
    return await Course.findOne(query);
}
export async function create(data) {
    return await Course.create(data);
}
