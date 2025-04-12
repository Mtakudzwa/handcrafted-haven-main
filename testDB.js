import 'dotenv/config';
import User from './models/User.js';
import connectDB from './config/db.js';

(async () => {
  try {
    await connectDB();
    const testUser = await User.create({
      _id: "test123",
      name: "Test User",
      email: "test@example.com",
      imageUrl: "https://example.com/avatar.png"
    });
    console.log("✅ User created:", testUser);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
