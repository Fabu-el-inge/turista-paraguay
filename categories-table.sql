-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar categorías predeterminadas
INSERT INTO categories (name) VALUES
    ('Remeras'),
    ('Recuerdos'),
    ('Botellas'),
    ('Stickers'),
    ('Gorras'),
    ('Llaveros'),
    ('Tazas'),
    ('Materiales'),
    ('Telas'),
    ('Otros')
ON CONFLICT (name) DO NOTHING;

-- Habilitar RLS (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a todos
CREATE POLICY "Permitir lectura de categorías" ON categories
    FOR SELECT USING (true);

-- Política para permitir inserción a todos
CREATE POLICY "Permitir inserción de categorías" ON categories
    FOR INSERT WITH CHECK (true);

-- Política para permitir eliminación a todos
CREATE POLICY "Permitir eliminación de categorías" ON categories
    FOR DELETE USING (true);
