import { Router, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import nodemailer from "nodemailer";
import { AuthResponse, SignUpRequest, SignInRequest } from "../types/user";
import "../config/passport"; // Import passport config

const router = Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Welcome email function
const sendWelcomeEmail = async (email: string, username: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #c15f3c;">Welcome to Our Portfolio!</h1>
      <p>Dear ${username},</p>
      <p>Thank you for joining our community! We're excited to have you on board.</p>
      <p>Feel free to explore our projects and reach out if you have any questions.</p>
      <p>Best regards,<br>The Portfolio Team</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Portfolio Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Our Portfolio!",
    html,
  });
};

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/signin",
  }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" }
      );

      // Sử dụng FRONTEND_URL từ env thay vì hardcode
      res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${token}`);
    } catch (error) {
      res.redirect(
        `${process.env.FRONTEND_URL}/signin?error=authentication_failed`
      );
    }
  }
);

// Register
router.post(
  "/signup",
  async (
    req: Request<{}, {}, SignUpRequest>,
    res: Response<AuthResponse | { message: string; error: string }>
  ) => {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res.status(400).json({
          message: "User with this email or username already exists",
          error: "User exists",
        });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
      });

      await user.save();

      // Create token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "fallback_secret",
        {
          expiresIn: "24h",
        }
      );

      // Send welcome email
      await sendWelcomeEmail(user.email, user.username);

      return res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Login
router.post(
  "/signin",
  async (
    req: Request<{}, {}, SignInRequest>,
    res: Response<AuthResponse | { message: string; error: string }>
  ) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
          error: "Authentication failed",
        });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
          error: "Authentication failed",
        });
      }

      // Create token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "fallback_secret",
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        message: "Logged in successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error logging in",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Add new endpoint for getting user info
router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    ) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user }); // Add return statement
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" }); // Add return statement
  }
});

export default router;
