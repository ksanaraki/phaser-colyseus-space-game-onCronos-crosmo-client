import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #00000066;
`

export const ModalWrapper = styled.div`
  background: url('assets/images/bg_leaderboard.png');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1100px;
  height: 605px;
  background-size: contain;
  color: white;
  font-size: 25px;
`

export const Content = styled.div`
  width: 92%;
  height: 83%;
  margin: 5.5% auto;
`

export const Leagues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img.leagues {
    width: 150px;
  }
  
  img.close {
    width: 50px;
    cursor: pointer;
  }
`

export const League = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img.league {
    height: 33px;
    margin-left: -12px;
    cursor: pointer;
  }

  img.default {
    margin-right: 20px;
  }
`

export const Periods = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;

  img.period {
    width: 120px;
    cursor: pointer;
  }
`

export const Table = styled.div`
  height: 100%;
  margin-top: 20px;
`

export const THead = styled.div`
  background: url('assets/images/lead_thead.png');
  background-size: contain;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: calc(100% - 30px);

  img {
    height: 28px;
    margin-top: 7px;
  }
`

export const TBody = styled.div`
  height: calc(100% - 150px);
  overflow-y: scroll;

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
  width: 99%;
  margin-top: 3px;
`

export const Rank = styled.div`
  width: 15%;
  padding-left: 20px;
`

export const Name = styled.div`
  width: 55%;
`

export const Score = styled.div`
  width: 30%;
`