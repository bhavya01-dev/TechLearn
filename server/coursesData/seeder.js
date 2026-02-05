const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');

// Load env vars from server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const loadJson = (relativePath) => {
  const fullPath = path.resolve(__dirname, '../coursesData', relativePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw);
};

const courses = [
  loadJson('c_course.json'),
  loadJson('python.json'),
  loadJson('java.json')
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not set in server/.env');
    }
    const redactedUri = uri.replace(/:([^@]+)@/, ':****@');
    console.log(`Connecting to: ${redactedUri}`);
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing courses
    await Course.deleteMany();
    console.log('Cleared existing courses');

    // Insert new courses
    await Course.insertMany(courses);
    console.log('Successfully seeded database with demo courses');

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
