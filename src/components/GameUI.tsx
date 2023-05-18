import React, { useState, useEffect } from 'react'

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';

import { useAppSelector } from '../hooks'
import { BULLET_TYPE } from './../types/config/helper';
import { CircularProgress } from '@mui/material';

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

  const playerList = useAppSelector((state) => state.room.playerList);

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
        position: `fixed`,
        justifyContent: 'flex-end',
        right: {
          xs: `-110px`,
          sm: `-110px`,
          md: `-240px`,
          lg: `-280px`,
          xl: `-370px`
        }
      }}>
        {shieldPercent != 0 && <Box sx={{
          textAlign: 'center'
        }}>
          <Box sx={{
            width: {
              xs: `270px`,
              sm: `270px`,
              md: `560px`,
              lg: `640px`,
              xl: `820px`
            },
            transform: 'rotate(-90deg)',
          }}>
            <ShieldLinearProgress variant="determinate" value={shieldPercent} />
          </Box>
          <Typography sx={{
            fontSize: '18px',
            color: '#24c2bc',
            paddingTop: {
              xs: `130px`,
              sm: `130px`,
              md: `280px`,
              lg: `320px`,
              xl: `410px`
            }
          }}>
            SHIELD
          </Typography>
        </Box>}
      </Box>

      <Box sx={{
        display: 'flex',
        position: `fixed`,
        justifyContent: 'flex-end',
        right: {
          xs: shieldPercent == 0 ? `-110px` : `-50px`,
          sm: shieldPercent == 0 ? `-110px` : `-50px`,
          md: shieldPercent == 0 ? `-240px` : `-190px`,
          lg: shieldPercent == 0 ? `-280px` : `-220px`,
          xl: shieldPercent == 0 ? `-370px` : `-310px`
        }
      }}>
        {bulletPercent != 0 && <Box sx={{
          textAlign: 'center'
        }}>
          <Box sx={{
            width: {
              xs: `270px`,
              sm: `270px`,
              md: `560px`,
              lg: `640px`,
              xl: `820px`
            },
            transform: 'rotate(-90deg)',
          }}>
            <BulletLinearProgress variant="determinate" value={bulletPercent} />
          </Box>
          <Box 
            sx={{
              paddingTop: {
                xs: `130px`,
                sm: `130px`,
                md: `280px`,
                lg: `320px`,
                xl: `410px`
              }
            }}
          >
            <img src={`assets/images/icon_ATOMIC_BULLET.png`} alt="airdrop icon" />
          </Box>
        </Box>}
      </Box>

      {hasAtomic && <Typography sx={{
          color: 'white',
          position: 'absolute',
          bottom: '65px',
          right: '20px',
          fontSize: '20px'
        }}>
        Press "{specialKey}" to use atomic bomb
        </Typography>
      }
    </>
  )
}

export default GameUI