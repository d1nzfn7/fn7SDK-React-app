import React, { useState } from 'react'

interface SDKInstance {
  getFirebaseData: (doc_type: string, doc_id: string, customHeaders?: object) => Promise<any>
  createFirebaseData: (doc_type: string, doc_id: string, data: any, customHeaders?: object) => Promise<any>
  updateFirebaseData: (doc_type: string, doc_id: string, data: any, customHeaders?: object) => Promise<any>
  deleteFirebaseData: (doc_type: string, doc_id: string, customHeaders?: object) => Promise<any>
  searchFirebaseData: (queryConstraints: any, limit: number, orderBy?: string, customHeaders?: object) => Promise<any[]>
  getCustomFirebaseToken: (customHeaders?: object) => Promise<any>
  startFirebaseListener: (doc_type: string, doc_id: string, options?: any) => Promise<any>
  uploadToStorage: (filenames: string[], files: File[], folder?: string, appName?: string) => Promise<string[]>
  getFromStorage: (folderName: string, fileName: string, appName?: string) => Promise<string>
  getBlobFromStorage: (folderName: string, fileName: string, appName?: string) => Promise<Blob>
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

  // Upload to Storage
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [uploadFilenames, setUploadFilenames] = useState<string>('')
  const [uploadFolder, setUploadFolder] = useState('definitions')
  const [uploadAppName, setUploadAppName] = useState('')

  // Get from Storage
  const [getStorageFolder, setGetStorageFolder] = useState('definitions')
  const [getStorageFileName, setGetStorageFileName] = useState('')
  const [getStorageAppName, setGetStorageAppName] = useState('')

  // Get Blob from Storage
  const [getBlobFolder, setGetBlobFolder] = useState('definitions')
  const [getBlobFileName, setGetBlobFileName] = useState('')
  const [getBlobAppName, setGetBlobAppName] = useState('')

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadFiles(files)
    // Auto-populate filenames from file names
    if (files.length > 0) {
      setUploadFilenames(files.map(f => f.name).join(','))
    }
  }

  const handleUploadToStorage = async () => {
    if (uploadFiles.length === 0) {
      onError(new Error('Please select at least one file'))
      return
    }

    const filenames = uploadFilenames.split(',').map(f => f.trim()).filter(f => f)
    if (filenames.length !== uploadFiles.length) {
      onError(new Error('Number of filenames must match number of files'))
      return
    }

    setLoading(true)
    try {
      const urls = await sdk.uploadToStorage(
        filenames,
        uploadFiles,
        uploadFolder || undefined,
        uploadAppName || undefined
      )
      onResult({
        message: 'Files uploaded successfully',
        urls: urls,
        count: urls.length
      })
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGetFromStorage = async () => {
    if (!getStorageFileName) {
      onError(new Error('Please enter a file name'))
      return
    }

    setLoading(true)
    try {
      const url = await sdk.getFromStorage(
        getStorageFolder,
        getStorageFileName,
        getStorageAppName || undefined
      )
      onResult({
        message: 'Download URL retrieved successfully',
        url: url
      })
    } catch (err: any) {
      onError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGetBlobFromStorage = async () => {
    if (!getBlobFileName) {
      onError(new Error('Please enter a file name'))
      return
    }

    setLoading(true)
    try {
      const blob = await sdk.getBlobFromStorage(
        getBlobFolder,
        getBlobFileName,
        getBlobAppName || undefined
      )
      onResult({
        message: 'Blob retrieved successfully',
        blob: {
          size: blob.size,
          type: blob.type,
          // Create object URL for preview if it's an image
          previewUrl: blob.type.startsWith('image/') ? URL.createObjectURL(blob) : null
        },
        // Include blob data for download
        blobData: blob
      })
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

      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Firebase Storage Operations</h2>

      <div className="operations-grid">
        {/* Upload to Storage */}
        <div className="operation-section">
          <h4>Upload to Storage</h4>
          <div className="form-group">
            <label>Select Files</label>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ padding: '5px' }}
            />
            {uploadFiles.length > 0 && (
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#737373' }}>
                Selected: {uploadFiles.length} file(s)
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Filenames (comma-separated)</label>
            <input
              type="text"
              value={uploadFilenames}
              onChange={(e) => setUploadFilenames(e.target.value)}
              placeholder="file1.jpg, file2.png"
            />
            <small style={{ fontSize: '12px', color: '#737373' }}>
              Separate multiple filenames with commas
            </small>
          </div>
          <div className="form-group">
            <label>Folder (default: definitions)</label>
            <input
              type="text"
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value)}
              placeholder="definitions"
            />
          </div>
          <div className="form-group">
            <label>App Name (optional)</label>
            <input
              type="text"
              value={uploadAppName}
              onChange={(e) => setUploadAppName(e.target.value)}
              placeholder="my-app"
            />
          </div>
          <button
            className="button button-success"
            onClick={handleUploadToStorage}
            disabled={loading || uploadFiles.length === 0}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Upload Files
          </button>
        </div>

        {/* Get from Storage */}
        <div className="operation-section">
          <h4>Get from Storage</h4>
          <div className="form-group">
            <label>Folder Name</label>
            <input
              type="text"
              value={getStorageFolder}
              onChange={(e) => setGetStorageFolder(e.target.value)}
              placeholder="definitions"
            />
          </div>
          <div className="form-group">
            <label>File Name</label>
            <input
              type="text"
              value={getStorageFileName}
              onChange={(e) => setGetStorageFileName(e.target.value)}
              placeholder="image.jpg"
            />
          </div>
          <div className="form-group">
            <label>App Name (optional)</label>
            <input
              type="text"
              value={getStorageAppName}
              onChange={(e) => setGetStorageAppName(e.target.value)}
              placeholder="my-app"
            />
          </div>
          <button
            className="button"
            onClick={handleGetFromStorage}
            disabled={loading || !getStorageFileName}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Get Download URL
          </button>
        </div>

        {/* Get Blob from Storage */}
        <div className="operation-section">
          <h4>Get Blob from Storage</h4>
          <div className="form-group">
            <label>Folder Name</label>
            <input
              type="text"
              value={getBlobFolder}
              onChange={(e) => setGetBlobFolder(e.target.value)}
              placeholder="definitions"
            />
          </div>
          <div className="form-group">
            <label>File Name</label>
            <input
              type="text"
              value={getBlobFileName}
              onChange={(e) => setGetBlobFileName(e.target.value)}
              placeholder="image.jpg"
            />
          </div>
          <div className="form-group">
            <label>App Name (optional)</label>
            <input
              type="text"
              value={getBlobAppName}
              onChange={(e) => setGetBlobAppName(e.target.value)}
              placeholder="my-app"
            />
          </div>
          <button
            className="button"
            onClick={handleGetBlobFromStorage}
            disabled={loading || !getBlobFileName}
          >
            {loading ? <span className="loading-spinner"></span> : ''}
            Get Blob
          </button>
        </div>
      </div>
    </div>
  )
}

export default FirebaseOperations

