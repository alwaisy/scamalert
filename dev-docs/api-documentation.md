# ScamAlert API Documentation

## 🔐 Authentication
All APIs require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📋 API Endpoints

### 1. **GET /api/scams** - List Scams
Fetch paginated list of scams with filtering and sorting.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (max: 50, default: 20)
- `type` (string): Filter by scam type
- `location` (string): Filter by location
- `search` (string): Search in title and content
- `status` (string): Filter by status (default: "approved")
- `sortBy` (string): Sort by "createdAt", "upvotes", "comments"
- `sortOrder` (string): "asc" or "desc" (default: "desc")

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Fake JazzCash Agent Scam",
      "content": "I was traveling from Islamabad...",
      "type": "mobile-banking",
      "platforms": ["JazzCash", "WhatsApp"],
      "locations": ["Islamabad", "Peshawar"],
      "evidenceUrls": ["https://example.com/image1.jpg"],
      "isAnonymous": true,
      "status": "approved",
      "upvotesCount": 127,
      "commentsCount": 5,
      "createdAt": "2024-01-15T10:30:00Z",
      "author": {
        "id": 1,
        "username": "AnonymousVictim"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 2. **GET /api/scams/[id]** - Get Single Scam
Fetch detailed scam information with comments and upvote status.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Fake JazzCash Agent Scam",
    "content": "I was traveling from Islamabad...",
    "type": "mobile-banking",
    "platforms": ["JazzCash", "WhatsApp"],
    "locations": ["Islamabad", "Peshawar"],
    "evidenceUrls": ["https://example.com/image1.jpg"],
    "isAnonymous": true,
    "status": "approved",
    "upvotesCount": 127,
    "commentsCount": 5,
    "createdAt": "2024-01-15T10:30:00Z",
    "comments": [
      {
        "id": 1,
        "content": "Same thing happened to me!",
        "createdAt": "2024-01-15T11:00:00Z",
        "author": {
          "id": 2,
          "username": "Zain Ali"
        }
      }
    ],
    "userUpvoted": false
  }
}
```

### 3. **POST /api/scams** - Create Scam
Create a new scam report.

**Request Body:**
```json
{
  "title": "Fake JazzCash Agent Scam",
  "content": "I was traveling from Islamabad to Peshawar...",
  "type": "mobile-banking",
  "platforms": ["JazzCash", "WhatsApp"],
  "locations": ["Islamabad", "Peshawar", "Hakla"],
  "evidenceUrls": ["https://example.com/image1.jpg"],
  "isAnonymous": true
}
```

**Validation Rules:**
- `title`: 10-200 characters
- `content`: 50-5000 characters
- `type`: Must be valid scam type
- `platforms`: Array of 1-10 strings
- `locations`: Array of 1-10 strings
- `evidenceUrls`: Optional array of valid URLs
- `isAnonymous`: Boolean (default: false)

**Rate Limiting:**
- Maximum 5 posts per hour per user

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Fake JazzCash Agent Scam",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Scam posted successfully and is pending approval"
}
```

### 4. **POST /api/scams/[id]/upvote** - Upvote Scam
Toggle upvote on a scam (add/remove).

**Response:**
```json
{
  "success": true,
  "data": {
    "upvoted": true,
    "upvotesCount": 128
  },
  "message": "Scam upvoted successfully"
}
```

### 5. **POST /api/scams/[id]/comments** - Add Comment
Add a comment to a scam.

**Request Body:**
```json
{
  "content": "Same thing happened to me at Sialkot rest area!"
}
```

**Validation Rules:**
- `content`: 1-1000 characters

