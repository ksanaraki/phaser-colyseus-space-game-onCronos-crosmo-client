import React, { useEffect, useState } from 'react';

import { useAppSelector } from 'hooks';

import {
  Wrapper,
  ModalWrapper,
  Content,
  Table,
  THead,
  TBody,
  TRow,
  Identify,
  MapType,
  Room,
  Population,
  Cost
} from './../styles/ChooseRoom';

import RoomType  from 'interfaces/RoomType';
import { RoomMode } from 'interfaces/RoomMode';
import { MapMode } from 'interfaces/MapMode';

const ChooseRoom = ({setShowMultiJoin}) => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const availableRooms = useAppSelector((state) => state.room.availableRooms);

  useEffect(
    () => {
      const tempRooms = [
        {
          roomId: 1,
          population: 3,
          roomMode: RoomMode.DvD,
          mapMode: MapMode.Blank,
          cost: 10
        },
        {
          roomId: 2,
          population: 2,
          roomMode: RoomMode.OvO,
          mapMode: MapMode.Bots,
          cost: 10
        },
        {
          roomId: 3,
          population: 4,
          roomMode: RoomMode.TvT,
          mapMode: MapMode.Asteroid,
          cost: 10
        },
        {
          roomId: 4,
          population: 3,
          roomMode: RoomMode.DvD,
          mapMode: MapMode.Blank,
          cost: 12
        },
        {
          roomId: 5,
          population: 1,
          roomMode: RoomMode.DvD,
          mapMode: MapMode.Blank,
          cost: 10
        }
      ];
      setRooms([...tempRooms, ...tempRooms, ...tempRooms]);
      console.log(`availableRooms`, availableRooms);
    }, []
  );

  return (
    <Wrapper>
      <ModalWrapper>
        <Content>
          <img 
            className='close' 
            src="assets/images/btn_close.png" 
            alt="close" 
            onClick={() => setShowMultiJoin(false)} 
          />
          <Table>
            <THead>
              <Identify>
                ID
              </Identify>
              <Room>
                Mode
              </Room>
              <MapType>
                Map
              </MapType>
              <Population>
                Players
              </Population>
              <Cost>
                Cost
              </Cost>
            </THead>
            <TBody>
              {rooms?.map((room: RoomType, index: number) => {
                return <TRow 
                  key={index}
                  onClick={
                    () => {

                    }
                  }
                >
                  <Identify>
                  {room?.roomId}
                  </Identify>
                  <Room>
                  {room?.roomMode}
                  </Room>
                  <MapType>
                  {room?.mapMode}
                  </MapType>
                  <Population>
                  {room?.population}
                  </Population>
                  <Cost>
                  {room?.cost}
                  </Cost>
                </TRow>
              })}
              {(!rooms || rooms.length === 0) && <div style={{ textAlign: 'center', marginTop: 20 }}>There is no any rooms!</div>}
            </TBody>
          </Table>
        </Content>
      </ModalWrapper>
    </Wrapper>
  )
}

export default ChooseRoom
