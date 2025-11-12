-- ============================================
-- SCHEMA PARA SISTEMA DE INVENTARIO TURISTA PARAGUAY
-- Base de datos: Supabase (PostgreSQL)
-- ============================================

-- Tabla: products (Productos)
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'unidades',
  cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: clients (Clientes)
CREATE TABLE IF NOT EXISTS clients (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  doc_type TEXT NOT NULL,
  doc_number TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: sales (Ventas)
CREATE TABLE IF NOT EXISTS sales (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_name TEXT NOT NULL,
  product_brand TEXT,
  category TEXT NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  total NUMERIC(12, 2) NOT NULL,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  client_name TEXT NOT NULL,
  client_doc TEXT NOT NULL,
  sale_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_products_code ON products(code);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_clients_code ON clients(code);
CREATE INDEX IF NOT EXISTS idx_clients_doc ON clients(doc_type, doc_number);
CREATE INDEX IF NOT EXISTS idx_sales_product ON sales(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_client ON sales(client_id);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(sale_date);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS - Row Level Security)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Políticas: Permitir TODO para usuarios autenticados y anónimos
-- (Para uso público sin autenticación)

-- Products
CREATE POLICY "Enable all access for products"
  ON products FOR ALL
  USING (true)
  WITH CHECK (true);

-- Clients
CREATE POLICY "Enable all access for clients"
  ON clients FOR ALL
  USING (true)
  WITH CHECK (true);

-- Sales
CREATE POLICY "Enable all access for sales"
  ON sales FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista: Productos con stock bajo
CREATE OR REPLACE VIEW low_stock_products AS
SELECT
  id,
  code,
  name,
  brand,
  category,
  stock,
  min_stock,
  unit,
  price
FROM products
WHERE stock <= min_stock
ORDER BY stock ASC;

-- Vista: Resumen de ventas por producto
CREATE OR REPLACE VIEW sales_summary_by_product AS
SELECT
  p.id,
  p.code,
  p.name,
  p.brand,
  p.category,
  COUNT(s.id) AS total_sales,
  SUM(s.quantity) AS total_quantity,
  SUM(s.total) AS total_revenue
FROM products p
LEFT JOIN sales s ON p.id = s.product_id
GROUP BY p.id, p.code, p.name, p.brand, p.category
ORDER BY total_revenue DESC NULLS LAST;

-- Vista: Ventas del día
CREATE OR REPLACE VIEW today_sales AS
SELECT
  s.id,
  s.product_name,
  s.product_brand,
  s.quantity,
  s.unit,
  s.price,
  s.total,
  s.client_name,
  s.sale_date
FROM sales s
WHERE DATE(s.sale_date) = CURRENT_DATE
ORDER BY s.sale_date DESC;

-- ============================================
-- COMENTARIOS EN LAS TABLAS
-- ============================================

COMMENT ON TABLE products IS 'Catálogo de productos del inventario';
COMMENT ON TABLE clients IS 'Base de datos de clientes';
COMMENT ON TABLE sales IS 'Registro de todas las ventas realizadas';

COMMENT ON COLUMN products.code IS 'Código único del producto (TP-0001, TP-0002, etc.)';
COMMENT ON COLUMN products.min_stock IS 'Stock mínimo para alertas';
COMMENT ON COLUMN clients.code IS 'Código único del cliente (CL-0001, CL-0002, etc.)';
COMMENT ON COLUMN sales.sale_date IS 'Fecha y hora de la venta';
