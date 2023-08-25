<template>
  <div class="menu">
    <el-table row-key="id" border :data="menuList" :expand-row-keys="expends">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" size="default" @click="OpenAddMenuDialog(row)" :icon="Plus" circle
                     v-show="row.level !== 4"/>
          <el-button type="info" size="default" :icon="Edit" circle v-show="row.level !== 1"/>
          <el-button type="danger" size="default" :icon="Delete" @click="DeleteMenu(row)" circle
                     v-show="row.level !== 1"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="centerDialogVisible1" title="添加菜单" width="40%" center>
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="请填写名称" v-model="addMenuData.name"/>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请填写权限值" v-model="addMenuData.code"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="centerDialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="submitAddMenuData">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from "vue";
import {reqMenuList, reqAddorUpdateMenu, reqDeleteMenu} from "@/api/auth/menu/index.ts";
import {Edit, Plus, Delete} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

// 数据列表
const menuList = ref([])

// 展开
const expends = ref(['1'])

// 获取数据
const menuListData = async () => {
  const res = await reqMenuList()
  if (res.code === 200) {
    menuList.value = res.data
  }
}

// 添加菜单对话框1
const centerDialogVisible1 = ref(false)

// 添加菜单数据
const addMenuData = reactive({
  code: '',
  level: 0,
  name: '',
  pid: 0
})

// 添加菜单
const OpenAddMenuDialog = (row) => {
  centerDialogVisible1.value = true
  addMenuData.pid = row.id
  addMenuData.level = row.level + 1
}

// 提交添加菜单
const submitAddMenuData = async () => {
  centerDialogVisible1.value = false
  const res = await reqAddorUpdateMenu(addMenuData)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    await menuListData()
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}

// 删除菜单
const DeleteMenu = async (row) => {
  const res = await reqDeleteMenu(row.id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    await menuListData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

onMounted(() => {
  menuListData()
})
</script>

<style scoped>

</style>