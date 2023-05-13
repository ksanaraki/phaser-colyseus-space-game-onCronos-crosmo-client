import { useState } from 'react'
import { Link } from 'react-router-dom'

import WalletConnect from './WalletConnect'

import {
  Wrapper,
  ButtonWallet
} from '../styles/Header'

const Header = ({ account, setWallet, setBg }) => {

  const [open, setOpen] = useState(false)

  const connectWallet = () => {
    !account && setOpen(true)
  }

  const filterAddress = (account: string) => {
    return account.slice(0, 7) + '...' + account.slice(38, 42)
  }

  return (
    <>
      <Wrapper>
        <Link to="/" onClick={() => setBg('bg_main')}>
          <img className='logo' src='assets/images/logo_yellow.png' alt="logo" />
        </Link>
        <ButtonWallet onClick={connectWallet} className={`wallet-btn`}>
          {account ? filterAddress(account) : 'CONNECT YOUR WALLET'}
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