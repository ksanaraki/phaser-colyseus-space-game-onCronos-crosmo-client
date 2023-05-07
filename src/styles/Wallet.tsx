import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
}
`

export const AvatarWrapper = styled.div`
  height: calc(100vh - 250px);
  width: 88%;
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 150px;
`

export const Left = styled.div`
  width: 70%;
  max-width: 600px;
`

export const Title = styled.div`
  text-align: center;
  margin-bottom: 10px;
  p {
    font-size: 48px;
    color: #FFFFFF;
  }
  img {
    width: 450px;
  }
`

export const SubTitle = styled.h3`
  font-size: 25px;
  color: white;
  text-align: center;
  font-weight: normal;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SwiperWrapper = styled.div`
  width: 425px;
  height: 460px;
  max-height: 460px;
  background-size: contain;
  margin: 0 auto;
  display: flex;

  --swiper-navigation-size: 24px;

  .swiper-container {
    width: 425px;
    height: 440px;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-container .swiper-button-next::after,
  .swiper-container .swiper-button-prev::after {
    content: none;
  }

  .swiper-slide {
    height: 440px;
    margin-top: 30px;
    margin-left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img.create-game {
    width: 100%;
    height: 100%;
    object-fit: cover
  }

  .swiper-slide p.title {
    position: absolute;
    color: white;
    font-size: 36px;
  }

  .swiper-slide img.ship {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }

  .swiper-slide img.shield {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  
  .swiper-slide img.broken {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  .swiper-slide img.crosmonaut {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  .swiper-slide img.background {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  .swiper-slide img.on_background {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  .swiper-slide img.booster {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  .swiper-slide img.weapon {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  
  .swiper-slide img.banner {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 12px;
  }
  .swiper-slide img.tier {
    position: absolute;
    width: 80px;
    top: 20px;
    right: 33px;
  }
  
  .swiper-slide img.avatarBg {
    position: absolute;
    top: -46px;
    left: 2px;
    width: 421px;
    height: 462px;
  }

  .swiper-slide p.name {
    position: absolute;
    top: -15px;
    left: calc(50% );
    transform: translate(-50%, 0);
    font-size: 16px;
    color: var(--color-yellow);
  }

  .swiper-slide p.tier {
    position: absolute;
    left: calc(50% - 10px);
    bottom: 50px;
    transform: translate(-50%, 0);
    font-size: 16px;
    color: var(--color-yellow);
  }
`

export const Arrow = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 50px;
    height: 55px;
    cursor: pointer;
  }
`

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 300px;
  flex-direction: column;
  margin-top: 65px;

  color: var(--color-yellow);
`

export const Reward = styled.div`
  font-size: 23px;
  text-align: center;
`

export const UpdateLevel = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  background: rgba(40,13,95,1);
  color: white;
  cursor: pointer;
`

export const Join = styled.div`
  background: url('assets/images/avatar_join.png');
  font-size: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  width: 132px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`

export const ModeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img.room {
    width: 80px;
    object-fit: cover;
    opacity: 0.45;
    &:hover {
      cursor: pointer;
    }
  }
  img.room.selected {
    opacity: 1 !important
  }
`

export const GameMode = styled.div`
  width: 80px;
  margin-right: 4px;
  margin-left: 4px;
  padding: 8px 10px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-image: ${props => props.bgColor};
  color: white;
  cursor: pointer;
`