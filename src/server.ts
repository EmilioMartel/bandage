import express, { Request, Response } from "express";
import cors from "cors";
import { getBandageInfo, getBandageLayout } from "./controllers/bandageController";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/bandage/info", getBandageInfo);

app.get("/api/bandage/layout", getBandageLayout);

app.get("/", (_req: Request, res: Response) => {
  res.send("¡Hola desde la API de Bandage!");
});

app.listen(port, () => {
  console.log(`BandageAPI working on http://localhost:${port}`);
});
