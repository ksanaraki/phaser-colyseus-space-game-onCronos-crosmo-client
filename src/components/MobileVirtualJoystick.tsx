import { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import JoystickItem from './Joystick'

import PhaserGame from 'phaser/PhaserGame';
import Multiplayer from 'phaser/scenes/MultiplayerScene';

import { useAppSelector } from '../hooks'
import { JoystickMovement } from './Joystick'

const Backdrop = styled.div`
  position: fixed;
  bottom: 100px;
  right: 32px;
  max-height: 50%;
  max-width: 100%;
`

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`

const JoystickWrapper = styled.div`
  margin-top: auto;
  align-self: flex-end;
`
export const minimumScreenWidthSize = 650 //px

const useSmallScreen = (smallScreenSize: number) => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width <= smallScreenSize
}

export default function MobileVirtualJoystick() {
  const showJoystick = useAppSelector((state) => state.user.showJoystick)
  const hasSmallScreen = useSmallScreen(minimumScreenWidthSize)
  const game = PhaserGame.scene.keys.multiplay as Multiplayer

  useEffect(() => {}, [showJoystick])

  const handleMovement = (movement: JoystickMovement) => {
    game._myShip?.handleJoystickMovement(movement)
  }

  return (
    <Backdrop>
      <Wrapper>
        {hasSmallScreen || showJoystick && (
          <JoystickWrapper>
            <JoystickItem onDirectionChange={handleMovement}></JoystickItem>
          </JoystickWrapper>
        )}
      </Wrapper>
    </Backdrop>
  )
}
