<template>
  <div class="container">
    <div
      class="news-header"
      :style="{ backgroundImage: `url(${require('@/assets/newsbg.jpg')})` }"
    ></div>
    <div class="center">新闻资讯</div>
    <!-- <div class="detail">
      为您推荐公司及行业的前沿资讯，让您随时了解行业动态！
    </div> -->
    <div class="search">
      <el-popover
        placement="bottom"
        title="检索结果"
        :visible="visible"
        width="50%"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            style="width: 100%"
            placeholder="请输入新闻关键字"
            :prefix-icon="Search"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchnewslist.length">
          <div
            v-for="data in searchnewslist"
            :key="data._id"
            class="search-item"
            @click="handleChangePage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="未找到相关新闻" />
        </div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <div>
            <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)">
              <div
                class="image"
                :style="{
                  backgroundImage: `url(http://localhost:3000${item.cover})`,
                  backgroundSize: 'cover',
                }"
              ></div>
              <div style="padding: 14px">
                <span>{{ item.title }}</span>
                <div class="bottom">
                  <time class="time">{{
                    moment(item.editTime).format("lll")
                  }}</time>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-tabs style="margin: 20px" v-model="whichTab" class="demo-tabs">
      <el-tab-pane
        :key="item.name"
        v-for="item in tablist"
        :label="item.label"
        :name="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <div
              v-for="data in grouptablist[item.name]"
              :key="data._id"
              style="padding: 10px"
            >
              <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(data._id)">
                <div
                  class="tab-image"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                    backgroundSize: 'cover',
                  }"
                ></div>
                <div style="padding: 14px; float: left">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{
                      moment(data.editTime).format("lll")
                    }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="data in grouptablist[item.name]"
                :key="data._id"
                :timestamp="moment(data.editTime).format('lll')"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="50" :bottom="50" />
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "vue-router";
moment.locale("zh-cn");
const searchText = ref();
const visible = ref(false);
const newsList = ref([]);
const whichTab = ref(1);
onMounted(async () => {
  var res = await axios.get("/webapi/news/list");
  newsList.value = res.data.data;
});

// computed 计算属性 相当于状态绑定，该属性会根据其他数据的变化，而自动计算更新
const searchnewslist = computed(() =>
  searchText.value
    ? newsList.value.filter((item) => item.title.includes(searchText.value))
    : []
);
const topNewsList = computed(() => newsList.value.slice(0, 4));
const tablist = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];
const grouptablist = computed(() =>
  _.groupBy(newsList.value, (item) => item.category)
);

const router = useRouter();
const handleChangePage =(id)=>{
  router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.center {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: white;
}
// .detail {
//   position: absolute;
//   left: 50%;
//   top: 18%;
//   transform: translate(-50%, -50%);
//   height: 100px;
//   line-height: 100px;
//   font-size: 25px;
//   color: white;
// }
.news-header {
  width: 100%;
  height: 300px;
  background-size: cover;
}
.search {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .el-input {
    width: 50%;
  }
}

.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background: whitesmoke;
    color: red;
  }
}

.topnews {
  margin: 20px;
  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .time {
    font-size: 13px;
    color: gray;
  }
}

.tab-image {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}
.tab-time {
  font-size: 13px;
  color: gray;
}
</style>