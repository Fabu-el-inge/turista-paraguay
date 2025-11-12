// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================

// IMPORTANTE: Configura estas variables con tus credenciales de Supabase
const SUPABASE_URL = 'https://jbxgxxcrqhqwxlqmyvvn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpieGd4eGNycWhxd3hscW15dnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTM0ODIsImV4cCI6MjA3ODUyOTQ4Mn0.Y2uQk_Z7S-qRSWOxozcvmy9Xfq5Zrg7KlK4Kxmtn70M';

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
            name: p.name,
            brand: p.brand || '',
            category: p.category,
            stock: p.stock,
            unit: p.unit,
            cost: parseFloat(p.cost),
            price: parseFloat(p.price),
            minStock: p.min_stock,
            description: p.description || ''
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
            name: product.name,
            brand: product.brand || null,
            category: product.category,
            stock: product.stock,
            unit: product.unit,
            cost: product.cost,
            price: product.price,
            min_stock: product.minStock,
            description: product.description || null
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
        const dbProduct = {
            code: product.code,
            name: product.name,
            brand: product.brand || null,
            category: product.category,
            stock: product.stock,
            unit: product.unit,
            cost: product.cost,
            price: product.price,
            min_stock: product.minStock,
            description: product.description || null
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
            date: s.sale_date
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
            sale_date: sale.date
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
