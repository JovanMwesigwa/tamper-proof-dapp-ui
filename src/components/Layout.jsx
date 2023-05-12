import React from 'react'

const Layout = ({ children, account, setAccount }) => {
  const connectButton = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    setAccount(accounts[0])
  }

  const disconnect = () => {
    setAccount(null)
  }
  return (
    <div className="p-5">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-1"></div>
        {account ? (
          <button onClick={disconnect}>
            {account.slice(0, 6) + '...' + account.slice(38, 42)}
          </button>
        ) : (
          <button onClick={connectButton}>Connect</button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center flex-1 h-screen">
        {children}
      </div>
    </div>
  )
}

export default Layout
