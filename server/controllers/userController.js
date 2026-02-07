import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create JWT
const createToken = (id) => {
    const secret = process.env.JWT_SECRET || 'default-secret-key';
    return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // password is select:false, so we must explicitly select it
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                plan: user.plan
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check if user exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // validate password
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user (plan defaults to FREE, role defaults to user)
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = createToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                plan: user.plan
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export { loginUser, registerUser };
