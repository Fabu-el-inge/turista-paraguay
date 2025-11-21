# 🔄 Módulo de Transformación/Producción - Instrucciones

## 📋 ¿Qué es este módulo?

El módulo de Transformación permite convertir **insumos** en **productos finales**, manteniendo un registro completo de todas las transformaciones y actualizando automáticamente los stocks.

### Ejemplo Práctico:
- **INSUMO**: Taza de sublimación blanca (Stock: 50)
- **PROCESO**: Agregas diseño a 10 tazas
- **PRODUCTO FINAL**: Taza con diseño Paraguay (Stock: aumenta en 10)
- **RESULTADO**: El sistema descuenta 10 del insumo y suma 10 al producto final automáticamente

---

## 🚀 Configuración Inicial

### Paso 1: Actualizar Base de Datos en Supabase

1. Abre tu proyecto en Supabase (https://supabase.com)
2. Ve a la sección **SQL Editor**
3. Abre el archivo `transformations-schema.sql`
4. Copia todo el contenido del archivo
5. Pégalo en el SQL Editor de Supabase
6. Presiona **RUN** o **F5**
7. Verifica que no haya errores

### Paso 2: Verificar las Tablas

Ejecuta estos comandos en Supabase para verificar:

```sql
-- Verificar que se agregó la columna 'type' a products
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'products' AND column_name = 'type';

-- Verificar que se creó la tabla transformations
SELECT * FROM information_schema.tables WHERE table_name = 'transformations';
```

---

## 📦 Cómo Usar el Módulo

### 1. Agregar Productos con su Tipo

Cuando agregues un producto, ahora verás un nuevo campo **"Tipo de Producto"**:

- **Producto Final**: Es el producto que vendes (ej: Taza con diseño)
- **Insumo**: Es la materia prima (ej: Taza blanca, Papel transfer, Tinta)

**Ejemplo:**
```
Código: TP-0001
Tipo: Insumo ← NUEVO CAMPO
Nombre: Taza sublimación blanca
Stock: 100 unidades
Precio: ₲ 15.000
```

```
Código: TP-0002
Tipo: Producto Final ← NUEVO CAMPO
Nombre: Taza con diseño Paraguay
Stock: 20 unidades
Precio: ₲ 35.000
```

### 2. Ir al Módulo de Producción

1. Abre el sistema
2. Haz clic en el botón **"🔄 Producción"** en la barra de navegación
3. Verás el formulario de transformación

### 3. Realizar una Transformación

**Pasos:**

1. **Selecciona el Insumo Origen**
   - Elige el insumo que vas a usar (ej: Taza blanca)
   - El sistema muestra el stock disponible

2. **Selecciona el Producto Destino**
   - Elige el producto final que vas a crear (ej: Taza con diseño)
   - El sistema muestra el stock actual

3. **Ingresa la Cantidad**
   - Escribe cuántas unidades vas a transformar
   - El sistema valida que tengas stock suficiente

4. **Vista Previa**
   - Aparece automáticamente mostrando:
     - Stock antes y después del insumo
     - Stock antes y después del producto

5. **Notas (Opcional)**
   - Puedes agregar notas como "Lote 123" o "Diseño especial"

6. **Ejecutar Transformación**
   - Haz clic en **"✅ Ejecutar Transformación"**
   - El sistema te pedirá confirmación
   - Los stocks se actualizan automáticamente

---

## 💡 Casos de Uso

### Caso 1: Tazas con Diseño
```
INSUMO: Taza blanca (Stock: 50)
↓ Transformas 10 tazas
PRODUCTO: Taza con diseño (Stock: 20 → 30)
RESULTADO:
- Taza blanca: 50 → 40
- Taza con diseño: 20 → 30
```

### Caso 2: Remeras Sublimadas
```
INSUMO: Remera blanca (Stock: 100)
↓ Transformas 25 remeras
PRODUCTO: Remera Paraguay (Stock: 15 → 40)
RESULTADO:
- Remera blanca: 100 → 75
- Remera Paraguay: 15 → 40
```

### Caso 3: Gorras Bordadas
```
INSUMO: Gorra lisa (Stock: 80)
↓ Transformas 15 gorras
PRODUCTO: Gorra Paraguay (Stock: 10 → 25)
RESULTADO:
- Gorra lisa: 80 → 65
- Gorra Paraguay: 10 → 25
```

---

## 📊 Historial de Transformaciones

El módulo mantiene un registro completo de todas las transformaciones:

- **Fecha y hora** de cada transformación
- **Producto origen** (insumo usado)
- **Producto destino** (producto creado)
- **Cantidad** transformada
- **Notas** adicionales

Este historial te permite:
- ✅ Ver cuántos productos has creado
- ✅ Rastrear el uso de insumos
- ✅ Auditar operaciones
- ✅ Analizar producción

---

## ⚠️ Validaciones de Seguridad

El sistema incluye validaciones automáticas:

1. **Stock Insuficiente**
   - No puedes transformar más de lo que tienes
   - Mensaje: "❌ Stock insuficiente de [producto]"

2. **Productos No Encontrados**
   - Valida que ambos productos existan
   - Mensaje: "❌ Error: Productos no encontrados"

3. **Confirmación**
   - Siempre pide confirmación antes de ejecutar
   - Muestra resumen de la operación

---

## 🔧 Actualizar Productos Existentes

Si ya tienes productos en el sistema:

1. Ve a **📦 Productos**
2. Haz clic en **✏️ Editar** en cada producto
3. Selecciona el **Tipo** correcto:
   - **Producto Final** para productos que vendes
   - **Insumo** para materias primas
4. Guarda los cambios

---

## 📱 Flujo de Trabajo Recomendado

### Para un Negocio de Sublimación:

1. **Registrar Insumos:**
   - Tazas blancas (insumo)
   - Papel transfer (insumo)
   - Tinta (insumo)

2. **Registrar Productos Finales:**
   - Taza con diseño A (producto)
   - Taza con diseño B (producto)
   - Taza con diseño C (producto)

3. **Producir:**
   - Cuando creas tazas, usas el módulo de Producción
   - Seleccionas "Taza blanca" → "Taza con diseño A"
   - Cantidad: 10
   - El sistema actualiza todo automáticamente

4. **Vender:**
   - Cuando vendes, usas el módulo de Ventas normalmente
   - Solo vendes "productos finales"
   - El stock se descuenta automáticamente

---

## 🎯 Beneficios

✅ **Control Total**: Sabes exactamente cuántos insumos tienes y cuántos productos creaste

✅ **Historial Completo**: Registro de todas las transformaciones con fecha y notas

✅ **Actualización Automática**: No necesitas actualizar manualmente dos stocks

✅ **Prevención de Errores**: Valida que tengas stock suficiente antes de transformar

✅ **Trazabilidad**: Puedes rastrear de dónde viene cada producto

---

## 🆘 Preguntas Frecuentes

**P: ¿Puedo transformar entre dos productos finales?**
R: Sí, el sistema lo permite pero te advierte. Lo normal es transformar de insumo a producto.

**P: ¿Puedo deshacer una transformación?**
R: No automáticamente, pero puedes hacer una transformación inversa manualmente.

**P: ¿Los insumos aparecen en ventas?**
R: Sí, puedes venderlos si quieres (ej: vender tazas blancas sin diseño).

**P: ¿Qué pasa si me equivoco en la cantidad?**
R: Puedes hacer una transformación inversa para corregirlo.

**P: ¿Se puede borrar del historial?**
R: El historial es solo lectura, no se puede modificar (auditoría).

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que ejecutaste el SQL en Supabase
2. Revisa la consola del navegador (F12) para errores
3. Asegúrate de que los productos tengan el tipo correcto

---

**¡Listo! Ahora puedes gestionar tus transformaciones de forma profesional.**

🇵🇾 **Sistema de Inventario - Turista Paraguay**
Versión 3.0 con Módulo de Transformación
