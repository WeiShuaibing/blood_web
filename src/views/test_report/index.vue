<template>
  <div class="app-container">
    <el-row>
      <span>检验报表{{userId}}</span>
      <h2>待检测者: {{userName}}</h2>
    </el-row>
    <div style="margin-top: 20px;">
      <div class="page" style="">
        <div class="page-box" style="">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="5">
                <el-form-item label="身高(cm)">
                  <el-input-number v-model="form.height" :min="1" :precision="1" :max="200" label="身高（cm）"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="体重(kg)">
                  <el-input-number v-model="form.weight" :min="1" :precision="1" :max="300" label="体重（kg）"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="血型">
                  <el-select v-model="form.bloodType" placeholder="请选择活动区域">
                    <el-option label="A型" value="A"></el-option>
                    <el-option label="B型" value="B"></el-option>
                    <el-option label="AB型" value="AB"></el-option>
                    <el-option label="O型" value="O"></el-option>
                    <el-option label="Rh阴性血" value="RHYin"></el-option>
                    <el-option label="Rh阳性血" value="RHYang"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="血压">
                  <el-input-number v-model="form.bloodPressure" :min="1" :max="300"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="甲/乙/丙肝">
                  <el-select v-model="form.hepatitis" placeholder="">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="有" value="有"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="艾滋病">
                  <el-select v-model="form.aizi" placeholder="">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="有" value="有"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="梅毒">
                  <el-select v-model="form.meidu" placeholder="">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="有" value="有"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="margin-top: 30px;"></div>
            <el-form-item>
              <el-button type="success" @click="qualified">确定检验合格</el-button>
              <el-button type="warning" @click="NoQualified">检验不合格</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { saveTestreport } from '@/api/testreport'
export default {
  name: 'TestRepostIndex',
  data() {
    return {
      userId: 0,
      userName: '',
      appointmentId: 0,
      form: {
        height: 160,
        weight: 60,
        bloodType: 'A型',
        bloodPressure: 100,
        hepatitis: '无', // 肝炎
        aizi: '无', // 艾滋病
        meidu: '无' // 梅毒
      }
    }
  },
  mounted() {
    this.getRouterParams()
  },
  methods: {
    NoQualified() {
      saveTestreport({
        userId: this.userId,
        appointmentId: this.appointmentId,
        height: this.form.height,
        weight: this.form.weight,
        bloodType: this.form.bloodType,
        bloodPressure: this.form.bloodPressure,
        hepatitis: this.form.hepatitis,
        aizi: this.form.aizi,
        meidu: this.form.meidu,
        status: 2
      }).then(res => {
        this.$message.warning('用户血液已检验不合格')
      })
    },
    qualified() {
      saveTestreport({
        userId: this.userId,
        appointmentId: this.appointmentId,
        height: this.form.height,
        weight: this.form.weight,
        bloodType: this.form.bloodType,
        bloodPressure: this.form.bloodPressure,
        hepatitis: this.form.hepatitis,
        aizi: this.form.aizi,
        meidu: this.form.meidu,
        status: 1
      }).then(res => {
        this.$message.success('用户血液已检验合格')
      })
    },
    getRouterParams() {
      this.userId = this.$route.query.userId
      this.userName = this.$route.query.userName
      this.appointmentId = this.$route.query.appointmentId
    }
  }
}
</script>

<style scoped>
  .page,.page-box{
    margin: 0 auto;
    width: 1600px;
    padding: 50px 0 0 60px;
    background: #fff;
    border-radius: 20px;
    text-align: justify;
  }
  .page-box{
    padding: 0 60px 40px 0;
  }
  .page{
    position: relative;
    /*margin-left: 0;*/
    filter: drop-shadow(0px 0px 15px #bbb);
  }
  .page:before{
    content: '';
    display: block;
    position: absolute;
    right:-60px;
    top:0;
    width: 60px;
    height: 50px;
    background: linear-gradient(42deg, #ddd 30%, rgba(0,0,0,0) 40%);
  }
</style>
