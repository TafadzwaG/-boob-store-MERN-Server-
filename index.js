import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import path from "path";

import { fileURLToPath } from "url";

// Route Imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import advertRoutes from "./routes/advert.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import commentRoutes from './routes/comment.js'

//Controller and middleware imports
import { isAuth, requireSignin } from "./middleware/auth.js";
import { isAdmin } from "./middleware/admin.js";
import { create, productById } from "./controllers/product.js";
import { update } from "./controllers/category.js";
import { userById } from "./controllers/user.js";
import { categoryById } from "./controllers/category.js";
import { createAdvert } from "./controllers/advert.js";
import { createCategory } from "./controllers/category.js";
import { updateProduct } from "./controllers/product.js";


// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// FILE STORAGE CONFIGS

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes with File Upload
app.param("userId", userById);
app.param("categoryId", categoryById)
app.param("productId", productById);

app.post(
  "/api/product/create/:userId",
  upload.single("image"),
  requireSignin,
  isAuth,
  isAdmin,
  create
);
app.post(
  "/api/advert/create/:userId",
  upload.single("image"),
  requireSignin,
  isAuth,
  isAdmin,
  createAdvert
);
app.post(
  "/api/category/create/:userId",
  upload.single("image"),
  requireSignin,
  isAuth,
  isAdmin,
  createCategory
);

app.put(
  "/api/category/:categoryId/:userId",
  upload.single("image"),
  requireSignin,
  isAuth,
  isAdmin,
  update
);

app.put(
  "/api/product/:productId/:userId",
  upload.single("image"),
  requireSignin,
  isAuth,
  isAdmin,
  updateProduct
);

//Routes Middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", advertRoutes);
app.use("/api", cartRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", commentRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
