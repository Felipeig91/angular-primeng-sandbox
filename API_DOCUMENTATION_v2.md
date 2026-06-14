# 📚 API Documentation - Business Directory v2.0

**API URL:** `http://localhost:3001/api`  
**Versión:** 2.0  
**Última actualización:** Junio 2026  

## 📋 Tabla de Contenidos

1. [Inicio Rápido](#inicio-rápido)
2. [Autenticación](#autenticación)
3. [Formato de Respuestas](#formato-de-respuestas)
4. [Endpoints - Negocios](#endpoints---negocios)
5. [Endpoints - Cupones](#endpoints---cupones)
6. [Endpoints - Estadísticas](#endpoints---estadísticas)
7. [Manejo de Imágenes](#manejo-de-imágenes)
8. [Códigos de Estado HTTP](#códigos-de-estado-http)
9. [Errores Comunes](#errores-comunes)
10. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Inicio Rápido

### Health Check

Verificar que la API está corriendo:

```bash
curl http://localhost:3001/health
```

Respuesta:
```json
{
  "status": "API running",
  "timestamp": "2026-06-14T10:30:00Z"
}
```

---

## Autenticación

**Status:** No implementada en v2.0

Todas las rutas son públicas. En futuras versiones se implementará JWT con roles.

---

## Formato de Respuestas

### ✅ Respuesta Exitosa

```json
{
  "success": true,
  "message": "Descripción clara de la operación",
  "data": {
    // Datos de la respuesta
  }
}
```

### ❌ Respuesta de Error

```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos"
}
```

---

## Endpoints - Negocios

### GET `/api/businesses`

Obtiene lista de todos los negocios registrados.

**Descripción:** Obtiene todos los negocios guardados en la plataforma con sus datos completos.

**Parámetros:** Ninguno

**Ejemplo:**
```bash
curl -X GET http://localhost:3001/api/businesses
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocios obtenidos exitosamente",
  "data": [
    {
      "id": "1717336400000",
      "name": "Café Central",
      "category": "Gastronomía",
      "description": "Café de especialidad con pastelería artesanal",
      "image": "/uploads/cafe-1717336400000-123456.jpg",
      "contact": "info@cafe.com",
      "phone": "+1 234 567 8900",
      "address": "Calle Principal 123",
      "views": 142,
      "clicks": 38,
      "coupons": [
        {
          "id": "c1",
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
  ]
}
```

---

### POST `/api/businesses`

Crea un nuevo negocio con imagen opcional.

**Content-Type:** `multipart/form-data`

**Parámetros Form:**
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| name | string | Sí | Nombre del negocio (mín 3 caracteres) |
| category | string | Sí | Una de: Gastronomía, Soporte Técnico, Moda, Salud, Educación |
| description | string | Sí | Descripción detallada (mín 10 caracteres) |
| contact | string | No | Email de contacto |
| phone | string | No | Teléfono de contacto |
| address | string | No | Dirección física |
| image | file | No | Archivo de imagen (JPG, PNG, GIF, WebP, máx 5MB) |
| coupons | string (JSON) | No | Array JSON de cupones iniciales |

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3001/api/businesses \
  -F "name=Café Central" \
  -F "category=Gastronomía" \
  -F "description=Café de especialidad con pastelería artesanal" \
  -F "contact=info@cafe.com" \
  -F "phone=+1 234 567 8900" \
  -F "address=Calle Principal 123" \
  -F "image=@/path/to/image.jpg" \
  -F 'coupons=[{"title":"20% desc","discount":"20%","code":"BIEN20","stock":50}]'
```

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
    "image": "/uploads/image-1717336400000-123456.jpg",
    "contact": "info@cafe.com",
    "phone": "+1 234 567 8900",
    "address": "Calle Principal 123",
    "views": 0,
    "clicks": 0,
    "coupons": [
      {
        "id": "c1",
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

### GET `/api/businesses/:id`

Obtiene un negocio específico por ID. **Incrementa vistas automáticamente.**

**URL Parameters:**
- `id`: ID del negocio (string)

**Ejemplo:**
```bash
curl -X GET http://localhost:3001/api/businesses/1717336400000
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocio obtenido exitosamente",
  "data": {
    "id": "1717336400000",
    "name": "Café Central",
    "category": "Gastronomía",
    "description": "...",
    "image": "/uploads/cafe-1717336400000-123456.jpg",
    "contact": "info@cafe.com",
    "phone": "+1 234 567 8900",
    "address": "Calle Principal 123",
    "views": 143,
    "clicks": 38,
    "coupons": [...],
    "createdAt": "2026-06-02T10:30:00Z",
    "updatedAt": "2026-06-02T10:30:00Z"
  }
}
```

---

### PUT `/api/businesses/:id`

Actualiza un negocio existente (permite cambiar imagen).

**Content-Type:** `multipart/form-data`

**URL Parameters:**
- `id`: ID del negocio

**Parámetros Form:**
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| name | string | No | Nuevo nombre |
| category | string | No | Nueva categoría |
| description | string | No | Nueva descripción |
| contact | string | No | Nuevo email |
| phone | string | No | Nuevo teléfono |
| address | string | No | Nueva dirección |
| image | file | No | Nueva imagen |

**Ejemplo:**
```bash
curl -X PUT http://localhost:3001/api/businesses/1717336400000 \
  -F "name=Café Central Premium" \
  -F "image=@/path/to/new-image.jpg"
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocio actualizado exitosamente",
  "data": { ... }
}
```

---

### DELETE `/api/businesses/:id`

Elimina un negocio y todos sus cupones.

**URL Parameters:**
- `id`: ID del negocio

**Ejemplo:**
```bash
curl -X DELETE http://localhost:3001/api/businesses/1717336400000
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Negocio eliminado exitosamente"
}
```

---

## Endpoints - Cupones

### POST `/api/coupons/:businessId`

Agrega un nuevo cupón a un negocio.

**URL Parameters:**
- `businessId`: ID del negocio

**Request Body:**
```json
{
  "title": "20% en tu primer compra",
  "discount": "20%",
  "code": "PROMO20",
  "stock": 50
}
```

**Ejemplo:**
```bash
curl -X POST http://localhost:3001/api/coupons/1717336400000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "20% en tu primer compra",
    "discount": "20%",
    "code": "PROMO20",
    "stock": 50
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Cupón agregado exitosamente",
  "data": {
    "id": "c1234567",
    "title": "20% en tu primer compra",
    "discount": "20%",
    "code": "PROMO20",
    "stock": 50,
    "createdAt": "2026-06-02T10:30:00Z"
  }
}
```

---

### PUT `/api/coupons/:businessId/:couponId`

Actualiza un cupón existente.

**URL Parameters:**
- `businessId`: ID del negocio
- `couponId`: ID del cupón

**Request Body:**
```json
{
  "title": "Nuevo título",
  "discount": "25%",
  "stock": 30
}
```

**Ejemplo:**
```bash
curl -X PUT http://localhost:3001/api/coupons/1717336400000/c1234567 \
  -H "Content-Type: application/json" \
  -d '{
    "discount": "25%",
    "stock": 30
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cupón actualizado exitosamente",
  "data": { ... }
}
```

---

### DELETE `/api/coupons/:businessId/:couponId`

Elimina un cupón.

**URL Parameters:**
- `businessId`: ID del negocio
- `couponId`: ID del cupón

**Ejemplo:**
```bash
curl -X DELETE http://localhost:3001/api/coupons/1717336400000/c1234567
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cupón eliminado exitosamente"
}
```

---

### POST `/api/coupons/:businessId/:couponId/claim`

Reclama un cupón (reduce stock, incrementa clicks).

**URL Parameters:**
- `businessId`: ID del negocio
- `couponId`: ID del cupón

**Ejemplo:**
```bash
curl -X POST http://localhost:3001/api/coupons/1717336400000/c1234567/claim
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cupón reclamado exitosamente",
  "data": {
    "id": "c1234567",
    "stock": 49,
    "claimed": true
  }
}
```

---

## Endpoints - Estadísticas

### GET `/api/stats`

Obtiene estadísticas generales de la plataforma.

**Ejemplo:**
```bash
curl -X GET http://localhost:3001/api/stats
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estadísticas obtenidas",
  "data": {
    "totalBusinesses": 15,
    "totalCoupons": 48,
    "totalViews": 1250,
    "totalClicks": 340,
    "byCategory": {
      "Gastronomía": 5,
      "Soporte Técnico": 3,
      "Moda": 4,
      "Salud": 2,
      "Educación": 1
    }
  }
}
```

---

## Manejo de Imágenes

### 📸 Características

- **Formatos permitidos:** JPG, PNG, GIF, WebP
- **Tamaño máximo:** 5MB
- **Almacenamiento:** `/uploads/` (local)
- **Acceso:** `http://localhost:3001/uploads/{filename}`
- **Nombres:** Generados automáticamente con timestamp

### ⚠️ Limitaciones

- No se permite CORS desde orígenes desconocidos
- Las imágenes se almacenan localmente (considerar CDN en producción)
- Limpiar `/uploads/` periódicamente en desarrollo

---

## Códigos de Estado HTTP

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Operación exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Parámetros inválidos o incompletos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Server Error | Error del servidor |

---

## Errores Comunes

### Falta de campos requeridos

**Error:**
```json
{
  "success": false,
  "message": "Faltan campos requeridos: name, category, description"
}
```

**Solución:** Asegúrate de incluir todos los campos obligatorios.

---

### Archivo de imagen no permitido

**Error:**
```json
{
  "success": false,
  "message": "Tipo de archivo no permitido: application/pdf"
}
```

**Solución:** Solo se aceptan imágenes (JPG, PNG, GIF, WebP).

---

### Archivo muy grande

**Error:**
```json
{
  "success": false,
  "message": "Archivo demasiado grande"
}
```

**Solución:** El archivo debe ser menor a 5MB.

---

### Negocio no encontrado

**Error:**
```json
{
  "success": false,
  "message": "Negocio no encontrado"
}
```

**Solución:** Verifica que el ID del negocio sea correcto.

---

## Ejemplos Prácticos

### 1️⃣ Crear un negocio con imagen y cupones

```bash
curl -X POST http://localhost:3001/api/businesses \
  -F "name=Pizzería Italia" \
  -F "category=Gastronomía" \
  -F "description=Pizzería tradicional italiana con ingredientes importados" \
  -F "contact=info@pizzeria.com" \
  -F "phone=+1 555 123 4567" \
  -F "address=Via Roma 123" \
  -F "image=@./pizzeria-banner.jpg" \
  -F 'coupons=[{"title":"Pizza gratis en segunda compra","discount":"1 pizza gratis","code":"PIZZA2X","stock":100}]'
```

### 2️⃣ Obtener todos los negocios

```bash
curl -X GET http://localhost:3001/api/businesses | jq '.'
```

### 3️⃣ Agregar cupón a negocio existente

```bash
curl -X POST http://localhost:3001/api/coupons/1717336400000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Envío gratis",
    "discount": "Gratis",
    "code": "ENVIOGRATIS",
    "stock": 200
  }'
```

### 4️⃣ Editar cupón

```bash
curl -X PUT http://localhost:3001/api/coupons/1717336400000/c123/edit \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 50,
    "discount": "30%"
  }'
```

### 5️⃣ Ver estadísticas

```bash
curl -X GET http://localhost:3001/api/stats | jq '.data'
```

---

## 🚀 Deploy en Producción

Para producción se recomienda:

1. Usar una base de datos real (MongoDB, PostgreSQL)
2. Implementar autenticación JWT
3. Usar un servicio de almacenamiento de imágenes (AWS S3, Cloudinary)
4. Configurar CORS apropiadamente
5. Implementar rate limiting
6. Usar HTTPS

---

**Última actualización:** 14 de Junio de 2026  
**Versión:** 2.0  
**Mantenedor:** Fullstack Senior Developer
