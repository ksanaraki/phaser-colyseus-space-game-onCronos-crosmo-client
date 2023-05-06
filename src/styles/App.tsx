import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: url('assets/images/${props => props.bg}.png');
  background-position: center;
  background-size: cover;
}
`

export const ProgressBarWrapper = styled.div`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4a97d2;
`

export const SubTitle = styled.div`
  font-size: 20px;
  color: white;
  text-align: center;
  font-weight: normal;
`