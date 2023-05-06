import axios from 'axios'
import config from './../types/config/config'

const auth = {
  login: async (account: string) => {

    const res = await axios.post(`${config.environment.API_URL}/auth/login`, {
      account,
    })
    return res.data
  },
}

export default auth