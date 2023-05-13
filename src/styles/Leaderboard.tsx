import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #00000066;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
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

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    width: 580px;
    height: 324px;
    font-size: 18px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  @media only screen and (max-width: 639px) {
    width: 92%;
    height: 80%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 83%;
  margin: 5.5% auto;

  @media only screen and (max-width: 639px) {
    width: 100%;
    height: 80%;
    margin: 0 auto;
  }
`

export const Leagues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
  margin: 0 auto;
  img.leagues {
    width: 150px;
  }
  
  img.close {
    width: 50px;
    cursor: pointer;
  }

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    overflow-x: scroll;
    margin-top: 40px;

    img.leagues {
      width: 128px;
      margin-right: 16px;
    }

    img.default {
      margin-left: 0;
    }

    img.close {
      position: absolute;
      width: 36px;
      top: 0;
      right: 0;
    }
  }

  @media only screen and (max-width: 639px) {
    margin-top: 64px;
    flex-wrap: wrap;

    img.leagues {
      width: 128px;
      margin: 0 auto;
      margin-bottom: 8px;
    }

    img.close {
      position: absolute;
      width: 36px;
      top: 0;
      right: 0;
    }
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

  @media only screen and (max-width: 639px) {
    flex-wrap: wrap;
    width: 92%;
    margin: 0 auto;
    img {
      margin-bottom: 8px;
    }

    img.league {
      margin-left: 0px;
    }

    img.default {
      margin-right: 0px;
    }
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

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    margin-top: 16px;
    img.period {
      width: 96px;
    }
  }

  @media only screen and (max-width: 639px) {
    img.period {
      width: 108px;
    }
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
  width: calc(100% - 46px);
  margin: 0 auto;
  img {
    height: 28px;
    margin-top: 7px;
  }

  @media only screen and (max-width: 639px) {
    width: 100%;
  }
`

export const TBody = styled.div`
  height: calc(100% - 150px);
  overflow-y: scroll;
  width: calc(100% - 46px);
  margin: 0 auto;

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

  @media only screen and (max-width: 639px) {
    height: calc(100% - 216px);
    width: 100%;
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

  @media only screen and (max-width: 639px) {
    height: 80px;
  }
`

export const Rank = styled.div`
  width: 15%;
  padding-left: 20px;
`

export const Name = styled.div`
  width: 55%;

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    text-align: right;
  }

  @media only screen and (max-width: 639px) {
    text-align: right;
  }

`

export const Score = styled.div`
  width: 30%;

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    text-align: right;
  }

  @media only screen and (max-width: 639px) {
    text-align: right;
  }
`