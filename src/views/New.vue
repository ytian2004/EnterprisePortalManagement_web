<template>
  <div>
    <el-row>
      <!-- offset 左偏移 -->
      <!-- pull拉去，右边偏移 -->
      <el-col :span="17" :offset="1">
        <div>
          <h2>{{ currentNews.title }}</h2>
          <div class="time">{{ whichTime(currentNews.editTime) }}</div>
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="currentNews.content"></div>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card style="max-width: 480px">
          <template #header>
            <div class="card-header">
              <span style="fontsize: 16px">最近新闻</span>
            </div>
          </template>
          <div v-for="item in topNews" :key="item._id" style="padding:14px" @click="handleChangePage(item._id)">
            <span>{{ item.title }}</span>
            <div class="bottom">
              <time class="time">{{
                whichTime(item.editTime)
              }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import { StarFilled } from "@element-plus/icons-vue";
moment.locale("zh-cn");
const route = useRoute();
const currentNews = ref([]);
const topNews = ref([]);
const router = useRouter();
// watchEffect 监听路由变化, 当路由变化时，重新获取数据
watchEffect(async () => {
  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`);
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
  // console.log(res2.data.data);
  // console.log(res.data.data[0]);
  currentNews.value = res1.data.data[0];
  topNews.value = res2.data.data;
});
const whichTime = (time) => {
  return moment(time).format("lll");
};
const handleChangePage =(id)=>{
  router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 13px;
  color: gray;
}
</style>