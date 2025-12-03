# 🚀 Emplifi - Sistema de Gestión de Recursos Humanos

Plataforma moderna de gestión de recursos humanos diseñada para optimizar la administración del talento en pequeñas empresas.

## 📋 Descripción

**Emplifi** es un sistema integral de RRHH que permite gestionar empleados, asistencia, nómina, evaluaciones y reportes desde un solo lugar. A diferencia de soluciones empresariales complejas, Emplifi se enfoca en pequeños negocios con una interfaz simple, funcional y accesible.

### Características principales

- 👥 Gestión de empleados y contratos
- ⏰ Control de asistencia y horarios
- 💰 Gestión de nómina automatizada
- 📊 Evaluación de desempeño
- 📈 Reportes e indicadores
- 🔔 Notificaciones y recordatorios
- 🤖 Asistente inteligente de gestión (AIG)

## 🛠️ Stack Tecnológico

### Backend

- **Node.js** con **Express** (v5.1.0)
- **PostgreSQL** como base de datos
- **Prisma ORM** (v7.0.0)
- **ES Modules** habilitado
- Seguridad: **Helmet**, **CORS**
- Desarrollo: **Nodemon**, **dotenv**

### Frontend

- **React** 19.2.0
- **Vite** como build tool
- **TailwindCSS** para estilos
- **ESLint** para calidad de código

### Arquitectura

- **3 capas** (Presentación, Lógica de Negocio, Acceso a Datos)
- Estructura modular y escalable

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v20.x o superior ([Descargar](https://nodejs.org/))
- **PostgreSQL** v14 o superior ([Descargar](https://www.postgresql.org/download/))
- **Git** ([Descargar](https://git-scm.com/))
- **npm** (incluido con Node.js)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd recursos_humanos
```

### 2. Configurar la Base de Datos

Crea una base de datos en PostgreSQL:

```sql
CREATE DATABASE db_recursos_humanos;
```

### 3. Configurar el Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env (copia del ejemplo)
copy .env.example .env
```

Edita el archivo `.env` con tus credenciales de PostgreSQL:

```env
PORT=4000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/db_recursos_humanos?schema=public
```

> **Nota importante para Prisma 7**: Si tu PostgreSQL no tiene contraseña, usa:
>
> ```
> DATABASE_URL=postgresql://postgres@localhost:5432/db_recursos_humanos?schema=public
> ```

Genera el cliente de Prisma:

```bash
npx prisma generate
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

El backend estará corriendo en `http://localhost:4000`

### 4. Configurar el Frontend

Abre una nueva terminal:

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
recursos_humanos/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Esquema de base de datos
│   ├── src/
│   │   ├── controllers/           # Controladores (Capa de Presentación)
│   │   ├── services/              # Lógica de negocio
│   │   ├── repositories/          # Acceso a datos
│   │   ├── routes/                # Definición de rutas
│   │   ├── middleware/            # Middlewares personalizados
│   │   ├── database/              # Configuración de DB
│   │   ├── app.js                 # Configuración de Express
│   │   └── server.js              # Punto de entrada
│   ├── prisma.config.ts           # Configuración de Prisma 7
│   ├── .env                       # Variables de entorno (no versionado)
│   ├── .env.example               # Ejemplo de variables de entorno
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/            # Componentes reutilizables
│   │   ├── pages/                 # Vistas/páginas
│   │   ├── services/              # Llamadas a API
│   │   ├── hooks/                 # Custom hooks
│   │   ├── context/               # Estado global
│   │   ├── utils/                 # Utilidades
│   │   └── assets/                # Recursos estáticos
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🔧 Scripts Disponibles

### Backend

```bash
npm run dev              # Inicia servidor con nodemon
npm run prisma:dev       # Ejecuta migraciones de Prisma
npm run prisma:studio    # Abre Prisma Studio (GUI para DB)
```

### Frontend

```bash
npm run dev              # Inicia servidor de desarrollo
npm run build            # Genera build de producción
npm run preview          # Preview del build de producción
npm run lint             # Ejecuta ESLint
```

## ⚙️ Configuración de Prisma 7

Este proyecto usa **Prisma 7**, que tiene una configuración diferente a versiones anteriores:

1. **No usar `url` en `schema.prisma`**: La URL de conexión se configura en `prisma.config.ts`
2. **Archivo `prisma.config.ts`**: Contiene la configuración de la base de datos
3. **Generar cliente**: Siempre ejecutar `npx prisma generate` después de cambios en el schema

## 🔐 Seguridad

### Encriptación de Salarios

Los salarios se encriptan automáticamente en la base de datos usando **AES-256-GCM**:

- Salt único de 64 bytes por cada valor
- IV único de 16 bytes por encriptación
- Auth Tag de 16 bytes para validar integridad
- PBKDF2 con 100,000 iteraciones para derivación de claves
- Se desencriptan automáticamente en la API

Para usar: simplemente envía `salary` como número en las requests y se encriptará automáticamente.

### Configuración HTTP

- **Helmet**: Headers de seguridad (CSP, HSTS, X-Frame-Options, etc.)
- **CORS**: Whitelist de orígenes permitidos
- **Validación**: En 3 niveles (Controller, Service, Repository)
- **ENCRYPTION_KEY**: Variable de entorno requerida (64 caracteres hex)

### ENCRYPTION_KEY

Genera una clave segura:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Colócala en `.env`:

```
ENCRYPTION_KEY=<64-caracteres-hexadecimales>
```

### Documentación de Seguridad

- `backend/ENCRYPTION_SETUP.md` - Guía completa de encriptación
- `backend/ARQUITECTURA.md` - Diagramas de arquitectura
- `VERIFICACION_FINAL.md` - Reporte de verificación

## 🧪 Verificación

Para verificar que la implementación de seguridad funciona correctamente:

```bash
cd backend
node validate-implementation.js
```

Este script ejecuta 11 tests automatizados verificando:

- ✓ Encriptación y desencriptación
- ✓ Salt y IV únicos
- ✓ Componentes de encriptación
- ✓ Algoritmo AES-256-GCM
- ✓ PBKDF2 key derivation
- ✓ Archivos de implementación

## 🐛 Solución de Problemas

### Error: "Cannot find module"

Asegúrate de haber ejecutado `npm install` en ambas carpetas (backend y frontend).

### Error de conexión a PostgreSQL

- Verifica que PostgreSQL esté corriendo
- Confirma que las credenciales en `.env` sean correctas
- Verifica que la base de datos `db_recursos_humanos` exista

### Prisma generate falla

- Verifica que `DATABASE_URL` esté correctamente configurado en `.env`
- Para Prisma 7, asegúrate de que `prisma.config.ts` exista
- Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas

### Puerto ya en uso

Si el puerto 4000 o 5173 ya está en uso, puedes cambiarlos:

- Backend: Modifica `PORT` en `.env`
- Frontend: Modifica el puerto en `vite.config.js`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Autores

Desarrollado como parte del sistema de gestión empresarial para pequeños negocios.

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la documentación de las tecnologías utilizadas:

- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
