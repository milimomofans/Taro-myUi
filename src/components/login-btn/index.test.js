import Nerv, {findDOMNode} from 'nervjs'
import {View} from '@tarojs/components'
import {
  renderToString
} from 'nerv-server'
import { Simulate, renderIntoDocument } from 'nerv-test-utils'
import WtLoginBtn from '../../../.temp/components/login-btn/index'

describe('WtLoginBtn Snap', () => {
  it('render initial WtLoginBtn', () => {
    const component = renderToString(
      < WtLoginBtn api={()=>{}}>
        <View className="test">登陆成功</View>
      </WtLoginBtn> )
    expect(component).toMatchSnapshot()
  })
  it('render success WtLoginBtn', () => {
    const component = renderToString(
      < WtLoginBtn api={()=>{}} loginSuccess>
        <View className="test">登陆成功</View>
      </WtLoginBtn>
       )
    expect(component).toMatchSnapshot()
  })
  })

  describe('WtLoginBtn Event', () => {
  it('WtTopBar onClick', () => {
    const onClick = jest.fn()

    const component = renderIntoDocument(
      < WtLoginBtn api={()=>{}} loginSuccess onNormalClick={onClick}>
        <View className="test">登陆成功</View>
      </WtLoginBtn>
    )
    const componentDom = findDOMNode(component, 'login-btn-container').querySelector('.test')
    Simulate.click(componentDom)
    expect(onClick).toBeCalled()
  })
})
