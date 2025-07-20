# 🎯 Balanced Scorecard (BSC) Web System

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> Sistema web profesional para la gestión estratégica empresarial basado en la metodología del Balanced Scorecard (BSC). Permite crear, monitorear y evaluar indicadores clave de rendimiento (KPIs) organizados por perspectivas estratégicas.

---

## 📋 Tabla de Contenidos

- [🎯 Características Principales](#-características-principales)
- [🧩 Stack Tecnológico](#-stack-tecnológico)
- [🖼️ Capturas de Pantalla](#️-capturas-de-pantalla)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [⚙️ Instalación Detallada](#️-instalación-detallada)
- [🧪 Credenciales de Prueba](#-credenciales-de-prueba)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Configuración](#-configuración)
- [📖 Uso del Sistema](#-uso-del-sistema)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## 🎯 Características Principales

### 🔐 **Gestión de Usuarios y Seguridad**
- **Autenticación JWT**: Sistema seguro de login/logout con tokens
- **Control de Roles**: Tres niveles de acceso (Administrador, Usuario Estratégico, Usuario Operativo)
- **Gestión de Sesiones**: Manejo automático de expiración y renovación de tokens

### 📊 **Balanced Scorecard Completo**
- **BSCs Múltiples**: Creación ilimitada de scorecards por unidad de negocio
- **Definición Estratégica**: Configuración de misión, visión y objetivos estratégicos
- **Cuatro Perspectivas**: Financiera, Clientes, Procesos Internos, y Aprendizaje y Crecimiento

### 🎯 **Gestión de Objetivos y KPIs**
- **CRUD Completo**: Crear, editar, actualizar y eliminar objetivos
- **KPIs Configurables**: Definición de metas, unidades de medida y frecuencias
- **Seguimiento Temporal**: Registro histórico de valores con comentarios

### 📈 **Visualización y Análisis**
- **Dashboard Ejecutivo**: Resumen visual del desempeño organizacional
- **Gráficos Dinámicos**: Visualización de tendencias con ngx-charts
- **Sistema Semáforo**: Indicadores de estado por colores (verde, amarillo, rojo)
- **Reportes en Tiempo Real**: Actualización automática de métricas

### 👥 **Administración Avanzada**
- **Gestión de Usuarios**: Panel administrativo para control de accesos
- **Permisos Granulares**: Restricción de módulos según rol asignado
- **Auditoría**: Registro de cambios y seguimiento de actividades

---

## 🧩 Stack Tecnológico

### **Backend (API RESTful)**
```
🌐 Framework: Laravel 11
🗄️ Base de Datos: MySQL 8.0+
🔐 Autenticación: JWT (tymon/jwt-auth)
🔄 ORM: Eloquent
📦 Gestión: Composer
```

### **Frontend (SPA)**
```
⚡ Framework: Angular 17
🎨 Estilos: Tailwind CSS
📊 Gráficos: ngx-charts
🧭 Navegación: Angular Router
💾 Storage: LocalStorage (JWT)
📦 Gestión: npm/yarn
```

---

## 🖼️ Capturas de Pantalla

<div align="center">

### Dashboard Principal
<img width="800" alt="Dashboard Principal" src="https://github.com/user-attachments/assets/f76bde10-83fb-4e30-8012-c00a4a6b5fcd">

### Gestión de BSC
<img width="800" alt="Gestión de BSC" src="https://github.com/user-attachments/assets/a0670e5a-25f4-4ef0-9d6d-99d534c003c0">

### KPIs y Seguimiento
<img width="800" alt="KPIs y Seguimiento" src="https://github.com/user-attachments/assets/aabf078c-da63-485e-93f7-59fc15092a00">

### Visualización de Datos
<img width="800" alt="Visualización de Datos" src="https://github.com/user-attachments/assets/230d2744-91c4-4dcc-9ffc-988bf22b8ea7">

</div>

---

## 🚀 Inicio Rápido

### Prerrequisitos
- PHP 8.1+
- Node.js 18+
- MySQL 8.0+
- Composer
- npm/yarn

### Configuración Rápida
```bash
# Clonar repositorios
git clone https://github.com/tuusuario/bsc-backend.git
git clone https://github.com/tuusuario/bsc-frontend.git

# Backend
cd bsc-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed
php artisan serve

# Frontend (nueva terminal)
cd ../bsc-frontend
npm install
ng serve
```

🎉 **¡Listo!** Accede a `http://localhost:4200`

---

## ⚙️ Instalación Detallada

### 🖥️ Configuración del Backend

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/bsc-backend.git
cd bsc-backend
```

2. **Instalar dependencias**
```bash
composer install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Editar `.env` con tu configuración**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bsc_database
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

JWT_SECRET=tu_jwt_secret_key
```

5. **Generar claves**
```bash
php artisan key:generate
php artisan jwt:secret
```

6. **Ejecutar migraciones y seeders**
```bash
php artisan migrate --seed
```

7. **Iniciar servidor**
```bash
php artisan serve
```
> API disponible en: `http://localhost:8000`

### 🎨 Configuración del Frontend

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/bsc-frontend.git
cd bsc-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar environment**
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

4. **Iniciar aplicación**
```bash
ng serve
```
> Frontend disponible en: `http://localhost:4200`

---

## 🧪 Credenciales de Prueba

| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| 🔑 **Administrador** | `admin@empresa.com` | `admin123` | Acceso total |
| 👤 **Usuario Estratégico** | `estrategico@empresa.com` | `estrategico123` | BSC, KPIs, Dashboard |
| 👨‍🔧 **Usuario Operativo** | `operativo@empresa.com` | `operativo123` | Seguimiento, Consultas |

---

## 📂 Estructura del Proyecto

<details>
<summary><strong>🔧 Backend Structure</strong></summary>

```
bsc-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php
│   │   │       ├── BSCController.php
│   │   │       ├── DashboardController.php
│   │   │       ├── KPIController.php
│   │   │       ├── ObjectiveController.php
│   │   │       ├── PerspectiveController.php
│   │   │       ├── SeguimientoController.php
│   │   │       └── UserController.php
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── BSC.php
│   │   ├── Perspective.php
│   │   ├── Objective.php
│   │   ├── KPI.php
│   │   └── Seguimiento.php
│   └── Services/
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
└── config/
```
</details>

<details>
<summary><strong>🎨 Frontend Structure</strong></summary>

```
bsc-frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── services/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── services/
│   │   ├── dashboard/
│   │   ├── bsc/
│   │   │   ├── bsc-list/
│   │   │   ├── bsc-form/
│   │   │   └── bsc-detail/
│   │   ├── perspectives/
│   │   ├── objectives/
│   │   ├── kpis/
│   │   ├── seguimiento/
│   │   ├── admin/
│   │   └── shared/
│   │       ├── components/
│   │       ├── pipes/
│   │       └── services/
│   ├── assets/
│   └── environments/
```
</details>

---

## 🔧 Configuración

### Variables de Entorno Backend
```env
# Base de datos
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bsc_database
DB_USERNAME=root
DB_PASSWORD=

# JWT
JWT_SECRET=your-secret-key
JWT_TTL=60

# App
APP_NAME="BSC System"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
```

### Configuración Frontend
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-domain.com/api',
  appName: 'BSC System'
};
```

---

## 📖 Uso del Sistema

### 1. **Primer Acceso**
- Inicia sesión con credenciales de administrador
- Configura usuarios adicionales
- Define estructura organizacional

### 2. **Creación de BSC**
- Accede al módulo BSC
- Define misión y visión organizacional
- Configura las cuatro perspectivas

### 3. **Definición de Objetivos**
- Asocia objetivos a cada perspectiva
- Establece KPIs con metas específicas
- Define frecuencias de seguimiento

### 4. **Seguimiento Continuo**
- Registra valores periódicamente
- Analiza tendencias en dashboard
- Ajusta estrategias según resultados

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**[⬆ Volver arriba](#-balanced-scorecard-bsc-web-system)**

---

*Desarrollado con ❤️ para la gestión estratégica empresarial*

</div>



<img width="1417" height="765" alt="image" src="https://github.com/user-attachments/assets/f76bde10-83fb-4e30-8012-c00a4a6b5fcd" />
<img width="1417" height="761" alt="image" src="https://github.com/user-attachments/assets/a0670e5a-25f4-4ef0-9d6d-99d534c003c0" />
<img width="1422" height="761" alt="image" src="https://github.com/user-attachments/assets/aabf078c-da63-485e-93f7-59fc15092a00" />
<img width="1421" height="771" alt="image" src="https://github.com/user-attachments/assets/230d2744-91c4-4dcc-9ffc-988bf22b8ea7" />
