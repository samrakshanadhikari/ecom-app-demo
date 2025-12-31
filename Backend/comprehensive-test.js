import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use your deployed backend URL
const BASE_URL = 'https://ecom-app-demo-backend.onrender.com';
// Uncomment the line below to test local backend
// const BASE_URL = 'http://localhost:3000';

console.log(`\n${"=".repeat(80)}`);
console.log(`🧪 COMPREHENSIVE E-COMMERCE APPLICATION TEST`);
console.log(`${"=".repeat(80)}\n`);
console.log(`📍 Testing: ${BASE_URL}\n`);

let adminToken = '';
let userToken = '';
let createdCategoryId = '';
let createdProductId = '';
let testCategoryName = `TestCat_${Date.now()}`;
let testProductName = `TestProduct_${Date.now()}`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Test Results Storage
const results = {
    passed: [],
    failed: [],
    warnings: []
};

function logTest(name, passed, message = '') {
    const emoji = passed ? '✅' : '❌';
    console.log(`${emoji} ${name}: ${message}`);
    if (passed) {
        results.passed.push(name);
    } else {
        results.failed.push({ name, message });
    }
}

function logWarning(name, message) {
    console.log(`⚠️  ${name}: ${message}`);
    results.warnings.push({ name, message });
}

// ==================== TEST 1: SERVER CONNECTIVITY ====================
async function testServerConnectivity() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('🔌 TEST 1: SERVER CONNECTIVITY');
    console.log(`${"─".repeat(80)}\n`);
    
    try {
        const response = await axios.get(`${BASE_URL}/`);
        logTest('Server is reachable', response.status === 200, JSON.stringify(response.data, null, 2));
        return true;
    } catch (error) {
        logTest('Server is reachable', false, error.message);
        console.log('\n❌ CRITICAL: Cannot reach server. Stopping tests.\n');
        return false;
    }
}

// ==================== TEST 2: USER REGISTRATION ====================
async function testUserRegistration() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('👤 TEST 2: USER REGISTRATION');
    console.log(`${"─".repeat(80)}\n`);
    
    // Test Admin Registration
    const adminEmail = `admin_${Date.now()}@test.com`;
    try {
        const response = await axios.post(`${BASE_URL}/api/register`, {
            username: 'Test Admin',
            email: adminEmail,
            password: 'TestPass123!',
            role: 'admin'
        });
        logTest('Admin registration', response.status === 200, `Admin created: ${adminEmail}`);
    } catch (error) {
        const msg = error.response?.data?.message || error.message;
        logTest('Admin registration', false, msg);
    }
    
    await sleep(500);
    
    // Test User Registration
    const userEmail = `user_${Date.now()}@test.com`;
    try {
        const response = await axios.post(`${BASE_URL}/api/register`, {
            username: 'Test User',
            email: userEmail,
            password: 'TestPass123!',
            role: 'customer'
        });
        logTest('User registration', response.status === 200, `User created: ${userEmail}`);
    } catch (error) {
        const msg = error.response?.data?.message || error.message;
        logTest('User registration', false, msg);
    }
    
    await sleep(500);
    
    // Test Duplicate Email
    try {
        const response = await axios.post(`${BASE_URL}/api/register`, {
            username: 'Duplicate Test',
            email: userEmail,
            password: 'TestPass123!',
            role: 'customer'
        });
        logTest('Duplicate email prevention', false, 'Should have rejected duplicate email');
    } catch (error) {
        const msg = error.response?.data?.message || '';
        const isDuplicateError = msg.includes('already') || error.response?.status === 404;
        logTest('Duplicate email prevention', isDuplicateError, msg);
    }
}

