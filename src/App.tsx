import { useState, useEffect } from 'react'
import Header from './components/Header'
import SetupSection from './components/SetupSection'
import ContextDisplay from './components/ContextDisplay'
import FirebaseOperations from './components/FirebaseOperations'
import ResultsDisplay from './components/ResultsDisplay'
import './App.css'

interface SDKInstance {
  getFirebaseData: (doc_type: string, doc_id: string, customHeaders?: object) => Promise<any>
  createFirebaseData: (doc_type: string, doc_id: string, data: any, customHeaders?: object) => Promise<any>
  updateFirebaseData: (doc_type: string, doc_id: string, data: any, customHeaders?: object) => Promise<any>
  deleteFirebaseData: (doc_type: string, doc_id: string, customHeaders?: object) => Promise<any>
  searchFirebaseData: (queryConstraints: any, limit: number, orderBy?: string, customHeaders?: object) => Promise<any[]>
  getCustomFirebaseToken: (customHeaders?: object) => Promise<any>
  startFirebaseListener: (doc_type: string, doc_id: string, options?: any) => Promise<any>
  userContext: () => any
  getUserId: () => string | undefined
  getUserOrgHkey: () => string | undefined
  getUserRole: () => string | undefined
  getOrgRole: () => string | undefined
  applicationMeta: () => any
  applicationName: () => string | undefined
  applicationId: () => string | undefined
  getApplicationOrgHkey: () => string | undefined
  isBaseApp: () => boolean
  getOrgId: (org_hkey?: string) => string | undefined
  getApplicationPrimaryOrgId: () => string | undefined
  getFirebaseIndex: (doc_type: string, doc_id: string, isSystemCall?: boolean) => string
}

function App() {
  const [sdk, setSdk] = useState<SDKInstance | null>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [sdkError, setSdkError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initSDK = async () => {
      try {
        setSdkError(null)
        const SDK = await import('http://localhost:8080/sdk.esm.js')

        // Quick diagnostic
        console.log('Full SDK module:', SDK)
        console.log('Default export:', SDK.default)
        console.log('Named FN7SDK:', SDK.FN7SDK)
        console.log('Are they the same?', SDK.default === SDK.FN7SDK)

        const sdkInstance = new SDK.FN7SDK() as SDKInstance

        // Verify the instance
        console.log('sdkInstance:', sdkInstance)
        console.log('getFirebaseData:', sdkInstance.getFirebaseData)
        console.log('typeof getFirebaseData:', typeof sdkInstance.getFirebaseData)

        setSdk(sdkInstance)
        setSdkReady(true)
      } catch (err: any) {
        setSdkError(err.message || 'Failed to load SDK from http://localhost:8080/sdk.esm.js')
        setSdkReady(false)
      }
    }

    initSDK()
  }, [])

  const handleResult = (data: any) => {
    setResult(data)
    setError(null)
  }

  const handleError = (err: any) => {
    setError(err.message || 'An error occurred')
    setResult(null)
  }

  const clearResults = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="container">
      <Header sdkReady={sdkReady} sdkError={sdkError} />

      <SetupSection onUpdate={() => {
        // Force re-render to update context display
        setSdk(sdk ? { ...sdk } as SDKInstance : null)
      }} />

      {sdkReady && sdk && (
        <>
          <ContextDisplay sdk={sdk} />
          <FirebaseOperations
            sdk={sdk}
            onResult={handleResult}
            onError={handleError}
            loading={loading}
            setLoading={setLoading}
          />
        </>
      )}

      <ResultsDisplay
        result={result}
        error={error}
        onClear={clearResults}
      />
    </div>
  )
}

export default App


