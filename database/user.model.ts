import { type Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;

export const createDummyUser = async (): Promise<IUser> => {
  const dummyUser = new User({
    clerkId: `dummy_clerk_${Date.now()}`,
    name: "Тестовый Пользователь",
    username: `testuser_${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    password: "testpassword123",
    bio: "Это тестовый пользователь для разработки",
    picture: "https://via.placeholder.com/150",
    location: "Москва, Россия",
    portfolioWebsite: "https://example.com",
    reputation: 100,
    saved: [],
    joinedAt: new Date(),
  });

  return await dummyUser.save();
};
