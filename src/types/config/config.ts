import config_dev from './config_dev'
import config_aws from './config_aws'
import config_common from './config_common'
const config = {...config_dev, ...config_common}
export default config