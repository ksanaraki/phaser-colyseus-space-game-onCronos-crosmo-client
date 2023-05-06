import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 50px;
  align-items: flex-start;

  img.logo {
    width: 85px;
    height: 87px;
  }
`

export const ButtonWallet = styled.div`
  background: url('assets/images/btn_connect.png');
  background-size: contain;
  width: 250px;
  height: 47px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 17px;
`