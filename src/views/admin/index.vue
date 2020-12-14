<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddNewAdmin">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="roles" label="角色"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column prop="updateDate" label="上次修改时间"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="toEditAdmin(scope.row)">编辑</el-button>
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
            <el-col :span="4"> <span style="line-height: 2">用户名：</span></el-col>
            <el-col :span="18"><el-input v-model="admin.username" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 15px;">
            <el-alert v-if="isEdit" title="空着密码框表示不修改用户密码" center type="success" style="margin-bottom: 5px;">
            </el-alert>
            <el-col :span="4"> <span style="line-height: 2">密码：</span></el-col>
            <el-col :span="18"><el-input v-model="admin.password" show-password placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 15px;">
            <el-col :span="4"> <span style="line-height: 2">角色：</span></el-col>
            <el-select v-model="admin.roles" placeholder="请选择">
              <el-option label="系统管理员" value="admin"></el-option>
              <el-option label="检验管理员" value="jianyan"></el-option>
              <el-option label="血库管理员" value="xueku"></el-option>
            </el-select>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewAdmin">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { save, getAllAdmin, deleteById } from '@/api/admin'
export default {
  name: 'AdminIndex',
  data() {
    return {
      tableData: [],
      addVisible: false,
      isEdit: false,
      admin: {
        id: 0,
        username: '',
        roles: '',
        password: ''
      }
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      getAllAdmin().then(res => {
        this.tableData = res.data
      })
    },
    toAddNewAdmin() {
      this.addVisible = true
    },
    saveNewAdmin() {
      if (this.admin.username === '' || this.admin.roles === '' || this.admin.password === '') {
        this.$message.warning('请完善信息')
        return
      }
      save({
        username: this.admin.username,
        roles: this.admin.roles,
        password: this.$md5(this.admin.password)
      }).then(res => {
        this.addVisible = false
        this.admin.username = ''
        this.admin.roles = ''
        this.getAll()
      })
    },
    enshureEdit() {
      if (this.admin.username === '' || this.admin.roles === '') {
        this.$message.warning('请完善信息')
        return
      } else {
        save({
          id: this.admin.id,
          username: this.admin.username,
          roles: this.admin.roles,
          password: this.$md5(this.admin.password)
        }).then(res => {
          this.addVisible = false
          this.isEdit = false
          this.admin.username = ''
          this.admin.roles = ''
          this.getAll()
        })
      }
    },
    toEditAdmin(row) {
      this.isEdit = true
      this.addVisible = true
      this.admin.id = row.id
      this.admin.username = row.username
      this.admin.roles = row.roles
    },
    toDelete(id) {
      deleteById(id).then(res => {
        this.getAll()
      })
    }
  }
}
</script>

<style scoped>

</style>
