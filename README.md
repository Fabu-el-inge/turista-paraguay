# 🇵🇾 Sistema de Inventario - Turista Paraguay

Sistema completo de gestión de inventario, ventas y clientes para negocios de turismo en Paraguay.

## 📋 Características

### ✅ Gestión de Productos
- Códigos automáticos únicos (TP-0001, TP-0002, etc.)
- Registro de marca (opcional)
- Control de stock con alertas
- Múltiples unidades de medida (unidades, metros, kilos, litros, etc.)
- Precios de costo y venta con formato de guaraníes (₲ 1.000.000)
- Categorías personalizables
- Stock mínimo con alertas automáticas

### 👥 Gestión de Clientes (ABM)
- Códigos automáticos (CL-0001, CL-0002, etc.)
- Registro completo: documento, teléfono, email, ciudad, dirección
- Búsqueda y filtrado de clientes
- Notas adicionales por cliente

### 💰 Gestión de Ventas
- Registro rápido de ventas
- Selección de cliente desde base de datos
- Actualización automática de stock
- Historial completo con marca del producto
- Cálculo automático de totales

### 📊 Dashboard y Reportes
- Total de productos
- Valor total del inventario (basado en costo)
- Ventas del día
- Alertas de stock bajo
- Productos más vendidos
- Reportes mensuales y anuales
- Estadísticas por categoría

## 🚀 Cómo Usar

### Instalación
1. Abre el archivo `index.html` en cualquier navegador web
2. No requiere instalación ni conexión a internet
3. Todos los datos se guardan en el navegador (localStorage)

### Primeros Pasos

#### 1. Agregar Productos
- Haz clic en "➕ Agregar Producto"
- Completa los datos (el código se genera automáticamente)
- Marca es opcional
- Al guardar, el formulario se limpia para agregar otro producto rápido
- Presiona "Cancelar" cuando termines de agregar productos

#### 2. Agregar Clientes
- Ve a la sección "👥 Clientes"
- Haz clic en "➕ Nuevo Cliente"
- Completa los datos del cliente
- El código se genera automáticamente

#### 3. Registrar Ventas
- Ve a la sección "💵 Ventas"
- Selecciona el producto
- Selecciona el cliente
- Ingresa la cantidad
- El total se calcula automáticamente
- Al registrar, el stock se actualiza automáticamente

## 💡 Características Especiales

### Formato de Guaraníes
Todos los precios se muestran con separador de miles:
- ₲ 1.000
- ₲ 50.000
- ₲ 1.000.000

### Códigos Automáticos
- **Productos**: TP-0001, TP-0002, TP-0003...
- **Clientes**: CL-0001, CL-0002, CL-0003...

Los códigos nunca se repiten y son generados automáticamente.

### Capitalización Automática
Todos los campos de texto capitalizan automáticamente la primera letra.

### Modal Persistente
Al agregar productos, el modal permanece abierto para agregar múltiples productos rápidamente sin tener que abrir y cerrar el formulario cada vez.

## 📂 Estructura de Datos

### Productos
```javascript
{
  id: timestamp,
  code: "TP-0001",
  name: "Remera Paraguay",
  brand: "Nike",
  category: "Remeras",
  stock: 50,
  unit: "unidades",
  cost: 25000,
  price: 50000,
  minStock: 5,
  description: "Remera oficial de Paraguay"
}
```

### Clientes
```javascript
{
  id: timestamp,
  code: "CL-0001",
  docType: "CI",
  docNumber: "1234567",
  name: "Juan Pérez",
  phone: "0981234567",
  email: "juan@example.com",
  city: "Asunción",
  address: "Calle Principal 123",
  notes: "Cliente preferencial"
}
```

### Ventas
```javascript
{
  id: timestamp,
  productId: 123,
  productName: "Remera Paraguay",
  productBrand: "Nike",
  category: "Remeras",
  quantity: 2,
  unit: "unidades",
  price: 50000,
  total: 100000,
  customerId: 456,
  customer: "Juan Pérez",
  customerDoc: "CI: 1234567",
  date: "2025-11-11T10:30:00.000Z"
}
```

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura
- **CSS3**: Estilos personalizados con gradientes
- **JavaScript Vanilla**: Lógica del sistema
- **localStorage**: Persistencia de datos

## ⚠️ Notas Importantes

### Respaldo de Datos
Los datos se guardan en el navegador (localStorage). Para mayor seguridad:
- No borres el caché del navegador
- Usa siempre el mismo navegador
- Considera exportar los datos periódicamente

### Navegadores Compatibles
- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Limitaciones
- Los datos se guardan solo en el navegador actual
- No hay sincronización entre dispositivos
- Límite de almacenamiento: ~5-10 MB (suficiente para miles de productos)

## 📱 Uso en Móvil

El sistema es responsivo y funciona en dispositivos móviles, aunque la experiencia es mejor en pantallas grandes.

## 🆘 Soporte

Si tienes problemas:
1. Asegúrate de usar un navegador actualizado
2. Verifica que JavaScript esté habilitado
3. No uses modo incógnito (no guarda datos)
4. Presiona Ctrl + Shift + R para recargar sin caché

## 📝 Versión

**Versión**: 2.0
**Última actualización**: 11 de Noviembre, 2025

## ✨ Funcionalidades Recientes

- ✅ Campo de marca en productos
- ✅ Formato de guaraníes con separador de miles
- ✅ Modal persistente para agregar productos rápido
- ✅ ABM completo de clientes
- ✅ Códigos automáticos únicos
- ✅ Capitalización automática

---

**Desarrollado para Turista Paraguay** 🇵🇾
