import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'https://ecom-app-demo-backend.onrender.com';

async function testCategoryCreationWithImage() {
    console.log('🧪 Testing Category Creation with Full Request...\n');

    try {
        // Step 1: Login as admin
        console.log('1️⃣ Logging in as admin...');
        const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
            email: 'admin@example.com',
            password: 'adminpassword123'
        });

        if (!loginResponse.data.token) {
            console.error('❌ Login failed:', loginResponse.data);
            return;
        }

        const token = loginResponse.data.token;
        console.log('✅ Login successful!');
        console.log('   Token:', token.substring(0, 20) + '...\n');

        // Step 2: Create FormData exactly like frontend
        console.log('2️⃣ Creating FormData (exactly like frontend)...');
        const formData = new FormData();
        const categoryName = 'TestCategory_' + Date.now();
        formData.append('categoryName', categoryName);
        console.log('   - Category name:', categoryName);
        console.log('   - Image: (none)\n');

        // Step 3: Make POST request exactly like frontend
        console.log('3️⃣ Sending POST request to /api/category/...');
        console.log('   URL:', `${API_BASE_URL}/api/category/`);
        console.log('   Method: POST');
        console.log('   Headers:');
        console.log('     - Authorization:', token.substring(0, 20) + '...');
        console.log('     - Content-Type: (will be set by FormData)\n');

        const categoryResponse = await axios.post(
            `${API_BASE_URL}/api/category/`,
            formData,
            {
                headers: {
                    'Authorization': token,
                    ...formData.getHeaders()
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        console.log('✅ SUCCESS! Category created!');
        console.log('Response Status:', categoryResponse.status);
        console.log('Response Data:', JSON.stringify(categoryResponse.data, null, 2));

    } catch (error) {
        console.error('\n❌ ERROR CREATING CATEGORY:');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Status Code:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('\nError Response Data:');
        console.error(JSON.stringify(error.response?.data, null, 2));
        console.error('\nError Message:', error.message);
        console.error('\nRequest Config:');
        console.error('  URL:', error.config?.url);
        console.error('  Method:', error.config?.method);
        console.error('  Headers:', JSON.stringify(error.config?.headers, null, 2));
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        if (error.response?.status === 401) {
            console.error('\n⚠️  AUTHENTICATION ERROR:');
            console.error('   - Token might be invalid');
            console.error('   - User might not be admin');
        }
        
        if (error.response?.status === 400) {
            console.error('\n⚠️  VALIDATION ERROR:');
            console.error('   - Check if category name is required');
            console.error('   - Check if category name already exists');
        }
        
        if (error.response?.status === 500) {
            console.error('\n⚠️  SERVER ERROR:');
            console.error('   - Check backend logs on Render');
            console.error('   - Check MongoDB connection');
        }
    }
}

testCategoryCreationWithImage();





