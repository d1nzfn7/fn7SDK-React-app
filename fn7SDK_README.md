# FN7 SDK

FN7 SDK is a JavaScript/TypeScript library that provides Firebase operations and context helpers for FN7 applications. It's framework-agnostic and can be used in React, Vue, Angular, or vanilla JavaScript applications.

## Installation

### From CDN (Production)

**Latest Version:**
```html
<script src="https://fn7.io/.fn7-sdk/frontend/latest/sdk.min.js"></script>
```

**Specific Version:**
```html
<script src="https://fn7.io/.fn7-sdk/frontend/v1.0.0/sdk.min.js"></script>
```

**ES Modules (Latest):**
```html
<script type="module">
  import { SDK } from 'https://fn7.io/.fn7-sdk/frontend/latest/sdk.esm.js';
</script>
```

### From npm (Coming Soon)

```bash
npm install @fn7/sdk
```

### Local Development (Testing)

For local testing, you can serve the SDK from a local server:

```bash
cd packages/frontend/dist
python3 -m http.server 8082
# or
npx serve -p 8082
```

Then import in your code:

```javascript
const SDK = await import('http://localhost:8082/sdk.esm.js');
```

## Quick Start

### Browser (UMD)

```html
<script src="https://fn7.io/.fn7-sdk/frontend/latest/sdk.min.js"></script>
<script>
  const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };
  const sdk = new FN7SDK.default(undefined, firebaseConfig);

  // Use SDK functions
  sdk
    .getFirebaseData('Users', 'user123')
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
</script>
```

### ES Modules

```javascript
import FN7SDK from '@fn7/sdk';
import { environment } from './environments/environment';

const sdk = new FN7SDK(undefined, environment.firebase);

// Use SDK functions
const data = await sdk.getFirebaseData('Users', 'user123');
console.log(data);
```

### CommonJS

```javascript
const FN7SDK = require('@fn7/sdk');

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const sdk = new FN7SDK(undefined, firebaseConfig);

// Use SDK functions
sdk
  .getFirebaseData('Users', 'user123')
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## API Reference

### Initialization

```javascript
const sdk = new FN7SDK(baseUrl?, firebaseConfig);
```

**Parameters:**

- `baseUrl` (optional): Base URL for API calls. Defaults to empty string (uses relative paths).
- `firebaseConfig` (required): Firebase configuration object.

**Example:**

```javascript
import { environment } from './environments/environment';

