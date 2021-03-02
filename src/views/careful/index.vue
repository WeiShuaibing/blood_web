<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddNew">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="careful" label="公告"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="220"></el-table-column>
        <el-table-column prop="updateDate" label="上次修改时间" width="220"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="toEditCareful(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="toDelete(scope.row.id)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--新增对话框-->
    <div>
      <el-dialog title="新增管理员" :visible.sync="addVisible">
        <div style="width: 80%;margin: 0 auto;">
          <el-row>
            <el-col :span="4"> <span style="line-height: 2">公告内容：</span></el-col>
            <el-col :span="18"><el-input type="textarea" v-model="careful.careful" placeholder="请输入..." /></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取  消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewCareful">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>

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
import { save, deleteById, getPage } from '@/api/careful'
export default {
  name: 'CarefulIndex',
  data() {
    return {
      tableData: [],
      addVisible: false,
      isEdit: false,
      careful: {
        id: 0,
        careful: ''
      },
      pageNum: 1,
      pageSize: 10,
      totalNum: 0
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    toAddNew() {
      this.addVisible = true
    },
    saveNewCareful() {
      save(this.careful).then(res => {
        this.addVisible = false
        this.careful.careful = ''
        this.getAll()
      })
    },
    toEditCareful(row) {
      this.isEdit = true
      this.addVisible = true
      this.careful.careful = row.careful
      this.careful.id = row.id
    },
    enshureEdit() {
      save(this.careful).then(res => {
        this.addVisible = false
        this.isEdit = false
        this.careful.careful = ''
        this.getAll()
      })
    },
    toDelete(id) {
      deleteById(id).then(res => {
        this.getAll()
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getAll()
    }
  }
}
</script>

<style scoped>

</style>
