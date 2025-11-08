# Firebase Config Setup Instructions

## For Existing SDK Users

The FN7 SDK now requires Firebase configuration to be provided when initializing the SDK. This allows you to use your own Firebase project for local development.

## Quick Setup

### Step 1: Create/Update Environment Files

Create these files in your Angular app's `src/environments/` directory:

**`environment.ts`** (Local Development - Use YOUR Firebase config):

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY_HERE',
    authDomain: 'YOUR_AUTH_DOMAIN_HERE',
    databaseURL: 'YOUR_DATABASE_URL_HERE',
    projectId: 'YOUR_PROJECT_ID_HERE',
    storageBucket: 'YOUR_STORAGE_BUCKET_HERE',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID_HERE',
    appId: 'YOUR_APP_ID_HERE',
    measurementId: 'YOUR_MEASUREMENT_ID_HERE', // Optional
  },
};
```

**`environment.dev.ts`** (Dev Environment - Use COMPANY Firebase config):

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'COMPANY_API_KEY',
    authDomain: 'COMPANY_AUTH_DOMAIN',
    databaseURL: 'COMPANY_DATABASE_URL',
    projectId: 'COMPANY_PROJECT_ID',
    storageBucket: 'COMPANY_STORAGE_BUCKET',
    messagingSenderId: 'COMPANY_MESSAGING_SENDER_ID',
    appId: 'COMPANY_APP_ID',
    measurementId: 'COMPANY_MEASUREMENT_ID', // Optional
  },
};
```

**`environment.prod.ts`** (Production - Use COMPANY Firebase config):

```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: 'COMPANY_API_KEY',
    authDomain: 'COMPANY_AUTH_DOMAIN',
    databaseURL: 'COMPANY_DATABASE_URL',
    projectId: 'COMPANY_PROJECT_ID',
    storageBucket: 'COMPANY_STORAGE_BUCKET',
    messagingSenderId: 'COMPANY_MESSAGING_SENDER_ID',
    appId: 'COMPANY_APP_ID',
    measurementId: 'COMPANY_MEASUREMENT_ID', // Optional
  },
};
```

### Step 2: Update SDK Initialization Code

**Change from:**

```typescript
const sdk = new FN7SDK();
```

**To:**

```typescript
import { environment } from './environments/environment';
const sdk = new FN7SDK(undefined, environment.firebase);
```

### Step 3: Get Your Firebase Config Values

**For Local Development:**

1. Go to https://console.firebase.google.com/
2. Create or select your Firebase project
3. Click ⚙️ → Project Settings
4. Scroll to "Your apps" → Web app
5. Copy the `firebaseConfig` values

**For Dev/Prod:**

- Contact your team lead for the company Firebase config values

## Required Fields

Your Firebase config must include:

- `apiKey` (required)
- `authDomain` (required)
- `projectId` (required)
- `storageBucket` (required)
- `messagingSenderId` (required)
- `appId` (required)
- `databaseURL` (optional)
- `measurementId` (optional)

## Example Usage

```typescript
import FN7SDK from '@fn7/sdk';
import { environment } from './environments/environment';

// Initialize SDK with Firebase config
const sdk = new FN7SDK(undefined, environment.firebase);

// Use SDK as before
const data = await sdk.getFirebaseData('Users', 'user123');
```