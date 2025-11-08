/// <reference types="vite/client" />

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL?: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

declare module 'http://localhost:8082/sdk.esm.js' {
  export default class FN7SDK {
    constructor(baseUrl?: string, firebaseConfig?: FirebaseConfig);
    getFirebaseData(doc_type: string, doc_id: string, customHeaders?: object): Promise<any>;
    createFirebaseData(doc_type: string, doc_id: string, data: any, customHeaders?: object): Promise<any>;
    updateFirebaseData(doc_type: string, doc_id: string, data: any, customHeaders?: object): Promise<any>;
    deleteFirebaseData(doc_type: string, doc_id: string, customHeaders?: object): Promise<any>;
    searchFirebaseData(queryConstraints: any, limit: number, orderBy?: string, customHeaders?: object): Promise<any[]>;
    getCustomFirebaseToken(customHeaders?: object): Promise<any>;
    startFirebaseListener(doc_type: string, doc_id: string, options?: any): Promise<any>;
    uploadToStorage(filenames: string[], files: File[], folder?: string, appName?: string): Promise<string[]>;
    getFromStorage(folderName: string, fileName: string, appName?: string): Promise<string>;
    getBlobFromStorage(folderName: string, fileName: string, appName?: string): Promise<Blob>;
    userContext(): any;
    getUserId(): string | undefined;
    getUserOrgHkey(): string | undefined;
    getUserRole(): string | undefined;
    getOrgRole(): string | undefined;
    applicationMeta(): any;
    applicationName(): string | undefined;
    applicationId(): string | undefined;
    getApplicationOrgHkey(): string | undefined;
    isBaseApp(): boolean;
    getOrgId(org_hkey?: string): string | undefined;
    getApplicationPrimaryOrgId(): string | undefined;
    getFirebaseIndex(doc_type: string, doc_id: string, isSystemCall?: boolean): string;
  }
}

