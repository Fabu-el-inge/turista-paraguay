// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================

// IMPORTANTE: Configura estas variables con tus credenciales de Supabase
const SUPABASE_URL = 'https://jbxgxxcrqhqwxlqmyvvn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpieGd4eGNycWhxd3hscW15dnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTM0ODIsImV4cCI6MjA3ODUyOTQ4Mn0.Y2uQk_Z7S-qRSWOxozcvmy9Xfq5Zrg7KlK4Kxmtn70M';

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// FUNCIONES DE STORAGE (IMÁGENES)
// ============================================

async function uploadProductImage(file, productCode) {
    try {
        // Generar nombre único para la imagen
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const fileName = `${productCode}_${timestamp}.${fileExt}`;
        const filePath = `products/${fileName}`;

        // Subir archivo a Supabase Storage
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Obtener URL pública de la imagen
        const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error al subir imagen:', error);
        alert('❌ Error al subir imagen: ' + error.message);
        return null;
    }
}

async function deleteProductImage(imageUrl) {
    try {
        if (!imageUrl) return true;

        // Extraer el path de la URL
        const urlParts = imageUrl.split('/product-images/');
        if (urlParts.length < 2) return true;

        const filePath = urlParts[1];

        const { error } = await supabase.storage
            .from('product-images')
            .remove([`products/${filePath.split('/').pop()}`]);

        if (error) throw error;

        return true;
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        // No mostrar alerta, solo log
        return false;
    }
}

// ============================================
// FUNCIONES DE PRODUCTOS
// ============================================

async function loadProductsFromDB() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Transformar datos de DB al formato local
        return data.map(p => ({
            id: p.id,
            code: p.code,
            type: p.type || 'producto',
            name: p.name,
            brand: p.brand || '',
            category: p.category,
            stock: p.stock,
            unit: p.unit,
            cost: parseFloat(p.cost),
            price: parseFloat(p.price),
            minStock: p.min_stock,
            description: p.description || '',
            imageUrl: p.image_url || ''
        }));
    } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('❌ Error al cargar productos: ' + error.message);
        return [];
    }
}

async function saveProductToDB(product) {
    try {
        const dbProduct = {
            code: product.code,
            type: product.type || 'producto',
            name: product.name,
            brand: product.brand || null,
            category: product.category,
            stock: product.stock,
            unit: product.unit,
            cost: product.cost,
            price: product.price,
            min_stock: product.minStock,
            description: product.description || null,
            image_url: product.imageUrl || null
        };

        const { data, error } = await supabase
            .from('products')
            .insert([dbProduct])
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Error al guardar producto:', error);
        alert('❌ Error al guardar producto: ' + error.message);
        return null;
    }
}

async function updateProductInDB(id, product) {
    try {
        // Si solo se provee stock, actualizar solo ese campo
        if (Object.keys(product).length === 1 && product.stock !== undefined) {
            console.log('Actualizando solo stock del producto', id, 'a', product.stock);
            const { data, error } = await supabase
                .from('products')
                .update({ stock: product.stock })
                .eq('id', id)
                .select();

            if (error) throw error;
            console.log('Stock actualizado correctamente, imagen preservada');
            return data[0];
        }

        // Si es una actualización completa, actualizar todos los campos
        console.log('Actualizando producto completo', id, 'con', Object.keys(product).length, 'campos');
        const dbProduct = {
            code: product.code,
            type: product.type || 'producto',
            name: product.name,
            brand: product.brand || null,
            category: product.category,
            stock: product.stock,
            unit: product.unit,
            cost: product.cost,
            price: product.price,
            min_stock: product.minStock,
            description: product.description || null,
            image_url: product.imageUrl || null
        };

        const { data, error } = await supabase
            .from('products')
            .update(dbProduct)
            .eq('id', id)
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        alert('❌ Error al actualizar producto: ' + error.message);
        return null;
    }
}

