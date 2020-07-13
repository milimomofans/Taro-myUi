| 参数 | 类型 | 是否必须 |
| -- | -- | -- |
| list | any[] | true |
| current | number | true |
| keyName | string | true |
| onSelect | function | true |

#### 使用说明
```
onSelect(index){
    console.log(index)
    this.setState({
        listCurrent:index
    })
}

<Accordion
    list={list}
    current={listCurrent}
    keyName='name'
    onSelect={this.onSelect.bind(this)}
></Accordion>
```

