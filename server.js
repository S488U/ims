import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
// import { generalLimiter, authLimiter } from "./src/utils/rateLimiter.js";
import path from "path";
import connectDB from "./src/config/db.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { createError } from "./src/utils/errorUtils.js";
import { appLogger } from "./src/middlewares/logger.js";
import { speedMiddleware } from './src/middlewares/speedMiddleware.js';
import healthRoute from "./src/routes/healthRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import feedbackRoutes from "./src/routes/feedbackRoutes.js";
import invoiceRoutes from "./src/routes/invoiceRoutes.js"
import reportRoutes from './src/routes/reportRoutes.js';

const app = express();
const port = process.env.PORT || 3500;
const __dirname = path.resolve();

(async () => {
    try {
      await connectDB();
    } catch (err) {
      console.error("Startup Error: ", err.message);
      process.exit(1);
    }
  
    app.use(cors());
  
    app.set('trust proxy', 1);
    app.use(speedMiddleware);
    // app.use(generalLimiter);
    app.use(appLogger);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "public")));
  
    app.use("/", healthRoute);
    app.use("/login", authRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/customer", customerRoutes)
    app.use("/api/supplier", supplierRoutes);
    app.use("/api/inventory", inventoryRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/feedback", feedbackRoutes);
    app.use("/api/invoice", invoiceRoutes);
    app.use("/api/report", reportRoutes);

  
    app.use((req, res, next) => {
      next(createError("Route Not Found", 404));
    });
  
    app.use(errorHandler);
  
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  })();
  