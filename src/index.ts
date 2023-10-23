import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? "3000";

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(routes);

const MONGOOSE_URL = process.env.MONGODB_URL ?? "";
mongoose.connect(MONGOOSE_URL)
.then(() => {
    console.log(`Mongodb terhubung di ${MONGOOSE_URL}`);
})
.catch((err) => {
    console.error('Kesalahan koneksi MongoDB: ' + err);
});

app.get("/", (req: Request, res: Response) => {
    res.send(`Express + Typescript Server`);
});

app.listen(port, () => {
    console.log(`Server jalan di port ${port}`)
});