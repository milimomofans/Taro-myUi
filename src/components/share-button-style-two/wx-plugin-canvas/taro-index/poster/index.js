import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import WeCanvas from '../index/index'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    config: {},
    preload: false,
    hideLoading: false
  }
  _observeProps = []
  componentWillMount(){
    this.$scope._onCreate = this._onCreate.bind(this)
  }
  ready = () => {
    if (this.data.preload) {
      const poster = this.$scope.selectComponent('#poster')
      this.downloadStatus = 'doing'
      poster
        .downloadResource(this.data.config)
        .then(() => {
          this.downloadStatus = 'success'
          this.trigger('downloadSuccess')
        })
        .catch(e => {
          this.downloadStatus = 'fail'
          this.trigger('downloadFail', e)
        })
    }
  }
  trigger = (event, data) => {
    if (this.listener && typeof this.listener[event] === 'function') {
      this.listener[event](data)
    }
  }
  once = (event, fun) => {
    if (typeof this.listener === 'undefined') {
      this.listener = {}
    }
    this.listener[event] = fun
  }
  downloadResource = reset => {
    return new Promise((resolve, reject) => {
      if (reset) {
        this.downloadStatus = null
      }
      const poster = this.$scope.selectComponent('#poster')
      if (this.downloadStatus && this.downloadStatus !== 'fail') {
        if (this.downloadStatus === 'success') {
          resolve()
        } else {
          this.once('downloadSuccess', () => resolve())
          this.once('downloadFail', e => reject(e))
        }
      } else {
        poster
          .downloadResource(this.data.config)
          .then(() => {
            this.downloadStatus = 'success'
            resolve()
          })
          .catch(e => reject(e))
      }
    })
  }
  _onCreate = (reset = false) => {
    !this.data.hideLoading && Taro.showLoading({ mask: true, title: '生成中' })
    return this.downloadResource(typeof reset === 'boolean' && reset)
      .then(() => {
        !this.data.hideLoading && Taro.hideLoading()
        const poster = this.$scope.selectComponent('#poster')
        poster.create(this.data.config)
      })
      .catch(err => {
        !this.data.hideLoading && Taro.hideLoading()
        Taro.showToast({ icon: 'none', title: err.errMsg || '生成失败' })
        console.error(err)
        this.triggerEvent('fail', err)
      })
  }
  onCreateSuccess = e => {
    const { detail } = e
    this.triggerEvent('success', detail)
  }
  onCreateFail = err => {
    console.error(err)
    this.triggerEvent('fail', err)
  }
  config = {
    component: true
  }

  render() {
    const { config, preload, hideLoading } = this.props
    return (
      <Block>
        <View onClick={this.onCreate}>{this.props.children}</View>
        <WeCanvas
          id="poster"
          onSuccess={this.onCreateSuccess}
          onFail={this.onCreateFail}
        ></WeCanvas>
      </Block>
    )
  }
}

export default _C
