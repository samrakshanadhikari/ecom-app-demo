import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'https://ecom-app-demo-backend.onrender.com';

async function testCategoryCreation() {
    console.log('🧪 Testing Category Creation...\n');

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
        console.log('✅ Login successful!\n');

        // Step 2: Create FormData
        console.log('2️⃣ Creating FormData...');
        const formData = new FormData();
        formData.append('categoryName', 'TestCategory_' + Date.now());
        
        // Try to create a dummy image file for testing
        const testImagePath = path.join(process.cwd(), 'test-image.txt');
        if (!fs.existsSync(testImagePath)) {
            fs.writeFileSync(testImagePath, 'dummy image content');
        }
        
        // For testing without image first
        console.log('   - Category name: TestCategory_' + Date.now());
        console.log('   - Image: (none for this test)\n');

        // Step 3: Make POST request
        console.log('3️⃣ Sending POST request to /api/category/...');
        const categoryResponse = await axios.post(
            `${API_BASE_URL}/api/category/`,
            formData,
            {
                headers: {
                    'Authorization': token,
                    ...formData.getHeaders()
                }
            }
        );

        console.log('✅ Category created successfully!');
        console.log('Response:', JSON.stringify(categoryResponse.data, null, 2));

    } catch (error) {
        console.error('\n❌ Error creating category:');
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Error Data:', JSON.stringify(error.response?.data, null, 2));
        console.error('Error Message:', error.message);
        
        if (error.response?.data) {
            console.error('\n📋 Full Error Response:');
            console.error(JSON.stringify(error.response.data, null, 2));
        }
    }
}

testCategoryCreation();





