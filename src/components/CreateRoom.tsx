import { useState, useRef, useEffect } from 'react'


import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

import Notice from './Notice'

import { MapMode } from 'interfaces/MapMode';
import { RoomMode } from 'interfaces/RoomMode';

import {
  Wrapper,
  AvatarWrapper,
  Container,
  Content,
  SwiperWrapper,
  Arrow,
  Title,
  Left,
  Right,
  Reward,
  Join,
  ModeWrapper
} from '../styles/Wallet'

SwiperCore.use([Navigation])

const CreateRoom = () => {

  const [noticeMsg, setNoticeMsg] = useState('')
  const [showNotice, setShowNotice] = useState(false)
  const [severity, setSeverity] = useState('')

  const [roomMode, setRoomMode] = useState<RoomMode>(RoomMode.Free)
  
  const swiperRef = useRef(null);
  return (
    <>
      <Wrapper>
        <AvatarWrapper>
        <Container>
            <Left>
              <Title>
                <p>Select The Game Mode</p>
              </Title>
              <Content>
                <Arrow onClick={() => swiperRef.current.swiper.slidePrev()}>
                  <img src="assets/images/avatar_prev.png" alt="prev" />
                </Arrow>
                <SwiperWrapper>
                  <Swiper
                    //@ts-ignore
                    ref={swiperRef}
                    navigation
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={(swiper) => {
                      console.log(`swiper.activeIndex`, swiper.activeIndex);
                    }}
                  >
                    {Object.keys(MapMode).map((mapname: string, _index: number) => {
                      return <SwiperSlide key={_index}>
                        <img className='create-game' src={`assets/images/mapmode/${mapname}.jpg`} alt={mapname} />
                        <p className='title'>{mapname} MAP</p>
                      </SwiperSlide>
                    })}
                  </Swiper>
                </SwiperWrapper>
                <Arrow onClick={() => swiperRef.current.swiper.slideNext()}>
                  <img src="assets/images/avatar_next.png" alt="next" />
                </Arrow>
              </Content>
            </Left>
            <Right>
              <Reward>
                Select The Play Mode
              </Reward>
              <ModeWrapper>
                {
                  Object.values(RoomMode).map((mode: RoomMode, _index: number) => {
                    return <img key={_index} className={`room ${roomMode == mode ? 
                    'selected' : ''}`} src={`assets/images/roommode/${mode}.png`} alt={mode} onClick={() => setRoomMode(mode)} />;
                  })
                }
              </ModeWrapper>
              <Reward>
                Cost For Creation: 100 Crons
              </Reward>
              <Join onClick={() => {}}>
                Create
              </Join>
            </Right>
          </Container>
        </AvatarWrapper>
      </Wrapper>
      <Notice noticeMsg={noticeMsg}
        showNotice={showNotice}
        setShowNotice={setShowNotice}
        severity={severity}
      />
    </>
  )
}

export default CreateRoom