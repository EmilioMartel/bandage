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

// 🛑 Usa .get, no .use
app.get('/api/bandage/info', (req: Request, res: Response): any => {
  try {
    // 1) Directorio "gfa" un nivel arriba de `src` o donde lo tengas
    const gfaDir = path.resolve(process.cwd(), 'gfa');
    if (!fs.existsSync(gfaDir)) {
      return res.status(404).json({ error: 'No existe carpeta gfa/' });
    }

    // 2) Primer archivo que encuentre
    const [ fileName ] = fs.readdirSync(gfaDir);
    const filePath = path.join(gfaDir, fileName);
    console.log('Archivo GFA encontrado:', filePath);

    // 3) Ejecutar BandageNG
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

app.get('/', (_req: Request, res: Response) => {
  res.send('¡Hola desde la API de Bandage!');
});

app.listen(port, () => {
  console.log(`BandageAPI working on http://localhost:${port}`);
});
