import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCheckCircle } from 'react-icons/ai'
import { IoMdCloseCircle } from 'react-icons/io'
import { Circles } from 'react-loader-spinner'
import FileUploader from '../components/FileUploader'
import { ABI, ADMIN_ADDRESS, CONTRACT_ADDRESS } from '../../constants'
import Layout from '../components/Layout'
import { ethers } from 'ethers'

function Home() {
  const [account, setAccount] = useState(null)

  const [contract, setContract] = useState(null)

  const [documentInfo, setDocumentInfo] = useState({})

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [encoded, setEncoded] = useState(false)

  const [isAuthentic, setIsAuthentic] = useState(null)

  useEffect(() => {
    async function init() {
      // Connect to celo network
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // create a signer
      const signer = provider.getSigner()

      // Create a contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)

      setContract(contract)
    }

    init()
  }, [])

  const verifyDocument = async () => {
    setLoading(true)
    const tx = await contract.approveDocument(
      '0',
      documentInfo.title,
      documentInfo.author,
      documentInfo.creator,
      documentInfo.producer,
      documentInfo.dateCreated,
      documentInfo.docLength
    )

    setIsAuthentic(tx)

    setLoading(false)
  }

  const uploadDocument = async () => {
    const tx = await contract.addDocument(
      documentInfo.title,
      documentInfo.author,
      documentInfo.creator,
      documentInfo.producer,
      documentInfo.dateCreated,
      documentInfo.docLength
    )
  }

  // Get the metadata from the multer backend
  const uploadFile = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('pdf', selectedFile)

      axios
        .post('http://localhost:3000/upload', formData)
        .then((response) => {
          setDocumentInfo(response.data.data)
          setEncoded(true)
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setLoading(false)
        })
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

  return (
    <Layout account={account} setAccount={setAccount}>
      <div className="flex items-center justify-between flex-1 w-full h-screen p-12">
        {/* Upload document component */}
        <div className="flex items-center justify-center flex-1 w-full h-full p-5 mr-4 border-2 rounded-md shadow-md cursor-pointer border-neutral-700">
          {loading ? (
            <Circles
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <div className="flex flex-col">
              <FileUploader
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                uploadFile={uploadFile}
              />
              {account === ADMIN_ADDRESS ? (
                <button className="my-3" onClick={uploadDocument}>
                  Upload
                </button>
              ) : (
                encoded && (
                  <button className="my-3" onClick={verifyDocument}>
                    Verify document
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Document status */}
        <div className="flex items-center justify-center flex-1 w-full h-full p-5 ml-4 rounded-md bg-neutral-800">
          {isAuthentic === true && (
            <div className="flex flex-col items-center justify-center flex-1">
              <AiFillCheckCircle size={75} color="green" />
              <h3 className="my-4 text-xl text-green-600">Document is valid</h3>
            </div>
          )}

          {isAuthentic === false && (
            <div className="flex flex-col items-center justify-center flex-1">
              <IoMdCloseCircle size={75} color="red" />
              <h3 className="my-3 text-xl text-red-600">Document is invalid</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home
