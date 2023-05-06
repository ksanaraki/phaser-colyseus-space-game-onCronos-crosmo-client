import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #00000066;
`

export const ModalWrapper = styled.div`
  background: url('assets/images/bg_setting.png');
  background-repeat: no-repeat;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 86%;
  max-width: 950px;
  max-height: 529px;
  background-size: contain;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img.close {
    position: absolute;
    top: 55px;
    right: 29px;
    width: 50px;
    cursor: pointer;
  }
`

export const SettingWrapper = styled.div`
  width: 80%;
  height: 78%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const SettingRow = styled.div`
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background: ${props => props.selected ? '#0b171a' : '#12262c'};
  border: 2px solid #234955;
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.selected ? 'var(--color-yellow)' : 'white'};
`

export const Label = styled.div`

`

export const Keyboard = styled.div`

`