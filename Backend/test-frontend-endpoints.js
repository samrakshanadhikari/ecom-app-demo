// Comprehensive Frontend API Endpoints Test
// Tests all endpoints that the frontend uses

import axios from 'axios';
import FormData from 'form-data';

const BASE_URL = 'https://ecom-app-demo-backend.onrender.com';
let adminToken = '';
let userToken = '';
let categoryId = '';
let productId = '';
let cartItemId = '';
let orderId = '';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(name) {
    log(`\n${'='.repeat(60)}`, 'magenta');
    log(`📱 ${name}`, 'magenta');
    log('='.repeat(60), 'magenta');
}

function logTest(name) {
    log(`\n🧪 ${name}`, 'cyan');
}

function logSuccess(message) {
    log(`  ✅ ${message}`, 'green');
}

function logError(message) {
    log(`  ❌ ${message}`, 'red');
}

function logWarning(message) {
    log(`  ⚠️  ${message}`, 'yellow');
}

async function test(name, testFn) {
    try {
        logTest(name);
        await testFn();
        return true;
    } catch (error) {
        logError(`Failed: ${error.message}`);
        if (error.response) {
            logError(`Status: ${error.response.status}`);
            logError(`Response: ${JSON.stringify(error.response.data).substring(0, 200)}`);
        }
        return false;
    }
}

// ==================== AUTHENTICATION TESTS ====================
async function testAuthentication() {
    logSection('AUTHENTICATION & USER MANAGEMENT');
    
    const results = { passed: 0, failed: 0 };
    
    // Test 1: Admin Login
    const test1 = await test('Admin Login', async () => {
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email: 'admin@example.com',
            password: 'adminpassword123'
        });
        if (response.data.token && response.data.data.role === 'admin') {
            adminToken = response.data.token;
            logSuccess(`Logged in as: ${response.data.data.email}`);
            return true;
        }
        throw new Error('Admin login failed');
    });
    results.passed += test1 ? 1 : 0;
    results.failed += test1 ? 0 : 1;
    
    // Test 2: User Login
    const test2 = await test('User Login', async () => {
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email: 'user@example.com',
            password: 'userpassword123'
        });
        if (response.data.token && response.data.data.role === 'user') {
            userToken = response.data.token;
            logSuccess(`Logged in as: ${response.data.data.email}`);
            return true;
        }
        throw new Error('User login failed');
    });
    results.passed += test2 ? 1 : 0;
    results.failed += test2 ? 0 : 1;
    
    // Test 3: Get User Profile
    const test3 = await test('Get User Profile', async () => {
        const response = await axios.get(`${BASE_URL}/api/profile`, {
            headers: { 'Authorization': adminToken }
        });
        if (response.data.data && response.data.data.email) {
            logSuccess(`Profile: ${response.data.data.email}`);
            return true;
        }
        throw new Error('Get profile failed');
    });
    results.passed += test3 ? 1 : 0;
    results.failed += test3 ? 0 : 1;
    
    // Test 4: Get All Users (Admin only)
    const test4 = await test('Get All Users (Admin)', async () => {
        const response = await axios.get(`${BASE_URL}/api/getAll`, {
            headers: { 'Authorization': adminToken }
        });
        if (response.data.data && Array.isArray(response.data.data)) {
            logSuccess(`Found ${response.data.data.length} users`);
            return true;
        }
        throw new Error('Get all users failed');
    });
    results.passed += test4 ? 1 : 0;
    results.failed += test4 ? 0 : 1;
    
    return results;
}

