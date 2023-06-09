import axios from 'axios'
import config from './../types/config/config'

const auth = {
  login: async (account: string) => {

    const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/auth/login`, {
      account,
    })
    return res.data
  },
}

export default auth