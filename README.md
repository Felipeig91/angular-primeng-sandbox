# 🏪 Avisolocal.cl - v2.0.0

**Diario Mural Digital para Puerto Montt**

Plataforma comunitaria **100% gratuita sin fines de lucro** que centraliza servicios locales, conecta vecinos con negocios de confianza y brinda vitrina a emprendimientos locales. Construida con arquitectura escalable, componentes reutilizables y estado reactivo.

---

## 🎯 Características Principales

✅ **Directorio Centralizado** - Catálogo completo de negocios locales con filtrado por categoría  
✅ **Vitrina para Pymes** - Registro gratuito sin límites ni publicidad invasiva  
✅ **Red Comunitaria** - Conecta vecinos con servicios de confianza y comprobada calidad  
✅ **Cupones y Ofertas** - Descuentos auténticos del comercio local para ahorrar juntos  
✅ **Panel Administrativo** - Dashboard para gestionar negocios y ofertas  
✅ **Autenticación Segura** - Login con localStorage y OAuth (stubs para expansión futura)  
✅ **Diseño Responsivo** - Mobile-first pensado para la comunidad  
✅ **Componentes Modernos** - PrimeNG v21 con tema Aura para interfaz profesional

---

## 🚀 Stack Tecnológico

| Tecnología          | Versión | Propósito                    |
| ------------------- | ------- | ---------------------------- |
| **Angular**         | 21.2.11 | Framework principal          |
| **PrimeNG**         | 21.1.7  | Componentes UI profesionales |
| **Tailwind CSS**    | 4.3.0   | Estilos utility-first        |
| **TypeScript**      | 5.9     | Tipado estricto              |
| **RxJS**            | 7.8     | Programación reactiva        |
| **Angular Signals** | 21+     | Estado reactivo moderno      |

---

## 📋 Requisitos

- **Node.js** 20+
- **npm** 10.9.7+
- **Git**

---

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/Felipeig91/angular-primeng-sandbox.git
cd angular-primeng-sandbox/mi-nuevo-proyecto

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Navega a `http://localhost:4200/` en tu navegador.

---

## 🏗️ Arquitectura v2.0.0

### Estructura de Carpetas

```
src/app/
├── core/                    # Servicios centralizados, modelos, guards
│   ├── models/
│   │   ├── business.model.ts       # Interfaz Business (negocios, categorías, cupones)
│   │   └── user.model.ts           # Interfaz User (autenticación, OAuth)
│   ├── services/
│   │   ├── business.service.ts     # CRUD de negocios, estado con Signals
│   │   └── auth.service.ts         # Autenticación, login/logout, sesión
│   └── guards/
│       └── admin.guard.ts          # Protección de rutas admin (CanActivate)
│
├── shared/                  # Componentes reutilizables
│   └── components/
│       ├── navbar-public.component.ts    # Navegación principal
│       └── footer.component.ts           # Pie de página
│
├── layout/                  # Contenedores de layout
│   ├── public-layout.component.ts        # Layout para rutas públicas
│   └── admin-layout.component.ts         # Layout admin estilo Sakai
│
├── features/                # Componentes específicos por dominio
│   ├── public/
│   │   ├── inicio/                       # Hero section principal
│   │   ├── quienes-somos/               # About page
│   │   ├── servicios/                   # Catálogo de servicios
│   │   ├── cupones/                     # Ofertas disponibles
│   │   ├── contacto/                    # Formulario de contacto
│   │   ├── directorio/                  # Catálogo de negocios
│   │   └── registro/                    # Formulario de registro (4 pasos)
│   └── admin/
│       ├── login/                       # Panel de autenticación admin
│       └── dashboard/                   # Dashboard con analíticas
│
├── app.ts                   # Componente raíz
├── app.routes.ts            # Configuración de rutas (lazy loading)
└── app.config.ts            # Configuración global (providers, tema)
```

### Patrón de Arquitectura

**Feature-Based Modular Architecture**

- Organización por dominio (public/admin)
- Separación clara de responsabilidades
- Escalable para agregar nuevas features
- Lazy loading automático de componentes

---

## 🛣️ Rutas Disponibles

### Público (sin autenticación)

```
/                  → Redirect a /inicio
/inicio            → Hero section con CTAs
/directorio        → Catálogo de negocios (filtrable)
/quienes-somos     → Información de empresa
/servicios         → Servicios ofrecidos
/cupones           → Ofertas de negocios
/contacto          → Formulario de contacto
/registrar         → Registro de nuevo negocio (multi-paso)
```

### Admin (protegido con AdminGuard)

```
/admin/login       → Panel de autenticación
/admin/dashboard   → Dashboard con analíticas (protegido)
```

---

## 🔐 Autenticación

### Credenciales Demo

```
Email: admin@avisolocal.cl
Contraseña: demo123
```

### Flujo de Autenticación

1. Usuario accede a `/admin/login`
2. Ingresa credenciales
3. `AuthService` valida y guarda token en `localStorage`
4. `AdminGuard` verifica autenticación en rutas protegidas
5. Si no autenticado → Redirige a `/admin/login`

### Características de Seguridad

- ✅ Token persistente en `localStorage`
- ✅ Validación en guards de rutas
- ✅ Cierre de sesión limpia
- ✅ OAuth stubs listos para Google/GitHub

---

## 📊 Modelos de Datos

### Business (Negocio)

