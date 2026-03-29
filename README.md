# Actein – Sistema de Gestión Comercial

Proyecto integrador desarrollado para la carrera **Analista en Tecnologías de la Información** en Universidad ORT Uruguay.

Sistema compuesto por un catálogo web público y un sistema interno de gestión comercial para Actein, empresa del rubro de la refrigeración.

---

## Integrantes

- Nicolás Giménez – 291950
- Cristian García – 317010

---

## Estructura del repositorio
```
actein/
├── public-frontend/      # React – Catálogo público
├── admin-frontend/       # React – Sistema interno
├── api-gateway/          # API Gateway – Enrutamiento y autenticación
├── public-service/       # Python – Productos, categorías, formulario
├── private-service/      # Python – Ventas, empresas, contactos, órdenes
├── auth-service/         # Python – Autenticación JWT (empleados)
└── docs/                 # Documentación del proyecto
```

---

## Arquitectura

Arquitectura de microservicios con dos frontends React que se comunican a través de un API Gateway. Los tres servicios backend están desarrollados en Python y comparten una base de datos SQL alojada en la nube con separación lógica por esquema.

| Componente | Responsabilidad |
|---|---|
| React Public | Catálogo, filtros, lista de cotización, formulario de consulta |
| React Admin | Gestión de ventas, maestros, reportes internos |
| API Gateway | Punto de entrada único, enrutamiento, validación de requests |
| public-service | Productos, categorías, recepción del formulario público |
| private-service | Empresas, contactos, empleados, procesos de venta, historial, órdenes |
| auth-service | Autenticación de empleados (JWT) |
| Base de datos SQL | Base compartida en nube, separación lógica por esquema |

---

## Requisitos

- Python 3.11+
- Node.js 20+
- PostgreSQL (o acceso a la instancia en nube configurada)

---

## Configuración y ejecución

### Variables de entorno

Cada servicio requiere un archivo `.env` en su directorio. Copiar el archivo `.env.example` correspondiente y completar los valores:
```bash
cp public-service/.env.example public-service/.env
cp private-service/.env.example private-service/.env
cp auth-service/.env.example auth-service/.env
```

### Backend (por servicio)
```bash
cd public-service
pip install -r requirements.txt
uvicorn main:app --reload
```

Repetir para `private-service` y `auth-service` en puertos distintos.

### Frontend
```bash
# Catálogo público
cd public-frontend
npm install
npm run dev

# Sistema interno
cd admin-frontend
npm install
npm run dev
```

---

## Tecnologías utilizadas

- **Frontend:** React, Vite
- **Backend:** Python, FastAPI / Flask
- **Base de datos:** PostgreSQL
- **Autenticación:** JWT
- **Control de versiones:** Git / GitHub
- **Notificaciones por email:** Resend

---

## Documentación

La documentación completa del proyecto (anteproyecto, requerimientos, arquitectura, plan de calidad y SCM) se encuentra en el directorio `/docs` y en el documento de entrega formal del proyecto.

---

## Tutor

Mauro Castro – Universidad ORT Uruguay, 2026