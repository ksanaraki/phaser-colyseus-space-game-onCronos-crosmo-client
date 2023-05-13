import { useState, useRef, useEffect } from 'react'

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff  from '@mui/icons-material/VisibilityOff';

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

import { useAppSelector } from 'hooks';

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
import { IRoomData } from 'types/Rooms';
import PhaserGame from 'phaser/PhaserGame';
import Boot from 'phaser/scenes/BootScene';

SwiperCore.use([Navigation])

const CreateRoom = ({setIsViewMulti, playMultiplayer}) => {

  const [noticeMsg, setNoticeMsg] = useState('')
  const [showNotice, setShowNotice] = useState(false)
  const [severity, setSeverity] = useState('')

  const [roomMode, setRoomMode] = useState<RoomMode>(RoomMode.OvO);
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.Blank);
  const [cost, setCost] = useState<number>(0);
  const [pwd, setPwd] = useState<string>(``);

  const [showPassword, setShowPassword] = useState(false);
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);
  const availableRooms = useAppSelector((state) => state.room.availableRooms);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // create custom room if name and description are not empty
    if (lobbyJoined) {
      const boot = PhaserGame.scene.keys.boot as Boot
      boot._network
        .createCustom({
          name: ``,
          password: pwd,
          autoDispose: true,
          roomMode,
          mapMode,
          cost
        })
        .then(() => {
          setIsViewMulti(false);
          playMultiplayer();
        })
        .catch((error) => console.error(error))
    }
  }
  
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
                      switch(swiper.activeIndex) {
                        case 0: 
                          setMapMode(MapMode.Blank);
                          break;
                        case 1: 
                          setMapMode(MapMode.Asteroid);
                          break;

                        default:
                          setMapMode(MapMode.Blank);
                          break;
                      }
                    }}
                  >
                    {Object.keys(MapMode).map((mapname: string, _index: number) => {
                      return <SwiperSlide key={_index} >
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
                Cost For Creation: {cost} Crons
              </Reward>
              <TextField
                type={showPassword ? 'text' : 'password'}
                label="Password (optional)"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPwd(event.target.value);
                }}
                sx={{
                  '& *': {color: `#FFFFFF`, borderColor: `#FFFFFF`}
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Join onClick={handleSubmit}>
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