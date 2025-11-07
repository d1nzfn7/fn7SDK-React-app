import React, { useState } from 'react'

interface SDKInstance {
  getFirebaseData: (doc_type: string, doc_id: string, customHeaders?: object) => Promise<any>
  createFirebaseData: (doc_type: string, doc_id: string, data: any, customHeaders?: object) => Promise<any>
  updateFirebaseData: (doc_type: string, doc_id: string, data: any, customHeaders?: object) => Promise<any>
  deleteFirebaseData: (doc_type: string, doc_id: string, customHeaders?: object) => Promise<any>
  searchFirebaseData: (queryConstraints: any, limit: number, orderBy?: string, customHeaders?: object) => Promise<any[]>
  getCustomFirebaseToken: (customHeaders?: object) => Promise<any>
  startFirebaseListener: (doc_type: string, doc_id: string, options?: any) => Promise<any>
}

interface FirebaseOperationsProps {
  sdk: SDKInstance
  onResult: (data: any) => void
  onError: (error: any) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

const FirebaseOperations: React.FC<FirebaseOperationsProps> = ({
  sdk,
  onResult,
  onError,
  loading,
  setLoading
}) => {
  // Get Data
  const [getDocType, setGetDocType] = useState('Users')
  const [getDocId, setGetDocId] = useState('user123')

  // Create Data
  const [createDocType, setCreateDocType] = useState('Users')
  const [createDocId, setCreateDocId] = useState('')
  const [createData, setCreateData] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}')

  // Update Data
  const [updateDocType, setUpdateDocType] = useState('Users')
  const [updateDocId, setUpdateDocId] = useState('user123')
  const [updateData, setUpdateData] = useState('{\n  "name": "Jane Doe"\n}')

  // Delete Data
  const [deleteDocType, setDeleteDocType] = useState('Users')
  const [deleteDocId, setDeleteDocId] = useState('user123')

  // Search Data
  const [searchQuery, setSearchQuery] = useState('{\n  "AND": [\n    ["doc_type", "==", "Users"],\n    ["status", "==", "active"]\n  ]\n}')
  const [searchLimit, setSearchLimit] = useState(10)
  const [searchOrderBy, setSearchOrderBy] = useState('')

