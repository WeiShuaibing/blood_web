<template>
    <div class="app-container">
      <el-row>
        <h2>预约待检测的用户</h2>
      </el-row>
      <el-row>
        <el-table :data="appointments" style="width: 100%">
          <el-table-column prop="userName" label="预约人" width="180"></el-table-column>
          <el-table-column prop="minzu" label="民族" width="180"></el-table-column>
          <el-table-column prop="sex" label="性别" width="180"></el-table-column>
          <el-table-column prop="huji" label="户籍"></el-table-column>
          <el-table-column prop="wenhua" label="文化"></el-table-column>
          <el-table-column prop="hunyin" label="婚姻"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="address" label="联系地址"></el-table-column>
          <el-table-column width="200" label="操作">
            <template slot-scope="scope">
              <el-button @click="testReport(scope.row)" type="primary" size="small">检验报表</el-button>
              <el-button @click="ruKu(scope.row)" type="success" size="small">血液入库</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
</template>

<script>
import { getAllAppointment, changeAppointmentStatus } from '@/api/appointment'
import { getById } from '@/api/testreport'
export default {
  name: 'AppointmentUserIndex',
  data() {
    return {
      appointments: []
    }
  },
  mounted() {
    this.allAppointment()
  },
  methods: {
    ruKu(row) {
      getById(row.appointmentId).then(res => {
        if (res.data === null) {
          this.$message.warning('用户血液尚未检验，请检验')
          return
        }
        if (res.data.status === 2) {
          this.$message.error('用户血液检验不合格，不能入库')
        } else {
          changeAppointmentStatus(row.appointmentId, 2).then(res => {
            this.$message.success('入库成功！')
            this.allAppointment()
          })
        }
      })
    },
    testReport(row) {
      // 用户检验报表
      this.$router.push({ path: '/testReport/TestReportIndex',
        query: { userId: row.userId, userName: row.userName, appointmentId: row.appointmentId }})
    },
    allAppointment() {
      getAllAppointment('0,1,2').then(res => {
        this.appointments = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
