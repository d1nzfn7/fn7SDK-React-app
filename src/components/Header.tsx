import React from 'react'

interface HeaderProps {
  sdkReady: boolean
  sdkError: string | null
}

const Header: React.FC<HeaderProps> = ({ sdkReady, sdkError }) => {
  return (
    <div className="card">
      <h1>FN7 SDK Test Application</h1>
      <div style={{ marginTop: '10px' }}>
        <strong>SDK Status:</strong>
        {sdkReady ? (
          <span className="status ready">Ready</span>
        ) : sdkError ? (
          <span className="status error">Error: {sdkError}</span>
        ) : (
          <span className="status loading">
            <span className="loading-spinner"></span>
            Loading...
          </span>
        )}
      </div>
      {sdkError && (
        <div className="alert alert-warning" style={{ marginTop: '15px' }}>
          <strong>Note:</strong> Make sure the SDK server is running on{' '}
          <code>http://localhost:8082</code>. You can start it by running:
          <pre style={{ marginTop: '10px', padding: '10px', background: '#fff', borderRadius: '4px' }}>
            cd ui/app/libs/fn7-sdk/dist{'\n'}
            python3 -m http.server 8082
          </pre>
        </div>
      )}
    </div>
  )
}

export default Header


