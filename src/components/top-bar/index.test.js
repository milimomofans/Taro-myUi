import Nerv, {findDOMNode} from 'nervjs'
import {
  renderToString
} from 'nerv-server'
import { Simulate, renderIntoDocument } from 'nerv-test-utils'
import WtTopBar from '../../../.temp/components/top-bar/index'

describe('WtTopBar Snap', () => {
  it('render initial WtTopBar', () => {
    const component = renderToString( < WtTopBar backgroundColor = '#333'
      isWhite showBack title = '123' /> )
    expect(component).toMatchSnapshot()
  })
  it('render black WtTopBar', () => {
    const component = renderToString( < WtTopBar backgroundColor = '#fff'
      isWhite = {
        false
      }
      showBack title = '223' /> )
    expect(component).toMatchSnapshot()
  })
  it('render not show home WtTopBar', () => {
    const component = renderToString( < WtTopBar backgroundColor = '#fff'
      isWhite = {
        false
      }
      showBack title = '223'
      showHome = {
        false
      }
      /> )
      expect(component).toMatchSnapshot()
    });
  it('render not show title WtTopBar', () => {
      const component = renderToString( < WtTopBar backgroundColor = '#fff'
        isWhite = {
          false
        }
        showTitle = {
          false
        }
        showBack title = '223'
        showHome = {
          false
        }
        /> )
        expect(component).toMatchSnapshot()
      })
  })

  describe('WtTopBar Event', () => {
  it('WtTopBar onHome', () => {
    const onClick = jest.fn()

    const component = renderIntoDocument(< WtTopBar backgroundColor = '#333' isWhite showBack title = '123' onHome={onClick} />)
    const componentDom = findDOMNode(component, 'container').querySelector('.home')
    Simulate.click(componentDom)
    expect(onClick).toBeCalled()
  })

  it('WtTopBar onBack', () => {
    const onClick = jest.fn()

    const component = renderIntoDocument(< WtTopBar backgroundColor = '#333' isWhite showBack title = '123' onBack={onClick} />)
    const componentDom = findDOMNode(component, 'container').querySelector('.back')

    Simulate.click(componentDom)
    expect(onClick).toBeCalled()
  })
})
