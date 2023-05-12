import React, { useState } from 'react'

function FileUploader({ setSelectedFile, uploadFile, selectedFile }) {
  function handleFileSelection(event) {
    setSelectedFile(event.target.files[0])
  }

  return (
    <div className="flex items-center px-5 py-4 border-2 rounded-full border-neutral-700 hover:bg-neutral-800">
      <input type="file" onChange={handleFileSelection} />
      {selectedFile && <button onClick={uploadFile}>Encode File</button>}
    </div>
  )
}

export default FileUploader
