<template>
    <div class="app-container">
      <h2>献血地点标注</h2>

      <!--地图 Start-->
      <el-row style="padding: 30px">
        <el-alert
          title="在输入框中输入景区地址并再地图上点击景区位置，如此可定位"
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
            <bm-marker :position="map.center" :dragging="map.dragging" animation="BMAP_ANIMATION_DROP">
              <!--提示信息-->
              <!--            <bm-info-window :show="map.show">Hello~</bm-info-window>-->
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
import { BaiduMap, BmLocalSearch, BmView, BmGeolocation, BmDriving, BmMarker } from 'vue-baidu-map'
export default {
  name: 'AddressIndex',
  components: { BaiduMap, BmLocalSearch, BmView, BmGeolocation, BmDriving, BmMarker },
  data() {
    return {
      keyword: '',
      map: {
        center: { lng: 112.438161, lat: 34.440984 },
        zoom: 15,
        show: false,
        dragging: true
      }
    }
  },
  mounted() {
  },
  methods: {
    handlerBaiDyMap({ BMap, map }) {
      // console.log(BMap, map)
      var _this = this
      map.addEventListener('click', function(e) {
        // console.log(e)
        console.log(e.point.lng, e.point.lat)
        _this.scenic_baseinfo.scenic_lng = e.point.lng
        _this.scenic_baseinfo.scenic_lat = e.point.lat
        _this.$message.success('已定位<' + _this.scenic_baseinfo.scenic_name + '>景点的经纬度为<' +
          e.point.lng + ',' + e.point.lat + '>')
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
