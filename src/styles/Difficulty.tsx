import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #00000066;
  z-index: 9;
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

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    width: 306px;
    height: 356px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  @media only screen and (max-width: 560px) {
    width: 480px;
  }

  @media only screen and (max-width: 480px) {
    width: 360px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 24px;
  }
`

export const Content = styled.div`
  text-align: center;

  img.close {
    position: absolute;
    width: 50px;
    cursor: pointer;
    right: 35px;
    top: 80px;
  }

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    img.close {
      top: 0px;
      right: 0px;
      width: 36px;
    }
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  @media only screen and (max-width: 639px) {

  }

  @media only screen and (max-width: 560px) {

  }

  @media only screen and (max-width: 480px) {
    img.close {
      width: 42px;
      right: 12px;
    }
  }
`

export const Title = styled.div`
  margin-top: 160px;
  margin-bottom: 50px;

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    margin-top: 0;
    margin-bottom: 0;
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }
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

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
    img.difficulty {
      width: 108px;
    }
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  @media only screen and (max-width: 639px) {
    img.difficulty {
      width: 128px;
    }
  }

  @media only screen and (max-width: 560px) {
    img.difficulty {
      width: 128px;
    }
  }

  @media only screen and (max-width: 480px) {
    img.difficulty {
      width: 108px;
    }
  }
`