async function deleteProductFromDB(id) {
    try {
        // Primero obtener el producto para saber si tiene imagen
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('image_url')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        // Si tiene imagen, eliminarla del Storage
        if (product && product.image_url) {
            await deleteProductImage(product.image_url);
        }

        // Luego eliminar el producto
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return true;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('❌ Error al eliminar producto: ' + error.message);
        return false;
    }
}

// ============================================
// FUNCIONES DE CLIENTES
// ============================================

async function loadClientsFromDB() {
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Transformar datos de DB al formato local
        return data.map(c => ({
            id: c.id,
            code: c.code,
            docType: c.doc_type,
            docNumber: c.doc_number,
            name: c.name,
            phone: c.phone || '',
            email: c.email || '',
            city: c.city || '',
            address: c.address || '',
            notes: c.notes || ''
        }));
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        alert('❌ Error al cargar clientes: ' + error.message);
        return [];
    }
}

async function saveClientToDB(client) {
    try {
        const dbClient = {
            code: client.code,
            doc_type: client.docType,
            doc_number: client.docNumber,
            name: client.name,
            phone: client.phone || null,
            email: client.email || null,
            city: client.city || null,
            address: client.address || null,
            notes: client.notes || null
        };

        const { data, error } = await supabase
            .from('clients')
            .insert([dbClient])
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        alert('❌ Error al guardar cliente: ' + error.message);
        return null;
    }
}

async function updateClientInDB(id, client) {
    try {
        const dbClient = {
            code: client.code,
            doc_type: client.docType,
            doc_number: client.docNumber,
            name: client.name,
            phone: client.phone || null,
            email: client.email || null,
            city: client.city || null,
            address: client.address || null,
            notes: client.notes || null
        };

        const { data, error } = await supabase
            .from('clients')
            .update(dbClient)
            .eq('id', id)
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        alert('❌ Error al actualizar cliente: ' + error.message);
        return null;
    }
}

async function deleteClientFromDB(id) {
    try {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return true;
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        alert('❌ Error al eliminar cliente: ' + error.message);
        return false;
    }
}

// ============================================
// FUNCIONES DE VENTAS
// ============================================

async function loadSalesFromDB() {
    try {
        const { data, error } = await supabase
            .from('sales')
            .select('*')
            .order('sale_date', { ascending: false });

        if (error) throw error;

        // Transformar datos de DB al formato local
        return data.map(s => ({
            id: s.id,
            productId: s.product_id,
            productName: s.product_name,
            productBrand: s.product_brand || '',
            category: s.category,
            quantity: parseFloat(s.quantity),
            unit: s.unit,
            price: parseFloat(s.price),
            total: parseFloat(s.total),
            customerId: s.client_id,
            customer: s.client_name,
            customerDoc: s.client_doc,
            date: s.sale_date,
            created_at: s.sale_date
        }));
    } catch (error) {
        console.error('Error al cargar ventas:', error);
        alert('❌ Error al cargar ventas: ' + error.message);
        return [];
    }
}

async function saveSaleToDB(sale) {
    try {
        const dbSale = {
            product_id: sale.productId,
            product_name: sale.productName,
            product_brand: sale.productBrand || null,
            category: sale.category,
            quantity: sale.quantity,
            unit: sale.unit,
            price: sale.price,
            total: sale.total,
            client_id: sale.customerId,
            client_name: sale.customer,
            client_doc: sale.customerDoc,
            sale_date: sale.date || new Date().toISOString()  // Guardar como UTC, Supabase lo maneja correctamente
        };

        const { data, error } = await supabase
            .from('sales')
            .insert([dbSale])
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Error al registrar venta:', error);
        alert('❌ Error al registrar venta: ' + error.message);
        return null;
    }
}

async function deleteSaleFromDB(id) {
    try {
        const { error } = await supabase
            .from('sales')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return true;
    } catch (error) {
        console.error('Error al eliminar venta:', error);
        alert('❌ Error al eliminar venta: ' + error.message);
        return false;
    }
}

// ============================================
// FUNCIÓN DE MIGRACIÓN (LocalStorage -> Supabase)
// ============================================

