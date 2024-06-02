import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import Post from '../models/post.model.js'; // Adjust the path as needed

// Load environment variables from .env file
// dotenv.config();

// const { MONGODB_URL } = process.env.MONGODB_URL;
const DB_NAME = "Task"

const MONGODB_URL=`mongodb+srv://manukage:manukage123@cluster0.q5oh8uw.mongodb.net`



mongoose.connect(`${MONGODB_URL}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const generateRandomPosts = async (numPosts) => {
  const posts = [];
  for (let i = 0; i < numPosts; i++) {
    posts.push({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      imageUrl: faker.image.url(),
      author: faker.person.fullName(),
    });
  }

  try {
    await Post.insertMany(posts);
    console.log(`Inserted ${numPosts} random posts`);
  } catch (error) {
    console.error('Error inserting posts:', error);
  } finally {
    mongoose.connection.close();
  }
};

generateRandomPosts(100); // Adjust the number of posts to generate as needed