const sdk = new FN7SDK(undefined, environment.firebase);
// or
const sdk = new FN7SDK('https://api.example.com', environment.firebase);
```

**Firebase Config Structure:**

```javascript
{
  apiKey: string;              // Required
  authDomain: string;          // Required
  projectId: string;           // Required
  storageBucket: string;       // Required
  messagingSenderId: string;   // Required
  appId: string;               // Required
  databaseURL?: string;        // Optional
  measurementId?: string;      // Optional
}
```

---

## Firebase Operations

### getFirebaseData

Read data from Firebase.

```javascript
const data = await sdk.getFirebaseData(doc_type, doc_id, customHeaders?);
```

**Parameters:**

- `doc_type` (string): Document type (e.g., 'Users', 'Chats')
- `doc_id` (string): Document ID
- `customHeaders` (object, optional): Custom HTTP headers

**Returns:** Promise<any> - The document data

**Example:**

```javascript
const userData = await sdk.getFirebaseData('Users', 'user123');
console.log(userData);
```

---

### createFirebaseData

Create a new document in Firebase.

```javascript
const result = await sdk.createFirebaseData(doc_type, doc_id, data, customHeaders?);
```

**Parameters:**

- `doc_type` (string): Document type
- `doc_id` (string): Document ID
- `data` (object): Data to create
- `customHeaders` (object, optional): Custom HTTP headers

**Returns:** Promise<any> - The created document

**Example:**

```javascript
const newUser = await sdk.createFirebaseData('Users', 'user456', {
  name: 'John Doe',
  email: 'john@example.com',
});
```

---

### updateFirebaseData

Update an existing document in Firebase.

```javascript
const result = await sdk.updateFirebaseData(doc_type, doc_id, data, customHeaders?);
```

**Parameters:**

- `doc_type` (string): Document type
- `doc_id` (string): Document ID
- `data` (object): Data to update
- `customHeaders` (object, optional): Custom HTTP headers

**Returns:** Promise<any> - The updated document

**Example:**

```javascript
const updated = await sdk.updateFirebaseData('Users', 'user123', {
  name: 'Jane Doe',
});
```

---

### deleteFirebaseData

Delete a document from Firebase.

```javascript
const result = await sdk.deleteFirebaseData(doc_type, doc_id, customHeaders?);
```

**Parameters:**

- `doc_type` (string): Document type
- `doc_id` (string): Document ID
- `customHeaders` (object, optional): Custom HTTP headers

**Returns:** Promise<any> - Deletion result

**Example:**

```javascript
await sdk.deleteFirebaseData('Users', 'user123');
```

---

### searchFirebaseData

Search Firebase documents with query constraints.

```javascript
const results = await sdk.searchFirebaseData(queryConstraints, limit, orderBy?, customHeaders?);
```

**Parameters:**

- `queryConstraints` (object): Query constraints (AND/OR conditions)
- `limit` (number): Maximum number of results
- `orderBy` (string, optional): Field to order by
- `customHeaders` (object, optional): Custom HTTP headers

**Returns:** Promise<any[]> - Array of matching documents

**Example:**

```javascript
const users = await sdk.searchFirebaseData(
  {
    AND: [
      ['doc_type', '==', 'Users'],
      ['status', '==', 'active'],
    ],
  },
  10,
  'created_at'
);
```

---

### getCustomFirebaseToken

Get a custom Firebase authentication token.

```javascript
const token = await sdk.getCustomFirebaseToken(customHeaders?);
```

**Parameters:**

- `customHeaders` (object, optional): Custom HTTP headers

**Returns:** Promise<any> - Token object

**Example:**

```javascript
const tokenData = await sdk.getCustomFirebaseToken();
console.log(tokenData.token);
```

---

### startFirebaseListener

Start a Firebase real-time listener (simplified version - returns current data).

```javascript
const data = await sdk.startFirebaseListener(doc_type, doc_id, options?);
```

**Parameters:**

- `doc_type` (string): Document type
- `doc_id` (string): Document ID
- `options` (object, optional):
  - `customHeaders` (object): Custom HTTP headers
  - `isSystemCall` (boolean): Whether this is a system call

**Returns:** Promise<any> - Current document data

**Example:**

```javascript
const data = await sdk.startFirebaseListener('Chats', 'chat123');
```

---

## Firebase Storage Operations

### uploadToStorage

Upload files to Firebase Storage.

```javascript
const urls = await sdk.uploadToStorage(filenames, files, folder?, appName?);
```

**Parameters:**

- `filenames` (string[]): Array of filenames
- `files` (File[] | Blob[]): Array of files to upload
- `folder` (string, optional): Folder path (default: 'definitions')
- `appName` (string, optional): App name (auto-detected if not provided)

**Returns:** Promise<string[]> - Array of download URLs

**Example:**

```javascript
const files = [file1, file2];
const filenames = ['image1.jpg', 'image2.png'];
const urls = await sdk.uploadToStorage(filenames, files, 'assets');
console.log(urls); // ['https://...', 'https://...']
```

---

### getFromStorage

Get download URL from Firebase Storage.

```javascript
const url = await sdk.getFromStorage(folderName, fileName, appName?);
```

**Parameters:**

- `folderName` (string): Folder name
- `fileName` (string): File name
- `appName` (string, optional): App name (auto-detected if not provided)

**Returns:** Promise<string> - Download URL

**Example:**

```javascript
const url = await sdk.getFromStorage('assets', 'image1.jpg');
console.log(url); // 'https://...'
```

---

### getBlobFromStorage

Get file as Blob from Firebase Storage.

```javascript
const blob = await sdk.getBlobFromStorage(folderName, fileName, appName?);
```

**Parameters:**

- `folderName` (string): Folder name
- `fileName` (string): File name
- `appName` (string, optional): App name (auto-detected if not provided)

**Returns:** Promise<Blob> - File blob

**Example:**

```javascript
const blob = await sdk.getBlobFromStorage('assets', 'document.pdf');
// Use blob for download or processing
```

---

## Context Helpers

### User Context

#### userContext()

Get the current user context from localStorage.

```javascript
const context = sdk.userContext();
// Returns: { user_id, org_hkey, user_role, org_role, ... }
```

#### getUserId()

Get the current user ID.

```javascript
const userId = sdk.getUserId();
// Returns: string | undefined
```

#### getUserOrgHkey()

Get the user's organization hkey.

```javascript
const orgHkey = sdk.getUserOrgHkey();
// Returns: string | undefined
```

#### getUserRole()

Get the user's role.

```javascript
const role = sdk.getUserRole();
// Returns: string | undefined
```

#### getOrgRole()

Get the organization role.

```javascript
const orgRole = sdk.getOrgRole();
// Returns: string | undefined
```

---

### Application Context

#### applicationMeta()

Get application metadata from localStorage.

```javascript
const meta = sdk.applicationMeta();
// Returns: { doc_id, org_hkey, application_url_prefix, ... }
```

#### applicationName()

Get the application name/URL prefix.

```javascript
const appName = sdk.applicationName();
// Returns: string | undefined
```

#### applicationId()

Get the application document ID.

```javascript
const appId = sdk.applicationId();
// Returns: string | undefined
```

#### getApplicationOrgHkey()

Get the application's organization hkey.

```javascript
const appOrgHkey = sdk.getApplicationOrgHkey();
// Returns: string | undefined
```

#### isBaseApp()

Check if the current application is the base app.

```javascript
const isBase = sdk.isBaseApp();
// Returns: boolean
```

---

### Organization Context

#### getOrgId(org_hkey?)

Extract organization ID from org_hkey.

```javascript
const orgId = sdk.getOrgId(); // Uses user's org_hkey
// or
const orgId = sdk.getOrgId('org.123.456'); // Uses provided org_hkey
// Returns: string | undefined
```

#### getApplicationPrimaryOrgId()

Get the primary organization ID from application context.

```javascript
const primaryOrgId = sdk.getApplicationPrimaryOrgId();
// Returns: string | undefined
```

#### getFirebaseIndex(doc_type, doc_id, isSystemCall?)

Get the Firebase index/path for a document.

```javascript
const index = sdk.getFirebaseIndex('Users', 'user123');
// Returns: string (e.g., "org.app/Users.user123")
```

---

## Complete Example

```javascript
import FN7SDK from '@fn7/sdk';
import { environment } from './environments/environment';

