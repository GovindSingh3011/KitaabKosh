import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            `${process.env.db_url}/${DB_NAME}`
        );
        console.log(`MongoDB connected ✓ | Host: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;