// ==================== TEST 3: USER LOGIN ====================
async function testUserLogin() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('🔐 TEST 3: USER LOGIN & AUTHENTICATION');
    console.log(`${"─".repeat(80)}\n`);
    
    // First create users to login with
    const adminEmail = `testadmin_${Date.now()}@test.com`;
    const userEmail = `testuser_${Date.now()}@test.com`;
    const password = 'TestPass123!';
    
    try {
        await axios.post(`${BASE_URL}/api/register`, {
            username: 'Login Test Admin',
            email: adminEmail,
            password: password,
            role: 'admin'
        });
        
        await axios.post(`${BASE_URL}/api/register`, {
            username: 'Login Test User',
            email: userEmail,
            password: password,
            role: 'customer'
        });
        
        await sleep(500);
        
        // Test Admin Login
        const adminLoginResponse = await axios.post(`${BASE_URL}/api/login`, {
            email: adminEmail,
            password: password
        });
        
        if (adminLoginResponse.status === 200 && adminLoginResponse.data.token) {
            adminToken = adminLoginResponse.data.token;
            logTest('Admin login', true, 'Token received');
        } else {
            logTest('Admin login', false, 'No token received');
        }
        
        await sleep(500);
        
        // Test User Login
        const userLoginResponse = await axios.post(`${BASE_URL}/api/login`, {
            email: userEmail,
            password: password
        });
        
        if (userLoginResponse.status === 200 && userLoginResponse.data.token) {
            userToken = userLoginResponse.data.token;
            logTest('User login', true, 'Token received');
        } else {
            logTest('User login', false, 'No token received');
        }
        
        await sleep(500);
        
        // Test Wrong Password
        try {
            await axios.post(`${BASE_URL}/api/login`, {
                email: userEmail,
                password: 'WrongPassword123!'
            });
            logTest('Wrong password rejection', false, 'Should have rejected wrong password');
        } catch (error) {
            const isPasswordError = error.response?.status === 404 || 
                                    error.response?.data?.message?.includes('Password') ||
                                    error.response?.data?.message?.includes('matched');
            logTest('Wrong password rejection', isPasswordError, error.response?.data?.message || '');
        }
        
    } catch (error) {
        logTest('Login test', false, error.response?.data?.message || error.message);
    }
}