**Rate Limiting:**
- Maximum 10 comments per 5 minutes per user

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "content": "Same thing happened to me at Sialkot rest area!",
    "scamId": 1,
    "authorId": 2,
    "createdAt": "2024-01-15T11:00:00Z"
  },
  "message": "Comment added successfully"
}
```

### 6. **GET /api/upload/signature** - Get Upload Signature (Client-Side Upload)
Get signature for client-side ImageKit upload (recommended for cost optimization).

**Query Parameters:**
- `fileName` (string): Original file name
- `folder` (string): Folder path (default: "scamalert/evidence")

**Response:**
```json
{
  "success": true,
  "data": {
    "signature": "abc123...",
    "expire": 1754049956,
    "publicKey": "your_public_key",
    "urlEndpoint": "https://ik.imagekit.io/your-endpoint",
    "fileName": "1754049956_abc123.jpg",
    "folder": "scamalert/evidence"
  },
  "message": "Upload signature generated successfully"
}
```

### 7. **POST /api/upload** - Server-Side Upload (Legacy)
Upload evidence images using server-side processing (not recommended for production).

**Request Body:**
```json
{
  "file": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "fileName": "evidence.jpg",
  "folder": "scamalert/evidence"
}
```

**Validation Rules:**
- `file`: Base64 encoded image
- `fileName`: 1-100 characters
- `folder`: Optional folder path (default: "scamalert/evidence")
- File size: Maximum 5MB
- File types: JPEG, PNG, GIF, WebP

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://ik.imagekit.io/your-endpoint/scamalert/evidence/1234567890_abc123.jpg",
    "fileId": "file_abc123",
    "fileName": "1234567890_abc123.jpg",
    "size": 1024000
  },
  "message": "File uploaded successfully"
}
```

### 8. **POST /api/admin/scams/[id]/moderate** - Moderate Scam (Admin)
Approve or reject scams (admin only).

**Request Body:**
```json
{
  "action": "approve",
  "reason": "Valid scam report with evidence"
}
```

**Validation Rules:**
- `action`: "approve" or "reject"
- `reason`: Optional string

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "approved"
  },
  "message": "Scam approved successfully"
}
```

## 🔧 Error Responses

All APIs return consistent error responses:

```json
{
  "statusCode": 400,
  "statusMessage": "Validation failed",
  "data": [
    {
      "code": "invalid_string",
      "message": "Title must be at least 10 characters",
      "path": ["title"]
    }
  ]
}
```

**Common Status Codes:**
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `429`: Too Many Requests (rate limited)
- `500`: Internal Server Error

## 📊 Scam Types

Available scam types:
- `mobile-banking`: JazzCash, EasyPaisa scams
- `job-scams`: Fake job offers, advance fees
- `property`: Fake plots, documents
- `online-shopping`: Fake products, ghost sellers
- `investment`: Crypto, Ponzi schemes
- `education`: Visa, fake universities
- `romance`: Catfishing, relationship scams
- `other`: Miscellaneous scams

## 🏷️ Scam Status

- `pending`: Awaiting moderation
- `approved`: Published and visible
- `rejected`: Rejected by moderators

## 🔒 Security Features

1. **Rate Limiting**: Prevents spam and abuse
2. **File Validation**: Checks file type and size
3. **Input Sanitization**: Prevents XSS attacks
4. **Authentication**: JWT-based auth for all endpoints
5. **Moderation**: Admin approval for scam posts

## 🚀 ImageKit Integration

### **Client-Side Upload (Recommended)**
For cost optimization, use client-side uploads:

```javascript
// Using the composable
const { uploadFile } = useImageUpload();

const handleFileUpload = async (file) => {
  try {
    const result = await uploadFile(file);
    console.log('Uploaded:', result.url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### **Server-Side Upload (Legacy)**
For server-side processing (higher costs):

```javascript
const formData = new FormData();
formData.append('file', base64Data);
formData.append('fileName', 'evidence.jpg');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
```

### **ImageKit Benefits:**
- **Automatic Optimization**: Images are optimized automatically
- **CDN**: Global content delivery
- **Transformations**: Resize, crop via URL parameters
- **Secure Storage**: Private key authentication
- **Folder Organization**: Organized in folders

**ImageKit Environment Variables Required:**
```env
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-endpoint
```

## 💰 Cost Optimization

**Client-Side Upload Benefits:**
- ✅ **Reduced Server Load**: Files go directly to ImageKit
- ✅ **Lower Bandwidth Costs**: No server bandwidth usage
- ✅ **Better Performance**: Faster uploads
- ✅ **Scalability**: No server storage needed
- ✅ **Security**: Signed URLs prevent abuse 