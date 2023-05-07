import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  height: ${props => props.isPlayEndless || props.isMultiplayer? '100vh' : 'calc(100vh - 220px)'};
  width: 100%;
`

export const ShooterWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
}
`

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 770px;
    width: 70%;
    margin-top: -110px;
    margin-left: 9%;
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
`

export const SettingDiv = styled.div`
  position: absolute;
  right: 15px;
  bottom: -50px;

  img {
    width: 90px;
    cursor: pointer;
  }
`