// ==================== TEST 4: CATEGORY OPERATIONS ====================
async function testCategoryOperations() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('📁 TEST 4: CATEGORY OPERATIONS');
    console.log(`${"─".repeat(80)}\n`);
    
    if (!adminToken) {
        logWarning('Category tests', 'Skipped - no admin token');
        return;
    }
    
    // Test 1: Create category WITHOUT image
    try {
        const response = await axios.post(
            `${BASE_URL}/api/category`,
            { categoryName: `${testCategoryName}_NoImage` },
            { headers: { Authorization: adminToken } }
        );
        logTest('Create category without image', response.status === 200, response.data.message);
    } catch (error) {
        logTest('Create category without image', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 2: Create category WITH image
    const testImagePath = path.join(__dirname, 'test-image.jpg');
    
    // Create a test image if it doesn't exist
    if (!fs.existsSync(testImagePath)) {
        console.log('ℹ️  Creating test image...');
        // Create a minimal valid JPEG file (1x1 pixel)
        const minimalJPEG = Buffer.from([
            0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 
            0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 
            0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43, 
            0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xC0, 0x00, 0x0B, 0x08,
            0x00, 0x01, 0x00, 0x01, 0x01, 0x01, 0x11, 0x00,
            0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xDA,
            0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00,
            0x7F, 0xFF, 0xD9
        ]);
        fs.writeFileSync(testImagePath, minimalJPEG);
    }
    
    try {
        const formData = new FormData();
        formData.append('categoryName', testCategoryName);
        formData.append('image', fs.createReadStream(testImagePath));
        
        const response = await axios.post(
            `${BASE_URL}/api/category`,
            formData,
            { 
                headers: {
                    ...formData.getHeaders(),
                    Authorization: adminToken
                }
            }
        );
        
        if (response.status === 200 && response.data.data) {
            createdCategoryId = response.data.data._id;
            const hasImage = !!response.data.data.categoryImageUrl;
            logTest('Create category with image', hasImage, 
                hasImage ? `Image: ${response.data.data.categoryImageUrl}` : 'No image URL returned');
        } else {
            logTest('Create category with image', false, 'No category data returned');
        }
    } catch (error) {
        logTest('Create category with image', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 3: Fetch all categories
    try {
        const response = await axios.get(`${BASE_URL}/api/category`);
        const hasCategories = response.data.data && response.data.data.length > 0;
        logTest('Fetch all categories', hasCategories, 
            `Found ${response.data.data?.length || 0} categories`);
    } catch (error) {
        logTest('Fetch all categories', false, error.response?.data?.message || error.message);
    }
}

// ==================== TEST 5: PRODUCT OPERATIONS ====================
async function testProductOperations() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('📦 TEST 5: PRODUCT OPERATIONS');
    console.log(`${"─".repeat(80)}\n`);
    
    if (!adminToken) {
        logWarning('Product tests', 'Skipped - no admin token');
        return;
    }
    
    if (!testCategoryName) {
        logWarning('Product tests', 'Using default category name');
        testCategoryName = 'Electronics';
    }
    
    // Test 1: Create product WITHOUT image
    try {
        const response = await axios.post(
            `${BASE_URL}/api/product/create`,
            {
                productName: `${testProductName}_NoImage`,
                productDescription: 'Test product without image',
                productPrice: 99.99,
                productTotalStockQuantity: 10,
                category: testCategoryName
            },
            { headers: { Authorization: adminToken } }
        );
        logTest('Create product without image', response.status === 200, response.data.message);
    } catch (error) {
        logTest('Create product without image', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 2: Create product WITH image
    const testImagePath = path.join(__dirname, 'test-image.jpg');
    
    try {
        const formData = new FormData();
        formData.append('productName', testProductName);
        formData.append('productDescription', 'Test product with image - high quality item for testing');
        formData.append('productPrice', '149.99');
        formData.append('productTotalStockQuantity', '25');
        formData.append('category', testCategoryName);
        formData.append('totalRating', '4.5');
        formData.append('image', fs.createReadStream(testImagePath));
        
        const response = await axios.post(
            `${BASE_URL}/api/product/create`,
            formData,
            { 
                headers: {
                    ...formData.getHeaders(),
                    Authorization: adminToken
                }
            }
        );
        
        if (response.status === 200 && response.data.data) {
            createdProductId = response.data.data._id;
            const hasImage = !!response.data.data.productImageUrl;
            logTest('Create product with image', hasImage,
                hasImage ? `Image: ${response.data.data.productImageUrl}` : 'No image URL returned');
        } else {
            logTest('Create product with image', false, 'No product data returned');
        }
    } catch (error) {
        logTest('Create product with image', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 3: Fetch all products
    try {
        const response = await axios.get(`${BASE_URL}/api/product/getAll`);
        const hasProducts = response.data.data && response.data.data.length > 0;
        logTest('Fetch all products', hasProducts,
            `Found ${response.data.data?.length || 0} products`);
    } catch (error) {
        logTest('Fetch all products', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 4: Fetch single product
    if (createdProductId) {
        try {
            const response = await axios.get(`${BASE_URL}/api/product/singleProduct/${createdProductId}`);
            logTest('Fetch single product', response.status === 200 && response.data.data,
                response.data.data?.productName || '');
        } catch (error) {
            logTest('Fetch single product', false, error.response?.data?.message || error.message);
        }
    } else {
        logWarning('Fetch single product', 'Skipped - no product created');
    }
}

// ==================== TEST 6: IMAGE SERVING ====================
async function testImageServing() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('🖼️  TEST 6: IMAGE SERVING');
    console.log(`${"─".repeat(80)}\n`);
    
    // Test if storage directory images are accessible
    try {
        const response = await axios.get(`${BASE_URL}/api/product/getAll`);
        const products = response.data.data || [];
        
        if (products.length === 0) {
            logWarning('Image serving test', 'No products with images found');
            return;
        }
        
        const productWithImage = products.find(p => p.productImageUrl);
        
        if (!productWithImage) {
            logWarning('Image serving test', 'No products have image URLs');
            return;
        }
        
        // Try to fetch the image
        const imageUrl = `${BASE_URL}/${productWithImage.productImageUrl}`;
        console.log(`   Testing image URL: ${imageUrl}`);
        
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const isImage = imageResponse.headers['content-type']?.includes('image');
        
        logTest('Image files are accessible', isImage && imageResponse.status === 200,
            isImage ? `Content-Type: ${imageResponse.headers['content-type']}` : 'Not an image');
            
    } catch (error) {
        logTest('Image files are accessible', false, error.message);
    }
}

// ==================== TEST 7: CART OPERATIONS ====================
async function testCartOperations() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('🛒 TEST 7: CART OPERATIONS (ADD TO CART)');
    console.log(`${"─".repeat(80)}\n`);
    
    if (!userToken) {
        logWarning('Cart tests', 'Skipped - no user token');
        return;
    }
    
    if (!createdProductId) {
        logWarning('Cart tests', 'Skipped - no product to add to cart');
        return;
    }
    
    // Test 1: Add item to cart
    try {
        const response = await axios.post(
            `${BASE_URL}/api/cart`,
            {
                productId: createdProductId,
                quantity: 2
            },
            { headers: { Authorization: userToken } }
        );
        logTest('Add to cart', response.status === 200, response.data.message);
    } catch (error) {
        logTest('Add to cart', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 2: Get cart items
    try {
        const response = await axios.get(
            `${BASE_URL}/api/cart`,
            { headers: { Authorization: userToken } }
        );
        const hasItems = response.data.data && response.data.data.length > 0;
        logTest('Fetch cart items', hasItems,
            `Found ${response.data.data?.length || 0} items in cart`);
    } catch (error) {
        logTest('Fetch cart items', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 3: Update cart quantity
    try {
        const response = await axios.patch(
            `${BASE_URL}/api/cart`,
            {
                productId: createdProductId,
                quantity: 5
            },
            { headers: { Authorization: userToken } }
        );
        logTest('Update cart quantity', response.status === 200, response.data.message);
    } catch (error) {
        logTest('Update cart quantity', false, error.response?.data?.message || error.message);
    }
    
    await sleep(500);
    
    // Test 4: Remove item from cart
    try {
        const response = await axios.delete(
            `${BASE_URL}/api/cart/${createdProductId}`,
            { headers: { Authorization: userToken } }
        );
        logTest('Remove from cart', response.status === 200, response.data.message);
    } catch (error) {
        logTest('Remove from cart', false, error.response?.data?.message || error.message);
    }
}

// ==================== TEST 8: AUTHENTICATION & AUTHORIZATION ====================
async function testAuthAndAuth() {
    console.log(`\n${"─".repeat(80)}`);
    console.log('🔒 TEST 8: AUTHENTICATION & AUTHORIZATION');
    console.log(`${"─".repeat(80)}\n`);
    
    // Test 1: Access protected route without token
    try {
        await axios.post(`${BASE_URL}/api/category`, {
            categoryName: 'Unauthorized Test'
        });
        logTest('Protected route without token', false, 'Should have been rejected');
    } catch (error) {
        const isAuthError = error.response?.status === 401 || error.response?.status === 403;
        logTest('Protected route without token', isAuthError, 
            error.response?.data?.message || 'Properly rejected');
    }
    
    await sleep(500);
    
    // Test 2: Customer trying to access admin route
    if (userToken) {
        try {
            await axios.post(
                `${BASE_URL}/api/category`,
                { categoryName: 'Customer Test Category' },
                { headers: { Authorization: userToken } }
            );
            logTest('Customer accessing admin route', false, 'Should have been rejected');
        } catch (error) {
            const isAuthError = error.response?.status === 401 || error.response?.status === 403;
            logTest('Customer accessing admin route', isAuthError,
                error.response?.data?.message || 'Properly rejected');
        }
    } else {
        logWarning('Customer admin access test', 'Skipped - no user token');
    }
}

// ==================== MAIN TEST RUNNER ====================
async function runAllTests() {
    const startTime = Date.now();
    
    const serverReachable = await testServerConnectivity();
    
    if (!serverReachable) {
        printSummary(startTime);
        return;
    }
    
    await testUserRegistration();
    await testUserLogin();
    await testCategoryOperations();
    await testProductOperations();
    await testImageServing();
    await testCartOperations();
    await testAuthAndAuth();
    
    printSummary(startTime);
}

function printSummary(startTime) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`\n${"=".repeat(80)}`);
    console.log(`📊 TEST SUMMARY`);
    console.log(`${"=".repeat(80)}\n`);
    
    console.log(`✅ PASSED: ${results.passed.length} tests`);
    if (results.passed.length > 0) {
        results.passed.forEach(test => console.log(`   ✓ ${test}`));
    }
    
    console.log(`\n❌ FAILED: ${results.failed.length} tests`);
    if (results.failed.length > 0) {
        results.failed.forEach(({ name, message }) => {
            console.log(`   ✗ ${name}`);
            console.log(`     → ${message}`);
        });
    }
    
    console.log(`\n⚠️  WARNINGS: ${results.warnings.length}`);
    if (results.warnings.length > 0) {
        results.warnings.forEach(({ name, message }) => {
            console.log(`   ⚠  ${name}: ${message}`);
        });
    }
    
    const total = results.passed.length + results.failed.length;
    const passRate = total > 0 ? ((results.passed.length / total) * 100).toFixed(1) : 0;
    
    console.log(`\n${"─".repeat(80)}`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📈 Pass Rate: ${passRate}%`);
    console.log(`${"=".repeat(80)}\n`);
    
    // Specific issue checks
    console.log(`\n🔍 ISSUE STATUS CHECK:\n`);
    
    const imageTest = results.passed.includes('Image files are accessible') ||
                     results.passed.includes('Create product with image');
    console.log(`1. Images being shown: ${imageTest ? '✅ WORKING' : '❌ NOT WORKING'}`);
    
    const cartTest = results.passed.includes('Add to cart');
    console.log(`2. Add to cart option: ${cartTest ? '✅ WORKING' : '❌ NOT WORKING or NOT TESTED'}`);
    
    const regTest = results.passed.includes('User registration') && 
                    results.passed.includes('Admin registration');
    console.log(`3. Registration: ${regTest ? '✅ WORKING' : '❌ ISSUES DETECTED'}`);
    
    console.log(`\n${"=".repeat(80)}\n`);
}

// Run all tests
runAllTests().catch(error => {
    console.error('\n❌ Fatal error running tests:', error);
    process.exit(1);
});

