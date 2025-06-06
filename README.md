# **TFT Microservicio Bandage - Procesamiento de Grafos GFA**

📌 **Versión**: 1.0.0  
🖥 **Tecnologías**: Node.js, TypeScript, Express  
📜 **Licencia**: ISC  

---

## **📌 Descripción del Proyecto**  
Este microservicio forma parte del **proyecto de visualización de grafos genómicos** desarrollado para el **Trabajo de Fin de Título (TFT01)** en colaboración con el **Instituto Tecnológico de Canarias (ITC)**.  

Su objetivo es actuar como un puente entre el backend y la herramienta **Bandage**, permitiendo transformar archivos `.gfa` en layouts visuales procesables desde el frontend.

---

## **📂 Estructura del Proyecto**  
```
📂 bandage
│   Dockerfile              # Imagen de construcción para el microservicio
│
├───📂 src
│   │   server.ts           # Configuración principal del servidor Express
│   └───📂 controllers
│           bandageController.ts  # Controlador con endpoints para invocar Bandage
```

---

## **⚙️ Instalación y Configuración**

### **1️⃣ Requisitos Previos**
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (si se usa el contenedor)

### **2️⃣ Clonar el Repositorio**
```bash
git clone https://github.com/EmilioMartel/bandage.git
cd bandage
```

### **3️⃣ Instalar Dependencias**
```bash
npm install
```

---

## **🚀 Modos de Ejecución**

### **🔹 Desarrollo**
```bash
npm run dev
```

### **🔹 Producción**
```bash
npm run build
npm run start
```

---

## **📌 API Endpoints**

| Método | Endpoint       | Descripción                              |
|--------|----------------|------------------------------------------|
| GET    | `/api/bandage/info`   | Devuelve estadísticas del grafo (`.gfa`) |
| GET    | `/api/bandage/layout` | Devuelve el layout en JSON para visualizar |

---

## **🔧 Docker**

### **Construcción y ejecución del contenedor**
```bash
docker build -t bandage-api .
docker run -p 3000:3000 bandage-api
```

O con `docker-compose`:
```bash
docker-compose up --build
```

---

## **📌 Información Adicional**

📘 **Trabajo de Fin de Título (TFT01)**  
Este microservicio forma parte del **TFT01** desarrollado para el **Instituto Tecnológico de Canarias (ITC)**.  
Más información:
- [📄 Documento TFT01](https://drive.google.com/file/d/1emKnprueySC8kMen3JYUOPBANlWkGwCl/view?usp=sharing)
- [🔬 Instituto Tecnológico de Canarias](https://www.itccanarias.org/)

---

## **👨‍💻 Autor y Contribuciones**
📌 **Autor**: Emilio Martel Díaz  
🔗 **Colaboradores**: ITC, ULPGC

---

## **📜 Licencia**
Este proyecto está bajo la licencia **ISC**. Puedes usarlo y modificarlo libremente.
