# 🚀 Angular Business Directory - Guía Completa

[![Angular 21](https://img.shields.io/badge/Angular-21-red?logo=angular)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org)
[![Express.js](https://img.shields.io/badge/Express-5.0-black?logo=express)](https://expressjs.com)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-21-orange)](https://primeng.org)

---

## 📋 Descripción del Proyecto

**Angular Business Directory** es una aplicación fullstack moderna para:

✅ **Registrar negocios** con formulario de 3 pasos  
✅ **Gestionar cupones promocionales** con cantidad disponible  
✅ **Administrar datos** con un dashboard profesional  
✅ **Almacenar imágenes** localmente  
✅ **Visualizar estadísticas** en tiempo real  

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────┐
│           FRONTEND (Angular 21)                     │
│  - Registro con 3 pasos                             │
│  - Directorio de negocios                           │
│  - Admin Dashboard con gráficos                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ HTTP
                       ↓
┌─────────────────────────────────────────────────────┐
│           BACKEND (Express.js)                      │
│  - API REST en puerto 3001                          │
│  - Manejo de imágenes (Multer)                      │
│  - Almacenamiento en JSON local                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
        /uploads (imágenes)
        /server/data/businesses.json
```

---

## 📦 Stack Tecnológico

### Frontend
- **Angular 21** - Framework principal
- **PrimeNG 21** - Componentes UI profesionales
- **Tailwind CSS 4** - Estilos utilitarios
- **Chart.js** - Gráficos y visualizaciones
- **TypeScript 5.9** - Tipado fuerte
- **RxJS** - Programación reactiva

### Backend
- **Express.js 5** - Servidor API
- **Multer 1.4** - Manejo de archivos
- **TypeScript** - Tipado en backend
- **Node.js 20+** - Runtime

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 20.0 o superior
- npm 10.0 o superior
- Git

Verifica tus versiones:
```bash
node --version  # v20.0.0+
npm --version   # 10.0.0+
```

### Instalación

1. **Clonar repositorio**
```bash
cd /ruta/al/proyecto
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar estructura**
```bash
ls -la
# Verifica que existan: src/, server/, uploads/
```

---

## 🎯 Ejecución del Proyecto

### Opción 1: Ejecutar Frontend y Backend por Separado

**Terminal 1 - Backend:**
```bash
npm run server:dev
```
Esto iniciará el servidor Express en:
- **URL:** http://localhost:3001
- **Health:** http://localhost:3001/health
- **API:** http://localhost:3001/api/businesses

**Terminal 2 - Frontend:**
```bash
npm start
```
Esto iniciará Angular en:
- **URL:** http://localhost:4200

### Opción 2: Ejecutar Todo Junto

```bash
npm run dev
```

Este comando ejecuta ambos servidores concurrentemente usando:
- Backend: `npm run server`
- Frontend: `npm start`

---

## 📱 Uso de la Aplicación

### 1️⃣ Registrar un Nuevo Negocio

1. Navega a **http://localhost:4200/registro**
2. Completa **Paso 1: Información Básica**
   - Nombre del negocio
   - Categoría (Gastronomía, Técnico, Moda, Salud, Educación)
   - Descripción detallada
3. Completa **Paso 2: Información de Contacto**
   - Email
   - Teléfono (opcional)
   - Dirección (opcional)
4. Completa **Paso 3: Cupones (Opcional)**
   - Activa toggle si deseas agregar cupones
   - Añade cupones con:
     - Título (ej: "20% descuento")
     - Descuento/Oferta
     - Código único
     - Cantidad disponible
5. Haz clic en **"Registrar Negocio"**

✅ El negocio aparecerá automáticamente en el directorio

### 2️⃣ Ver Directorio de Negocios

1. Navega a **http://localhost:4200/directorio**
2. Busca y filtra negocios por categoría
3. Haz clic en un negocio para ver detalles
4. Recla cupones disponibles

### 3️⃣ Admin Dashboard

1. Navega a **http://localhost:4200/admin/dashboard**
2. **Tab "Overview":**
   - Ver estadísticas globales
   - Gráficos de negocios por categoría
   - Métricas KPI
3. **Tab "Negocios":**
   - Tabla completa de negocioios registrados
   - Editar/Eliminar negocios
4. **Tab "Cupones":**
   - Tabla de todos los cupones
   - Editar stock disponible
   - Eliminar cupones

---

## 🔧 Configuración

### Variables de Entorno

No se requiere `.env` en desarrollo. El proyecto usa valores por defecto:

```typescript
// Backend (server/api.ts)
const API_PORT = 3001;
const DATA_DIR = './server/data';
const UPLOAD_DIR = './uploads';

// Frontend (src/app/core/services/api.service.ts)
private apiUrl = 'http://localhost:3001/api';
```

Para cambiar en producción, modifica estos archivos.

### Carpeta de Imágenes

Las imágenes se guardan en: `/uploads/`

```bash
# Crear carpeta si no existe
mkdir -p uploads

# Limpiar imágenes antiguas
rm uploads/*
```

---

## 📚 Estructura del Proyecto

```
angular-primeng-sandbox/
├── src/                          # Código del frontend
│   ├── app/
│   │   ├── features/
│   │   │   ├── public/
│   │   │   │   ├── registro/      # Componente de registro
│   │   │   │   ├── directorio/    # Directorio de negocios
│   │   │   │   └── ...
│   │   │   └── admin/
│   │   │       └── dashboard/     # Admin dashboard
│   │   ├── core/
│   │   │   └── services/
│   │   │       ├── api.service.ts # Servicio HTTP
│   │   │       └── ...
│   │   ├── business.model.ts      # Modelos de datos
│   │   └── ...
│   └── ...
│
├── server/                       # Código del backend
│   ├── api.ts                    # Entrada principal
│   ├── routes/
│   │   ├── businesses.ts         # CRUD de negocios
│   │   ├── coupons.ts            # CRUD de cupones
│   │   └── stats.ts              # Estadísticas
│   ├── middleware/
│   │   ├── upload.ts             # Multer config
│   │   ├── cors.ts
│   │   └── error-handler.ts
│   ├── data-storage.ts           # Manejo de datos JSON
│   ├── types.ts                  # Tipos TypeScript
│   └── data/
│       └── businesses.json       # Base de datos local
│
├── uploads/                      # Imágenes guardadas
├── API_DOCUMENTATION_v2.md       # Documentación API
├── README.md                     # Esta guía
├── package.json
└── ...
```

---

## 🔌 API Endpoints

### Health & Status
```bash
GET http://localhost:3001/health
```

### Negocios (CRUD)
```bash
GET    http://localhost:3001/api/businesses           # Obtener todos
POST   http://localhost:3001/api/businesses           # Crear nuevo
GET    http://localhost:3001/api/businesses/:id       # Obtener uno
PUT    http://localhost:3001/api/businesses/:id       # Actualizar
DELETE http://localhost:3001/api/businesses/:id       # Eliminar
```

### Cupones (CRUD)
```bash
POST   http://localhost:3001/api/coupons/:businessId                # Agregar
PUT    http://localhost:3001/api/coupons/:businessId/:couponId      # Editar
DELETE http://localhost:3001/api/coupons/:businessId/:couponId      # Eliminar
POST   http://localhost:3001/api/coupons/:businessId/:couponId/claim # Reclamar
```

### Estadísticas
```bash
GET http://localhost:3001/api/stats  # Obtener estadísticas
```

📖 **Documentación completa:** Ver [API_DOCUMENTATION_v2.md](./API_DOCUMENTATION_v2.md)

---

## 🧪 Testing

### Probar Backend con cURL

```bash
# Obtener todos los negocios
curl http://localhost:3001/api/businesses | jq '.'

# Crear negocio
curl -X POST http://localhost:3001/api/businesses \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Mi Negocio",
    "category":"Gastronomía",
    "description":"Descripción detallada aquí",
    "contact":"email@example.com"
  }'

# Con imagen
curl -X POST http://localhost:3001/api/businesses \
  -F "name=Mi Negocio" \
  -F "category=Gastronomía" \
  -F "description=Descripción aquí" \
  -F "image=@/ruta/a/imagen.jpg"
```

### Probar Frontend

1. Abre http://localhost:4200
2. Navega a /registro y completa un negocio
3. Verifica que aparezca en /directorio
4. Ve a /admin/dashboard y verifica las estadísticas

---

## 🐛 Solución de Problemas

### Puerto 3001 ya está en uso

```bash
# Encontrar proceso
lsof -i :3001

# Matar proceso
kill -9 <PID>
```

### Errores de CORS

Verifica que `corsMiddleware` esté activo en `server/api.ts`:
```typescript
app.use(corsMiddleware);
```

### Imágenes no se guardan

Verifica permisos:
```bash
chmod -R 755 uploads/
ls -la uploads/
```

### Base de datos no persiste

El archivo debe estar en:
```bash
ls -la server/data/businesses.json
```

Si no existe, la API lo creará automáticamente con datos de ejemplo.

---

## 📈 Características Implementadas

### ✅ Registro de Negocio
- [x] Formulario de 3 pasos (Stepper)
- [x] Paso 3 - Gestión de cupones
- [x] Cupones con stock/cantidad disponible
- [x] Validación reactiva completa
- [x] Upload de imágenes
- [x] Integración con API

### ✅ Backend
- [x] API REST completa en Express
- [x] CRUD para negocios
- [x] CRUD para cupones
- [x] Manejo de imágenes con Multer
- [x] Almacenamiento persistente (JSON)
- [x] Middleware de CORS y errores
- [x] Estadísticas en tiempo real

### ✅ Admin Dashboard
- [x] Tab Overview con KPIs
- [x] Gráficos de barras y pastel
- [x] Tabla de negocios (CRUD completo)
- [x] Tabla de cupones (CRUD completo)
- [x] Edición de cupones con diálogo
- [x] Filtros y búsqueda
- [x] Mensajes de éxito/error

### ✅ UX/UI
- [x] Diseño responsivo
- [x] PrimeNG components
- [x] Tailwind CSS utilities
- [x] Tonos profesionales
- [x] Accesibilidad básica

### ✅ Documentación
- [x] API Documentation v2
- [x] README completo
- [x] Ejemplos prácticos
- [x] Guía de setup

---

## 🚀 Próximas Mejoras

- [ ] Autenticación con JWT
- [ ] Base de datos MongoDB
- [ ] Almacenamiento en AWS S3
- [ ] Notificaciones por email
- [ ] Rating de negocios
- [ ] Búsqueda avanzada con filtros
- [ ] Dark mode
- [ ] PWA (Progressive Web App)
- [ ] Tests unitarios
- [ ] Tests e2e

---

## 📄 Licencia

MIT License - Libre para usar y modificar

---

## 👨‍💼 Autor

**Fullstack Senior Developer + UX/UI Designer**

Proyecto desarrollado con las mejores prácticas de:
- Arquitectura limpia
- SOLID principles
- Design patterns
- UX/UI moderno
- Código documentado

---

## 📞 Soporte

Para problemas:

1. Verifica que Node.js 20+ esté instalado
2. Confirma que npm install completó sin errores
3. Revisa los logs en terminal
4. Consulta API_DOCUMENTATION_v2.md
5. Verifica permisos de carpetas

---

**Última actualización:** 14 de Junio de 2026  
**Versión:** 2.0  
**Estado:** ✅ Production Ready
