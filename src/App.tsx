import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import styled from 'styled-components'
import LinearProgress from '@mui/material/LinearProgress'

import { useAppSelector } from './hooks'

import Header from "./components/Header"
import MainUI from "./pages/MainUI"

import { Wrapper, ProgressBarWrapper, SubTitle } from './styles/App'

const ProgressBar = styled(LinearProgress)`
  width: 360px;
`

const App = () => {

  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined)
  //@ts-ignore
  const [{ walletProviderName, address, browserWeb3Provider, serverWeb3Provider, connected, chainId }, setWallet] = useState({}) //serverWeb3Provider, connected,walletProviderName,
  const [bg, setBg] = useState('bg_main')
  const [isGamePlaying, setIsGamePlaying] = useState(false)

  return (
    <Wrapper bg={bg}>
      <BrowserRouter>
        {!isGamePlaying && <Header
          account={address}
          setWallet={setWallet}
          setBg={setBg}
        />}
        <Routes>
          <Route path="/" element={<Navigate to="/shooter" replace />} />
          <Route path="shooter"
            element={<MainUI
              account={address}
              web3Provider={browserWeb3Provider}
              chainId={chainId}
              setBg={setBg}
              setIsGamePlaying={setIsGamePlaying}
            />}
          />
        </Routes>
      </BrowserRouter>
      {!lobbyJoined && (
        <ProgressBarWrapper>
          <SubTitle> Connecting to server...</SubTitle>
          <ProgressBar color='inherit' sx={{ mt: 1 }} />
        </ProgressBarWrapper>
      )}
    </Wrapper>
  )
}

export default App
