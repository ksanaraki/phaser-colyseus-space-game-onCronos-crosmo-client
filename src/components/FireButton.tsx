import { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import JoystickItem from './Joystick'

import PhaserGame from 'phaser/PhaserGame';
import Multiplayer from 'phaser/scenes/MultiplayerScene';
import Play from 'phaser/scenes/PlayScene';

import { useAppSelector } from '../hooks'
import { JoystickMovement } from './Joystick'

const FireButtonWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 96px;
  bottom: 64px;
`

const FireButtonObj = styled.img`
  border-radius: 50%;
  width: 46px;
  height: 46px;
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

export default function FireButton({isMultiplayer}) {
  const hasSmallScreen = true; //useSmallScreen(minimumScreenWidthSize)
  const multiGame = PhaserGame.scene.keys.multiplay as Multiplayer;
  const singleGame = PhaserGame.scene.keys.play as Play;

  const handleFire = (fired: boolean) => {
    if (isMultiplayer) multiGame._myShip?.handleFire(fired)
    else singleGame._myShip?.handleFire(fired)
  }

  return (
    <>
    {hasSmallScreen && (
      <FireButtonWrapper
        onTouchStart={() => handleFire(true)}
        onTouchCancel={() => handleFire(false)}
      >
        <FireButtonObj src="assets/images/icon_DOUBLE_BULLET.png" alt="Fire Button">
        </FireButtonObj>
      </FireButtonWrapper>
    )}
    </>


  )
}