```typescript
interface Business {
  id: string;
  name: string; // "Café Central"
  category: BusinessCategory; // "Gastronomía", "Moda", etc
  description: string;
  image?: string; // URL o base64
  responsible: {
    fullName: string;
    email: string;
    phone: string;
  };
  location: {
    address: string;
    city: string;
    region: string;
  };
  schedule: {
    openTime: string; // "09:00"
    closeTime: string; // "18:00"
    daysOpen: Set<DayOfWeek>;
  };
  views: number; // Contador de visualizaciones
  clicks: number; // Clics en cupones
  coupons: Coupon[];
  createdAt: Date;
  updatedAt: Date;
}
```

### User (Usuario/Admin)

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 Diseño Visual

### Colores Corporativos

- **Verde Bosque** `#059669` (emerald-600) - Primario, botones principales
- **Ámbar** `#D97706` (amber-600) - CTAs, destacados
- **Stone** (stone-50, stone-900) - Neutros, backgrounds, texto

### Componentes UI

- Navbar sticky con logo + navegación + CTA
- Cards responsivas con sombras suaves
- Formularios validados con PrimeNG
- Tablas con paginación
- Charts (barras, pie) con datos reactivos
- Toasts para notificaciones

---

## ⚙️ Servicios Clave

### BusinessService

```typescript
// Obtener lista de negocios (con Signals)
businesses$: Signal<Business[]>

// Crear nuevo negocio
createBusiness(formData: BusinessFormData): Observable<Business>

// Obtener estadísticas
getStatistics(): {
  totalViews: number;
  totalClicks: number;
  activeServices: number;
  businessesByCategory: Map<string, number>;
}

// Interacciones de usuario
incrementViews(businessId: string): void
claimCoupon(businessId: string, couponId: string): Observable<void>
```

### AuthService

```typescript
// Estado de usuario actual (Signal)
currentUser$: Signal<User | null>

// Autenticación
login(credentials: AdminLoginCredentials): Observable<{ user: User; token: string }>
logout(): void

// Verificación
isAuthenticated(): boolean
checkStoredSession(): void

// OAuth (stubs preparados)
loginWithGoogle(): void
loginWithGitHub(): void
```

---

## 📈 Dashboard Administrativo

El panel admin incluye:

- **Tarjetas de Métricas**
  - Total de visualizaciones
  - Cupones reclamados
  - Servicios activos

- **Gráficos**
  - Barras: Cupones por comercio
  - Pie: Distribución por categoría

- **Tabla de Desempeño**
  - Negocio, categoría, visitas, cupones
  - Paginación (10 filas)
  - Orden alfabético

---

## 🎯 Formulario de Registro (4 Pasos)

### Paso 1: Responsable

- Nombre completo (min 3 caracteres)
- Teléfono (máscara +56 9 XXXX XXXX)
- Email (formato válido)

### Paso 2: Información del Servicio

- Nombre del negocio
- Categoría (select: 6 opciones)
- Descripción (min 20 caracteres)
- Imagen (opcional, max 5MB)

### Paso 3: Ubicación

- Dirección
- Ciudad
- Región (Los Lagos, Los Ríos, Aysén)

### Paso 4: Horario

- Hora apertura/cierre (time inputs)
- Días de operación (checkboxes)
- Aceptar términos (required)

---

## 🧠 State Management con Signals

```typescript
// Definir estado reactivo
private businessesState = signal<Business[]>([]);
public businesses = this.businessesState.asReadonly();

// Leer estado
const count = this.businesses().length;

// Actualizar estado
this.businessesState.update(v => [...v, newBusiness]);

// Computado (reactivo)
businessCount = computed(() => this.businesses().length);
```

---

## 🚀 Scripts Disponibles

```bash
npm start          # Iniciar servidor dev (puerto 4200)
npm run build      # Build para producción
npm run watch      # Watch mode
npm test           # Ejecutar tests
```

---

## 🔄 Próximas Fases (Roadmap)

- [ ] Integración OAuth real (Google/GitHub)
- [ ] Backend REST API completo
- [ ] Base de datos (MySQL/PostgreSQL)
- [ ] Persistencia de negocios y cupones
- [ ] Panel de cupones avanzado
- [ ] Búsqueda y filtrado inteligente
- [ ] Perfiles de usuario y negocios
- [ ] Sistema de valoraciones y comentarios
- [ ] Notificaciones por email (sin costo)
- [ ] Integración con redes locales
- [ ] Tests unitarios e integración
- [ ] Deployment a producción
- [ ] Análisis de impacto comunitario

---

## 📚 Documentación Técnica

- [Angular 21 Docs](https://angular.io)
- [PrimeNG Components](https://primeng.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Angular Signals](https://angular.io/guide/signals)
- [TypeScript 5.9](https://www.typescriptlang.org)

---

## 📄 Historial de Versiones

### v2.0.0 (Actual)

- ✅ Arquitectura empresarial modular
- ✅ Formulario multi-paso con Signals
- ✅ Panel admin protegido
- ✅ Dashboard con charts
- ✅ 7 páginas públicas completas
- ✅ Autenticación con localStorage
- ✅ Colores corporativos implementados

### v1.0.0

- Base inicial con PrimeNG y Tailwind

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama `feature/nueva-funcionalidad`
3. Commit los cambios `git commit -m 'feat: descripción'`
4. Push a la rama `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

MIT - Libre para uso educativo y comercial.

---

## 👤 Autor

**Felipe Pinuer** - [@Felipeig91](https://github.com/Felipeig91)

---

## 📞 Soporte

Para preguntas o issues, abre un [GitHub Issue](https://github.com/Felipeig91/angular-primeng-sandbox/issues)

---

**🎉 Avisolocal.cl v2.0.0 - Conectando comercios locales con clientes**
