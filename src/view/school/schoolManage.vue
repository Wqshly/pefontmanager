<template>
  <div class="fill-container scroll-style">
    <div class="table-container-style">
      <basic-table-temp :ref="refName"
                        :table-header-list="tableHeaderList"
                        :search-list="searchList"
                        :url="url"
                        :button-show="buttonShow"
                        :func-btn="funcBtn"
                        @add-record="addRecord"
                        @click-row="clickRow"
                        @edit-record="editRecord"
                        @btn-click="btnClick">
        <el-form slot="addForm" :model="addForm.school" :rules="addFormRules" label-width="130px" ref="addForm">
          <el-form-item label="学校编码：" prop="schoolNumber">
            <el-input v-model="addForm.school.schoolNumber"></el-input>
          </el-form-item>
          <el-form-item label="学校名称：" prop="schoolName">
            <el-input v-model="addForm.school.schoolName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="addForm.school.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <multilevel-linkage @area-linkage="addFormArea"></multilevel-linkage>
          </el-form-item>
          <el-form-item label="详细地址：" prop="schoolAddress2">
            <el-input v-model="addForm.school.schoolAddress2"></el-input>
          </el-form-item>
          <el-form-item label="会员到期时间：" prop="validPeriod">
            <el-date-picker v-model="addForm.school.validPeriod" type="date" value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="邮政编码：" prop="schoolZipCode">
            <el-input v-model="addForm.school.schoolZipCode"></el-input>
          </el-form-item>
          <el-form-item label="学校简介：" prop="schoolIntroduction">
            <el-input v-model="addForm.school.schoolIntroduction" type="textarea"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </el-form>
        <el-form slot="editForm" :model="editForm.school" :rules="editFormRules" label-width="130px" ref="editForm">
          <el-form-item label="学校编码：" prop="schoolNumber">
            <el-input v-model="editForm.school.schoolNumber"></el-input>
          </el-form-item>
          <el-form-item label="学校名称：" prop="schoolName">
            <el-input v-model="editForm.school.schoolName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="editForm.school.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="editForm.school.schoolAddress" disabled>
              <template slot="append">
                <el-button @click.native="handleEditAddress">编辑</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="会员到期时间：">
            <el-date-picker v-model="editForm.school.validPeriod" type="date" value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期" disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="邮政编码：" prop="schoolZipCode">
            <el-input v-model="editForm.school.schoolZipCode"></el-input>
          </el-form-item>
          <el-form-item label="学校简介：" prop="schoolIntroduction">
            <el-input v-model="editForm.school.schoolIntroduction" type="textarea"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </el-form>
      </basic-table-temp>
    </div>
    <el-dialog width="750px" ref="editAddressDialog" title="编辑地址" :visible.sync="editAddressDialogVisible"
               :close-on-click-modal="false">
      <el-form :model="editAddressForm" label-width="100px">
        <el-form-item label="地址：">
          <multilevel-linkage @area-linkage="editFormArea"></multilevel-linkage>
        </el-form-item>
        <el-form-item label="详细地址：" prop="addressDetail">
          <el-input v-model="editAddressForm.addressDetail"></el-input>
        </el-form-item>
        <el-button style="float: right;" type="primary" @click.native="editAddress">确认</el-button>
        <el-button @click.native="editAddressDialogVisible = false">取消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog ref="setValidPeriodDialog" title="会员设置" :visible.sync="setValidPeriodDialogVisible"
               :close-on-click-modal="false">
      <el-form :model="editForm.school" label-width="130px">
        <el-form-item label="会员到期时间：">
          <el-date-picker v-model="editForm.school.validPeriod" type="date" value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button style="float: right;" type="primary" @click.native="setValidPeriod">确认</el-button>
        <el-button @click.native="setValidPeriodDialogVisible = false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'schoolManage',
  data () {
    return {
      refName: 'schoolManage',
      tableHeaderList: [
        {value: 'schoolNumber', label: '学校编码', width: '120'},
        {value: 'schoolName', label: '学校名称', width: '160'},
        {value: 'phone', label: '联系电话', width: '140'},
        {value: 'schoolAddress', label: '学校地址', width: '260'},
        {value: 'schoolIntroduction', label: '简介', width: '300'},
        {value: 'schoolZipCode', label: '邮政编码', width: '120'},
        {value: 'validPeriod', label: '会员到期时间', minWidth: '180'}
      ],
      searchList: [
        {value: 'schoolNumber', label: '学校编码'},
        {value: 'schoolName', label: '学校名称'},
        {value: 'phone', label: '联系电话'},
        {value: 'schoolAddress', label: '学校地址'},
        {value: 'schoolIntroduction', label: '简介'},
        {value: 'schoolZipCode', label: '邮政编码'}
      ],
      url: {
        refreshUrl: '/school/querySchoolList',
        addUrl: '/school/addSchool',
        editUrl: '/school/updateSchool',
        searchUrl: '/school/searchSchool/',
        deleteUrl: ''
      },
      buttonShow: {
        addButton: true,
        editButton: true,
        deleteButton: false,
        refreshButton: true,
        downloadButton: false,
        uploadButton: false
      },
      funcBtn: {
        isShow: true,
        fixed: 'right',
        width: 140,
        buttons: [
          {name: '会员设置', value: 'changeMemberTime', icon: 'el-icon-setting'}
        ]
      },
      addForm: {
        school: {
          schoolNumber: '',
          schoolName: '',
          phone: '',
          schoolAddress: '',
          schoolAddress1: '',
          schoolAddress2: '',
          schoolIntroduction: '',
          schoolZipCode: '',
          validPeriod: ''
        },
        password: ''
      },
      addFormRules: {
        schoolNumber: [
          {required: true, message: '请输入学校编码', trigger: 'blur'},
          {min: 1, max: 18, message: '请输入正确的学校编码', trigger: 'blur'}
        ],
        schoolName: [
          {required: true, message: '请输入学校名称', trigger: 'blur'},
          {min: 1, max: 18, message: '请输入正确的学校名称', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'},
          {min: 1, max: 18, message: '请输入正确的联系方式', trigger: 'blur'}
        ]
      },
      editForm: {
        school: {
          schoolNumber: null,
          schoolName: null,
          phone: null,
          schoolAddress: null,
          schoolIntroduction: null,
          schoolZipCode: null,
          validPeriod: null
        },
        password: null
      },
      editAddressForm: {address: '', addressDetail: ''},
      editFormRules: {
        schoolNumber: [
          {required: true, message: '请输入学校编码', trigger: 'blur'},
          {min: 1, max: 18, message: '请输入正确的学校编码', trigger: 'blur'}
        ],
        schoolName: [
          {required: true, message: '请输入学校名称', trigger: 'blur'},
          {min: 1, max: 18, message: '请输入正确的学校名称', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'},
          {min: 1, max: 18, message: '请输入正确的联系方式', trigger: 'blur'}
        ],
        schoolAddress1: [
          {required: true, message: '请选择学校地址！', trigger: 'blur'}
        ],
        schoolAddress2: [
          {required: true, message: '请输入详细地址！', trigger: 'blur'}
        ],
        validPeriod: [
          {required: true, message: '请选择会员到期时间', trigger: 'blur'}
        ]
      },
      editAddressDialogVisible: false,
      setValidPeriodDialogVisible: false
    }
  },
  methods: {
    addRecord () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          if (this.addForm.school.schoolAddress1 === '') {
            this.$message.warning('请选择地址')
          } else {
            this.addForm.school.schoolAddress = this.addForm.school.schoolAddress1 + this.addForm.school.schoolAddress2
            this.$prompt('请输入管理员密码以确认添加', '提示', {
              inputType: 'password',
              closeOnClickModal: false
            })
              .then(({value}) => {
                this.addForm.password = value
                console.log(this.addForm)
                this.$api.http.postJson(this.url.addUrl, JSON.stringify(this.addForm))
                  .then(res => {
                    this.$message.success('添加成功！')
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
          }
        }
      })
    },
    clickRow (val) {
      this.editForm.school = val
    },
    handleEditAddress () {
      this.editAddressDialogVisible = true
    },
    editAddress () {
      if (this.editAddressForm.address === '' || this.editAddressForm.addressDetail === '') {
        this.$message.warning('请输入完整信息')
      } else {
        this.editForm.school.schoolAddress = this.editAddressForm.address + this.editAddressForm.addressDetail
        this.editAddressDialogVisible = false
      }
    },
    editRecord () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$api.http.postJson(this.url.editUrl, JSON.stringify(this.editForm.school))
            .then(res => {
              this.$message.success('修改成功！')
              this.$refs[this.refName].getRecord(this.url.refreshUrl)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    addFormArea (val) {
      this.addForm.school.schoolAddress1 = val
    },
    editFormArea (val) {
      this.editAddressForm.address = val
    },
    btnClick (value, index) {
      this.editForm.school = this.$refs[this.refName].tableData[index]
      this.setValidPeriodDialogVisible = true
    },
    // 设置会员信息
    setValidPeriod () {
      this.$prompt('请输入管理员密码以确认添加', '提示', {
        inputType: 'password',
        closeOnClickModal: false
      })
        .then(({value}) => {
          this.editForm.password = value
          this.$api.http.postJson('/school/updateValidPeriod', JSON.stringify(this.editForm))
            .then(res => {
              this.$message.success('添加成功！')
              this.setValidPeriodDialogVisible = false
              this.$refs[this.refName].getRecord(this.url.refreshUrl)
            })
            .catch(err => {
              console.log(err)
            })
        })
    }
  },
  mounted () {
    this.$refs[this.refName].getRecord(this.url.refreshUrl)
  }
}
</script>

<style scoped>

  .table-container-style {
    margin: 15px;
    padding: 15px;
    background-color: #ffffff;
    min-height: 100px;
    border-radius: 10px;
  }

</style>
