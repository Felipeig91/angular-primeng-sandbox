# 🔌 API Documentation - Business Directory Backend

## Tabla de Contenidos

1. [Base URL](#base-url)
2. [Autenticación](#autenticación)
3. [Response Format](#response-format)
4. [Endpoints](#endpoints)
5. [Modelos de Datos](#modelos-de-datos)
6. [Ejemplos Prácticos](#ejemplos-prácticos)
7. [Códigos de Estado](#códigos-de-estado)

---

## Base URL

```
http://localhost:3001/api
```

### Health Check

```
GET http://localhost:3001/health
```

Response:
```json
{
  "status": "API running",
  "timestamp": "2026-06-02T10:30:00Z"
}
```

---

## Autenticación

**Status:** No implementada en v1.0

Todas las rutas son públicas. En futuras versiones se implementará JWT.

---

## Response Format

### Respuesta Exitosa

```json
{
  "success": true,
  "message": "Descripción de la operación",
  "data": {
    // Datos de la respuesta
  }
}
```

### Respuesta de Error

```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos (solo en desarrollo)"
}
```

---

## Endpoints

### 🏢 NEGOCIOS (BUSINESSES)

#### GET `/api/businesses`

Obtiene lista de todos los negocios registrados.

**Query Parameters:**
- Ninguno actualmente

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocios obtenidos exitosamente",
  "data": [
    {
      "id": "1234567890",
      "name": "Café Central",
      "category": "Gastronomía",
      "description": "Café de especialidad...",
      "image": "/uploads/business-1.jpg",
      "contact": "info@cafe.com",
      "phone": "+1 234 567 8900",
      "address": "Calle Principal 123",
      "views": 142,
      "clicks": 38,
      "coupons": [...],
      "createdAt": "2026-05-15T10:30:00Z",
      "updatedAt": "2026-06-02T15:45:00Z"
    }
  ]
}
```

---

#### POST `/api/businesses`

Crea un nuevo negocio.

**Request Body:**
```json
{
  "name": "Café Central",
  "category": "Gastronomía",
  "description": "Café de especialidad con pastelería artesanal",
  "contact": "info@cafe.com",
  "phone": "+1 234 567 8900",
  "address": "Calle Principal 123",
  "coupons": [
    {
      "title": "20% descuento primera compra",
      "discount": "20%",
      "code": "BIENVENIDA20",
      "stock": 50
    }
  ]
}
```

**Validaciones:**
- `name`: Requerido, mín 3 caracteres
- `category`: Requerido, uno de: "Gastronomía", "Soporte Técnico", "Moda", "Salud", "Educación"
- `description`: Requerido, mín 10 caracteres
- `contact`: Opcional
- `phone`: Opcional
- `address`: Opcional
- `coupons`: Opcional, array de cupones

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Negocio creado exitosamente",
  "data": {
    "id": "1717336400000",
    "name": "Café Central",
    "category": "Gastronomía",
    "description": "Café de especialidad con pastelería artesanal",
    "image": "/uploads/default-business.jpg",
    "contact": "info@cafe.com",
    "phone": "+1 234 567 8900",
    "address": "Calle Principal 123",
    "views": 0,
    "clicks": 0,
    "coupons": [
      {
        "id": "1717336400001",
        "title": "20% descuento primera compra",
        "discount": "20%",
        "code": "BIENVENIDA20",
        "stock": 50,
        "createdAt": "2026-06-02T10:30:00Z"
      }
    ],
    "createdAt": "2026-06-02T10:30:00Z",
    "updatedAt": "2026-06-02T10:30:00Z"
  }
}
```

---

#### GET `/api/businesses/:id`

Obtiene un negocio específico. **Incrementa vistas automáticamente.**

**URL Parameters:**
- `id`: ID del negocio (string)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocio obtenido exitosamente",
  "data": {
    "id": "1234567890",
    "name": "Café Central",
    "category": "Gastronomía",
    "description": "...",
    "image": "/uploads/business-1.jpg",
    "contact": "info@cafe.com",
    "phone": "+1 234 567 8900",
    "address": "Calle Principal 123",
    "views": 143,  // Incrementado
    "clicks": 38,
    "coupons": [...],
    "createdAt": "2026-05-15T10:30:00Z",
    "updatedAt": "2026-06-02T15:45:00Z"
  }
}
```

**Errores Posibles:**
- `404 Not Found`: Negocio no existe

---

#### PUT `/api/businesses/:id`

Actualiza un negocio existente.

**URL Parameters:**
- `id`: ID del negocio

**Request Body:** (Todos los campos son opcionales)
```json
{
  "name": "Café Central Plus",
  "category": "Gastronomía",
  "description": "Actualizado con nuevo menú",
  "contact": "nuevoemail@cafe.com",
  "phone": "+1 555 1234",
  "address": "Avenida Nueva 456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocio actualizado exitosamente",
  "data": { /* Negocio actualizado */ }
}
```

---

#### DELETE `/api/businesses/:id`

Elimina un negocio y todos sus cupones.

**URL Parameters:**
- `id`: ID del negocio

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocio eliminado exitosamente"
}
```

**Errores Posibles:**
- `404 Not Found`: Negocio no existe

---

### 🎟️ CUPONES (COUPONS)

#### POST `/api/coupons/:businessId`

Agrega un nuevo cupón a un negocio.

**URL Parameters:**
- `businessId`: ID del negocio

**Request Body:**
```json
{
  "title": "Muffin gratis",
  "discount": "100% Muffin",
  "code": "MUFFIN_FREE",
  "stock": 100
}
```

**Validaciones:**
- `title`: Requerido
- `discount`: Requerido
- `code`: Requerido, único por negocio
- `stock`: Requerido, mín 1

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Cupón agregado exitosamente",
  "data": {
    "id": "1717336400002",
    "title": "Muffin gratis",
    "discount": "100% Muffin",
    "code": "MUFFIN_FREE",
    "stock": 100,
    "createdAt": "2026-06-02T10:30:00Z"
  }
}
```

---

#### PUT `/api/coupons/:businessId/:couponId`

Actualiza un cupón existente.

**URL Parameters:**
- `businessId`: ID del negocio
- `couponId`: ID del cupón

**Request Body:**
```json
{
  "title": "Muffin 50% descuento",
  "discount": "50%",
  "code": "MUFFIN50",
  "stock": 75
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cupón actualizado exitosamente",
  "data": { /* Cupón actualizado */ }
}
```

---

#### DELETE `/api/coupons/:businessId/:couponId`

Elimina un cupón.

**URL Parameters:**
- `businessId`: ID del negocio
- `couponId`: ID del cupón

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cupón eliminado exitosamente"
}
```

---

#### POST `/api/coupons/:businessId/:couponId/claim`

Reclama un cupón (usuario lo usa).

**Features:**
- Reduce stock en 1
- Incrementa clicks del negocio
- Valida que haya stock disponible

**URL Parameters:**
- `businessId`: ID del negocio
- `couponId`: ID del cupón

**Request Body:**
```json
{}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cupón reclamado exitosamente",
  "data": {
    "id": "1717336400002",
    "title": "Muffin gratis",
    "discount": "100% Muffin",
    "code": "MUFFIN_FREE",
    "stock": 99,  // Decrementado
    "createdAt": "2026-06-02T10:30:00Z"
  }
}
```

**Errores Posibles:**
- `400 Bad Request`: Sin stock disponible
- `404 Not Found`: Cupón no existe

---

### 📊 ESTADÍSTICAS (STATS)

#### GET `/api/stats`

Obtiene estadísticas agregadas de la plataforma.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estadísticas obtenidas exitosamente",
  "data": {
    "totalBusinesses": 3,
    "totalCoupons": 8,
    "totalViews": 547,
    "totalClicks": 145,
    "byCategory": {
      "Gastronomía": 1,
      "Soporte Técnico": 1,
      "Moda": 1
    }
  }
}
```

---

## Modelos de Datos

### Business

```typescript
interface Business {
  id: string;                    // UUID o timestamp
  name: string;                  // Nombre del negocio
  category: CategoryType;        // Categoría
  description: string;           // Descripción larga
  image: string;                 // URL de imagen
  contact?: string;              // Email de contacto
  phone?: string;                // Teléfono
  address?: string;              // Dirección física
  views: number;                 // Contador de visualizaciones
  clicks: number;                // Contador de cupones reclamados
  coupons: Coupon[];            // Array de cupones
  createdAt: string;            // ISO 8601 timestamp
  updatedAt: string;            // ISO 8601 timestamp
}

type CategoryType = 
  | "Gastronomía"
  | "Soporte Técnico"
  | "Moda"
  | "Salud"
  | "Educación";
```

### Coupon

```typescript
interface Coupon {
  id: string;                   // UUID o timestamp
  title: string;                // Título del cupón
  discount: string;             // Texto de descuento (ej: "20%")
  code: string;                 // Código para canjear
  stock: number;                // Cantidad disponible
  createdAt: string;            // ISO 8601 timestamp
}
```

### ApiResponse\<T>

```typescript
interface ApiResponse<T> {
  success: boolean;             // true si éxito, false si error
  message: string;              // Mensaje descriptivo
  data?: T;                      // Datos de respuesta (opcional)
  error?: string;               // Detalles de error (solo desarrollo)
}
```

---

## Ejemplos Prácticos

### 1. Flujo Completo de Registro

```bash
# PASO 1: Crear negocio con cupones
curl -X POST http://localhost:3001/api/businesses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizzería Luigi",
    "category": "Gastronomía",
    "description": "Auténtica pizzería italiana con horno a leña",
    "contact": "luigi@pizzeria.com",
    "phone": "+1 555 0100",
    "address": "Calle Italia 789",
    "coupons": [
      {
        "title": "Compra una pizza grande lleva 2 cervezas gratis",
        "discount": "2 Cervezas Gratis",
        "code": "PIZZA_BEER",
        "stock": 100
      },
      {
        "title": "15% de descuento en toda la tienda",
        "discount": "15%",
        "code": "LUIGI15",
        "stock": 50
      }
    ]
  }'
```

### 2. Usuario Reclama Cupón

```bash
# PASO 1: Ver detalles del negocio (incrementa vistas)
curl http://localhost:3001/api/businesses/1717336400000

# PASO 2: Reclamar cupón (reduce stock e incrementa clicks)
curl -X POST http://localhost:3001/api/coupons/1717336400000/1717336400001/claim \
  -H "Content-Type: application/json"
```

### 3. Admin Actualiza Cupón

```bash
curl -X PUT http://localhost:3001/api/coupons/1717336400000/1717336400001 \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 75,
    "code": "PIZZALUIGI",
    "discount": "25%"
  }'
```

### 4. Admin Elimina Negocio

```bash
curl -X DELETE http://localhost:3001/api/businesses/1717336400000
```

---

## Códigos de Estado

| Código | Significado | Ejemplo |
|--------|------------|---------|
| 200 | OK | GET exitoso, actualización exitosa |
| 201 | Created | POST exitoso, recurso creado |
| 400 | Bad Request | Validación fallida, parámetros inválidos |
| 404 | Not Found | Recurso no existe |
| 500 | Server Error | Error interno del servidor |

---

## Rate Limiting

No implementado en v1.0. Próximas versiones.

---

## CORS

Configurado para aceptar todas las fuentes (*)

```typescript
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

---

## Versionado

**Versión actual:** 1.0.0

Futuras versiones usarán prefijo `/api/v2/`

---

**Última actualización:** 2026-06-02  
**Desarrollado con:** Express.js, TypeScript, Node.js
