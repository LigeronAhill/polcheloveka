import { type Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
	name: string;
	username?: string;
	email: string;
	password?: string;
	bio?: string;
	image?: string;
	location?: string;
	portfolioWebsite?: string;
	reputation?: number;
	saved: Schema.Types.ObjectId[];
	createdAt: Date;
}

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		username: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String },
		bio: { type: String },
		image: { type: String, default: "/assets/icons/avatar.svg" },
		location: { type: String },
		portfolioWebsite: { type: String },
		reputation: { type: Number, default: 0 },
		saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
		createdAt: { type: Date, default: Date.now },
	},
	{
		collection: "user",
	},
);

const User = models.User || model("User", UserSchema, "user");

export default User;
