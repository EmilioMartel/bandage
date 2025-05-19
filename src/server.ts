import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import cors from 'cors';

const app = express();
const port = 3000; 

app.use(express.json());

app.use(cors({
  origin: '*', 
}));

app.get('/api/bandage/info', (req: any, res: any) => {
  const filePath = '/app/data/test.gfa';  
  const command = `BandageNG info ${filePath}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error ejecutando Bandage:', stderr);
      return res.status(500).send('Error ejecutando Bandage');
    }
    console.log('Bandage output:', stdout);
    res.json({ stdout });
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola desde la API de Bandage!');
}); 


app.listen(port, () => {
  console.log(`Bandage API escuchando en el puerto ${port}`);
});