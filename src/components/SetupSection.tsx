import React, { useState, useEffect } from 'react'

interface SetupSectionProps {
  onUpdate: () => void
}

const SetupSection: React.FC<SetupSectionProps> = ({ onUpdate }) => {
  const [userContext, setUserContext] = useState('')
  const [appContext, setAppContext] = useState('')
  const [showSetup, setShowSetup] = useState(false)

  useEffect(() => {
    // Load existing values from localStorage
    const userCtx = localStorage.getItem('user_context')
    const appCtx = localStorage.getItem('app_context')

    if (userCtx) {
      try {
        setUserContext(JSON.stringify(JSON.parse(userCtx), null, 2))
      } catch (e) {
        setUserContext(userCtx)
      }
    } else {
      setUserContext(JSON.stringify({
        "org_role": "Provider",
        "user_id": "0513467084",
        "user_role": "Founder",
        "org_hkey": "7000000001.0742402695",
        "application_id": "1000000001",
        "nickname": "testuser1001",
        "name": "Test User",
        "picture": "https://s.gravatar.com/avatar/204372d224bdd173dda33e963e8892dd?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ftu.png",
        "updated_at": "2025-11-05T13:26:04.776Z",
        "email": "testuser1001@mailinator.com",
        "email_verified": true,
        "iss": "https://atlas-dev.fn7.io/",
        "aud": "6lGJ2GCXMS6Gwu0qG8SGYsmQGXzhDI2j",
        "sub": "auth0|68f0a0d7dd81c0033db5b994",
        "iat": 1762349165,
        "exp": 1762385165,
        "sid": "_xlH0b7K3MAFTj2zjqp86Ktgdzhy4G0k",
        "at_hash": "8q4kvfEOFpLcLKoCOk-INQ",
        "nonce": "DuubyNGipMAKJY1RO.qzfSBUxZTEaf5u"
      }, null, 2))
    }

    if (appCtx) {
      try {
        setAppContext(JSON.stringify(JSON.parse(appCtx), null, 2))
      } catch (e) {
        setAppContext(appCtx)
      }
    } else {
      setAppContext(JSON.stringify({
        "paymentGatewaysConfig": {
          "default": "stripe",
          "stripe": {
            "public_key": "pk_test_51Rsi8zFXswpHZ1x6WUxHmAvdze68g2vSchCulVXZJ17tuLBVw6uH9KyX1qqDSBdZhCgNgI0GwoxRiUayYbREYpha00P6lYqE0G"
          }
        },
        "amplitudeConfig": {
          "autoInit": true,
          "apiKey": "dee2f5a6dd73060e3905829cee117535",
          "trackEvents": [
            "sessions",
            "attribution",
            "pageViews"
          ]
        },
        "themeConfiguration": {
          "snackbar-bg-color": "#000000",
          "warn": {
            "warn-700": "#99331F",
            "warn-800": "#662215",
            "warn-50": "#FFF7F5",
            "warn-900": "#33110A",
            "warn-a100": "#FFE0DB",
            "warn-300": "#FFB8A8",
            "warn-400": "#FF8C66",
            "warn-a700": "#FF4D33",
            "warn-500": "#FF5533",
            "warn-600": "#CC4429",
            "warn-a200": "#FFB3A6",
            "warn-100": "#FFEAE6",
            "warn-a400": "#FF8066",
            "warn-200": "#FFD5CC"
          },
          "snackbar-tex-color": "#FFFFFF",
          "app-font-family": "Sora",
          "accent": {
            "accent-A200": "#2a60ff",
            "accent-A400": "#003ef6",
            "accent-A100": "#5d86ff",
            "accent-A700": "#0037dd",
            "accent-200": "#F4F4F4",
            "accent-100": "#FAFAFA",
            "accent-400": "#CCCCCC",
            "accent-300": "#E6E6E6",
            "accent-a100": "#FFFFFF",
            "accent-600": "#737373",
            "accent-500": "#A6A6A6",
            "accent-800": "#1A1A1A",
            "accent-a400": "#999999",
            "accent-700": "#4D4D4D",
            "accent-50": "#FFFFFF",
            "accent-a200": "#E0E0E0",
            "accent-900": "#000000",
            "accent-a700": "#000000"
          },
          "primary": {
            "primary-50": "#FFFFFF",
            "primary-a700": "#000000",
            "primary-200": "#F4F4F4",
            "primary-a200": "#E0E0E0",
            "primary-100": "#FAFAFA",
            "primary-a400": "#999999",
            "primary-a100": "#FFFFFF",
            "primary-900": "#A6A6A6",
            "primary-800": "#1A1A1A",
            "primary-700": "#4D4D4D",
            "primary-600": "#737373",
            "primary-500": "#000000",
            "primary-400": "#CCCCCC",
            "primary-300": "#E6E6E6"
          },
          "app-background": "#FFFFFF"
        },
        "logo_path_labels": "",
        "doc_type": "Fn7Applications",
        "signupWorkflowId": "Signup",
        "default": null,
        "application_name": "Fn7 Base App",
        "appTheme": "lightMode",
        "updated_at": "2025-08-13T15:25:34.451Z",
        "application_description": "",
        "role_configurations": {
          "PlatformOwner": {
            "applicableUserRoles": [
              "Admin"
            ],
            "hideSocialLogins": true,
            "defaultUserSignUpRole": "Admin"
          },
          "Consumer": {
            "applicableUserRoles": [
              "Member"
            ],
            "hideSocialLogins": false,
            "defaultUserSignUpRole": "Member",
            "disableSignup": true
          },
          "Provider": {
            "applicableUserRoles": [
              "Founder"
            ],
            "hideSocialLogins": false,
            "defaultUserSignUpRole": "Founder",
            "disableSignup": false
          }
        },
        "stripe": null,
        "primary_org_id": "7000000001",
        "auth0_configurations": {
          "tenants": [
            {
              "auth0_client_id": "6lGJ2GCXMS6Gwu0qG8SGYsmQGXzhDI2j",
              "custom_auth0_domain": "atlas-dev.fn7.io",
              "auth0_client_secret": "yWcWn4FiaEXq9wgYZv0JO4RY0t-u6PyxOev6x7jwoV2voixGRIry3MvCTpJYOyrY",
              "auth0_connection": "fn7-atlas-dev",
              "auth0_domain": "fn7-atlas-dev.us.auth0.com"
            }
          ]
        },
        "intercom": {
          "appId": "y2ds0fxu",
          "enabled": true
        },
        "app_url": "https://atlas.dev.app.fn7.io/",
        "updated_by_user_id": "7402795484",
        "org_hkey": "7000000001",
        "hideSocialLogins": false,
        "appRoutes": {
          "PlatformOwner": "/admin/agents/Fn7AtlasOnboarding/flow?pathway=pathway2",
          "default": "/home",
          "Consumer": "/admin/agents/Fn7AtlasOnboarding/flow?pathway=pathway2",
          "Provider": "/admin/agents/Fn7AtlasOnboarding/flow?pathway=pathway2"
        },
        "loginWorkflowId": "Login",
        "defaultOrgSignUpRole": "Provider",
        "es_indexable": true,
        "doc_id": "1000000001",
        "application_id": "1000000001",
        "is_agentic_system": true,
        "gcs_configurations": {
          "application_bg_path": "api/k8s/helika/atlas/artifacts/bg.png",
          "application_definitions_path": "dev-public-objectstore-fn7/app/atlas/definitions/",
          "bucket_name": "dev-public-objectstore-fn7",
          "host": "fn7-backend.us-central1-dev.k8s.gcp.fn7.io",
          "application_folder_path": "dev-public-objectstore-fn7/app/atlas/",
          "application_logo_path": "api/k8s/helika/atlas/artifacts/logo.png"
        },
        "hash_key": "atlas.dev.app.fn7.io",
        "application_url_prefix": "atlas",
        "updated_by": "valerie-admin@mailinator.com",
        "isBaseapp": true,
        "updated_by_labels": "valerie-admin"
      }, null, 2))
    }
  }, [])

  const handleSave = () => {
    try {
      const userCtxObj = JSON.parse(userContext)
      const appCtxObj = JSON.parse(appContext)

      localStorage.setItem('user_context', JSON.stringify(userCtxObj))
      localStorage.setItem('app_context', JSON.stringify(appCtxObj))

      alert('localStorage updated successfully!')
      onUpdate()
    } catch (error: any) {
      alert('Error: Invalid JSON format. Please check your input.')
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset localStorage to default values?')) {
      localStorage.removeItem('user_context')
      localStorage.removeItem('app_context')
      setUserContext(JSON.stringify({
        user_id: 'test-user-123',
        org_hkey: 'org.456',
        user_role: 'admin',
        org_role: 'owner',
        id_token: 'test-token-here'
      }, null, 2))
      setAppContext(JSON.stringify({
        doc_id: 'test-app-789',
        org_hkey: 'org.456',
        application_url_prefix: 'test-app'
      }, null, 2))
      onUpdate()
    }
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2>localStorage Configuration</h2>
        <button
          className="button button-secondary"
          onClick={() => setShowSetup(!showSetup)}
        >
          {showSetup ? 'Hide' : 'Show'} Setup
        </button>
      </div>

      {showSetup && (
        <>
          <div className="alert alert-info">
            Configure the localStorage values that the SDK will use for context.
            These values are required for the SDK to function properly.
          </div>

          <div className="form-group">
            <label htmlFor="user-context">user_context (JSON)</label>
            <textarea
              id="user-context"
              className="json-editor"
              value={userContext}
              onChange={(e) => setUserContext(e.target.value)}
              placeholder='{"user_id": "test-user-123", ...}'
            />
          </div>

          <div className="form-group">
            <label htmlFor="app-context">app_context (JSON)</label>
            <textarea
              id="app-context"
              className="json-editor"
              value={appContext}
              onChange={(e) => setAppContext(e.target.value)}
              placeholder='{"doc_id": "test-app-789", ...}'
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button className="button button-success" onClick={handleSave}>
              Save to localStorage
            </button>
            <button className="button button-secondary" onClick={handleReset}>
              Reset to Defaults
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SetupSection

