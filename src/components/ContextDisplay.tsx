import React from 'react'

interface SDKInstance {
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

interface ContextDisplayProps {
  sdk: SDKInstance
}

const ContextDisplay: React.FC<ContextDisplayProps> = ({ sdk }) => {
  const userContext = sdk.userContext()
  const appMeta = sdk.applicationMeta()

  return (
    <div className="card">
      <h2>Context Information</h2>

      <div className="context-grid">
        <div className="context-item">
          <label>User ID</label>
          <value>{sdk.getUserId() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>User Role</label>
          <value>{sdk.getUserRole() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>Org Role</label>
          <value>{sdk.getOrgRole() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>User Org Hkey</label>
          <value>{sdk.getUserOrgHkey() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>App ID</label>
          <value>{sdk.applicationId() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>App Name</label>
          <value>{sdk.applicationName() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>App Org Hkey</label>
          <value>{sdk.getApplicationOrgHkey() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>Is Base App</label>
          <value>{sdk.isBaseApp() ? 'Yes' : 'No'}</value>
        </div>

        <div className="context-item">
          <label>Primary Org ID</label>
          <value>{sdk.getApplicationPrimaryOrgId() || 'N/A'}</value>
        </div>

        <div className="context-item">
          <label>Org ID (from user)</label>
          <value>{sdk.getOrgId() || 'N/A'}</value>
        </div>
      </div>

      <h3>Raw User Context</h3>
      <div className="results">
        <pre>{JSON.stringify(userContext, null, 2)}</pre>
      </div>

      <h3>Raw Application Meta</h3>
      <div className="results">
        <pre>{JSON.stringify(appMeta, null, 2)}</pre>
      </div>
    </div>
  )
}

export default ContextDisplay

