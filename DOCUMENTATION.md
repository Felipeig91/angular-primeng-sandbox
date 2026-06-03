# 📋 Business Directory - Documentación Completa

## 📖 Índice

1. [Introducción](#introducción)
2. [Arquitectura](#arquitectura)
3. [Instalación y Setup](#instalación-y-setup)
4. [API Backend](#api-backend)
5. [Frontend Angular](#frontend-angular)
6. [Funcionalidades](#funcionalidades)
7. [Guía de Uso](#guía-de-uso)
8. [Estructura del Proyecto](#estructura-del-proyecto)

---

## 🎯 Introducción

**Business Directory** es una plataforma completa para registrar, gestionar y promocionar negocios locales con sistema integrado de cupones promocionales.

### Features Principales

✅ **Registro de Negocios** con Stepper multi-paso
✅ **Gestión de Cupones** promocionales
✅ **Dashboard Admin Pro** con gráficos y tablas CRUD
✅ **API RESTful Local** con almacenamiento en JSON
✅ **Diseño Profesional** con PrimeNG + Tailwind CSS
✅ **Angular 21** con Signals reactivos
✅ **TypeScript Strict Mode**

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│               FRONTEND (Angular 21)                     │
│  ┌──────────────┬─────────────┬──────────────┐         │
│  │  Registro    │  Directorio │  Dashboard   │         │
│  │  (Stepper)   │  (DataView) │  (Admin Pro) │         │
│  └──────────────┴─────────────┴──────────────┘         │
│                        ↓                                 │
│            ┌──────────────────────┐                     │
│            │   ApiService HTTP    │                     │
│            └──────────────────────┘                     │
└─────────────────────────────────────────────────────────┘
                        ↓ (HTTP)
┌─────────────────────────────────────────────────────────┐
│           BACKEND (Express.js - Node.js)               │
│  ┌──────────────┬──────────────┬──────────────┐        │
│  │  /businesses │  /coupons    │  /stats      │        │
│  │  (CRUD)      │  (CRUD+Claim)│  (Analytics) │        │
│  └──────────────┴──────────────┴──────────────┘        │
│                        ↓                                │
│            ┌──────────────────────┐                    │
│            │  JSON Storage        │                    │
│            │  (server/data/)      │                    │
│            └──────────────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Instalación y Setup

### Prerequisites

- Node.js 18+
- npm 10+
- Angular CLI 21

### Instalación

```bash
# 1. Clonar/Descargar el proyecto
cd angular-primeng-sandbox

# 2. Instalar dependencias
npm install

# 3. IMPORTANTE: Actualizar package.json (ya incluido)
# Verifica que tengas:
# - "server": "ts-node server/api.ts"
# - "dev": "concurrently \"npm run server\" \"npm start\""
```

### Ejecutar el Proyecto

#### Opción 1: Frontend + Backend (Recomendado)

```bash
npm run dev

# Esto ejecuta:
# - Frontend: http://localhost:4200
# - Backend API: http://localhost:3001
```

#### Opción 2: Solo Frontend

```bash
npm start
# Frontend: http://localhost:4200
```

#### Opción 3: Solo Backend

```bash
npm run server
# API: http://localhost:3001
# Health check: http://localhost:3001/health
```

---

## 🔌 API Backend

### URL Base

```
http://localhost:3001/api
```

### Autenticación

No implementada en esta versión (próximo sprint).

### Endpoints

#### 🏢 NEGOCIOS

```
GET    /api/businesses              # Obtener todos
POST   /api/businesses              # Crear nuevo
GET    /api/businesses/:id          # Obtener uno (incrementa vistas)
PUT    /api/businesses/:id          # Actualizar
DELETE /api/businesses/:id          # Eliminar
```

##### Crear Negocio
```json
POST /api/businesses
{
  "name": "Café Central",
  "category": "Gastronomía",
  "description": "Café especializado...",
  "contact": "info@cafe.com",
  "phone": "+1 234 567 8900",
  "address": "Calle Principal 123",
  "coupons": [
    {
      "title": "20% descuento",
      "discount": "20%",
      "code": "CAFE20",
      "stock": 50
    }
  ]
}
```

#### 🎟️ CUPONES

```
POST   /api/coupons/:businessId                    # Agregar cupón
PUT    /api/coupons/:businessId/:couponId          # Actualizar cupón
DELETE /api/coupons/:businessId/:couponId          # Eliminar cupón
POST   /api/coupons/:businessId/:couponId/claim    # Reclamar cupón
```

##### Agregar Cupón
```json
POST /api/coupons/123
{
  "title": "Descuento especial",
  "discount": "15%",
  "code": "SPECIAL15",
  "stock": 25
}
```

#### 📊 ESTADÍSTICAS

```
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalBusinesses": 3,
    "totalCoupons": 5,
    "totalViews": 500,
    "totalClicks": 120,
    "byCategory": {
      "Gastronomía": 1,
      "Soporte Técnico": 1,
      "Moda": 1
    }
  }
}
```

### Almacenamiento de Datos

Los datos se guardan en JSON:
```
server/data/businesses.json
```

**Estructura de datos:**
```typescript
interface Business {
  id: string;
  name: string;
  category: 'Gastronomía' | 'Soporte Técnico' | 'Moda' | 'Salud' | 'Educación';
  description: string;
  image: string;
  contact?: string;
  phone?: string;
  address?: string;
  views: number;
  clicks: number;
  coupons: Coupon[];
  createdAt: string;
  updatedAt: string;
}

interface Coupon {
  id: string;
  title: string;
  discount: string;
  code: string;
  stock: number;
  createdAt: string;
}
```

---

## 🎨 Frontend Angular

### Componentes Principales

#### 1. **Registro de Negocio** (`/registrar`)
- **Ruta:** `src/app/features/public/registro/business-register.component.ts`
- **Features:**
  - Stepper con 3 pasos
  - Paso 1: Información Básica
  - Paso 2: Información de Contacto
  - Paso 3: Gestión de Cupones (Opcional)
  - Validación reactiva
  - Integración con API

**Captura de pantalla mental:**
```
┌─────────────────────────────────┐
│  Paso 1: Información Básica     │
│  ✓ Nombre del Negocio           │
│  ✓ Categoría                    │
│  ✓ Descripción                  │
│  [Anterior] [Siguiente]         │
└─────────────────────────────────┘
```

#### 2. **Directorio de Negocios** (`/directorio`)
- **Ruta:** `src/app/features/public/directorio/business-directory.component.ts`
- **Features:**
  - Listado de negocios
  - Filtro por categoría
  - Vista de cupones
  - Búsqueda
  - Reclamación de cupones

#### 3. **Dashboard Admin** (`/admin/dashboard`)
- **Ruta:** `src/app/features/admin/dashboard/business-dashboard.component.ts`
- **Features:**
  - 3 Tabs: Overview | Negocios | Cupones
  - KPI Metrics con animaciones
  - Gráficos: Barras + Pie (Chart.js)
  - Tabla de Negocios (CRUD)
  - Tabla de Cupones filtrable
  - Acciones: Ver | Editar | Eliminar

### Servicios

#### ApiService
- **Ruta:** `src/app/core/services/api.service.ts`
- **Responsabilidad:** Comunicación HTTP con backend
- **Métodos:**
  - `getAllBusinesses()`
  - `getBusinessById(id)`
  - `createBusiness(data)`
  - `updateBusiness(id, data)`
  - `deleteBusiness(id)`
  - `addCoupon(businessId, coupon)`
  - `updateCoupon(businessId, couponId, data)`
  - `deleteCoupon(businessId, couponId)`
  - `claimCoupon(businessId, couponId)`
  - `getStats()`

#### BusinessService
- **Ruta:** `src/app/business.service.ts`
- **Responsabilidad:** Gestión de estado de negocios
- **State Management:** Angular Signals (Reactivo)

---

## ✨ Funcionalidades

### 1. Registro de Negocio

**Flujo:**
1. Usuario ingresa a `/registrar`
2. Completa 3 pasos del formulario
3. Opcionalmente agrega cupones
4. Envía datos a la API
5. Se guarda en JSON
6. Redirecciona a directorio

**Validaciones:**
- Nombre: mín 3 caracteres
- Categoría: requerida
- Descripción: mín 10 caracteres
- Email: formato válido
- Stock cupones: mín 1

### 2. Gestión de Cupones

**Desde Registro:**
- Agregar cupones al registrar negocio
- Especificar cantidad disponible
- Preview antes de registrar

**Desde Dashboard Admin:**
- Editar stock de cupones
- Eliminar cupones
- Ver historial de reclamaciones

### 3. Reclamación de Cupones

**En Directorio:**
- Usuario ve cupones disponibles
- Reclama un cupón
- Se reduce el stock automáticamente
- Se incrementan clicks del negocio

### 4. Analytics Dashboard

**Overview:**
- Total de negocios registrados
- Total de cupones activos
- Total de visualizaciones
- Total de cupones reclamados

**Gráficos:**
- Negocios por categoría (Barras)
- Distribución por categoría (Pie)

**Tablas:**
- Gestión CRUD de negocios
- Gestión CRUD de cupones

---

## 📚 Guía de Uso

### Para Usuarios

#### Registrar un Negocio

1. Ir a `http://localhost:4200/registrar`
2. Completar Paso 1: Información Básica
   - Ingresar nombre del negocio
   - Seleccionar categoría
   - Escribir descripción
3. Completar Paso 2: Información de Contacto
   - Email requerido
   - Teléfono (opcional)
   - Dirección (opcional)
4. Completar Paso 3: Cupones (Opcional)
   - Activar toggle "¿Deseas agregar cupones?"
   - Agregar uno o más cupones:
     - Título: "20% descuento"
     - Descuento: "20%"
     - Código: "PROMO20"
     - Stock: 50
5. Presionar "Registrar Negocio"
6. Esperar confirmación

#### Ver Directorio

1. Ir a `http://localhost:4200/directorio`
2. Ver listado de negocios
3. Filtrar por categoría
4. Reclamar cupones

### Para Administradores

#### Acceder al Dashboard

1. Ir a `http://localhost:4200/admin/login`
   - (Login básico - configurar como necesites)
2. Ir a `http://localhost:4200/admin/dashboard`

#### Gestionar Negocios

**Tab: Negocios**
- Ver lista de negocios
- Botones de acción:
  - 👁️ Ver: Mostrar detalles
  - ✏️ Editar: Modificar información
  - 🗑️ Eliminar: Remover negocio

#### Gestionar Cupones

**Tab: Cupones**
- Filtrar por negocio
- Ver código de cupón
- Ver stock disponible
- Color coding:
  - 🟢 Verde: Stock > 5
  - 🟡 Amarillo: Stock 1-5
  - 🔴 Rojo: Sin stock
- Acciones:
  - ✏️ Editar cupón
  - 🗑️ Eliminar cupón

#### Ver Estadísticas

**Tab: Overview**
- KPIs en tarjetas
- Gráfico de barras (Negocios/Categoría)
- Gráfico pie (Distribución)

---

## 📁 Estructura del Proyecto

```
angular-primeng-sandbox/
├── server/                          # Backend Express
│   ├── api.ts                      # Servidor principal
│   ├── types.ts                    # Tipos TypeScript
│   ├── data-storage.ts             # CRUD + Persistencia
│   ├── routes/
│   │   ├── businesses.ts           # GET/POST/PUT/DELETE negocios
│   │   ├── coupons.ts              # Cupones CRUD
│   │   └── stats.ts                # Estadísticas
│   ├── middleware/
│   │   ├── cors.ts                 # CORS middleware
│   │   └── error-handler.ts        # Manejo de errores
│   └── data/
│       └── businesses.json         # Almacenamiento de datos
│
├── src/
│   ├── app/
│   │   ├── app.routes.ts           # Rutas principales
│   │   ├── app.config.ts           # Configuración Angular
│   │   ├── business.model.ts       # Modelos
│   │   ├── business.service.ts     # Servicio negocios
│   │   │
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts  # HTTP API
│   │   │   │   └── auth.service.ts # Autenticación
│   │   │   ├── guards/
│   │   │   │   └── admin.guard.ts  # Guard rutas admin
│   │   │   └── models/
│   │   │       └── business.model.ts
│   │   │
│   │   ├── features/
│   │   │   ├── public/
│   │   │   │   ├── registro/
│   │   │   │   │   └── business-register.component.ts
│   │   │   │   ├── directorio/
│   │   │   │   │   └── business-directory.component.ts
│   │   │   │   └── ... (otras pages)
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── dashboard/
│   │   │       │   └── business-dashboard.component.ts
│   │   │       └── login/
│   │   │           └── admin-login.component.ts
│   │   │
│   │   ├── layout/
│   │   │   ├── public-layout.component.ts
│   │   │   └── admin-layout.component.ts
│   │   │
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── navbar.component.ts
│   │   │       └── footer.component.ts
│   │   │
│   │   ├── prime-imports.ts        # PrimeNG exports
│   │   └── app.css
│   │
│   ├── main.ts
│   ├── styles.css
│   └── index.html
│
├── package.json                    # Scripts + Dependencias
├── tsconfig.json                   # Config TypeScript
├── angular.json                    # Config Angular
├── postcss.config.mjs              # Tailwind CSS
└── README.md                       # Este archivo
```

---

## 🔧 Configuración Técnica

### Dependencias Principales

```json
{
  "dependencies": {
    "@angular/core": "^21.0.0",
    "@angular/common": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/router": "^21.0.0",
    "primeng": "^21.0.0",
    "@primeuix/themes": "^2.0.3",
    "tailwindcss": "^4.0.0",
    "chart.js": "^4.5.1",
    "express": "^5.0.0",
    "rxjs": "~7.8.0"
  },
  "devDependencies": {
    "@angular/cli": "^21.0.0",
    "typescript": "^5.9.3",
    "ts-node": "^10.9.2",
    "concurrently": "^8.2.2"
  }
}
```

### Scripts Disponibles

```bash
npm start              # Frontend dev (port 4200)
npm run server         # Backend API (port 3001)
npm run server:dev     # Backend con watch
npm run dev            # Frontend + Backend concurrently
npm run build          # Build producción
npm run test           # Tests unitarios
```

---

## 🎓 Ejemplos de API

### Crear Negocio con Cupones

```bash
curl -X POST http://localhost:3001/api/businesses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizza Express",
    "category": "Gastronomía",
    "description": "Pizzería con horno a leña",
    "contact": "info@pizzaexpress.com",
    "phone": "+1 555 0123",
    "address": "Avenida Principal 456",
    "coupons": [
      {
        "title": "Compra 1 lleva 2",
        "discount": "COMPRA1LLEVA2",
        "code": "PIZZA2x1",
        "stock": 100
      }
    ]
  }'
```

### Reclamar Cupón

```bash
curl -X POST http://localhost:3001/api/coupons/123/abc/claim \
  -H "Content-Type: application/json"
```

### Obtener Estadísticas

```bash
curl http://localhost:3001/api/stats
```

---

## 🚨 Troubleshooting

### "Cannot find module '@primeuix/themes'"
```bash
npm install @primeuix/themes@latest
```

### "Error conectando a API"
- Verificar que backend está corriendo: `npm run server`
- Verificar puerto 3001 no esté en uso
- Revisar CORS en `server/middleware/cors.ts`

### "Formulario no se envía"
- Revisar validaciones en consola
- Asegurar HttpClientModule esté disponible
- Verificar `app.config.ts` tiene `provideHttpClient()`

### Errores de TypeScript
```bash
npm run build  # Compilar para ver errores
```

---

## 📋 Roadmap Futuro

- [ ] Autenticación con JWT
- [ ] Upload de imágenes (multer)
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Rating/Reviews de negocios
- [ ] Búsqueda avanzada
- [ ] Mapa interactivo
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Historial de cupones reclamados

---

## 📞 Soporte

Para reportar issues o sugerencias, contacta con el equipo de desarrollo.

---

**Versión:** 1.0.0  
**Última actualización:** 2026-06-02  
**Autor:** Fullstack Developer + UI/UX Designer
