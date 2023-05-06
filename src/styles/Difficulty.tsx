import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #00000066;
`

export const ModalWrapper = styled.div`
  background: url('assets/images/bg_difficulty.png');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  background-size: contain;
  color: white;
  font-size: 30px;
`

export const Content = styled.div`
  height: 100%;
  text-align: center;

  img.close {
    position: absolute;
    width: 50px;
    cursor: pointer;
    right: 35px;
    top: 80px;
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

  img.difficulty {
    width: 150px;
    margin-top: 10px;
    cursor: pointer;
  }
`