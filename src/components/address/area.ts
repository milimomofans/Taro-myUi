// export const allAreaList =
import { regionData } from 'wl-china-area-data'

function areaMap(item) {
  let children = []
  if (item.children) {
    children = item.children.map(areaMap)
  }
  return {
    code: item.value,
    name: item.label,
    children
  }
}
const areaData = regionData.map(areaMap)
// export const areaList = {
//   code: 500000,
//   name: '重庆市',
//   cities: {
//     '500101': { code: 500101, name: '万州区', idx: 10 },
//     '500102': { code: 500102, name: '涪陵区', idx: 13 },
//     '500103': { code: 500103, name: '渝中区', idx: 0 },
//     '500104': { code: 500104, name: '大渡口区', idx: 6 },
//     '500105': { code: 500105, name: '江北区', idx: 3 },
//     '500106': { code: 500106, name: '沙坪坝区', idx: 5 },
//     '500107': { code: 500107, name: '九龙坡区', idx: 2 },
//     '500108': { code: 500108, name: '南岸区', idx: 4 },
//     '500109': { code: 500109, name: '北碚区', idx: 8 },
//     '500112': { code: 500112, name: '渝北区', idx: 1 },
//     '500113': { code: 500113, name: '巴南区', idx: 7 },
//     '500114': { code: 500114, name: '黔江区', idx: 12 },
//     '500115': { code: 500115, name: '长寿区', idx: 19 },
//     '500222': { code: 500222, name: '綦江区', idx: 18 },
//     '500223': { code: 500223, name: '潼南区', idx: 27 },
//     '500224': { code: 500224, name: '铜梁区', idx: 23 },
//     '500225': { code: 500225, name: '大足区', idx: 21 },
//     '500226': { code: 500226, name: '荣昌区', idx: 22 },
//     '500227': { code: 500227, name: '璧山区', idx: 9 },
//     '500228': { code: 500228, name: '梁平区', idx: 26 },
//     '500229': { code: 500229, name: '城口县', idx: 37 },
//     '500230': { code: 500230, name: '丰都县', idx: 29 },
//     '500231': { code: 500231, name: '垫江县', idx: 25 },
//     '500232': { code: 500232, name: '武隆区', idx: 16 },
//     '500233': { code: 500233, name: '忠　县', idx: 28 },
//     '500234': { code: 500234, name: '开州区', idx: 17 },
//     '500235': { code: 500235, name: '云阳县', idx: 24 },
//     '500236': { code: 500236, name: '奉节县', idx: 33 },
//     '500237': { code: 500237, name: '巫山县', idx: 35 },
//     '500238': { code: 500238, name: '巫溪县', idx: 36 },
//     '500240': { code: 500240, name: '石柱县', idx: 32 },
//     '500241': { code: 500241, name: '秀山县', idx: 30 },
//     '500242': { code: 500242, name: '酉阳县', idx: 34 },
//     '500243': { code: 500243, name: '彭水县', idx: 31 },
//     '500381': { code: 500381, name: '江津区', idx: 14 },
//     '500382': { code: 500382, name: '合川区', idx: 15 },
//     '500383': { code: 500383, name: '永川区', idx: 11 },
//     '500384': { code: 500384, name: '南川区', idx: 20 }
//   },
//   _cities: [
//     { code: 500103, name: '渝中区' },
//     { code: 500112, name: '渝北区' },
//     { code: 500107, name: '九龙坡区' },
//     { code: 500105, name: '江北区' },
//     { code: 500108, name: '南岸区' },
//     { code: 500106, name: '沙坪坝区' },
//     { code: 500104, name: '大渡口区' },
//     { code: 500113, name: '巴南区' },
//     { code: 500109, name: '北碚区' },
//     { code: 500227, name: '璧山区' },
//     { code: 500101, name: '万州区' },
//     { code: 500383, name: '永川区' },
//     { code: 500114, name: '黔江区' },
//     { code: 500102, name: '涪陵区' },
//     { code: 500381, name: '江津区' },
//     { code: 500382, name: '合川区' },
//     { code: 500232, name: '武隆区' },
//     { code: 500234, name: '开州区' },
//     { code: 500222, name: '綦江区' },
//     { code: 500115, name: '长寿区' },
//     { code: 500384, name: '南川区' },
//     { code: 500225, name: '大足区' },
//     { code: 500226, name: '荣昌区' },
//     { code: 500224, name: '铜梁区' },
//     { code: 500235, name: '云阳县' },
//     { code: 500231, name: '垫江县' },
//     { code: 500228, name: '梁平区' },
//     { code: 500223, name: '潼南区' },
//     { code: 500233, name: '忠　县' },
//     { code: 500230, name: '丰都县' },
//     { code: 500241, name: '秀山县' },
//     { code: 500243, name: '彭水县' },
//     { code: 500240, name: '石柱县' },
//     { code: 500236, name: '奉节县' },
//     { code: 500242, name: '酉阳县' },
//     { code: 500237, name: '巫山县' },
//     { code: 500238, name: '巫溪县' },
//     { code: 500229, name: '城口县' }
//   ]
// }
// console.log(areaData)
export default areaData
