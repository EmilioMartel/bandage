import express, { Request, Response } from 'express'; 
// (requiere "esModuleInterop": true)
import { exec } from 'child_process';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/api/bandage/info', (req: Request, res: Response): any => {
  try {
    const gfaDir = path.resolve(process.cwd(), 'gfa');
    if (!fs.existsSync(gfaDir)) {
      return res.status(404).json({ error: 'No existe carpeta gfa/' });
    }

    const [ fileName ] = fs.readdirSync(gfaDir);
    const filePath = path.join(gfaDir, fileName);
    console.log('Archivo GFA encontrado:', filePath);

    const comando = `BandageNG info "${filePath}"`;
    exec(comando, (err, stdout, stderr) => {
      if (err) {
        console.error('Error BandageNG:', stderr || err.message);
        return res.status(500).json({ error: stderr || err.message });
      }
      res.json({ stdout: stdout.trim() });
    });
  } catch (e: any) {
    console.error('Error en handler:', e);
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/bandage/layout", async (req: Request, res: Response): Promise<any> => {
  try {
    const projectRoot = process.cwd();
    const gfaDir    = path.join(projectRoot, "gfa");
    const filesDir  = path.join(projectRoot, "files");

    if (!fs.existsSync(gfaDir)) {
      return res.status(404).json({ error: "No existe carpeta gfa/" });
    }
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir, { recursive: true });
    }

    const antiguos = fs.readdirSync(filesDir);
    antiguos.forEach(name => {
      fs.unlinkSync(path.join(filesDir, name));
    });

    const [ fileName ] = fs.readdirSync(gfaDir);
    const inputPath    = path.join(gfaDir, fileName);
    console.debug("GFA encontrado:", inputPath);

    const baseName    = path.parse(fileName).name;
    const outputName  = `${baseName}.layout`;
    const outputPath  = path.join(filesDir, outputName);

    const comando = `BandageNG layout "${inputPath}" "${outputPath}"`;
    console.debug("Ejecutando:", comando);

    exec(comando, (err, stdout, stderr) => {
      if (err) {
        console.error("Error BandageNG:", stderr || err.message);
        return res.status(500).json({ error: stderr || err.message });
      }
      res.json({
        message: `Layout generado en 'files/${outputName}'`,
        stdout: stdout.trim()
      });
    });

  } catch (e: any) {
    console.error("Error en handler:", e);
    res.status(500).json({ error: e.message });
  }
});




app.get('/', (_req: Request, res: Response) => {
  res.send('¡Hola desde la API de Bandage!');
});

app.listen(port, () => {
  console.log(`BandageAPI working on http://localhost:${port}`);
});
