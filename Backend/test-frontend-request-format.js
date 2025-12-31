import axios from 'axios';
import FormData from 'form-data';

const API_BASE_URL = 'https://ecom-app-demo-backend.onrender.com';

// Simulate EXACT frontend request format
async function testFrontendRequestFormat() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 TESTING FRONTEND REQUEST FORMAT');
    console.log('='.repeat(60) + '\n');

    try {
        // Step 1: Login (like frontend does)
        console.log('1️⃣ Logging in...');
        const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
            email: 'admin@example.com',
            password: 'adminpassword123'
        });

        const token = loginResponse.data.token;
        console.log('✅ Login successful\n');

        // Step 2: Create FormData exactly like frontend
        console.log('2️⃣ Creating FormData (exactly like frontend)...');
        const formData = new FormData();
        formData.append('categoryName', 'FrontendTest_' + Date.now());
        // No image (testing without image first)
        
        console.log('   FormData created with:');
        console.log('     - categoryName: FrontendTest_' + Date.now());
        console.log('     - image: (none)');
        console.log('');

        // Step 3: Make request exactly like frontend would
        console.log('3️⃣ Sending request (simulating frontend axios call)...');
        console.log('   URL: /api/category/');
        console.log('   Method: POST');
        console.log('   Headers:');
        console.log(`     - Authorization: ${token.substring(0, 30)}...`);
        console.log('     - Content-Type: (will be set by FormData with boundary)');
        console.log('');

        const response = await axios.post(
            `${API_BASE_URL}/api/category/`,
            formData,
            {
                headers: {
                    'Authorization': token,
                    // Don't set Content-Type - let FormData set it
                    ...formData.getHeaders()
                }
            }
        );

        console.log('✅ SUCCESS! Request format works!');
        console.log('\nResponse:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n✅ Frontend request format is CORRECT!');
        console.log('   The issue was likely the default Content-Type header in axios instance.');
        console.log('   This has been fixed in the latest commit.\n');

    } catch (error) {
        console.error('\n❌ ERROR:');
        console.error('Status:', error.response?.status);
        console.error('Message:', error.response?.data?.message || error.message);
        console.error('Response:', JSON.stringify(error.response?.data, null, 2));
    }
}

testFrontendRequestFormat();

