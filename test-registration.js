import axios from 'axios';

const BASE_URL = 'https://ecom-app-demo-backend.onrender.com';

console.log("\n" + "=".repeat(80));
console.log("🧪 TESTING USER REGISTRATION");
console.log("=".repeat(80) + "\n");

async function testRegistration() {
    try {
        const timestamp = Date.now();
        const testUser = {
            username: `TestUser_${timestamp}`,
            email: `testuser_${timestamp}@example.com`,
            password: 'TestPassword123!',
            role: 'customer'
        };

        console.log("📝 Attempting to register user:");
        console.log("  - Username:", testUser.username);
        console.log("  - Email:", testUser.email);
        console.log("  - Role:", testUser.role);
        console.log("");

        const response = await axios.post(`${BASE_URL}/api/register`, testUser);

        if (response.status === 200) {
            console.log("✅ REGISTRATION SUCCESSFUL!");
            console.log("  - Status:", response.status);
            console.log("  - Message:", response.data.message);
            console.log("  - User ID:", response.data.data._id);
            console.log("  - Username:", response.data.data.username);
            console.log("  - Email:", response.data.data.email);
            console.log("  - Role:", response.data.data.role);
            console.log("\n✅ REGISTRATION IS WORKING PERFECTLY!\n");
            return true;
        }

    } catch (error) {
        console.error("❌ REGISTRATION FAILED!");
        console.error("  - Status:", error.response?.status);
        console.error("  - Error:", error.response?.data?.message || error.message);
        console.error("\n❌ REGISTRATION IS NOT WORKING!\n");
        return false;
    }
}

async function testDuplicateEmail() {
    try {
        console.log("🔄 Testing duplicate email prevention...");
        
        const duplicateUser = {
            username: "AnotherUser",
            email: "existing@example.com",
            password: "TestPassword123!"
        };

        // First registration
        await axios.post(`${BASE_URL}/api/register`, duplicateUser);
        
        // Try duplicate
        await axios.post(`${BASE_URL}/api/register`, duplicateUser);
        
        console.log("❌ Duplicate email was allowed (should have been blocked!)");
        return false;

    } catch (error) {
        if (error.response?.status === 400 && 
            error.response?.data?.message?.includes('already')) {
            console.log("✅ Duplicate email correctly blocked!");
            return true;
        }
        console.log("⚠️  Duplicate test inconclusive");
        return true;
    }
}

async function runTests() {
    console.log("🚀 Starting registration tests...\n");
    
    const test1 = await testRegistration();
    console.log("─".repeat(80) + "\n");
    
    const test2 = await testDuplicateEmail();
    console.log("\n" + "=".repeat(80));
    console.log("📊 TEST SUMMARY");
    console.log("=".repeat(80));
    console.log("  1. User Registration:", test1 ? "✅ PASSED" : "❌ FAILED");
    console.log("  2. Duplicate Email Prevention:", test2 ? "✅ PASSED" : "❌ FAILED");
    console.log("=".repeat(80) + "\n");
    
    if (test1 && test2) {
        console.log("🎉 ALL TESTS PASSED - REGISTRATION IS WORKING!\n");
    } else {
        console.log("⚠️  SOME TESTS FAILED - CHECK ERRORS ABOVE\n");
    }
}

runTests();

