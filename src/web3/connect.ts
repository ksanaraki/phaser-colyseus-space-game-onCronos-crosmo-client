import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import store from 'stores'
import { useAppSelector } from 'hooks'
import { setWalletConnecting } from 'stores/WalletStore'

import * as config from "./config/env";

const hexToInt = (s) => {
  const bn = ethers.BigNumber.from(s)
  return parseInt(bn.toString())
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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

export const connectAccount = async (firstRun = false, type = "") => {
    let chainId = await window.ethereum.request({ method: "eth_chainId" })
    if (!(chainId === config.configVars.mainnet.chainIdHex)) {
      await switchNetwork()
      await delay(2000)
    }

    const providerOptions = {
      injected: {
        display: {
          logo: "https://github.com/MetaMask/brand-resources/raw/master/SVG/metamask-fox.svg",
          name: "MetaMask",
          description: "Connect with MetaMask in your browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          chainId: config.configVars.mainnet.chainId,
          rpc: {
            [config.configVars.mainnet.chainId]: config.configVars.mainnet.rpcUrl,
          },
          network: "cronos",
          metadata: {
            icons: ["https://ebisusbay.com/vector%20-%20face.svg"],
          },
        }
      }
    };

    const web3Modal = new Web3Modal({
      // cacheProvider: true, // optional
      providerOptions, // required
    });

    console.log(`web3Modal`, web3Modal);

    const web3provider = await web3Modal
      .connect()
      .then((web3provider) => web3provider)
      .catch((error) => {
        console.log("Could not get a wallet connection", error);
        return null;
      });

    console.log('web3provider:',web3provider)

    if (!web3provider) {
      walletDisconnect();
      return null;
    }

    try {
      store.dispatch(setWalletConnecting(true));
      const provider = new ethers.providers.Web3Provider(web3provider);
      console.log(`provider`, provider);
      const cid = await web3provider.request({
        method: "net_version",
      });
      console.log("cid: ", cid);

      const accounts = await web3provider.request({
        method: "eth_accounts",
        params: [{ chainId: cid }],
      });
      console.log("accounts: ", accounts);
      console.log(`web3provider.isMetaMask`, web3provider.isMetaMask);
      const address = accounts[0];

      console.log(`web3provider.chainId`, web3provider.chainId);

      web3provider.on("DeFiConnectorDeactivate", (error) => {
        walletDisconnect()
      });

      web3provider.on("disconnect", (error) => {
        walletDisconnect()
      });

      web3provider.on("accountsChanged", (accounts) => {
        walletDisconnect()
      });

      web3provider.on("DeFiConnectorUpdate", (accounts) => {
        window.location.reload();
      });

      web3provider.on("chainChanged", (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.

        window.location.reload();
      });

      store.dispatch(setWalletConnecting(false));
      return {
        walletProviderName: web3provider.isMetaMask ? `metamask` : `walletconnect`,
        address: address,
        browserWeb3Provider: provider,
        serverWeb3Provider: new ethers.providers.JsonRpcProvider(
          config.configVars.mainnet.rpcUrl
        ),
        wcProvider: provider,
        connected: true,
        chainId: web3provider.isMetaMask ? hexToInt( await window.ethereum.request({ method: "eth_chainId" }) ) : hexToInt(web3provider.chainId),
      }
    } catch (error) {
      console.log("Error connecting wallet!", error);
      walletDisconnect();
      return null;
    }
    
  };

export const walletDisconnect = () => {
  const web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions: {}, // required
  });
  web3Modal.clearCachedProvider();
  store.dispatch(setWalletConnecting(false));
};
