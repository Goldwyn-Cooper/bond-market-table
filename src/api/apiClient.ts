import axios from 'axios'

const { VITE_API_DOMAIN } = import.meta.env
// const MODE = import.meta.env.DEV ? 'dev' : 'v1'
const MODE = 'dev'
export default axios.create({
  baseURL: `${VITE_API_DOMAIN}/${MODE}`,
  timeout: 5000
})
