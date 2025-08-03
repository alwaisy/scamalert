# ScamAlert API Security Implementation

## 🎯 **Problem Statement**

### **Current Issue**
- External users can access our API endpoints
- Simple API keys can be easily discovered in browser headers
- CORS unblock extensions can bypass origin checks
- Need granular control over security layers
- Want to ensure only our application can access the API

### **Security Requirements**
- ✅ Block all external API access
- ✅ Allow only authenticated users
- ✅ Prevent API key exposure in browser
- ✅ Implement multiple security layers
- ✅ Granular control over each security layer
- ✅ Cost-effective implementation

---

## 🛡️ **Discussed Solutions**

### **Solution 1: Simple API Key (❌ Rejected)**
```typescript
// Problem: Can be seen in browser headers
const apiKey = getHeader(event, 'x-api-key')
if (apiKey !== storedKey) // Block
```
**Issues:**
- API key visible in browser Network tab
- Easy to discover and reuse
- Single point of failure

### **Solution 2: Origin-Based Protection (❌ Rejected)**
```typescript
// Problem: CORS unblock extensions can bypass
const origin = getHeader(event, 'origin')
if (!origin.includes('yourdomain.com')) // Block
```
**Issues:**
- CORS unblock extensions can bypass
- Headers can be spoofed
- Not reliable for security

### **Solution 3: Session-Based Only (❌ Rejected)**
```typescript
// Problem: Still allows authenticated external users
if (!event.context.user) // Block
```
**Issues:**
- External users can still register/login
- Doesn't prevent API abuse
- No application-level protection

---

## ✅ **Final Solution: Multi-Layer Security System**

### **Architecture Overview**
```
Request → Layer 1 (Rate Limiting) → Layer 2 (Authentication) → Layer 3 (Signature Verification) → API
```

### **Layer 1: Rate Limiting & IP Tracking**
```typescript
// server/middleware/rate-limiting.ts
const requestCounts = new Map<string, { count: number, resetTime: number }>()

export default defineEventHandler(async (event) => {
  const clientIP = getRequestIP(event)
  const now = Date.now()
  const window = 60 * 1000 // 1 minute window
  
  // Get or create tracking for this IP
  const tracking = requestCounts.get(clientIP) || { count: 0, resetTime: now + window }
  
  // Reset if window expired
  if (now > tracking.resetTime) {
    tracking.count = 0
    tracking.resetTime = now + window
  }
  
  // Check rate limit
  if (tracking.count >= 100) { // 100 requests per minute
    throw createError({
      statusCode: 429,
      statusMessage: 'Rate limit exceeded',
      data: { retryAfter: Math.ceil((tracking.resetTime - now) / 1000) }
    })
  }
  
  // Increment counter
  tracking.count++
  requestCounts.set(clientIP, tracking)
})
```

### **Layer 2: User Authentication**
```typescript
// server/middleware/auth.ts (Enhanced)
export default defineEventHandler(async (event) => {
  // Skip auth routes
  if (getRequestURL(event).pathname.startsWith('/api/auth/')) {
    return
  }

  // Check if user is authenticated
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  // Verify token and add user to context
  try {
    const userData = verifyToken(token)
    if (!userData) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }
    event.context.user = userData
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed'
    })
  }
})
```

### **Layer 3: Application Signature Verification**
```typescript
// server/middleware/app-signature.ts
import { createHmac } from 'crypto'

export default defineEventHandler(async (event) => {
  // Skip auth routes
  if (getRequestURL(event).pathname.startsWith('/api/auth/')) {
    return
  }

  const config = useRuntimeConfig()
  const serverSecret = config.serverSecret // Hidden server-side secret

  // Get signature components
  const clientToken = getHeader(event, 'x-client-token')
  const timestamp = getHeader(event, 'x-timestamp')
  const signature = getHeader(event, 'x-signature')

  // Validate timestamp (prevent replay attacks)
  if (!timestamp || Date.now() - parseInt(timestamp) > 300000) { // 5 minutes
    throw createError({
      statusCode: 403,
      statusMessage: 'Token expired'
    })
  }

  // Validate signature
  const expectedSignature = createHmac('sha256', serverSecret)
    .update(`${clientToken}:${timestamp}`)
    .digest('hex')

  if (signature !== expectedSignature) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid application signature'
    })
  }
})
```

### **Layer 4: Request Validation**
```typescript
// server/middleware/request-validation.ts
export default defineEventHandler(async (event) => {
  // Validate request method
  const method = getMethod(event)
  const path = getRequestURL(event).pathname
  
  // Define allowed methods per endpoint
  const allowedMethods = {
    '/api/scams': ['GET', 'POST'],
    '/api/scams/[id]': ['GET'],
    '/api/scams/[id]/upvote': ['POST'],
    '/api/scams/[id]/comments': ['POST']
  }
  
  // Check if method is allowed for this path
  const pathPattern = Object.keys(allowedMethods).find(pattern => 
    path.match(new RegExp(pattern.replace('[id]', '[^/]+')))
  
  if (pathPattern && !allowedMethods[pathPattern].includes(method)) {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }
})
```

---

## 🔧 **Implementation Plan**

### **Phase 1: Core Security (Week 1)**
1. **Add server secret to runtime config**
2. **Implement rate limiting middleware**
3. **Enhance authentication middleware**
4. **Create signature verification middleware**

### **Phase 2: Client Integration (Week 2)**
1. **Create secure API client**
2. **Implement token generation**
3. **Add error handling**
4. **Test all endpoints**

### **Phase 3: Advanced Features (Week 3)**
1. **Add request validation**
2. **Implement logging and monitoring**
3. **Add admin controls**
4. **Performance optimization**

