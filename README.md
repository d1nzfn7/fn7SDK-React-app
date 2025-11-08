# FN7 SDK React Test Application

A React hello world application that demonstrates and tests all the FN7 SDK functions. This app provides a comprehensive UI to test Firebase operations, context helpers, and SDK functionality.

## Features

- **SDK Integration**: Dynamically loads the FN7 SDK from a local development server
- **Context Display**: Shows user and application context information
- **Firebase Operations**: Test all CRUD operations (Create, Read, Update, Delete, Search)
- **localStorage Configuration**: Easy setup for user_context and app_context
- **Results Display**: View API responses and errors in a formatted way
- **Modern UI**: Clean, responsive design with white theme and Sora font

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Python 3 (for serving the SDK locally) or npx serve

## Installation

1. Clone or navigate to this repository:
```bash
cd fn7SDK-React-app
```

2. Install dependencies:
```bash
npm install
```

## Setup

### 1. Start the SDK Server

The React app expects the SDK to be served from `http://localhost:8082/sdk.esm.js`.

**Option A: Using Python**
```bash
cd ui/app/libs/fn7-sdk/dist
python3 -m http.server 8082
```

**Option B: Using npx serve**
```bash
cd ui/app/libs/fn7-sdk/dist
npx serve -p 8082
```

Keep this server running while using the React app.

### 2. Start the React App

In a new terminal, from the project root:
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000` (or the port shown in the terminal).

## Usage

### 1. Configure localStorage

Before testing SDK functions, you need to set up the localStorage values:

1. Click "Show Setup" in the **localStorage Configuration** section
2. Configure the following:

**user_context** (JSON):
```json
{
  "user_id": "test-user-123",
  "org_hkey": "org.456",
  "user_role": "admin",
  "org_role": "owner",
  "id_token": "test-token-here"
}
```

**app_context** (JSON):
```json
{
  "doc_id": "test-app-789",
  "org_hkey": "org.456",
  "application_url_prefix": "test-app"
}
```

3. Click "Save to localStorage"
4. The context information will automatically update in the **Context Information** section

### 2. View Context Information

The **Context Information** section displays:
- User ID, User Role, Org Role, User Org Hkey
- App ID, App Name, App Org Hkey
- Is Base App (boolean)
- Primary Org ID
- Raw context objects

### 3. Test Firebase Operations

The **Firebase Operations** section provides buttons to test all SDK functions:

#### Get Data
- Enter Document Type (e.g., "Users")
- Enter Document ID (e.g., "user123")
- Click "Get Data" to fetch the document
- Click "Start Listener" to start a Firebase listener

#### Create Data
- Enter Document Type
- Enter Document ID
- Enter Data as JSON (e.g., `{"name": "John Doe", "email": "john@example.com"}`)
- Click "Create Data"

#### Update Data
- Enter Document Type
- Enter Document ID
- Enter Data as JSON with fields to update
- Click "Update Data"

#### Delete Data
- Enter Document Type
- Enter Document ID
- Click "Delete Data" (confirmation required)

#### Search Data
- Enter Query Constraints as JSON (e.g., `{"AND": [["doc_type", "==", "Users"]]}`)
- Set Limit (number of results)
- Optionally set Order By field
- Click "Search Data"

#### Get Firebase Token
- Click "Get Firebase Token" to retrieve authentication token

### 4. View Results

All operation results (success or error) are displayed in the **Results** section at the bottom:
- Success responses show formatted JSON
- Errors show error messages
- Click "Clear Results" to clear the display

## Project Structure

```
fn7SDK-React-app/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # App header with SDK status
│   │   ├── SetupSection.tsx        # localStorage configuration
│   │   ├── ContextDisplay.tsx      # Context information display
│   │   ├── FirebaseOperations.tsx  # Firebase CRUD operations UI
│   │   └── ResultsDisplay.tsx      # Results and errors display
│   ├── App.tsx                     # Main app component
│   ├── App.css                     # App-specific styles
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
└── README.md                       # This file
```

## SDK Functions Tested

This app tests the following FN7 SDK functions:

### Firebase Operations
- `getFirebaseData(doc_type, doc_id)`
- `createFirebaseData(doc_type, doc_id, data)`
- `updateFirebaseData(doc_type, doc_id, data)`
- `deleteFirebaseData(doc_type, doc_id)`
- `searchFirebaseData(queryConstraints, limit, orderBy?)`
- `getCustomFirebaseToken()`
- `startFirebaseListener(doc_type, doc_id, options?)`

### Context Helpers
- `userContext()`
- `getUserId()`
- `getUserOrgHkey()`
- `getUserRole()`
- `getOrgRole()`
- `applicationMeta()`
- `applicationName()`
- `applicationId()`
- `getApplicationOrgHkey()`
- `isBaseApp()`
- `getOrgId(org_hkey?)`
- `getApplicationPrimaryOrgId()`
- `getFirebaseIndex(doc_type, doc_id, isSystemCall?)`

## Troubleshooting

### SDK Not Loading
- **Error**: "Failed to load SDK from http://localhost:8082/sdk.esm.js"
- **Solution**: Make sure the SDK server is running on port 8082. Check the terminal where you started the server.

### Context Not Showing
- **Issue**: Context information shows "N/A"
- **Solution**: Make sure you've configured and saved the localStorage values in the Setup section.

### API Errors
- **Issue**: Firebase operations return errors
- **Solution**:
  - Check that your backend API is running and accessible
  - Verify the `id_token` in user_context is valid
  - Check browser console for detailed error messages

### CORS Errors
- **Issue**: CORS errors when making API calls
- **Solution**: Ensure your backend API allows requests from `http://localhost:3000`

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Sora Font** - Typography
- **CSS3** - Styling with white theme

## Notes

- The SDK is loaded dynamically from `http://localhost:8082/sdk.esm.js` for local development
- All Firebase operations make actual API calls to `/api/k8s/firebase/*` endpoints
- The app requires both `user_context` and `app_context` in localStorage to function properly
- All operations include loading states and error handling

## Support

For SDK documentation, refer to `fn7SDK_README.md` in this repository.

For issues or questions about this test app, please contact the development team.