// ==================== CATEGORY TESTS ====================
async function testCategories() {
    logSection('CATEGORY MANAGEMENT');
    
    const results = { passed: 0, failed: 0 };
    
    // Test 1: Get All Categories
    const test1 = await test('Get All Categories', async () => {
        const response = await axios.get(`${BASE_URL}/api/category/`);
        if (response.data.data && Array.isArray(response.data.data)) {
            logSuccess(`Found ${response.data.data.length} categories`);
            return true;
        }
        throw new Error('Get categories failed');
    });
    results.passed += test1 ? 1 : 0;
    results.failed += test1 ? 0 : 1;
    
    // Test 2: Create Category (without image)
    const test2 = await test('Create Category (no image)', async () => {
        const formData = new FormData();
        formData.append('categoryName', `TestCategory_${Date.now()}`);
        
        const response = await axios.post(`${BASE_URL}/api/category/`, formData, {
            headers: {
                'Authorization': adminToken,
                ...formData.getHeaders()
            }
        });
        if (response.data.data && response.data.data._id) {
            categoryId = response.data.data._id;
            logSuccess(`Created: ${response.data.data.categoryName}`);
            return true;
        }
        throw new Error('Create category failed');
    });
    results.passed += test2 ? 1 : 0;
    results.failed += test2 ? 0 : 1;
    
    // Test 3: Get Single Category
    if (categoryId) {
        const test3 = await test('Get Single Category', async () => {
            const response = await axios.get(`${BASE_URL}/api/category/${categoryId}`);
            if (response.data.data && response.data.data._id) {
                logSuccess(`Retrieved: ${response.data.data.categoryName}`);
                return true;
            }
            throw new Error('Get single category failed');
        });
        results.passed += test3 ? 1 : 0;
        results.failed += test3 ? 0 : 1;
    }
    
    return results;
}

// ==================== PRODUCT TESTS ====================
async function testProducts() {
    logSection('PRODUCT MANAGEMENT');
    
    const results = { passed: 0, failed: 0 };
    
    // Test 1: Get All Products
    const test1 = await test('Get All Products', async () => {
        const response = await axios.get(`${BASE_URL}/api/product/getAll`);
        if (response.data.data && Array.isArray(response.data.data)) {
            logSuccess(`Found ${response.data.data.length} products`);
            return true;
        }
        throw new Error('Get products failed');
    });
    results.passed += test1 ? 1 : 0;
    results.failed += test1 ? 0 : 1;
    
    // Test 2: Create Product
    const test2 = await test('Create Product (no image)', async () => {
        const formData = new FormData();
        formData.append('productName', `TestProduct_${Date.now()}`);
        formData.append('productDescription', 'Test product description for frontend testing');
        formData.append('productPrice', '99.99');
        formData.append('productTotalStockQuantity', '10');
        formData.append('category', 'TestCategory');
        
        const response = await axios.post(`${BASE_URL}/api/product/create`, formData, {
            headers: {
                'Authorization': adminToken,
                ...formData.getHeaders()
            }
        });
        if (response.data.data && response.data.data._id) {
            productId = response.data.data._id;
            logSuccess(`Created: ${response.data.data.productName}`);
            return true;
        }
        throw new Error('Create product failed');
    });
    results.passed += test2 ? 1 : 0;
    results.failed += test2 ? 0 : 1;
    
    // Test 3: Get Single Product
    if (productId) {
        const test3 = await test('Get Single Product', async () => {
            const response = await axios.get(`${BASE_URL}/api/product/singleProduct/${productId}`);
            if (response.data.data && response.data.data._id) {
                logSuccess(`Retrieved: ${response.data.data.productName}`);
                return true;
            }
            throw new Error('Get single product failed');
        });
        results.passed += test3 ? 1 : 0;
        results.failed += test3 ? 0 : 1;
    }
    
    // Test 4: Get Products by Category
    const test4 = await test('Get Products by Category', async () => {
        const response = await axios.get(`${BASE_URL}/api/product/category/TestCategory`);
        if (response.data.data && Array.isArray(response.data.data)) {
            logSuccess(`Found ${response.data.data.length} products in category`);
            return true;
        }
        throw new Error('Get products by category failed');
    });
    results.passed += test4 ? 1 : 0;
    results.failed += test4 ? 0 : 1;
    
    return results;
}

