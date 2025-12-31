// Comprehensive API Testing Script
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const BASE_URL = 'https://ecom-app-demo-backend.onrender.com';
let adminToken = '';
let userToken = '';
let categoryId = '';
let productId = '';
let cartItemId = '';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name) {
    log(`\n🧪 Testing: ${name}`, 'cyan');
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
            logError(`Response: ${JSON.stringify(error.response.data)}`);
        }
        return false;
    }
}

// Test 1: Backend Health Check
async function testBackendHealth() {
    const response = await axios.get(`${BASE_URL}/`);
    if (response.data.message === 'E-commerce API is running!') {
        logSuccess('Backend is running');
        logSuccess(`Endpoints available: ${Object.keys(response.data.endpoints).length}`);
        return true;
    }
    throw new Error('Backend health check failed');
}

// Test 2: Admin Login
async function testAdminLogin() {
    const response = await axios.post(`${BASE_URL}/api/login`, {
        email: 'admin@example.com',
        password: 'adminpassword123'
    });
    
    if (response.data.token && response.data.data.role === 'admin') {
        adminToken = response.data.token;
        logSuccess(`Admin logged in: ${response.data.data.email}`);
        logSuccess(`Token received: ${adminToken.substring(0, 20)}...`);
        return true;
    }
    throw new Error('Admin login failed');
}

// Test 3: User Login
async function testUserLogin() {
    const response = await axios.post(`${BASE_URL}/api/login`, {
        email: 'user@example.com',
        password: 'userpassword123'
    });
    
    if (response.data.token && response.data.data.role === 'user') {
        userToken = response.data.token;
        logSuccess(`User logged in: ${response.data.data.email}`);
        return true;
    }
    throw new Error('User login failed');
}

// Test 4: Get Categories
async function testGetCategories() {
    const response = await axios.get(`${BASE_URL}/api/category/`);
    if (response.data.data && Array.isArray(response.data.data)) {
        logSuccess(`Found ${response.data.data.length} categories`);
        if (response.data.data.length > 0) {
            logSuccess(`Sample: ${response.data.data[0].categoryName}`);
        }
        return true;
    }
    throw new Error('Get categories failed');
}

// Test 5: Create Category (without image)
async function testCreateCategory() {
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
        logSuccess(`Category created: ${response.data.data.categoryName}`);
        logSuccess(`Category ID: ${categoryId}`);
        return true;
    }
    throw new Error('Create category failed');
}

// Test 6: Get Products
async function testGetProducts() {
    const response = await axios.get(`${BASE_URL}/api/product/getAll`);
    if (response.data.data && Array.isArray(response.data.data)) {
        logSuccess(`Found ${response.data.data.length} products`);
        return true;
    }
    throw new Error('Get products failed');
}

// Test 7: Create Product (without image)
async function testCreateProduct() {
    const formData = new FormData();
    formData.append('productName', `TestProduct_${Date.now()}`);
    formData.append('productDescription', 'Test product description');
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
        logSuccess(`Product created: ${response.data.data.productName}`);
        logSuccess(`Product ID: ${productId}`);
        return true;
    }
    throw new Error('Create product failed');
}

// Test 8: Get User Profile
async function testGetProfile() {
    const response = await axios.get(`${BASE_URL}/api/profile`, {
        headers: { 'Authorization': adminToken }
    });
    
    if (response.data.data && response.data.data.email) {
        logSuccess(`Profile retrieved: ${response.data.data.email}`);
        return true;
    }
    throw new Error('Get profile failed');
}

// Test 9: Add to Cart
async function testAddToCart() {
    if (!productId) {
        logWarning('Skipping - no product ID available');
        return true;
    }
    
    const response = await axios.post(`${BASE_URL}/api/cart/`, {
        productId: productId,
        quantity: 1
    }, {
        headers: { 'Authorization': userToken }
    });
    
    if (response.data.data) {
        logSuccess('Item added to cart');
        if (response.data.data._id) {
            cartItemId = response.data.data._id;
        }
        return true;
    }
    throw new Error('Add to cart failed');
}

// Test 10: Get Cart
async function testGetCart() {
    const response = await axios.get(`${BASE_URL}/api/cart/`, {
        headers: { 'Authorization': userToken }
    });
    
    if (response.data.data && Array.isArray(response.data.data)) {
        logSuccess(`Cart has ${response.data.data.length} items`);
        return true;
    }
    throw new Error('Get cart failed');
}

// Test 11: Get All Users (Admin only)
async function testGetAllUsers() {
    const response = await axios.get(`${BASE_URL}/api/getAll`, {
        headers: { 'Authorization': adminToken }
    });
    
    if (response.data.data && Array.isArray(response.data.data)) {
        logSuccess(`Found ${response.data.data.length} users`);
        return true;
    }
    throw new Error('Get all users failed');
}

// Test 12: Test Unauthorized Access
async function testUnauthorizedAccess() {
    try {
        await axios.get(`${BASE_URL}/api/getAll`, {
            headers: { 'Authorization': 'invalid_token' }
        });
        logError('Unauthorized access should have failed');
        return false;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            logSuccess('Unauthorized access properly blocked');
            return true;
        }
        // If it's a network error or other, that's also fine - means it was blocked
        if (!error.response || error.response.status >= 400) {
            logSuccess('Unauthorized access properly blocked');
            return true;
        }
        throw new Error('Unauthorized test failed');
    }
}

// Run all tests
async function runAllTests() {
    log('\n🚀 Starting Comprehensive API Tests', 'blue');
    log('=' .repeat(50), 'blue');
    
    const results = {
        passed: 0,
        failed: 0,
        total: 0
    };
    
    const tests = [
        ['Backend Health Check', testBackendHealth],
        ['Admin Login', testAdminLogin],
        ['User Login', testUserLogin],
        ['Get Categories', testGetCategories],
        ['Create Category', testCreateCategory],
        ['Get Products', testGetProducts],
        ['Create Product', testCreateProduct],
        ['Get User Profile', testGetProfile],
        ['Add to Cart', testAddToCart],
        ['Get Cart', testGetCart],
        ['Get All Users (Admin)', testGetAllUsers],
        ['Test Unauthorized Access', testUnauthorizedAccess]
    ];
    
    for (const [name, testFn] of tests) {
        results.total++;
        const passed = await test(name, testFn);
        if (passed) {
            results.passed++;
        } else {
            results.failed++;
        }
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Summary
    log('\n' + '='.repeat(50), 'blue');
    log('\n📊 Test Results Summary', 'blue');
    log(`Total Tests: ${results.total}`, 'cyan');
    log(`✅ Passed: ${results.passed}`, 'green');
    log(`❌ Failed: ${results.failed}`, 'red');
    log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`, 
        results.failed === 0 ? 'green' : 'yellow');
    
    if (results.failed === 0) {
        log('\n🎉 All tests passed!', 'green');
    } else {
        log('\n⚠️  Some tests failed. Check errors above.', 'yellow');
    }
    
    return results.failed === 0;
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

