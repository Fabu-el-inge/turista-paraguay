# 🚀 Guía de Configuración de Supabase

## Sistema de Inventario Turista Paraguay con Base de Datos en la Nube

Esta guía te ayudará a configurar Supabase para que tu sistema de inventario sincronice datos entre todos tus dispositivos.

---

## 📋 Paso 1: Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"Sign Up"**
3. Puedes registrarte con:
   - GitHub (recomendado)
   - Email
   - Google
4. Confirma tu email si es necesario

---

## 📦 Paso 2: Crear un nuevo proyecto

1. Una vez dentro, haz clic en **"New Project"**
2. Completa los datos:
   - **Name**: `turista-paraguay-inventario` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (¡guárdala!)
   - **Region**: Selecciona `South America (São Paulo)` (más cercano a Paraguay)
   - **Plan**: Selecciona **"Free"** (gratis)
3. Haz clic en **"Create new project"**
4. Espera 2-3 minutos mientras Supabase crea tu base de datos

---

## 🗄️ Paso 3: Crear las tablas en la base de datos

1. En el menú lateral, haz clic en **"SQL Editor"**
2. Haz clic en **"New query"**
3. Abre el archivo `supabase-schema.sql` que está en tu proyecto
4. Copia TODO el contenido del archivo
5. Pégalo en el editor SQL de Supabase
6. Haz clic en **"Run"** (botón verde abajo a la derecha)
7. Deberías ver el mensaje: **"Success. No rows returned"**

Esto habrá creado 3 tablas:
- ✅ `products` (productos)
- ✅ `clients` (clientes)
- ✅ `sales` (ventas)

---

## 🔑 Paso 4: Obtener las credenciales

1. En el menú lateral, haz clic en **"Project Settings"** (ícono de engranaje)
2. Haz clic en **"API"** en el submenu
3. Encontrarás dos valores importantes:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
**Cópialo** (botón de copiar al lado)

### anon public (Key)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```
**Cópialo** (botón de copiar al lado)

---

## ⚙️ Paso 5: Configurar las credenciales en tu proyecto

1. Abre el archivo **`supabase-config.js`** en tu proyecto
2. Busca las líneas 6 y 7:

```javascript
const SUPABASE_URL = 'TU_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY_AQUI';
```

3. Reemplaza con tus credenciales:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co'; // Tu URL aquí
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Tu Key aquí
```

4. **Guarda el archivo**

---

## 🔄 Paso 6: Migrar tus datos existentes (opcional)

Si ya tenías datos en localStorage:

1. Abre tu sistema en el navegador
2. Ve al **Dashboard** (primera sección)
3. Haz clic en el botón **"🔄 Migrar Datos desde localStorage"**
4. Confirma la migración
5. Espera unos segundos
6. ¡Listo! Tus datos ahora están en la nube

---

## ✅ Paso 7: Verificar que todo funciona

1. Recarga la página (F5)
2. Deberías ver tus datos cargados
3. Intenta agregar un nuevo producto
4. Abre Supabase → **"Table Editor"** → **"products"**
5. Deberías ver el producto que acabas de agregar

### 🎉 ¡Listo! Tu sistema ahora sincroniza en la nube

---

## 🌐 Probar sincronización entre dispositivos

1. Abre tu sistema en otro dispositivo (celular, tablet, otra computadora)
2. Deberías ver los mismos datos
3. Agrega un producto desde un dispositivo
4. Recarga en el otro dispositivo
5. ¡Deberías ver el nuevo producto!

---

## 📊 Ver tus datos en Supabase

En cualquier momento puedes ver/editar tus datos directamente en Supabase:

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Haz clic en **"Table Editor"**
4. Selecciona la tabla que quieres ver:
   - **products** → Ver/editar productos
   - **clients** → Ver/editar clientes
   - **sales** → Ver historial de ventas

---

## 🔒 Seguridad

### ¿Es seguro mostrar las credenciales?

- El **SUPABASE_ANON_KEY** es **público por diseño**
- Solo permite las operaciones que configuraste en las políticas de seguridad (RLS)
- Tus datos están protegidos por las políticas que creamos en el SQL
- Para más seguridad, podrías agregar autenticación de usuarios

### Recomendaciones:

✅ Haz backup periódico usando el Table Editor de Supabase
✅ No compartas tu **Database Password** con nadie
✅ El anon key puede ser público (está en tu código frontend)

---

## 🆘 Solución de Problemas

### Error: "Failed to fetch"
- ✅ Verifica que copiaste bien la URL (sin espacios)
- ✅ Verifica que copiaste bien el anon key completo
- ✅ Verifica tu conexión a internet

### Error: "relation products does not exist"
- ✅ Ejecuta el archivo `supabase-schema.sql` en SQL Editor
- ✅ Verifica que las tablas se crearon en Table Editor

### Los datos no aparecen
- ✅ Recarga la página (F5)
- ✅ Abre la consola del navegador (F12) y busca errores
- ✅ Verifica que las credenciales estén correctas

### No puedo agregar productos
- ✅ Verifica en la consola del navegador (F12) si hay errores
- ✅ Verifica que las políticas RLS estén habilitadas (se habilitan automáticamente con el SQL)

---

## 💰 Límites del Plan Gratuito

El plan gratuito de Supabase incluye:

✅ **500 MB de base de datos** (suficiente para miles de productos)
✅ **1 GB de ancho de banda** por mes
✅ **50 MB de almacenamiento de archivos**
✅ **50,000 usuarios activos mensuales**
✅ **2 GB de transferencia de datos**

Para un negocio pequeño/mediano, esto es **MÁS QUE SUFICIENTE** y totalmente **GRATIS**.

---

## 📞 Soporte

Si tienes problemas:

1. Revisa esta guía paso a paso
2. Verifica los errores en la consola del navegador (F12)
3. Consulta la documentación oficial: [https://supabase.com/docs](https://supabase.com/docs)

---

## 🎓 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de SQL de Supabase](https://supabase.com/docs/guides/database)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Desarrollado para Turista Paraguay** 🇵🇾
Versión: 3.0 con Supabase
Última actualización: Noviembre 2025