  const handleGetData = async () => {
    setLoading(true)
    try {
      const data = await sdk.getFirebaseData(getDocType, getDocId)
      onResult(data)
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateData = async () => {
    setLoading(true)
    try {
      const dataObj = JSON.parse(createData)
      const result = await sdk.createFirebaseData(createDocType, createDocId, dataObj)
      onResult(result)
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateData = async () => {
    setLoading(true)
    try {
      const dataObj = JSON.parse(updateData)
      const result = await sdk.updateFirebaseData(updateDocType, updateDocId, dataObj)
      onResult(result)
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteData = async () => {
    if (!confirm(`Are you sure you want to delete ${deleteDocType}/${deleteDocId}?`)) {
      return
    }
    setLoading(true)
    try {
      const result = await sdk.deleteFirebaseData(deleteDocType, deleteDocId)
      onResult(result)
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchData = async () => {
    setLoading(true)
    try {
      const queryObj = JSON.parse(searchQuery)
      const result = await sdk.searchFirebaseData(
        queryObj,
        searchLimit,
        searchOrderBy || undefined
      )
      onResult(result)
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGetToken = async () => {
    setLoading(true)
    try {
      const token = await sdk.getCustomFirebaseToken()
      onResult(token)
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStartListener = async () => {
    setLoading(true)
    try {
      const data = await sdk.startFirebaseListener(getDocType, getDocId)
      onResult(data)
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Firebase Operations</h2>

      <div className="operations-grid">
        {/* Get Data */}
        <div className="operation-section">
          <h4>Get Data</h4>
          <div className="form-group">
            <label>Document Type</label>
            <input
              type="text"
              value={getDocType}
              onChange={(e) => setGetDocType(e.target.value)}
              placeholder="Users"
            />
          </div>
          <div className="form-group">
            <label>Document ID</label>
            <input
              type="text"
              value={getDocId}
              onChange={(e) => setGetDocId(e.target.value)}
              placeholder="user123"
            />
          </div>
          <button
            className="button"
            onClick={handleGetData}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Get Data
          </button>
          <button
            className="button button-secondary"
            onClick={handleStartListener}
            disabled={loading}
          >
            Start Listener
          </button>
        </div>

        {/* Create Data */}
        <div className="operation-section">
          <h4>Create Data</h4>
          <div className="form-group">
            <label>Document Type</label>
            <input
              type="text"
              value={createDocType}
              onChange={(e) => setCreateDocType(e.target.value)}
              placeholder="Users"
            />
          </div>
          <div className="form-group">
            <label>Document ID</label>
            <input
              type="text"
              value={createDocId}
              onChange={(e) => setCreateDocId(e.target.value)}
              placeholder="user456"
            />
          </div>
          <div className="form-group">
            <label>Data (JSON)</label>
            <textarea
              className="json-editor"
              value={createData}
              onChange={(e) => setCreateData(e.target.value)}
              placeholder='{"name": "John Doe"}'
            />
          </div>
          <button
            className="button button-success"
            onClick={handleCreateData}
            disabled={loading || !createDocId}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Create Data
          </button>
        </div>

        {/* Update Data */}
        <div className="operation-section">
          <h4>Update Data</h4>
          <div className="form-group">
            <label>Document Type</label>
            <input
              type="text"
              value={updateDocType}
              onChange={(e) => setUpdateDocType(e.target.value)}
              placeholder="Users"
            />
          </div>
          <div className="form-group">
            <label>Document ID</label>
            <input
              type="text"
              value={updateDocId}
              onChange={(e) => setUpdateDocId(e.target.value)}
              placeholder="user123"
            />
          </div>
          <div className="form-group">
            <label>Data (JSON)</label>
            <textarea
              className="json-editor"
              value={updateData}
              onChange={(e) => setUpdateData(e.target.value)}
              placeholder='{"name": "Jane Doe"}'
            />
          </div>
          <button
            className="button"
            onClick={handleUpdateData}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Update Data
          </button>
        </div>

        {/* Delete Data */}
        <div className="operation-section">
          <h4>Delete Data</h4>
          <div className="form-group">
            <label>Document Type</label>
            <input
              type="text"
              value={deleteDocType}
              onChange={(e) => setDeleteDocType(e.target.value)}
              placeholder="Users"
            />
          </div>
          <div className="form-group">
            <label>Document ID</label>
            <input
              type="text"
              value={deleteDocId}
              onChange={(e) => setDeleteDocId(e.target.value)}
              placeholder="user123"
            />
          </div>
          <button
            className="button button-danger"
            onClick={handleDeleteData}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Delete Data
          </button>
        </div>

        {/* Search Data */}
        <div className="operation-section">
          <h4>Search Data</h4>
          <div className="form-group">
            <label>Query Constraints (JSON)</label>
            <textarea
              className="json-editor"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='{"AND": [["doc_type", "==", "Users"]]}'
            />
          </div>
          <div className="form-group">
            <label>Limit</label>
            <input
              type="number"
              value={searchLimit}
              onChange={(e) => setSearchLimit(parseInt(e.target.value) || 10)}
              min="1"
              max="100"
            />
          </div>
          <div className="form-group">
            <label>Order By (optional)</label>
            <input
              type="text"
              value={searchOrderBy}
              onChange={(e) => setSearchOrderBy(e.target.value)}
              placeholder="created_at"
            />
          </div>
          <button
            className="button"
            onClick={handleSearchData}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Search Data
          </button>
        </div>

        {/* Get Token */}
        <div className="operation-section">
          <h4>Authentication</h4>
          <button
            className="button"
            onClick={handleGetToken}
            disabled={loading}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Get Firebase Token
          </button>
        </div>
      </div>
    </div>
  )
}

export default FirebaseOperations

