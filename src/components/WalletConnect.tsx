import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import * as walletMetamask from "../web3/WalletMetamask"
import * as walletConnect from "../web3/WalletConnect"

const header = {
  fontSize: '25px',
  color: 'var(--color-yellow)',
}

const button = {
  marginTop: 2,
  fontSize: '19px',
  color: '#280D5f',
  background: 'wheat',
  '&:hover': {
    background: 'rgba(253,218,158,0.8)'
  },
  padding: '10px 30px',
  display: 'flex',
  justifyContent: 'space-between'
}

const WalletConnect = (props) => {
  const handleClose = () => props.setOpen(false);
  let wallet = null;
  const onConnect = async (connector) => {
    props.setOpen(false)
    switch (connector) {
      case 'metamask':
        wallet = await walletMetamask.connect()
        localStorage.setItem('wallet-type', 'metamask')
        break;
      case 'walletconnect':
        wallet = await walletConnect.connect()
        localStorage.setItem('wallet-type', 'walletconnect')
        break;
      default:
        wallet = await walletMetamask.connect()
    }
    if (wallet !== null) {
      props.setWallet(wallet)
      const now = new Date()
      const item = {
        walletConnected: 'true',
        expiry: now.getTime() + (1000 * 3600 * 1)
      }
      localStorage.setItem('wallet-connected', JSON.stringify(item))
    }
  }

  useEffect(() => {
    const now = new Date()
    const cookie = JSON.parse(localStorage.getItem('wallet-connected'))
    const walletConnected = cookie?.walletConnected
    const expiry = cookie?.expiry
    const walletType = localStorage.getItem('wallet-type')
    if (walletConnected === 'true' && expiry > now.getTime()) onConnect(walletType)
  }, [])

  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 350,
          width: '70%',
          backgroundColor: 'rgba(40, 13, 95, 0.9)',
          boxShadow: '0px 11px 15px -7px rgb(255 255 255 / 20%), 0px -4px 10px 2px rgb(255 255 255 / 14%), 0px 9px 46px 8px rgb(255 255 255 / 12%);',
          borderRadius: 5,
          p: 4,
        }}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={header}>
            Connect Wallet
          </Typography>
          <Button fullWidth sx={button} onClick={() => onConnect('metamask')}>
            <img src="assets/images/metamask.svg" width="30" height="30" style={{ marginRight: 10 }} />
            Metamask
          </Button>
          <Button fullWidth sx={button} onClick={() => onConnect('walletconnect')}>
            <img src="assets/images/walletconnect.svg" width="30" height="30" style={{ marginRight: 10 }} />
            Wallet Connect
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default WalletConnect