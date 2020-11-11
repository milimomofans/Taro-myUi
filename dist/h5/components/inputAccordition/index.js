import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Input, ScrollView } from '@tarojs/components';
import validate from './validator';
import classNames from 'classnames';
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: '',
      list: [],
      showList: false
    };
  }
  inputHandler(e) {
    this.setState({
      value: e.detail.value
    }, () => {
      this.check();
    });
  }
  check() {
    let { value } = this.state;
    let { inputValue, serachApi } = this.props,
        param = {
      value,
      type: 'value',
      rules: inputValue.rules
    };
    // console.log(validate(param))
    if (!validate(param).status && serachApi) {
      console.log('进来了');
      serachApi(value).then(_r => {
        // console.log(_r,'1111111')
        this.setState({
          list: _r,
          showList: true
        });
      });
    }
  }
  onSelect(item) {
    console.log(item);
    this.setState({
      value: item.value,
      showList: false
    });
  }
  render() {
    const { inputValue, isSerach } = this.props;
    const { value, list, showList } = this.state;
    return <View className="_inputAccordition">
                <View className={classNames(showList ? 'showAll' : 'input_main')}>
                    <Input type={inputValue.type} placeholder={inputValue.placeholder} value={value} className="input_style" placeholderClass="input_placeholder" onInput={this.inputHandler.bind(this)} />
                    {isSerach && showList && <ScrollView scrollY className="scroll_view">
                                {list.map((item, index) => {
            return <View onClick={this.onSelect.bind(this, item)} className="option_item">{item.value}</View>;
          })}
                            </ScrollView>}
                </View>
            </View>;
  }
}