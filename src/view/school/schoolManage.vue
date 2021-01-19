<template>
    <div class="fill-container scroll-style">
      <div class="table-container-style">
        <basic-table-temp :table-header-list="tableHeaderList"
                          :refresh-url="refreshUrl"
                          :add-url="addUrl"
                          :edit-url="editUrl"
                          :search-url="searchUrl"
                          :delete-url="deleteUrl"
                          :ref="refName"></basic-table-temp>
      </div>
    </div>
</template>

<script>
export default {
  name: 'schoolManage',
  data () {
    return {
      refName: 'schoolManage',
      refreshUrl: '/school/querySchoolList',
      addUrl: '',
      editUrl: '',
      searchUrl: '/school/searchSchool/',
      deleteUrl: '',
      tableHeaderList: [
        {value: 'schoolName', label: '学校名称', width: '120'},
        {value: 'schoolAddress', label: '学校地址', minWidth: '120'}
      ]
    }
  },
  methods: {
  },
  mounted () {
    this.$refs[this.refName].getRecord(this.refreshUrl)
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
