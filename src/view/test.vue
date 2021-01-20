<template>
    <div>
      <el-button @click.native="addTest">测试</el-button>
    </div>
</template>

<script>
export default {
  name: 'test',
  methods: {
    addTest () {
      let data = {
        school: {
          schoolName: '13123',
          schoolAddress: '青岛',
          phone: '234324',
          schoolZipCode: '234',
          schoolIntroduction: '234'
        },
        password: '123456'
      }
      let data2 = JSON.stringify(data)
      console.log(data2)
      this.$api.http.postJson('/school/addSchool', data2)
    }
  }
}
</script>

<style scoped>

</style>