// Initialize SDK with Firebase config
const sdk = new FN7SDK(undefined, environment.firebase);

// Get user context
const userId = sdk.getUserId();
const userRole = sdk.getUserRole();
console.log(`User: ${userId}, Role: ${userRole}`);

// Get application context
const appId = sdk.applicationId();
const appName = sdk.applicationName();
console.log(`App: ${appName} (${appId})`);

// Firebase operations
async function example() {
  try {
    // Read data
    const user = await sdk.getFirebaseData('Users', userId);
    console.log('User data:', user);

    // Create data
    const newChat = await sdk.createFirebaseData('Chats', 'chat123', {
      participants: [userId],
      created_at: new Date().toISOString(),
    });
    console.log('Created chat:', newChat);

    // Update data
    await sdk.updateFirebaseData('Chats', 'chat123', {
      last_message: 'Hello!',
    });

    // Search data
    const chats = await sdk.searchFirebaseData(
      {
        AND: [
          ['doc_type', '==', 'Chats'],
          ['participants', 'array-contains', userId],
        ],
      },
      10
    );
    console.log('User chats:', chats);

    // Upload files
    const files = [file1, file2];
    const filenames = ['image1.jpg', 'image2.png'];
    const urls = await sdk.uploadToStorage(filenames, files, 'assets');
    console.log('Uploaded files:', urls);

    // Get file URL
    const fileUrl = await sdk.getFromStorage('assets', 'image1.jpg');
    console.log('File URL:', fileUrl);
  } catch (error) {
    console.error('Error:', error);
  }
}

example();
```

---

## Requirements

### Browser Environment

The SDK requires:

- Modern browser with `fetch` API support
- `localStorage` API (for context functions)
- `window` object (for host detection)

### Authentication

The SDK automatically reads authentication tokens from `localStorage`:

- Looks for `user_context` in localStorage
- Extracts `id_token` from user context
- Adds `authorization` header to all requests
- Adds `x-fn7-host` header from `window.location.host`

### localStorage Structure

The SDK expects the following localStorage structure:

```javascript
// user_context
{
  "user_id": "user123",
  "org_hkey": "org.456",
  "user_role": "admin",
  "org_role": "owner",
  "id_token": "jwt-token-here"
}

// app_context
{
  "doc_id": "app789",
  "org_hkey": "org.456",
  "application_url_prefix": "my-app"
}
```

---

## Error Handling

All Firebase operations return Promises and can throw errors:

```javascript
try {
  const data = await sdk.getFirebaseData('Users', 'user123');
} catch (error) {
  console.error('Firebase error:', error);
  // Handle error (network, authentication, etc.)
}
```

---

## TypeScript Support

The SDK includes TypeScript definitions. Import types:

```typescript
import FN7SDK, { FirebaseConfig } from '@fn7/sdk';
import { environment } from './environments/environment';

const sdk = new FN7SDK(undefined, environment.firebase);

// TypeScript will provide type hints
const userId: string | undefined = sdk.getUserId();
```

---

## Versioning

The SDK follows semantic versioning:

- **Major version**: Breaking changes
- **Minor version**: New features (backward compatible)
- **Patch version**: Bug fixes (backward compatible)

CDN URLs include version:

- `https://fn7.io/.fn7-sdk/frontend/latest/sdk.min.js` (always latest)
- `https://fn7.io/.fn7-sdk/frontend/v1.0.0/sdk.min.js` (specific version)
- `https://fn7.io/.fn7-sdk/frontend/v1.1.0/sdk.min.js` (specific version)
- `https://fn7.io/.fn7-sdk/frontend/v2.0.0/sdk.min.js` (breaking changes)

---

## Support

For issues or questions, please refer to the main FN7 documentation or contact the development team.
