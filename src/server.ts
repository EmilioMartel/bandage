import express, { Request, Response } from 'express';
import { exec } from 'child_process';


const app = express();
const port = 3000; // El puerto en el que tu API escuchará

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para ejecutar Bandage info
app.get('/api/bandage/info', (req: any, res: any) => {
  // La ruta completa al archivo montado
  const filePath = '/app/data/test.gfa';  // Ruta dentro del contenedor

  // Comando para ejecutar Bandage
  const command = `BandageNG info ${filePath}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error ejecutando Bandage:', stderr);
      return res.status(500).send('Error ejecutando Bandage');
    }
    console.log('Bandage output:', stdout);
    res.json({ output: stdout });
  });
});


app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola desde la API de Bandage!');
}); 


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Bandage API escuchando en el puerto ${port}`);
});