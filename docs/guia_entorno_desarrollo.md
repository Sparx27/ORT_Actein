# Guía de entorno de desarrollo – Actein

## Requisitos previos

- Python 3.14.3
- Node.js 20+
- Git

---

## Estructura del proyecto
```
actein/
├── .venv/                  ← entorno virtual Python (no se commitea)
├── requirements.txt        ← dependencias Python de los 3 servicios
├── auth-service/
├── private-service/
├── public-service/
├── public-frontend/        ← React + Vite
│   ├── node_modules/       ← no se commitea
│   └── package.json
├── admin-frontend/         ← React + Vite
│   ├── node_modules/       ← no se commitea
│   └── package.json
└── docs/
```

---

## Configuración inicial (primera vez)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/actein.git
cd actein
```

### 2. Entorno virtual Python
```bash
python -m venv .venv
```

**Activarlo:**
```bash
# Windows
.venv\Scripts\activate

Cuando está activo aparece `(.venv)` al inicio de la terminal.

**Instalar dependencias Python: (CUANDO APLIQUE, NO SIEMPRE)**
```bash
pip install -r requirements.txt
```

### 3. Frontends React
```bash
# Catálogo público
cd public-frontend
npm install

# Sistema interno
cd ../admin-frontend
npm install
```

---

## Correr los servicios en desarrollo

### Backend (activar .venv primero)
```bash
# auth-service
cd auth-service
uvicorn main:app --reload --port 8001

# public-service
cd public-service
uvicorn main:app --reload --port 8002

# private-service
cd private-service
uvicorn main:app --reload --port 8003
```

### Frontend
```bash
# Catálogo público – corre en localhost:5173
cd public-frontend
npm run dev

# Sistema interno – corre en localhost:5174
cd admin-frontend
npm run dev
```

---

## Notas importantes

- El `.venv` activo no interfiere con `npm` ni con Node. Podés tener ambos corriendo en la misma terminal sin problemas.
- `node_modules/` y `.venv/` no se commitean al repositorio. Están en `.gitignore`.
- Si alguien agrega una dependencia Python nueva, actualiza `requirements.txt` con `pip freeze > requirements.txt` y lo commitea. El resto del equipo corre `pip install -r requirements.txt` para actualizar.
- Si alguien agrega una dependencia Node nueva dentro de un frontend (`npm install algo`), el `package.json` se actualiza automáticamente. El resto del equipo corre `npm install` dentro de esa carpeta para actualizar.