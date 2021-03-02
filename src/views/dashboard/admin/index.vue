<template>
  <div class="dashboard-editor-container">
<!--    <github-corner class="github-corner" />-->

    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!--<line-chart :chart-data="lineChartData" />-->
      <h3>最新预约信息：</h3>
      <el-table :data="appointments" style="width: 100%">
        <el-table-column prop="userName" label="预约人" width="180"></el-table-column>
        <el-table-column prop="minzu" label="民族" width="180"></el-table-column>
        <el-table-column prop="huji" label="户籍"></el-table-column>
        <el-table-column prop="wenhua" label="文化"></el-table-column>
        <el-table-column prop="hunyin" label="婚姻"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="address" label="联系地址"></el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import { getAllAppointment } from '@/api/appointment'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
  },
  data() {
    return {
      appointments: []
    }
  },
  mounted() {
    this.allAppointment()
  },
  methods: {
    allAppointment() {
      getAllAppointment('0').then(res => {
        this.appointments = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