// ==================== CART TESTS ====================
async function testCart() {
    logSection('SHOPPING CART');
    
    const results = { passed: 0, failed: 0 };
    
    // Test 1: Add to Cart
    if (productId) {
        const test1 = await test('Add Product to Cart', async () => {
            const response = await axios.post(`${BASE_URL}/api/cart/`, {
                productId: productId,
                quantity: 1
            }, {
                headers: { 'Authorization': userToken }
            });
            if (response.data.data) {
                logSuccess('Product added to cart');
                if (response.data.data._id) {
                    cartItemId = response.data.data._id;
                }
                return true;
            }
            throw new Error('Add to cart failed');
        });
        results.passed += test1 ? 1 : 0;
        results.failed += test1 ? 0 : 1;
    } else {
        logWarning('Skipping cart tests - no product ID');
    }
    
    // Test 2: Get Cart
    const test2 = await test('Get Cart Items', async () => {
        const response = await axios.get(`${BASE_URL}/api/cart/`, {
            headers: { 'Authorization': userToken }
        });
        if (response.data.data && Array.isArray(response.data.data)) {
            logSuccess(`Cart has ${response.data.data.length} items`);
            return true;
        }
        throw new Error('Get cart failed');
    });
    results.passed += test2 ? 1 : 0;
    results.failed += test2 ? 0 : 1;
    
    // Test 3: Update Cart Item
    if (productId) {
        const test3 = await test('Update Cart Quantity', async () => {
            const response = await axios.patch(`${BASE_URL}/api/cart/`, {
                productId: productId,
                quantity: 2
            }, {
                headers: { 'Authorization': userToken }
            });
            if (response.data.data) {
                logSuccess('Cart quantity updated');
                return true;
            }
            throw new Error('Update cart failed');
        });
        results.passed += test3 ? 1 : 0;
        results.failed += test3 ? 0 : 1;
    }
    
    return results;
}

// ==================== ORDER TESTS ====================
async function testOrders() {
    logSection('ORDER MANAGEMENT');
    
    const results = { passed: 0, failed: 0 };
    
    // Test 1: Create Order
    if (productId) {
        const test1 = await test('Create Order', async () => {
            const response = await axios.post(`${BASE_URL}/api/order`, {
                products: [{
                    productId: productId,
                    quantity: 1
                }],
                shippingAddress: '123 Test Street, Test City',
                phoneNumber: '1234567890',
                totalAmount: 99.99,
                paymentMethod: 'cod',
                orderStatus: 'pending'
            }, {
                headers: { 'Authorization': userToken }
            });
            // Order creation can return order data or redirect URL
            if (response.data.order && response.data.order._id) {
                orderId = response.data.order._id;
                logSuccess(`Order created: ${orderId}`);
                return true;
            } else if (response.data.data && response.data.data._id) {
                orderId = response.data.data._id;
                logSuccess(`Order created: ${orderId}`);
                return true;
            } else if (response.status === 200) {
                logSuccess('Order created successfully');
                return true;
            }
            throw new Error('Create order failed');
        });
        results.passed += test1 ? 1 : 0;
        results.failed += test1 ? 0 : 1;
    } else {
        logWarning('Skipping order creation - no product ID');
    }
    
    // Test 2: Get My Orders
    const test2 = await test('Get My Orders', async () => {
        const response = await axios.get(`${BASE_URL}/api/order/myOrders`, {
            headers: { 'Authorization': userToken }
        });
        if (response.data.data && Array.isArray(response.data.data)) {
            logSuccess(`Found ${response.data.data.length} orders`);
            return true;
        }
        throw new Error('Get my orders failed');
    });
    results.passed += test2 ? 1 : 0;
    results.failed += test2 ? 0 : 1;
    
    // Test 3: Get All Orders (Admin)
    const test3 = await test('Get All Orders (Admin)', async () => {
        const response = await axios.get(`${BASE_URL}/api/order/`, {
            headers: { 'Authorization': adminToken }
        });
        if (response.data.data && Array.isArray(response.data.data)) {
            logSuccess(`Found ${response.data.data.length} orders`);
            return true;
        }
        throw new Error('Get all orders failed');
    });
    results.passed += test3 ? 1 : 0;
    results.failed += test3 ? 0 : 1;
    
    return results;
}

