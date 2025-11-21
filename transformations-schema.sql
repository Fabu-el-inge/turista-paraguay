-- ============================================
-- SCRIPT DE ACTUALIZACIÓN PARA SISTEMA DE TRANSFORMACIÓN
-- Sistema de Inventario - Turista Paraguay
-- ============================================

-- 1. Agregar columna 'type' a la tabla products (si no existe)
-- Esta columna distingue entre productos finales e insumos
ALTER TABLE products
ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'producto' CHECK (type IN ('producto', 'insumo'));

-- 2. Crear tabla de transformaciones
-- Esta tabla registra todas las transformaciones de insumos a productos
CREATE TABLE IF NOT EXISTS transformations (
    id BIGSERIAL PRIMARY KEY,
    source_id BIGINT NOT NULL,
    source_name VARCHAR(255) NOT NULL,
    source_code VARCHAR(50) NOT NULL,
    source_stock_before NUMERIC(10, 2),
    source_stock_after NUMERIC(10, 2),
    target_id BIGINT NOT NULL,
    target_name VARCHAR(255) NOT NULL,
    target_code VARCHAR(50) NOT NULL,
    target_stock_before NUMERIC(10, 2),
    target_stock_after NUMERIC(10, 2),
    quantity NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    notes TEXT,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Si la tabla ya existe, agregar las columnas faltantes
ALTER TABLE transformations ADD COLUMN IF NOT EXISTS source_stock_before NUMERIC(10, 2);
ALTER TABLE transformations ADD COLUMN IF NOT EXISTS source_stock_after NUMERIC(10, 2);
ALTER TABLE transformations ADD COLUMN IF NOT EXISTS target_stock_before NUMERIC(10, 2);
ALTER TABLE transformations ADD COLUMN IF NOT EXISTS target_stock_after NUMERIC(10, 2);

-- 3. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_transformations_date ON transformations(date DESC);
CREATE INDEX IF NOT EXISTS idx_transformations_source_id ON transformations(source_id);
CREATE INDEX IF NOT EXISTS idx_transformations_target_id ON transformations(target_id);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);

-- 4. Habilitar Row Level Security (RLS) para la tabla transformations
ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;

-- 5. Crear políticas de seguridad para transformations (permitir todo por ahora)
-- IMPORTANTE: Ajusta estas políticas según tus necesidades de seguridad
CREATE POLICY "Enable read access for all users" ON transformations
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON transformations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON transformations
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON transformations
    FOR DELETE USING (true);

-- 6. Comentarios para documentación
COMMENT ON TABLE transformations IS 'Registra todas las transformaciones de insumos a productos finales';
COMMENT ON COLUMN transformations.source_id IS 'ID del producto origen (insumo)';
COMMENT ON COLUMN transformations.target_id IS 'ID del producto destino (producto final)';
COMMENT ON COLUMN transformations.quantity IS 'Cantidad transformada';
COMMENT ON COLUMN transformations.unit IS 'Unidad de medida';
COMMENT ON COLUMN transformations.notes IS 'Notas adicionales sobre la transformación';
COMMENT ON COLUMN products.type IS 'Tipo de ítem: producto (final) o insumo';

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- Para verificar que todo se creó correctamente, ejecuta:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'type';
-- SELECT * FROM information_schema.tables WHERE table_name = 'transformations';
