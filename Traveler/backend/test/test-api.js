import fetch from "node-fetch";
import FormData from "form-data";

// Test API add-promo
async function testAddPromo() {
  try {
    const formData = new FormData();

    // Required fields
    formData.append("code", "TESTPROMO2024");
    formData.append("title", "Test Promotion");
    formData.append("type", "percentage");
    formData.append("value", "15");

    // Optional fields
    formData.append("description", "This is a test promotion");
    formData.append("maxDiscount", "100000");
    formData.append("minSpend", "500000");
    formData.append("appliesTo", JSON.stringify(["flight", "train"]));
    formData.append(
      "validPeriod",
      JSON.stringify({
        startDate: "2024-10-01",
        endDate: "2024-12-31",
      })
    );
    formData.append(
      "usage",
      JSON.stringify({
        quota: 100,
        userLimit: 1,
      })
    );
    formData.append("termsConditions", "Valid for new users only");
    formData.append("status", "active");

    const response = await fetch("http://localhost:3001/api/admin/add-promo", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Test Error:", error.message);
  }
}

// Health check test
async function testHealth() {
  try {
    const response = await fetch("http://localhost:3001/health");
    const result = await response.json();
    console.log("Health Check:", result);
  } catch (error) {
    console.error("Health Check Error:", error.message);
  }
}

// Run tests
console.log("Testing Health Check...");
await testHealth();

console.log("\nTesting Add Promo...");
await testAddPromo();
