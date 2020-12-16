<template>
    <div class="app-container">
      <h2>献血地点标注</h2>

      <!--地图 Start-->
      <el-row style="padding: 30px">
        <el-alert
          title="在输入框中输入地址并再地图上点击位置，如此可定位。单击左键添加地点，单击右键取消地点"
          type="success"
          center
          show-icon
        />
      </el-row>
      <el-row>
        <el-col :offset="1" :span="6">
          <el-input v-model="keyword" prefix-icon="el-icon-search" placeholder="输入名称地位景区" />
        </el-col>
      </el-row>
      <el-row>
        <div>
          <baidu-map
            class="map"
            ak="A2UUAHl8YGlAEgFk7H4ewnaDMnzchNEr"
            :center="map.center"
            :zoom="map.zoom"
            :scroll-wheel-zoom="true"
            @ready="handlerBaiDyMap"
          >
            <!--定位-->
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
            <!--点-->
            <!--<bm-marker :position="map.center" :dragging="map.dragging" animation="BMAP_ANIMATION_BOUNCE" @dblclick="markerClick(map.center)">-->
              <!--提示信息-->
              <!--            <bm-info-window :show="map.show">Hello~</bm-info-window>-->
            <!--</bm-marker>-->
            <bm-marker v-for="item in address" :key="item.id" :position="item" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @rightclick="markerClick(item)">
<!--              <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>-->
            </bm-marker>
            <!-- 搜索 -->
            <bm-view class="map" />
            <bm-local-search :keyword="keyword" :auto-viewport="true" :select-first-result="true" />
            <!--         &lt;!&ndash; &lt;!&ndash;路线规划&ndash;&gt;-->
            <!--          <bm-driving-->
            <!--            start="新街口"-->
            <!--            end="新街口"-->
            <!--            startCity="郑州"-->
            <!--            endCity="洛阳"-->
            <!--            :auto-viewport="true"-->
            <!--            :waypoints="['呼和浩特', {lng: 112.53, lat: 37.87}, '陕西兵马俑']"></bm-driving>&ndash;&gt;-->
          </baidu-map>
        </div>
      </el-row>
      <!--地图 End-->
    </div>
</template>

<script>
import { getAllOfAddress, save } from '@/api/address'
import { BaiduMap, BmLocalSearch, BmView, BmGeolocation, BmMarker } from 'vue-baidu-map'
export default {
  name: 'AddressIndex',
  components: { BaiduMap, BmLocalSearch, BmView, BmGeolocation, BmMarker },
  data() {
    return {
      keyword: '',
      map: {
        center: { lng: 113.596101, lat: 34.752017 },
        zoom: 15,
        show: false,
        dragging: true
      },
      address: []
    }
  },
  mounted() {
    this.getAllAddress()
  },
  methods: {
    markerClick(va) {
      this.addNewAddress(va.lng, va.lat)
    },
    handlerBaiDyMap({ BMap, map }) {
      // console.log(BMap, map)
      var _this = this
      map.addEventListener('click', function(e) {
        console.log(e.point.lng, e.point.lat)
        _this.addNewAddress(e.point.lng, e.point.lat)
      })
    },
    addNewAddress(lng, lat) {
      save({ lng, lat }).then(res => {
        this.$message.success(res.msg)
        this.getAllAddress()
      })
    },
    getAllAddress() {
      getAllOfAddress().then(res => {
        this.address = res.data
      })
    }
  }
}
</script>

<style scoped>
  .map {
    margin: 0 auto;
    margin-top: 20px;
    width: 100%;
    height: 600px;
  }
</style>
