<template>
  <div class="app-container">
    <el-row>
      <h3>献血用户管理：</h3>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userId" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="手机"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="donationNum" label="献血次数"></el-table-column>
        <el-table-column prop="bloodMM" label="献血总毫升"></el-table-column>
        <el-table-column prop="createDate" label="注册时间"></el-table-column>
        <el-table-column width="300" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toXianxueRecord(scope.row.userId)">献血记录</el-button>
            <el-button type="success" size="mini" @click="toGanxie(scope.row.userId)">感谢用户</el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="toDelete(scope.row.userId)">
              <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--分页插件Start-->
    <div style="height: 40px;" />
    <el-pagination
      background
      style="margin-bottom: 100px;"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="totalNum"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChangeOfFenye"
    />
    <!--分页插件End-->
  </div>
</template>

<script>
import { getPage, deleteById } from '@/api/user'
import { save } from '@/api/thank'

export default {
  name: 'UserIndex',
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 15,
      totalNum: 0
    }
  },
  mounted() {
    this.getPageData()
  },
  methods: {
    toGanxie(userId) {
      save({
        userId: userId,
        status: 0
      }).then(res => {
        this.$message.success('感谢献血者成功！')
      })
    },
    toXianxueRecord(id) {
      this.$router.push({ path: '/userBloodRecord/index', query: { userId: id, wei: '222' }})
    },
    toDelete(id) {
      deleteById(id).then(res => {
        this.getPageData()
      })
    },
    getPageData() {
      getPage(this.pageNum, this.pageSize).then(res => {
        console.log(res.data)
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPageData()
    }
  }
}
</script>

<style scoped>

</style>
