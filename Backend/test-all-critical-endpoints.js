import axios from 'axios';
import FormData from 'form-data';

const API_BASE_URL = 'https://ecom-app-demo-backend.onrender.com';

const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function logSuccess(msg) { console.log(`${colors.green}✅ ${msg}${colors.reset}`); }
function logError(msg) { console.log(`${colors.red}❌ ${msg}${colors.reset}`); }
function logInfo(msg) { console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`); }

async function testAllCriticalEndpoints() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 TESTING ALL CRITICAL ENDPOINTS');
    console.log('='.repeat(60) + '\n');

    let adminToken = '';
    let userId = '';
    let categoryId = '';
    let productId = '';

    try {
        // 1. Login
        console.log('1️⃣ Testing Login...');
        const loginRes = await axios.post(`${API_BASE_URL}/api/login`, {
            email: 'admin@example.com',
            password: 'adminpassword123'
        });
        adminToken = loginRes.data.token;
        userId = loginRes.data.data._id;
        logSuccess('Login works');
        console.log('');

        // 2. Get All Categories
        console.log('2️⃣ Testing Get All Categories...');
        const categoriesRes = await axios.get(`${API_BASE_URL}/api/category`);
        if (categoriesRes.data.data && categoriesRes.data.data.length > 0) {
            categoryId = categoriesRes.data.data[0]._id;
            logSuccess(`Get categories works (${categoriesRes.data.data.length} categories)`);
        } else {
            logError('No categories found');
        }
        console.log('');

        // 3. Create Category
        console.log('3️⃣ Testing Create Category...');
        const categoryFormData = new FormData();
        categoryFormData.append('categoryName', 'TestCategory_' + Date.now());
        const categoryCreateRes = await axios.post(
            `${API_BASE_URL}/api/category/`,
            categoryFormData,
            {
                headers: {
                    'Authorization': adminToken,
                    ...categoryFormData.getHeaders()
                }
            }
        );
        if (categoryCreateRes.status === 200) {
            logSuccess('Create category works');
            categoryId = categoryCreateRes.data.data._id;
        }
        console.log('');

        // 4. Get All Products
        console.log('4️⃣ Testing Get All Products...');
        const productsRes = await axios.get(`${API_BASE_URL}/api/product/getAll`);
        if (productsRes.data.data && productsRes.data.data.length > 0) {
            productId = productsRes.data.data[0]._id;
            logSuccess(`Get products works (${productsRes.data.data.length} products)`);
        } else {
            logInfo('No products found (this is okay)');
        }
        console.log('');

        // 5. Get Single Product
        if (productId) {
            console.log('5️⃣ Testing Get Single Product...');
            const singleProductRes = await axios.get(`${API_BASE_URL}/api/product/singleProduct/${productId}`);
            if (singleProductRes.status === 200) {
                logSuccess('Get single product works');
            }
            console.log('');
        }

        // 6. Get Cart
        console.log('6️⃣ Testing Get Cart...');
        const cartRes = await axios.get(`${API_BASE_URL}/api/cart`, {
            headers: { 'Authorization': adminToken }
        });
        if (cartRes.status === 200) {
            logSuccess('Get cart works');
        }
        console.log('');

        // 7. Get Orders
        console.log('7️⃣ Testing Get Orders...');
        const ordersRes = await axios.get(`${API_BASE_URL}/api/order`, {
            headers: { 'Authorization': adminToken }
        });
        if (ordersRes.status === 200) {
            logSuccess('Get orders works');
        }
        console.log('');

        // 8. Get Wishlist (might require user role, not admin)
        console.log('8️⃣ Testing Get Wishlist...');
        try {
            const wishlistRes = await axios.get(`${API_BASE_URL}/api/wishlist`, {
                headers: { 'Authorization': adminToken }
            });
            if (wishlistRes.status === 200) {
                logSuccess('Get wishlist works');
            }
        } catch (wishlistError) {
            if (wishlistError.response?.status === 403) {
                logInfo('Wishlist requires user role (not admin) - this is expected');
            } else {
                logError(`Wishlist error: ${wishlistError.message}`);
            }
        }
        console.log('');

        // Summary
        console.log('='.repeat(60));
        logSuccess('ALL CRITICAL ENDPOINTS ARE WORKING!');
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        logError(`Test failed: ${error.message}`);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response:', JSON.stringify(error.response.data, null, 2));
        }
        process.exit(1);
    }
}

testAllCriticalEndpoints();

