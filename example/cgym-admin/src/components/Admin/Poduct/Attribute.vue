<template>
  <div class="attribute-body">
    <div class="attribute-body-top">
      <el-card>
        <div class="attribute-top-form center">
          <el-form>
            <el-form-item label="一级分类">
              <el-select clearable placeholder="Select" :disabled="switchCard === 1" @change="getCategoryOfTwo"
                         v-model="categoryStore.c1Id">
                <el-option
                    v-for="item in categoryStore.categoryData1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类" style="margin-left: 30px;margin-right: 30px">
              <el-select clearable placeholder="Select" :disabled="switchCard === 1" @change="getCategoryOfThree"
                         v-model="categoryStore.c2Id">
                <el-option
                    v-for="item in categoryStore.categoryData2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
              <el-select clearable placeholder="Select" :disabled="switchCard === 1" v-model="categoryStore.c3Id">
                <el-option
                    v-for="item in categoryStore.categoryData3"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="attribute-body-bottom">
      <el-card>
        <div class="attribute-body-title" v-show="switchCard===0">
          <little-btn v-if="!categoryStore.c3Id" @click="handlerWarning" :value="btnContent"/>
          <little-btn v-else :value="btnContent" @click="addAttr"/>
        </div>
        <div class="attribute-body-list" v-show="switchCard===0">
          <el-table border :data="attrDataList" :row-style="{height:'70px'}">
            <el-table-column label="序号" width="100px" align="center" type="index">
            </el-table-column>
            <el-table-column label="名称" width="350px" align="center">
              <template #default="{row}">
                <pre style="color: #707070">{{ row.attrName }}</pre>
              </template>
            </el-table-column>
            <el-table-column label="属性值" width="350px" align="center">
              <template #default="{row}">
                <el-tag v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="{row}">
                <el-button type="primary" :icon="Edit" circle @click="toEdit(row)"/>
                <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    :title="`您确认删除${row.tmName}品牌?`"
                    @confirm="deleteAttrConfirm(row.id)"
                >
                  <template #reference>
                    <el-button type="danger" :icon="Delete" circle/>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="attribute-body-edit" v-show="switchCard===1">
          <el-form>
            <el-form-item label="属性名称">
              <el-input placeholder="请输入属性名称"
                        v-model="attrForm.attrName"
                        style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="!attrForm.attrName" @click="addAttrValue"
                         style="background-color: #8b51fd; color: white">添加属性值
              </el-button>
            </el-form-item>
            <el-table border :row-style="{height:'70px'}" :data="attrForm.attrValueList">
              <el-table-column label="序号" width="200px" align="center" type="index">
              </el-table-column>
              <el-table-column label="属性值" width="600px" align="center">
                <template #default="{row, $index}">
                  <el-input :ref="(vc) => inputArr[$index] = vc" placeholder="请输入属性值" v-if="row.isInput"
                            @blur="leaveInput(row, $index)"
                            v-model="row.valueName"></el-input>
                  <div v-else @click="editInput(row)">
                    {{ row.valueName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="{$index}">
                  <el-button type="danger" @click="attrForm.attrValueList.splice($index, 1)" :icon="Delete" circle/>
                </template>
              </el-table-column>
            </el-table>
            <el-form-item style="margin-top: 20px">
              <el-button style="background-color: #8b51fd; color: white" @click="saveAttr">保存</el-button>
              <el-button @click="cancelAddAttr">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script setup>
import {ref, onMounted, watch, reactive, onBeforeMount, nextTick} from 'vue'
import LittleBtn from "@/components/Common/Button/LittleBtn.vue"
import useCategoryStore from "@/store/categoryStore/index.ts";
import {ElMessage} from "element-plus";
import {reqAttr, reqAddAttr, reqDeleteAttr} from "@/api/product/attribute/index.ts";
import {Edit, InfoFilled, Delete} from "@element-plus/icons-vue";

const categoryStore = useCategoryStore()

// 按钮
const btnContent = ref('添加属性')

// 卡片切换0为展示，1为修改
const switchCard = ref(0)

// 获取一级分类
const getC1 = () => {
  categoryStore.getCategory1()
}

// 获取二级分类
const getCategoryOfTwo = () => {
  if (categoryStore.c1Id) {
    categoryStore.categoryData3 = []
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.getCategory2()
  }
}

// 获取三级分类
const getCategoryOfThree = () => {
  if (categoryStore.c2Id) {
    categoryStore.c3Id = ''
    categoryStore.getCategory3()
  }
}

// 完成分类提示
const handlerWarning = () => {
  if (!categoryStore.c3Id) {
    ElMessage({
      type: 'warning',
      message: '请先完成分类'
    })
  }
}

// 通过监听id3获取属性数据
const attrDataList = ref([])
const getAttr = async () => {
  const {c1Id, c2Id, c3Id} = categoryStore
  const res = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    attrDataList.value = res.data
  }
}

watch(() => categoryStore.c3Id, () => {
  attrDataList.value = []
  if (!categoryStore.c3Id) return
  getAttr()
})

// 收集表单数据
const attrForm = reactive({
  attrName: "",
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})

// 添加属性
const addAttr = () => {
  switchCard.value = 1
  attrForm.categoryId = categoryStore.c3Id
}

// 取消添加属性
const cancelAddAttr = () => {
  switchCard.value = 0
}

// 输入框数组
const inputArr = ref([])

// 添加属性值
const addAttrValue = () => {
  attrForm.attrValueList.push({
    valueName: '',
    isInput: true
  })
  nextTick(() => {
    inputArr.value[attrForm.attrValueList.length - 1].focus()
  })
}

// 监听输入框是否为空
const emptyInput = ref(true)

// 失去焦点
const leaveInput = (row, $index) => {
  if (row.valueName.trim() === '') {
    attrForm.attrValueList.splice($index, 1)
    ElMessage({
      type: "error",
      message: "输入框不能为空"
    })
    return
  }
  emptyInput.value = false
  row.isInput = false
}

// 编辑输入
const editInput = (row) => {
  row.isInput = true
}

// 编辑属性
const toEdit = (row) => {
  switchCard.value = 1
  Object.assign(attrForm, JSON.parse(JSON.stringify(row)))
}

// 删除属性
const deleteAttrConfirm = async (id) => {
  const res = await reqDeleteAttr(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    await getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// 清空仓库
onBeforeMount(() => {
  categoryStore.$reset()
})

// 保存上传属性
const saveAttr = async () => {
  if (emptyInput.value === true) {
    ElMessage({
      type: "error",
      message: "输入框不能为空"
    })
    return
  }
  const res = await reqAddAttr(attrForm)
  if (res.code === 200) {
    switchCard.value = 0
    ElMessage({
      type: 'success',
      message: "成功"
    })
    await getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: "失败"
    })
  }
}

onMounted(() => {
  getC1()
})
</script>

<style scoped lang="scss">
.attribute-body {
  .attribute-body-top {
    margin-bottom: 20px;

    .attribute-top-form {
      .el-form {
        display: flex;
        flex-direction: row;
      }
    }
  }

  .attribute-body-bottom {
    .attribute-body-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .attribute-body-list {
      margin-top: 20px;
    }

    .attribute-body-edit {
      margin-top: 20px;
    }
  }
}
</style>