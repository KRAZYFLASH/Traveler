// Test data untuk API add-promo
// Gunakan di Postman atau tool testing lainnya

/*
Method: POST
URL: http://localhost:3001/api/admin/add-promo
Content-Type: multipart/form-data

Form Data Fields:
*/

// Required fields
code: "TESTPROMO2024"
title: "Test Promotion"
type: "percentage"
value: "15"

// Optional fields  
description: "This is a test promotion"
maxDiscount: "100000"
minSpend: "500000"
appliesTo: ["flight", "train"]
validPeriod: {"startDate": "2024-10-01", "endDate": "2024-12-31"}
usage: {"quota": 100, "userLimit": 1}
termsConditions: "Valid for new users only"
status: "active"

// File field (optional)
image: [select file from computer]

/*
CURL Example:
curl -X POST http://localhost:3001/api/admin/add-promo \
  -F "code=TESTPROMO2024" \
  -F "title=Test Promotion" \
  -F "type=percentage" \
  -F "value=15" \
  -F "description=This is a test promotion" \
  -F "maxDiscount=100000" \
  -F "minSpend=500000" \
  -F "appliesTo=[\"flight\", \"train\"]" \
  -F "validPeriod={\"startDate\": \"2024-10-01\", \"endDate\": \"2024-12-31\"}" \
  -F "usage={\"quota\": 100, \"userLimit\": 1}" \
  -F "termsConditions=Valid for new users only" \
  -F "status=active" \
  -F "image=@/path/to/image.jpg"
*/

/*
Expected Response (Success):
{
  "success": true,
  "message": "Promotion created successfully", 
  "data": {
    "_id": "...",
    "code": "TESTPROMO2024",
    "title": "Test Promotion",
    "type": "percentage",
    "value": 15,
    "image": "https://res.cloudinary.com/...",
    // ... other fields
  }
}

Expected Response (Error):
{
  "success": false,
  "message": "Error message here",
  "errors": ["field1 error", "field2 error"] // for validation errors
}
*/