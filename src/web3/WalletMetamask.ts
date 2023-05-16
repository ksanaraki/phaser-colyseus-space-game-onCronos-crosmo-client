import { ethers } from "ethers"
import * as config from "./config/env"

const hexToInt = (s) => {
  const bn = ethers.BigNumber.from(s)
  return parseInt(bn.toString())
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: config.configVars.mainnet.chainIdHex }],
    })
  } catch (e) {
    console.log('error in switchNetwork', e)
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: config.configVars.mainnet.chainIdHex,
          chainName: config.configVars.mainnet.chainName,
          rpcUrls: [config.configVars.mainnet.rpcUrl],
          nativeCurrency: config.configVars.mainnet.nativeCurrency,
          blockExplorerUrls: [config.configVars.mainnet.blockExplorerUrl],
        },
      ],
    })
  }
}

export const connect = async () => {
  try {
    let chainId = await window.ethereum.request({ method: "eth_chainId" })
    if (!(chainId === config.configVars.mainnet.chainIdHex)) {
      await switchNetwork()
      await delay(2000)
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    // window.ethereum.on("chainChanged", utils.reloadApp)
    // window.ethereum.on("accountsChanged", utils.reloadApp)
    // window.ethereum.on("disconnect", utils.reloadApp)
/*
    window.ethereum.on("accountsChanged", accounts => {
      if (accounts.length <= 0) {
        const now = new Date()
        const item = {
          walletConnected: 'false',
          expiry: now.getTime()
        }
        localStorage.setItem('wallet-connected', JSON.stringify(item))
      }
      window.location.reload()
    });*/
    return {
      walletProviderName: "metamask",
      address: accounts[0],
      browserWeb3Provider: new ethers.providers.Web3Provider(window.ethereum),
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.mainnet.rpcUrl
      ),
      connected: true,
      chainId: hexToInt( await window.ethereum.request({ method: "eth_chainId" }) ),
    }
  } catch (e) {
    console.log("error in connect", e)
    return null
  }
}
