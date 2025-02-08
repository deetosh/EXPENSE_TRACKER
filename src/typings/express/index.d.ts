import MyUser from "../../db/models/user.model"; // Import your User model

declare global {
    namespace Express {
        interface User extends MyUser {}  // Extend Express.User with your User model
    }
}