---

## 💰 **Cost Analysis**

### **Server Resources**
- **Rate Limiting**: ~5% CPU overhead
- **Signature Verification**: ~2% CPU overhead
- **Authentication**: ~3% CPU overhead
- **Total Overhead**: ~10% additional CPU usage

### **Memory Usage**
- **Request Tracking**: ~50MB for 10,000 concurrent users
- **Token Storage**: ~20MB for active sessions
- **Total Memory**: ~70MB additional

### **Bandwidth Impact**
- **Signature Headers**: +200 bytes per request
- **Total Overhead**: <1% bandwidth increase

### **Cost Breakdown**
| Component | Monthly Cost | Description |
|-----------|-------------|-------------|
| CPU Overhead | $5-10 | Additional processing |
| Memory | $2-5 | Request tracking storage |
| Bandwidth | $1-3 | Header overhead |
| **Total** | **$8-18** | Per month |

---

## 🚧 **Challenges & Solutions**

### **Challenge 1: Performance Impact**
**Problem**: Multiple middleware layers slow down requests
**Solution**: 
- Use efficient data structures for rate limiting
- Cache signature verification results
- Implement connection pooling

### **Challenge 2: Token Management**
**Problem**: Managing secure token generation and validation
**Solution**:
- Use cryptographically secure random generators
- Implement token rotation
- Add token blacklisting for compromised tokens

### **Challenge 3: Error Handling**
**Problem**: Complex error scenarios with multiple layers
**Solution**:
- Implement detailed error logging
- Create user-friendly error messages
- Add retry mechanisms for transient failures

### **Challenge 4: Monitoring & Debugging**
**Problem**: Hard to debug issues across multiple layers
**Solution**:
- Add comprehensive logging
- Implement request tracing
- Create admin dashboard for monitoring

---

## 🔄 **Refactoring Requirements**

### **File Structure Changes**
```
server/
├── middleware/
│   ├── rate-limiting.ts      # NEW
│   ├── auth.ts              # MODIFIED
│   ├── app-signature.ts     # NEW
│   └── request-validation.ts # NEW
├── lib/
│   ├── security.ts          # NEW
│   └── rate-limiter.ts      # NEW
└── api/
    └── (existing files)     # NO CHANGES
```

### **Configuration Changes**
```typescript
// nuxt.config.ts
runtimeConfig: {
  // Existing config...
  
  // NEW: Security configuration
  serverSecret: process.env.SERVER_SECRET || 'your-super-secret-key-here',
  rateLimitWindow: 60000, // 1 minute
  rateLimitMax: 100, // requests per window
  signatureExpiry: 300000, // 5 minutes
}
```

### **Client-Side Changes**
```typescript
// app/lib/secure-api.ts (NEW)
export const secureApi = {
  // All API calls with automatic security headers
  scams: scamsApi,
  upload: uploadApi,
  auth: authApi
}
```

---

## 🧪 **Testing Strategy**

### **Security Testing**
1. **Penetration Testing**: Attempt to bypass each layer
2. **Token Testing**: Test expired/invalid tokens
3. **Rate Limit Testing**: Verify rate limiting works
4. **Signature Testing**: Test signature validation

### **Performance Testing**
1. **Load Testing**: Test with high concurrent users
2. **Memory Testing**: Monitor memory usage
3. **CPU Testing**: Measure CPU overhead
4. **Latency Testing**: Measure response times

### **Integration Testing**
1. **End-to-End**: Test complete user flows
2. **Error Scenarios**: Test all error conditions
3. **Recovery Testing**: Test system recovery
4. **Monitoring**: Verify logging and monitoring

---

## 📊 **Success Metrics**

### **Security Metrics**
- ✅ Zero unauthorized API access
- ✅ All external requests blocked
- ✅ No API key exposure in browser
- ✅ Successful rate limiting

### **Performance Metrics**
- ✅ <100ms additional latency
- ✅ <10% CPU overhead
- ✅ <100MB memory overhead
- ✅ 99.9% uptime maintained

### **User Experience Metrics**
- ✅ No impact on legitimate users
- ✅ Clear error messages
- ✅ Smooth authentication flow
- ✅ Fast response times

---

## 🚀 **Deployment Checklist**

### **Pre-Deployment**
- [ ] Generate secure server secret
- [ ] Configure environment variables
- [ ] Set up monitoring and logging
- [ ] Test all security layers
- [ ] Backup existing data

### **Deployment**
- [ ] Deploy middleware changes
- [ ] Update client-side code
- [ ] Monitor error rates
- [ ] Verify security is working
- [ ] Test all user flows

### **Post-Deployment**
- [ ] Monitor performance metrics
- [ ] Check security logs
- [ ] Verify rate limiting
- [ ] Test error scenarios
- [ ] Document any issues

---

## 🔮 **Future Enhancements**

### **Advanced Security**
- **IP Whitelisting**: Only allow specific IP ranges
- **Geographic Restrictions**: Block requests from certain countries
- **Behavioral Analysis**: Detect suspicious request patterns
- **Machine Learning**: AI-powered threat detection

### **Performance Optimizations**
- **Redis Caching**: Cache rate limiting data
- **CDN Integration**: Distribute security checks
- **Connection Pooling**: Optimize database connections
- **Async Processing**: Background security checks

### **Monitoring & Analytics**
- **Real-time Dashboard**: Live security monitoring
- **Alert System**: Notify on security events
- **Analytics**: Track API usage patterns
- **Reporting**: Generate security reports

---

**Note**: This implementation provides enterprise-level security while maintaining good performance and user experience. The modular approach allows for easy maintenance and future enhancements. 