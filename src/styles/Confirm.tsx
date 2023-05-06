import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #00000066;
`

export const ModalWrapper = styled.div`
  background: url('assets/images/bg_confirm.png');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 530px;
  height: 310px;
  background-size: contain;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

export const Buttons = styled.div`
  width: 44%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  
  img {
    width: 110px;
    cursor: pointer;
  }
`