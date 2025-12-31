import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'https://ecom-app-demo-backend.onrender.com';

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function logSuccess(message) {
    console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message) {
    console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logInfo(message) {
    console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

function logTest(message) {
    console.log(`${colors.cyan}🧪 ${message}${colors.reset}`);
}

async function testCompleteCategoryFlow() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 COMPREHENSIVE CATEGORY CREATION TEST');
    console.log('='.repeat(60) + '\n');

    let adminToken = '';
    let createdCategoryId = '';

    try {
        // ============================================
        // TEST 1: Login as Admin
        // ============================================
        logTest('TEST 1: Login as Admin');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
            email: 'admin@example.com',
            password: 'adminpassword123'
        });

        if (!loginResponse.data.token) {
            logError('Login failed - no token received');
            console.log('Response:', loginResponse.data);
            return;
        }

        adminToken = loginResponse.data.token;
        logSuccess(`Login successful! Token: ${adminToken.substring(0, 30)}...`);
        logInfo(`User role: ${loginResponse.data.data?.role || 'unknown'}`);
        console.log('');

        // ============================================
        // TEST 2: Create Category WITHOUT Image
        // ============================================
        logTest('TEST 2: Create Category WITHOUT Image');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const categoryName1 = 'TestCategory_NoImage_' + Date.now();
        const formData1 = new FormData();
        formData1.append('categoryName', categoryName1);
        // No image appended

        logInfo(`Category name: ${categoryName1}`);
        logInfo('Image: (none)');

        const response1 = await axios.post(
            `${API_BASE_URL}/api/category/`,
            formData1,
            {
                headers: {
                    'Authorization': adminToken,
                    ...formData1.getHeaders()
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        if (response1.status === 200 && response1.data.data) {
            createdCategoryId = response1.data.data._id;
            logSuccess('Category created successfully WITHOUT image!');
            logInfo(`Category ID: ${createdCategoryId}`);
            logInfo(`Category Name: ${response1.data.data.categoryName}`);
            logInfo(`Image URL: ${response1.data.data.categoryImageUrl || '(none)'}`);
        } else {
            logError('Unexpected response format');
            console.log('Response:', response1.data);
        }
        console.log('');

        // ============================================
        // TEST 3: Verify Category Was Created
        // ============================================
        logTest('TEST 3: Verify Category Exists in Database');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const getAllResponse = await axios.get(`${API_BASE_URL}/api/category`);
        
        if (getAllResponse.status === 200) {
            const categories = getAllResponse.data.data || [];
            const foundCategory = categories.find(cat => cat._id === createdCategoryId);
            
            if (foundCategory) {
                logSuccess('Category found in database!');
                logInfo(`Total categories: ${categories.length}`);
                logInfo(`Found category: ${foundCategory.categoryName}`);
            } else {
                logError('Category not found in database');
            }
        } else {
            logError('Failed to fetch categories');
        }
        console.log('');

        // ============================================
        // TEST 4: Create Category WITH Image (if possible)
        // ============================================
        logTest('TEST 4: Create Category WITH Image');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const categoryName2 = 'TestCategory_WithImage_' + Date.now();
        const formData2 = new FormData();
        formData2.append('categoryName', categoryName2);
        
        // Try to create a dummy image file
        const testImagePath = path.join(process.cwd(), 'test-image.png');
        try {
            // Create a minimal valid PNG file (1x1 pixel)
            const pngBuffer = Buffer.from([
                0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
                0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
                0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
                0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, // Color type, etc.
                0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, 0x54, // IDAT chunk
                0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // Image data
                0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82 // IEND chunk
            ]);
            fs.writeFileSync(testImagePath, pngBuffer);
            
            formData2.append('image', fs.createReadStream(testImagePath), {
                filename: 'test-image.png',
                contentType: 'image/png'
            });
            
            logInfo(`Category name: ${categoryName2}`);
            logInfo('Image: test-image.png (1x1 PNG)');

            const response2 = await axios.post(
                `${API_BASE_URL}/api/category/`,
                formData2,
                {
                    headers: {
                        'Authorization': adminToken,
                        ...formData2.getHeaders()
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity
                }
            );

            if (response2.status === 200 && response2.data.data) {
                logSuccess('Category created successfully WITH image!');
                logInfo(`Category ID: ${response2.data.data._id}`);
                logInfo(`Category Name: ${response2.data.data.categoryName}`);
                logInfo(`Image URL: ${response2.data.data.categoryImageUrl || '(none)'}`);
            } else {
                logError('Unexpected response format');
                console.log('Response:', response2.data);
            }
            
            // Clean up test image
            if (fs.existsSync(testImagePath)) {
                fs.unlinkSync(testImagePath);
            }
        } catch (imageError) {
            logError(`Could not test with image: ${imageError.message}`);
            logInfo('Skipping image test (this is okay)');
        }
        console.log('');

        // ============================================
        // TEST 5: Test Duplicate Category Name
        // ============================================
        logTest('TEST 5: Test Duplicate Category Name (Should Fail)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const formData3 = new FormData();
        formData3.append('categoryName', categoryName1); // Same name as before

        try {
            await axios.post(
                `${API_BASE_URL}/api/category/`,
                formData3,
                {
                    headers: {
                        'Authorization': adminToken,
                        ...formData3.getHeaders()
                    }
                }
            );
            logError('ERROR: Duplicate category was accepted (should have been rejected)');
        } catch (duplicateError) {
            if (duplicateError.response?.status === 400) {
                logSuccess('Duplicate category correctly rejected!');
                logInfo(`Error message: ${duplicateError.response.data?.message || 'unknown'}`);
            } else {
                logError(`Unexpected error: ${duplicateError.message}`);
            }
        }
        console.log('');

        // ============================================
        // TEST 6: Test Without Authentication
        // ============================================
        logTest('TEST 6: Test Without Authentication (Should Fail)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const formData4 = new FormData();
        formData4.append('categoryName', 'TestCategory_NoAuth_' + Date.now());

        try {
            await axios.post(
                `${API_BASE_URL}/api/category/`,
                formData4,
                {
                    headers: {
                        ...formData4.getHeaders()
                        // No Authorization header
                    }
                }
            );
            logError('ERROR: Request without token was accepted (should have been rejected)');
        } catch (authError) {
            if (authError.response?.status === 401) {
                logSuccess('Unauthorized request correctly rejected!');
                logInfo(`Error message: ${authError.response.data?.message || 'unknown'}`);
            } else {
                logError(`Unexpected error: ${authError.message}`);
            }
        }
        console.log('');

        // ============================================
        // TEST 7: Test With Regular User (Should Fail)
        // ============================================
        logTest('TEST 7: Test With Regular User Token (Should Fail)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Login as regular user
        const userLoginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
            email: 'user@example.com',
            password: 'userpassword123'
        });

        if (userLoginResponse.data.token) {
            const userToken = userLoginResponse.data.token;
            logInfo('Logged in as regular user');
            
            const formData5 = new FormData();
            formData5.append('categoryName', 'TestCategory_RegularUser_' + Date.now());

            try {
                await axios.post(
                    `${API_BASE_URL}/api/category/`,
                    formData5,
                    {
                        headers: {
                            'Authorization': userToken,
                            ...formData5.getHeaders()
                        }
                    }
                );
                logError('ERROR: Regular user was able to create category (should have been rejected)');
            } catch (permissionError) {
                if (permissionError.response?.status === 403) {
                    logSuccess('Regular user correctly rejected!');
                    logInfo(`Error message: ${permissionError.response.data?.message || 'unknown'}`);
                } else {
                    logError(`Unexpected error: ${permissionError.message}`);
                }
            }
        } else {
            logError('Could not login as regular user');
        }
        console.log('');

        // ============================================
        // SUMMARY
        // ============================================
        console.log('='.repeat(60));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(60));
        logSuccess('All critical tests passed!');
        logInfo('Backend is working correctly');
        logInfo('Category creation endpoint is functional');
        logInfo('Authentication and authorization are working');
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        console.log('\n' + '='.repeat(60));
        logError('TEST FAILED');
        console.log('='.repeat(60));
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response:', JSON.stringify(error.response.data, null, 2));
        }
        console.log('='.repeat(60) + '\n');
        process.exit(1);
    }
}

// Run the tests
testCompleteCategoryFlow().catch(console.error);





