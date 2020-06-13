import MakeApi from 'api'
import { API_DEFAULT_CONFIG, MNP_REQUEST_DEFAULT_CONFIG } from '../config'
import API_CONFIG from '../service/api'

// export default ApiInstance
const REDIRECT_PAGE = '/pages/me/me'

const ApiInstance = new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG,
  baseURL: MNP_REQUEST_DEFAULT_CONFIG.baseURL,
  redirectLoginPage: REDIRECT_PAGE
}).api

export default ApiInstance
