import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #00000066;
`

export const ModalWrapper = styled.div`
  background: url('assets/images/bg_multiplayer.png');
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 576px;
  background-size: contain;
  color: white;
`

export const Content = styled.div`
  text-align: center;
  height: calc(100% - 76px);
  margin-top: 76px;

  img.close {
    position: absolute;
    width: 36px;
    cursor: pointer;
    right: 8px;
    top: 22px;
  }
`

export const Title = styled.div`
  margin-top: 160px;
  margin-bottom: 50px;
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img.RoomButton {
    width: 150px;
    margin-top: 10px;
    cursor: pointer;
  }  
`
export const Backdrop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
`

export const Table = styled.div`
    width: calc(100% - 46px);
    margin: 0 auto;
    height: 100%;
`

export const THead = styled.div`
  background: url('assets/images/lead_thead.png');
  background-size: contain;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 24px;
  padding: 8px 0px;
`

export const TBody = styled.div`
  height: calc(100% - 76px);
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 20px;
    margin-left: 10px;
    background: #40808a;
    border-radius: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: white; 
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: wheat; 
  }
`

export const TRow = styled.div`
  background: #40808a;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  margin-top: 3px;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }
`

export const Identify = styled.div`
  width: 30%;
  padding-left: 8px;
`

export const Room = styled.div`
  width: 15%;
`

export const MapType = styled.div`
  width: 15%;
`

export const Population = styled.div`
  width: 20%;
`
export const Cost = styled.div`
  width: 20%;
`

