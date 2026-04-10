import express from "express";
import routes from "./routes/index";
import cors from "cors";
const app = express();
app.use(cors());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use("/api", routes);
app.use('/uploads', express.static("uploads"));
app.get("/", (req, res) => {
    res.send("Integrated OASIS api running 🚀");
});
export default app;