async function migrateLocalStorageToSupabase() {
    if (!confirm('¿Deseas migrar tus datos de localStorage a Supabase?\nEsto moverá todos tus productos, clientes y ventas a la base de datos en la nube.')) {
        return;
    }

    try {
        console.log('🔄 Iniciando migración...');

        // Migrar productos
        const localProducts = JSON.parse(localStorage.getItem('tp_products') || '[]');
        if (localProducts.length > 0) {
            console.log(`📦 Migrando ${localProducts.length} productos...`);
            for (const product of localProducts) {
                await saveProductToDB(product);
            }
        }

        // Migrar clientes
        const localClients = JSON.parse(localStorage.getItem('tp_clients') || '[]');
        if (localClients.length > 0) {
            console.log(`👥 Migrando ${localClients.length} clientes...`);
            for (const client of localClients) {
                await saveClientToDB(client);
            }
        }

        // Migrar ventas
        const localSales = JSON.parse(localStorage.getItem('tp_sales') || '[]');
        if (localSales.length > 0) {
            console.log(`💰 Migrando ${localSales.length} ventas...`);
            for (const sale of localSales) {
                await saveSaleToDB(sale);
            }
        }

        alert('✅ Migración completada exitosamente!\n\nTus datos ahora están en la nube y se sincronizarán entre dispositivos.');

        // Recargar datos
        location.reload();
    } catch (error) {
        console.error('Error en la migración:', error);
        alert('❌ Error durante la migración: ' + error.message);
    }
}

console.log('✅ Supabase configurado correctamente');

// ============================================
// FUNCIONES DE CATEGORÍAS
// ============================================

async function loadCategoriesFromDB() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;

        return data.map(c => c.name);
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        // Si hay error, devolver categorías predeterminadas
        return ['Remeras', 'Recuerdos', 'Botellas', 'Stickers', 'Gorras', 'Llaveros', 'Tazas', 'Materiales', 'Telas', 'Otros'];
    }
}

async function saveCategoryToDB(categoryName) {
    try {
        const { data, error } = await supabase
            .from('categories')
            .insert([{ name: categoryName }])
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Error al guardar categoría:', error);
        throw error;
    }
}

async function deleteCategoryFromDB(categoryName) {
    try {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('name', categoryName);

        if (error) throw error;

        return true;
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        throw error;
    }
}

// ============================================
// FUNCIONES DE TRANSFORMACIONES/PRODUCCIÓN
// ============================================

async function saveTransformationToDB(transformation) {
    try {
        const dbTransformation = {
            source_id: transformation.sourceId,
            source_name: transformation.sourceName,
            source_code: transformation.sourceCode,
            source_stock_before: transformation.sourceStockBefore,
            source_stock_after: transformation.sourceStockAfter,
            target_id: transformation.targetId,
            target_name: transformation.targetName,
            target_code: transformation.targetCode,
            target_stock_before: transformation.targetStockBefore,
            target_stock_after: transformation.targetStockAfter,
            quantity: transformation.quantity,
            unit: transformation.unit,
            notes: transformation.notes || null,
            date: transformation.date
        };

        const { data, error } = await supabase
            .from('transformations')
            .insert([dbTransformation])
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Error al guardar transformación:', error);
        alert('❌ Error al guardar transformación: ' + error.message);
        return null;
    }
}

async function loadTransformationsFromDB() {
    try {
        const { data, error } = await supabase
            .from('transformations')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        return data.map(t => ({
            id: t.id,
            sourceId: t.source_id,
            sourceName: t.source_name,
            sourceCode: t.source_code,
            sourceStockBefore: t.source_stock_before,
            sourceStockAfter: t.source_stock_after,
            targetId: t.target_id,
            targetName: t.target_name,
            targetCode: t.target_code,
            targetStockBefore: t.target_stock_before,
            targetStockAfter: t.target_stock_after,
            quantity: t.quantity,
            unit: t.unit,
            notes: t.notes || '',
            date: t.date
        }));
    } catch (error) {
        console.error('Error al cargar transformaciones:', error);
        return [];
    }
}
