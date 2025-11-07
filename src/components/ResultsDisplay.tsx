import React from 'react'

interface ResultsDisplayProps {
  result: any
  error: string | null
  onClear: () => void
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, error, onClear }) => {
  if (!result && !error) {
    return null
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2>Results</h2>
        <button className="button button-secondary" onClick={onClear}>
          Clear Results
        </button>
      </div>

      {error && (
        <div className="results error">
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}

      {result && (
        <div className="results success">
          <strong>Success:</strong>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default ResultsDisplay

