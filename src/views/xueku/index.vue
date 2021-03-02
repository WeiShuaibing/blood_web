<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3"><span style="font-size: 28px;font-weight: 600">血库管理</span></el-col>
      <!--<el-col :span="5">
        <el-input placeholder="请输入关键字搜索" v-model="matchStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>-->
      <el-col :span="1" :offset="20">
        <xlsx-workbook>
          <xlsx-sheet
            v-for="sheet in sheets"
            :key="sheet.name"
            :collection="exportData"
            :sheet-name="sheet.name"
          />
          <xlsx-download>
            <el-button type="warning" icon="el-icon-download">导出</el-button>
          </xlsx-download>
        </xlsx-workbook>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userName" label="献血人" width="100"></el-table-column>
        <el-table-column prop="type" label="献血形式" width="100"></el-table-column>
        <el-table-column prop="mm" label="血量" width="100"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="180"></el-table-column>
        <el-table-column prop="testreport.bloodType" label="血液类型"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="huji" label="户籍"></el-table-column>
        <el-table-column prop="hunyin" label="婚姻"></el-table-column>
        <el-table-column prop="wenhua" label="文化程度"></el-table-column>
        <el-table-column prop="address" label="联系地址"></el-table-column>
        <el-table-column prop="updateDate" label="入/出库时间" width="150"></el-table-column>
        <el-table-column label="血液状态" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 2" type="warning">入库</el-tag>
            <el-tag v-if="scope.row.status === 3" type="success">出库</el-tag>
            <el-tag v-if="scope.row.isGuoQi === 'Yes'" type="danger">已过期</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="160" label="操作">
          <template slot-scope="scope">
            <el-button @click="chuku(scope.row)" type="success" size="small">出库</el-button>
            <el-button @click="deleteBlood(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件 start-->
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
    <!--分页组件 end-->
  </div>
</template>

<script>
import { getPage } from '@/api/xueku'
import { changeAppointmentStatus } from '@/api/appointment'
import { XlsxDownload, XlsxWorkbook, XlsxSheet } from 'vue-xlsx'
export default {
  name: 'XueKuIndex',
  components: { XlsxDownload, XlsxWorkbook, XlsxSheet },
  data() {
    return {
      tableData: [],
      exportData: [],
      sheets: [{ name: '血液信息' }],
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      matchStr: ''
    }
  },
  mounted() {
    this.xuekuList()
  },
  methods: {
    deleteBlood(row) {
      this.$confirm('此操作将删除该血液信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeAppointmentStatus(row.appointmentId, -1).then(res => {
          this.$message.info('删除成功！')
          this.xuekuList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    chuku(row) {
      changeAppointmentStatus(row.appointmentId, 3).then(res => {
        this.$message.success('出库成功')
        this.xuekuList()
      })
    },
    xuekuList() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.totalNum = res.data.total

        // 数据导入到 exportData一份
        this.exportData = []
        this.tableData.forEach(item => {
          this.exportData.push({
            'userName': item.userName,
            'type': item.type,
            'mm': item.mm,
            'phone': item.phone,
            'bloodType': item.testreport.bloodType,
            'sex': item.sex,
            'huji': item.huji,
            'hunyin': item.hunyin,
            'wenhua': item.wenhua,
            'address': item.address
          })
        })
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPage()
    }
  }
}
</script>

<style scoped>

</style>
