<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3"><span style="font-size: 28px;font-weight: 600">献血记录:</span></el-col>
    </el-row>
    <div style="margin-top: 50px;"></div>
    <el-row style="width: 70%;margin: 0 auto;margin-top: 30px;" v-for="item in bloodInfo" :key="item">
      <span style="color: #5a5e66;line-height: 2">预约时间：{{item.createDate}}</span>
      <el-steps v-if="item.status === 1" :active="2" finish-status="error">
        <el-step title="已预约"></el-step>
        <el-step title="已取消"></el-step>
      </el-steps>
      <el-steps v-else-if="item.status === 0" :active="1" finish-status="finish">
        <el-step title="已预约"></el-step>
        <el-step title="已入库"></el-step>
        <el-step title="已出库"></el-step>
      </el-steps>
      <el-steps v-else :active="item.status" finish-status="finish">
        <el-step title="已预约"></el-step>
        <el-step title="已入库"></el-step>
        <el-step title="已出库"></el-step>
      </el-steps>
    </el-row>
  </div>
</template>

<script>
import { getMyBloodStatus2 } from '@/api/appointment'
export default {
  name: 'BloodRecordIndex',
  data() {
    return {
      msg: 'ssssss',
      bloodInfo: [],
      userId: 0
    }
  },
  mounted() {
    this.getRouterParams()
  },
  methods: {
    getRouterParams() {
      this.userId = this.$route.query.userId
      this.getList()
    },
    getList() {
      getMyBloodStatus2(this.userId).then(res => {
        this.bloodInfo = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
