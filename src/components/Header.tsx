import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import WalletConnect from './WalletConnect';

import { connectAccount, walletDisconnect } from 'web3/connect'

import store from 'stores'
import { useAppSelector } from 'hooks'
import { setWalletConnecting } from 'stores/WalletStore'

import {
  Wrapper,
  ButtonWallet
} from '../styles/Header';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Header = ({ account, setWallet, setBg }) => {

  const walletConnecting = useAppSelector((state) => state.wallet.walletConnecting);

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const now = new Date()
    const cookie = JSON.parse(localStorage.getItem('wallet-connected'))
    const walletConnected = cookie?.walletConnected
    const expiry = cookie?.expiry
    const walletType = localStorage.getItem('wallet-type');
    // if (walletConnected === 'true' && expiry > now.getTime()) connectAccount()
  }, [])

  const connectWallet = () => {
    !account && setOpen(true)
  }

  const filterAddress = (account: string) => {
    return account.slice(0, 7) + '...' + account.slice(38, 42)
  }

  const connectWalletPressed = async () => {
    // if(!account) {
    //   const w = await connectAccount();
    //   if(w) {
    //     setWallet(w);
    //   }
    // }
    // else {
    //   if(!walletConnecting) {
    //     walletDisconnect();
    //     await delay(100);
    //     window.location.reload();
    //   }
    //   else {
    //     return;
    //   }
    // }
    await connectAccount();
  };

  return (
    <>
      <Wrapper>
        <Link to="/" onClick={() => setBg('bg_main')}>
          <img className='logo' src='assets/images/logo_yellow.png' alt="logo" />
        </Link>
        <ButtonWallet onClick={connectWalletPressed} className={`wallet-btn`}>
          {
            walletConnecting ? `Connecting...` : account ? filterAddress(account) : 'CONNECT YOUR WALLET'
          }
        </ButtonWallet>
      </Wrapper>
      <WalletConnect
        open={open}
        setOpen={setOpen}
        setWallet={setWallet}
      />
    </>
  )
}

export default Header