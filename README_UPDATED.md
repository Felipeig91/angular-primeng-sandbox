# 🏪 Business Directory - Plataforma de Negocios Locales

> **Fullstack Angular + Express.js | Professional Dashboard | Coupons Management**

[![Angular](https://img.shields.io/badge/Angular-21-red?logo=angular)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.0-black?logo=express)](https://expressjs.com)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-21-6C63FF)](https://primeng.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)](https://tailwindcss.com)

## ✨ Características Principales

### 🎯 Para Usuarios
- ✅ **Registro de Negocio** con Stepper multi-paso
- ✅ **Gestión de Cupones** promocionales
- ✅ **Directorio** completo de negocios
- ✅ **Filtros** por categoría
- ✅ **Reclamación de cupones** con validación de stock

### 👨‍💼 Para Administradores
- ✅ **Dashboard Pro** con gráficos reales (Chart.js)
- ✅ **Tabla CRUD** de negocios
- ✅ **Tabla CRUD** de cupones
- ✅ **Estadísticas** en tiempo real
- ✅ **KPI Metrics** animados
- ✅ **Analytics** visuales

### 🏗️ Arquitectura
- ✅ **Frontend:** Angular 21 con Signals reactivos
- ✅ **Backend:** Express.js API RESTful
- ✅ **Storage:** JSON local (extensible a BD)
- ✅ **UI/UX:** PrimeNG + Tailwind CSS
- ✅ **TypeScript:** Strict mode habilitado

---

## 🚀 Quick Start

### 1. Clonar/Descargar

```bash
cd angular-primeng-sandbox
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar Proyecto

#### Opción A: Frontend + Backend (Recomendado) ⭐

```bash
npm run dev
```

Este comando ejecuta simultáneamente:
- **Frontend:** http://localhost:4200
- **Backend:** http://localhost:3001

#### Opción B: Solo Frontend

```bash
npm start
```

#### Opción C: Solo Backend

```bash
npm run server
```

---

## 📋 Uso del Aplicativo

### Para Registrar un Negocio

1. Ir a: http://localhost:4200/registrar
2. Completar 3 pasos:
   - **Paso 1:** Información Básica (Nombre, Categoría, Descripción)
   - **Paso 2:** Información de Contacto (Email, Teléfono, Dirección)
   - **Paso 3:** Cupones (Opcional - agregar promociones)
3. Presionar "Registrar Negocio"
4. ✅ Listo! Aparecerá en el directorio

### Para Ver Dashboard Admin

1. Ir a: http://localhost:4200/admin/dashboard
2. **Overview Tab:** Ver KPIs y gráficos
3. **Negocios Tab:** Gestionar negocio CRUD
4. **Cupones Tab:** Gestionar cupones CRUD

### Para Ver Directorio

1. Ir a: http://localhost:4200/directorio
2. Ver negocios registrados
3. Filtrar por categoría
4. Reclamar cupones

---

## 📚 Documentación

- **[Documentación Completa](./DOCUMENTATION.md)** - Guía de arquitectura, setup, funcionalidades
- **[API Reference](./API_DOCUMENTATION.md)** - Endpoints, modelos, ejemplos

---

## 🔌 API Backend

### Base URL
```
http://localhost:3001/api
```

### Endpoints Principales

```bash
# NEGOCIOS
GET    /api/businesses              # Listar todos
POST   /api/businesses              # Crear nuevo
GET    /api/businesses/:id          # Obtener uno
PUT    /api/businesses/:id          # Actualizar
DELETE /api/businesses/:id          # Eliminar

# CUPONES
POST   /api/coupons/:id             # Agregar cupón
DELETE /api/coupons/:id/:couponId   # Eliminar cupón
POST   /api/coupons/:id/:couponId/claim  # Reclamar

# ESTADÍSTICAS
GET    /api/stats                   # Obtener stats
```

Ver **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** para ejemplos completos.

---

## 📁 Estructura del Proyecto

```
angular-primeng-sandbox/
├── server/                    # Backend Express
│   ├── api.ts                # Servidor principal
│   ├── data-storage.ts       # CRUD + Persistencia
│   ├── routes/
│   │   ├── businesses.ts     # Endpoints negocios
│   │   ├── coupons.ts        # Endpoints cupones
│   │   └── stats.ts          # Estadísticas
│   └── data/
│       └── businesses.json   # Almacenamiento
│
├── src/app/
│   ├── features/
│   │   ├── public/
│   │   │   ├── registro/     # Registro Stepper
│   │   │   └── directorio/   # Directorio negocios
│   │   └── admin/
│   │       └── dashboard/    # Dashboard Pro
│   ├── core/
│   │   └── services/
│   │       └── api.service.ts    # HTTP API
│   └── ...otros componentes
│
└── Archivos de configuración
    ├── package.json
    ├── tsconfig.json
    ├── angular.json
    └── tailwind.config.js
```

---

## 🛠️ Scripts Disponibles

```bash
npm start              # Frontend (localhost:4200)
npm run server         # Backend API (localhost:3001)
npm run server:dev     # Backend con watch mode
npm run dev            # Frontend + Backend (concurrently)
npm run build          # Producción build
npm test               # Ejecutar tests
npm run watch          # Build con watch
```

---

## 📊 Stack Tecnológico

### Frontend
- **Angular 21** - Framework principal
- **TypeScript 5.9** - Lenguaje tipado
- **PrimeNG 21** - Componentes UI premium
- **Tailwind CSS 4** - Utility-first CSS
- **Chart.js** - Gráficos profesionales
- **RxJS 7.8** - Programación reactiva

### Backend
- **Express.js 5** - Framework web
- **Node.js 18+** - Runtime
- **TypeScript** - Tipado
- **JSON Storage** - Persistencia (v1.0)

### DevTools
- **Angular CLI 21**
- **ts-node** - TypeScript execution
- **concurrently** - Ejecución paralela
- **Prettier** - Code formatter

---

## ✅ Validaciones Implementadas

### Registro de Negocio
- ✅ Nombre: Mínimo 3 caracteres
- ✅ Categoría: Selección requerida
- ✅ Descripción: Mínimo 10 caracteres
- ✅ Email: Formato válido
- ✅ Stock cupones: Mínimo 1

### Operaciones CRUD
- ✅ Validación de campos requeridos
- ✅ Verificación de existencia de recursos
- ✅ Manejo de errores
- ✅ Mensajes de confirmación

---

## 🎨 Diseño & UX

### Componentes Visuales
- **Stepper** para flujo de registro
- **Cards** con información de negocios
- **Tables** con sorting y paginación
- **Charts** con datos reales
- **Tabs** para organización de contenido
- **Dialogs** para operaciones modales
- **Toasts** para notificaciones

### Paleta de Colores
- 🔵 Indigo (Primario)
- 🟡 Amber (Secundario)
- 🟢 Green (Éxito)
- 🔴 Red (Peligro)
- 🩶 Slate (Neutro)

### Responsivo
- ✅ Mobile first
- ✅ Tablet optimizado
- ✅ Desktop completo

---

## 📱 Funcionalidades Destacadas

### Stepper de Registro (3 Pasos)

**Paso 1: Información Básica**
- Nombre del negocio
- Categoría (select)
- Descripción larga

**Paso 2: Contacto**
- Email requerido
- Teléfono (opcional)
- Dirección (opcional)

**Paso 3: Cupones (Opcional)**
- Toggle para habilitar cupones
- Agregar múltiples cupones
- Vista previa
- Validación de datos

### Dashboard Admin (3 Tabs)

**Overview**
- 4 KPIs con iconos
- Gráfico de barras
- Gráfico pie
- Estadísticas reales

**Negocios**
- Tabla con paginación
- Botones de acción (Ver/Editar/Eliminar)
- Filtrado por categoría
- Búsqueda global

**Cupones**
- Tabla filtrable por negocio
- Color coding por stock
- Acciones CRUD
- Información agregada

---

## 🔄 Flujo de Datos

```
Usuario Registra Negocio
    ↓
Frontend Stepper (Validación)
    ↓
ApiService.createBusiness()
    ↓
Backend POST /api/businesses
    ↓
data-storage.ts (CRUD)
    ↓
businesses.json (Guardado)
    ↓
Response al Frontend
    ↓
Redireccionar a Directorio
    ↓
BusinessService actualiza estado
    ↓
Directorio se actualiza (Signal)
```

---

## 🚨 Troubleshooting

### "Cannot connect to API"
```bash
# Verificar que backend está corriendo
npm run server

# Verificar puerto 3001 está disponible
lsof -i :3001
```

### "Module not found"
```bash
npm install
npm install @primeuix/themes@latest
```

### "TypeScript errors"
```bash
npm run build  # Ver errores de compilación
```

### "Port already in use"
```bash
# Cambiar puerto en src/main.ts (frontend)
# Cambiar puerto en server/api.ts (backend)
```

---

## 🔮 Roadmap Futuro

### v1.1.0
- [ ] Autenticación con JWT
- [ ] Upload de imágenes (Multer)
- [ ] Búsqueda avanzada
- [ ] Rating/Reviews

### v2.0.0
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Mapa interactivo
- [ ] PWA (Progressive Web App)

### v3.0.0
- [ ] Notificaciones push
- [ ] Panel de analíticas avanzadas
- [ ] Sistema de pagos
- [ ] Mobile app nativa

---

## 📞 Contacto & Soporte

Para dudas o reportar issues:
- Revisar [DOCUMENTATION.md](./DOCUMENTATION.md)
- Revisar [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Contactar al equipo de desarrollo

---

## 📄 Licencia

Este proyecto es de propósito educativo y profesional.

---

## 👨‍💻 Autor

Desarrollado como Fullstack Developer + UI/UX Designer

**Skills Aplicados:**
- Architecture & Design Patterns
- Full-stack Development
- Database Design
- UI/UX Design
- API REST Design
- Performance Optimization

---

## 🙏 Agradecimientos

Basado en:
- Angular 21 Framework
- PrimeNG Component Library
- Express.js Web Framework
- Chart.js Visualizations
- Tailwind CSS Utilities

---

**Versión:** 1.0.0  
**Estado:** ✅ Production Ready  
**Última Actualización:** 2026-06-02  

---

## 📈 Próximos Pasos

1. Ejecutar: `npm run dev`
2. Abrir: http://localhost:4200
3. Registrar negocio en `/registrar`
4. Ver dashboard en `/admin/dashboard`
5. Explorar directorio en `/directorio`

¡Listo para usar! 🎉
