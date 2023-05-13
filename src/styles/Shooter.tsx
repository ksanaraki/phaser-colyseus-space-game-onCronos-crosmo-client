import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  @media only screen and (max-width: 639px) {
    margin-top: 25%;
    padding-bottom: 10%;
  }

  @media only screen and (max-width: 560px) {
    margin-top: 45%;
    padding-bottom: 10%;
  }
`

export const ShooterWrapper = styled.div`
  width: 100%;
  background-position: center;
  background-size: cover;
}
`

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {

  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  img {
    max-width: 770px;
    width: 70%;

    @media only screen and (max-width: 1600px) {

    }

    @media only screen and (max-width: 1366px) {

    }

    @media only screen and (max-width: 1024px) and (orientation:portrait)  {
      width: 50%;
      margin-bottom: 10%;
    }
    
    @media only screen and (max-width: 960px) and (orientation:portrait)  {
      width: 60%;
    }
    
    @media only screen and (max-width: 860px) and (orientation:portrait)  {
      width: 70%;
    }
    
    @media only screen and (max-width: 768px) and (orientation:portrait)  {
      width: 80%;
    }

    @media only screen and (max-width: 1024px) and (orientation:landscape)  {
      width: 50%;

    }
    
    @media only screen and (max-width: 960px) and (orientation:landscape)  {
        
    }
    
    @media only screen and (max-width: 860px) and (orientation:landscape)  {
        
    }
    
    @media only screen and (max-width: 768px) and (orientation:landscape)  {
        
    }

    @media only screen and (max-width: 639px) {
      width: 90%;
      margin-bottom: 10%;
    }

    @media only screen and (max-width: 639px) {

    }

    @media only screen and (max-width: 560px) {

    }

    @media only screen and (max-width: 480px) {

    }
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    width: auto;
    margin: 0 auto;
    cursor: pointer;
  }
  
  img.play {
    height: 55px;
    margin-top: 3px;
  }

  img.playmulti {
    height: 48px;
    margin-top: 12px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
  }
  
  img.setting {
    height: 45px;
    margin-top: 5px;
  }

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    z-index: 2;
    img, img.play, img.playmulti, img.setting {
      height: 36px;
    }

    img.play, img.playmulti {
      height: 42px;
    }
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  @media only screen and (max-width: 639px) {
    img, img.play, img.playmulti, img.setting {
      height: 48px;
    }

    img.play, img.playmulti {
      height: 52px;
    }
  }

  @media only screen and (max-width: 560px) {
    img, img.play, img.playmulti, img.setting {
      height: 42px;
    }

    img.play, img.playmulti {
      height: 46px;
    }
  }

  @media only screen and (max-width: 480px) {
    img, img.play, img.playmulti, img.setting {
      height: 38px;
    }

    img.play, img.playmulti {
      height: 42px;
    }
  }
`

export const SettingDiv = styled.div`
  position: absolute;
  right: 15px;
  bottom: 16px;
  img {
    width: 90px;
    cursor: pointer;
  }

  @media only screen and (max-width: 1024px) and (orientation:landscape)  {
    img {
      width: 76px;
    }
  }
  
  @media only screen and (max-width: 960px) and (orientation:landscape)  {
    img {
      width: 64px;
    }
  }
  
  @media only screen and (max-width: 860px) and (orientation:landscape)  {
      
  }
  
  @media only screen and (max-width: 768px) and (orientation:landscape)  {
      
  }

  @media only screen and (max-width: 639px) {

    img {
      width: 84px;
    }
  }

  @media only screen and (max-width: 560px) {

    img {
      width: 76px;
    }
  }

  @media only screen and (max-width: 480px) {

    img {
      width: 64px;
    }
  }
`