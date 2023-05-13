import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
  align-items: flex-start;

  @media only screen and (max-width: 1024px) and (orientation:portrait)  {
    padding: 24px 30px;
  }
  
  @media only screen and (max-width: 960px) and (orientation:portrait)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:portrait)  {
    padding: 20px 26px;
  }
  
  @media only screen and (max-width: 768px) and (orientation:portrait)  {
      
  }

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    padding: 16px 20px;
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
    padding: 8px 16px;
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  @media only screen and (max-width: 639px) {
    padding: 16px 24px;
    z-index: 999;
  }

  @media only screen and (max-width: 560px) {

  }

  @media only screen and (max-width: 480px) {

  }
  

  img.logo {
    width: 85px;
    height: 87px;

    @media only screen and (max-width: 1024px) and (orientation:portrait)  {
      width: 76px;
      height: 76px;
    }
    
    @media only screen and (max-width: 960px) and (orientation:portrait)  {
        
    }
    
    @media only screen and (max-width: 860px) and (orientation:portrait)  {
      width: 68px;
      height: 68px;
    }
    
    @media only screen and (max-width: 768px) and (orientation:portrait)  {
        
    }

    @media only screen and (max-width: 1024px) and (orientation:landscape)  {
      width: 64px;
      height: 64px;
    }
    
    @media only screen and (max-width: 960px) and (orientation:landscape)  {
        
    }
    
    @media only screen and (max-width: 860px) and (orientation:landscape)  {
      width: 48px;
      height: 48px;
    }
    
    @media only screen and (max-width: 768px) and (orientation:landscape)  {
        
    }

    @media only screen and (max-width: 639px) {
      width: 64px;
      height: 64px;
    }

    @media only screen and (max-width: 560px) {

    }

    @media only screen and (max-width: 480px) {
      width: 48px;
      height: 48px;
    }
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