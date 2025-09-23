# Better Auth Authentication Guide

## Overview

Your application uses Better Auth with a **session-based authentication** system. This means authentication state is managed through HTTP cookies, not tokens. Here's how it works in your setup.

## Authentication Flow

### 1. User Registration/Login
When a user signs up or logs in via `/auth/sign-up` or `/auth/sign-in`:

- Better Auth validates credentials
- Creates a session in the database
- Sets HTTP-only cookies in the browser
- Returns user data and session info in the response body

### 2. Session Management
Your configuration uses **stateful sessions** stored in the database:

```typescript
session: {
    expiresIn: 60 * 60 * 24 * 7,  // 7 days
    cookieCache: {
        enabled: true,
        maxAge: 60 * 5              // 5 minutes cache
    },
}
```

## What You Receive After Login

### Cookies (Primary Authentication Method)
- `better-auth.session_token` - The actual session identifier
- `better-auth.csrf_token` - CSRF protection token
- These are **HTTP-only** and **secure** cookies
- **This is what you should use for authentication**

### Response Body Token
The token in the response body is **NOT used for authentication**. It's typically:
- Session metadata for client-side display
- User information for immediate use
- **Do NOT use this for subsequent API calls**

## How to Use Authentication

### Frontend Implementation

#### 1. Login Request
```javascript
// Login request
const response = await fetch('/auth/sign-in', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include', // IMPORTANT: Include cookies
    body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123'
    })
});

const userData = await response.json();
// Cookies are automatically set by the browser
```

#### 2. Authenticated Requests
```javascript
// All subsequent requests - just include credentials
const response = await fetch('/users/123', {
    method: 'GET',
    credentials: 'include', // This sends the session cookies
    headers: {
        'Content-Type': 'application/json',
    }
});
```

#### 3. Logout
```javascript
const response = await fetch('/auth/sign-out', {
    method: 'POST',
    credentials: 'include',
});
// Cookies are automatically cleared
```

### Backend Route Protection

Your routes are protected using the `auth: true` option:

```typescript
.get("/users/:id", 
    ({ params, user, session }) => {
        // user and session are automatically available
        const authenticatedUserName = user.name;
        const userId = params.id;
        return { id: userId, name: "Eduardo" };
    },
    {
        auth: true, // This protects the route
        // ... other options
    }
)
```

## Available Auth Endpoints

Better Auth automatically provides these endpoints at `/auth/*`:

- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login  
- `POST /auth/sign-out` - User logout
- `GET /auth/session` - Get current session info
- `POST /auth/reset-password` - Password reset
- `POST /auth/verify-email` - Email verification

## Session Validation Process

1. Client sends request with cookies
2. Your `betterAuthPlugin` extracts session from headers
3. `auth.api.getSession({headers})` validates the session
4. If valid: user and session data are provided to route handler
5. If invalid: 401 Unauthorized response

## Key Configuration Details

### Database Setup
- Uses Drizzle adapter with PostgreSQL
- Sessions stored in database tables
- `usePlural: true` means table names are pluralized

### Security Features
- Passwords hashed with Bun's built-in hasher
- CSRF protection enabled
- HTTP-only cookies prevent XSS attacks
- Secure cookies in production

### Auto Sign-in
```typescript
emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Users are signed in immediately after registration
}
```

## Common Pitfalls

1. **Don't use the response body token** - Use cookies instead
2. **Always include `credentials: 'include'`** in fetch requests
3. **Don't try to manually manage session tokens** - Let Better Auth handle it
4. **CORS setup** - Ensure your frontend domain is allowed if different from backend

## Testing Authentication

### Check if user is authenticated:
```bash
curl -X GET http://localhost:3000/auth/session \
  -H "Cookie: better-auth.session_token=your_session_cookie"
```

### Access protected route:
```bash
curl -X GET http://localhost:3000/users/123 \
  -H "Cookie: better-auth.session_token=your_session_cookie"
```

## Summary

Your Better Auth setup is **cookie-based and stateful**:
- ✅ Use cookies for authentication (automatic with `credentials: 'include'`)
- ❌ Don't use tokens from response body
- ✅ Sessions are stored in your PostgreSQL database
- ✅ Routes protected with `auth: true` get automatic user/session data
- ✅ 7-day session expiration with 5-minute cookie ca