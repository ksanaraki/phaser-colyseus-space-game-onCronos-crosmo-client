import { ethers } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"
import * as config from "./config/env"

export const connect = async () => {
  try {
    localStorage.clear()
    const provider = new WalletConnectProvider({
      rpc: {
        [config.configVars.mainnet.chainId]:
          config.configVars.mainnet.rpcUrl,
      },
      chainId: config.configVars.mainnet.chainId,
    })
    await provider.enable()
    const ethersProvider = new ethers.providers.Web3Provider(provider)
    if (!(provider.chainId === config.configVars.mainnet.chainId)) {
      window.alert(
        "Switch your Wallet to blockchain network " +
        config.configVars.mainnet.chainName
      )
      return null
    }
    // provider.on("accountsChanged", utils.reloadApp)
    // provider.on("chainChanged", utils.reloadApp)
    // provider.on("disconnect", utils.reloadApp)

    provider.on("accountsChanged", accounts => {
      if (accounts.length <= 0) {
        const now = new Date()
        const item = {
          walletConnected: 'false',
          expiry: now.getTime()
        }
        localStorage.setItem('wallet-connected', JSON.stringify(item))
      }
      window.location.reload()
    });

    return {
      walletProviderName: "walletconnect",
      address: (await ethersProvider.listAccounts())[0],
      browserWeb3Provider: ethersProvider,
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.mainnet.rpcUrl
      ),
      wcProvider: provider,
      connected: true,
      chainId: provider.chainId,
    }
  } catch (e) {
    return null
  }
}
