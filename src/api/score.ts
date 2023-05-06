import axios from 'axios'

import { HeaderToken } from './../types/config/helper'
import config from './../types/config/config'
const score = {
  saveScore: (account: string, tokenId: string, shipName: string, tier: number) => axios.post(`${config.environment.API_URL}/score/saveScore`, {
    account,
    tokenId,
    shipName,
    tier,
  }, HeaderToken()),
  getScores: (period: string, league: number) => axios.post(`${config.environment.API_URL}/score/getScores`, { period, league }),
  saveScoreLog: (account: string, tokenId: string, shipName: string, tier: number, score: number) => axios.post(`${config.environment.API_URL}/score/saveScoreLog`, {
    account,
    tokenId,
    shipName,
    tier,
    score
  }, HeaderToken())
}

export default score