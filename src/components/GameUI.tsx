import React, { useState, useEffect } from 'react'

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';

import { useAppSelector } from '../hooks'
import { BULLET_TYPE } from './../types/config/helper';

const BulletLinearProgress = withStyles(() => {
  return {
    root: {
      borderRadius: 5,
      height: 10,
      width: "100%",
      border: '2px solid #ffe2b8'
    },
    colorPrimary: {
      backgroundColor: '#39260b'
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#fff"
    }
  };
})(LinearProgress);

const ShieldLinearProgress = withStyles(() => {
  return {
    root: {
      borderRadius: 5,
      width: '100%',
      height: 10,
      border: '2px solid #2099e5'
    },
    colorPrimary: {
      backgroundColor: '#0b1939'
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#235aa5"
    }
  };
})(LinearProgress);

const GameUI = ({ specialKey }) => {

  const [bulletPercent, setBulletPercent] = useState(0)
  const [shieldPercent, setShieldPercent] = useState(0)
  const bulletName = useAppSelector((state) => state.phaser.bulletName)
  const bulletDuration = useAppSelector((state) => state.phaser.bulletDuration)
  const bulletChanged = useAppSelector((state) => state.phaser.bulletChanged)
  const shieldName = useAppSelector((state) => state.phaser.shieldName)
  const shieldDuration = useAppSelector((state) => state.phaser.shieldDuration)
  const shieldChanged = useAppSelector((state) => state.phaser.shieldChanged)
  const hasAtomic = useAppSelector((state) => (state.phaser.hasAtomic))

  let bulletCount = bulletDuration - 0.15
  let shieldCount = shieldDuration - 0.15

  useEffect(() => {
    const timer = setInterval(() => {
      const bulletPercentVal = bulletCount / bulletDuration * 100
      setBulletPercent(bulletPercentVal);
      if (bulletCount <= 0) {
        setBulletPercent(0)
        clearInterval(timer)
      }
      bulletCount -= 0.25
    }, 250)
    return () => {
      clearInterval(timer);
    }
  }, [bulletName, bulletDuration, bulletChanged])

  useEffect(() => {
    const timer = setInterval(() => {
      const shieldPercent = shieldCount / shieldDuration * 100
      setShieldPercent(shieldPercent)
      if (shieldCount <= 0) {
        setShieldPercent(0)
        clearInterval(timer)
      }
      shieldCount -= 0.25
    }, 250)
    return () => {
      clearInterval(timer);
    }
  }, [shieldName, shieldDuration, shieldChanged])

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        height: 70,
        mr: '10px',
      }}>
        {shieldPercent !== 0 && <Box sx={{
          textAlign: 'right',
          mt: '60px'
        }}>
          <Box sx={{
            width: 210,
            transform: 'rotate(180deg)',
          }}>
            <ShieldLinearProgress variant="determinate" value={shieldPercent} />
          </Box>
          <Typography sx={{
            fontSize: '20px',
            color: '#24c2bc'
          }}>
            SHIELD
          </Typography>
        </Box>}
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Box sx={{
          width: 'calc(100vh - 220px)',
          transform: 'translate(42%, 20px)'
        }}>
          <Box sx={{
            width: "100%",
            transform: 'rotate(-90deg) translateX(-50%)',
            flexDirection: 'row-reverse',
            display: 'flex',
            alignItems: 'center'
          }}>
            {bulletPercent !== 0 && <>
              <BulletLinearProgress variant="determinate" value={bulletPercent} />
              <Box sx={{
                transform: 'rotate(90deg)'
              }}>
                <img src={`assets/images/icon_${bulletName}.png`} alt="airdrop icon" />
              </Box>
            </>}
          </Box>
        </Box >
      </Box>
      {hasAtomic && <Typography sx={{
        color: 'white',
        position: 'absolute',
        bottom: '65px',
        right: '20px',
        fontSize: '20px'
      }}>
        Press "{specialKey}" to use atomic bomb
      </Typography>}
    </>
  )
}

export default GameUI