// ==================== WISHLIST TESTS ====================
async function testWishlist() {
    logSection('WISHLIST');
    
    const results = { passed: 0, failed: 0 };
    
    if (productId) {
        // Test 1: Add to Wishlist
        const test1 = await test('Add to Wishlist', async () => {
            const response = await axios.post(`${BASE_URL}/api/wishlist`, {
                productId: productId
            }, {
                headers: { 'Authorization': userToken }
            });
            if (response.data.data || response.status === 200) {
                logSuccess('Product added to wishlist');
                return true;
            }
            throw new Error('Add to wishlist failed');
        });
        results.passed += test1 ? 1 : 0;
        results.failed += test1 ? 0 : 1;
        
        // Test 2: Get Wishlist
        const test2 = await test('Get Wishlist', async () => {
            const response = await axios.get(`${BASE_URL}/api/wishlist`, {
                headers: { 'Authorization': userToken }
            });
            // Wishlist can be null if empty, or have a data object with products array
            if (response.data.data) {
                const products = response.data.data.products || [];
                logSuccess(`Wishlist has ${Array.isArray(products) ? products.length : 0} items`);
                return true;
            } else if (response.status === 200) {
                logSuccess('Wishlist retrieved (may be empty)');
                return true;
            }
            throw new Error('Get wishlist failed');
        });
        results.passed += test2 ? 1 : 0;
        results.failed += test2 ? 0 : 1;
    } else {
        logWarning('Skipping wishlist tests - no product ID');
    }
    
    return results;
}

// ==================== MAIN TEST RUNNER ====================
async function runAllTests() {
    log('\n🚀 COMPREHENSIVE FRONTEND API TEST SUITE', 'blue');
    log('='.repeat(60), 'blue');
    log('Testing all endpoints used by the frontend application', 'cyan');
    
    const allResults = {
        total: 0,
        passed: 0,
        failed: 0
    };
    
    // Run all test suites
    const authResults = await testAuthentication();
    allResults.total += (authResults.passed + authResults.failed);
    allResults.passed += authResults.passed;
    allResults.failed += authResults.failed;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const categoryResults = await testCategories();
    allResults.total += (categoryResults.passed + categoryResults.failed);
    allResults.passed += categoryResults.passed;
    allResults.failed += categoryResults.failed;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const productResults = await testProducts();
    allResults.total += (productResults.passed + productResults.failed);
    allResults.passed += productResults.passed;
    allResults.failed += productResults.failed;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cartResults = await testCart();
    allResults.total += (cartResults.passed + cartResults.failed);
    allResults.passed += cartResults.passed;
    allResults.failed += cartResults.failed;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const orderResults = await testOrders();
    allResults.total += (orderResults.passed + orderResults.failed);
    allResults.passed += orderResults.passed;
    allResults.failed += orderResults.failed;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const wishlistResults = await testWishlist();
    allResults.total += (wishlistResults.passed + wishlistResults.failed);
    allResults.passed += wishlistResults.passed;
    allResults.failed += wishlistResults.failed;
    
    // Final Summary
    log('\n' + '='.repeat(60), 'magenta');
    log('\n📊 FINAL TEST RESULTS', 'magenta');
    log('='.repeat(60), 'magenta');
    log(`\nTotal Tests: ${allResults.total}`, 'cyan');
    log(`✅ Passed: ${allResults.passed}`, 'green');
    log(`❌ Failed: ${allResults.failed}`, 'red');
    const successRate = ((allResults.passed / allResults.total) * 100).toFixed(1);
    log(`Success Rate: ${successRate}%`, 
        allResults.failed === 0 ? 'green' : 'yellow');
    
    if (allResults.failed === 0) {
        log('\n🎉 ALL FRONTEND ENDPOINTS WORKING!', 'green');
        log('Your frontend should work perfectly!', 'green');
    } else {
        log('\n⚠️  Some endpoints failed. Check errors above.', 'yellow');
    }
    
    return allResults.failed === 0;
}

// Run tests
runAllTests()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        logError(`Test suite error: ${error.message}`);
        process.exit(1);
    });

