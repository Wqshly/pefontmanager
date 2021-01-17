<template>
  <div class="fill-contain">
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-header></v-header>
      <div class="content-tags">
        <v-tags></v-tags>
      </div>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <div style="min-height: 100%;margin-bottom: -95px;"></div>
    <div class="main-footer">
      青岛洁时代&nbsp;&nbsp;山东科技大学校企合作项目&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/managePage/header'
import VSidebar from '@/components/managePage/sidebar'
import VTags from '@/components/managePage/tags'
import bus from '@/components/managePage/bus'
export default {
  name: 'templatePage',
  components: {
    VHeader,
    VSidebar,
    VTags
  },
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>

<style scoped>

  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 0;
    bottom: 0;
    padding-bottom: 60px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
  }

  .content {
    width: auto;
    height: 100%;
    padding: 10px 10px 0 10px;
    overflow-y: hidden;
    box-sizing: border-box;
  }

  .content-tags {
    padding: 0 10px;
  }

  .content-collapse {
    left: 65px;
  }
</style>
