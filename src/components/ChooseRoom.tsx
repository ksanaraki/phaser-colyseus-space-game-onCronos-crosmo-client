import store from '../stores'
import {  setJoinLobbyRoom  } from '../stores/UserStore'
import { useState } from "react"


import {
  Wrapper,
  ModalWrapper,
  Content,
  Title,
  Buttons,
}
  from '../styles/ChooseRoom'


const ChooseRoom = ({ setIsChooseRoom, }) => {

  const [isCreateOrJoinRoom, setCreateOrJoinRoom] = useState(false)


  const startLobbyGame=()=>
  {

    setIsChooseRoom(false);
    store.dispatch(setJoinLobbyRoom(true))

  }
  
  let ui: JSX.Element
  if (isCreateOrJoinRoom)
  {
    ui=<ModalWrapper>
    <Content>     
      <img className='close' src="assets/images/btn_close.png" alt="close" onClick={() => setIsChooseRoom(false)} />
    </Content>
    </ModalWrapper>
  }
  else{
    ui=<ModalWrapper>
    <Content>
      <Title>
        Start Multiplayer Game
      </Title>
      <Buttons>
        <img className='RoomButton' onClick={() =>startLobbyGame() }
          src={'assets/images/btn_joingame.png'} alt="join Game" />
        {/* <img className='RoomButton' onClick={() => setCreateOrJoinRoom(true)}
          src={``} alt="CreateOrJoin" />             */}
      </Buttons>
      <img className='close' src="assets/images/btn_close.png" alt="close" onClick={() => setIsChooseRoom(false)} />
    </Content>
    </ModalWrapper>
  }
  return (
    
    <Wrapper>
      {ui} 
      
    </Wrapper>
  )
}

export default ChooseRoom