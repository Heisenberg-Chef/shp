<template>
  <div class="role-body">
    <div class="role-body-top">
      <el-card>
        <div class="role-top-form">
          <el-form>
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名" v-model="inputKeyWord"></el-input>
            </el-form-item>
            <el-form-item>
              <LittleBtn :value="btnValue1" @click.prevent="searchKeyWord"/>
              <el-button style="width: 100px; height: 35px; margin-left: 20px" @click="resetData">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="role-body-bottom">
      <el-card>
        <div class="role-body-title">
          <LittleBtn :value="btnValue2" @click="addRole"/>
          <el-dialog v-model="centerDialogVisible" title="添加角色" width="40%" center>
            <div class="dialog-body">
              <el-form>
                <el-form-item label="角色名称">
                  <el-input placeholder="请输入角色名称" v-model="roleForm.roleName"/>
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click.prevent="submitRole">
                  确定
                </el-button>
              </div>
            </template>
          </el-dialog>
        </div>
        <div class="role-body-list">
          <el-table border :data="roleList">
            <el-table-column label="#" align="center" type="index">
            </el-table-column>
            <el-table-column label="id" align="center" prop="id">
            </el-table-column>
            <el-table-column label="角色名称" align="center" prop="roleName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" align="center" width="240px">
              <template #default="{row}">
                <div class="operator-btn">
                  <el-button type="primary" size="default" @click="allotAuth(row)" :icon="User" circle/>
                  <el-button type="info" size="default" @click="updateRoleDrawer(row)" :icon="Edit" circle/>
                  <el-popconfirm
                      width="200"
                      @confirm="deleteUser(row)"
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      :icon="InfoFilled"
                      icon-color="#f36b6c"
                      title="您确定删除此用户吗?"
                  >
                    <template #reference>
                      <el-button type="danger" size="default" :icon="Delete" circle/>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="role-body-pagination center">
          <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              v-model:current-page="pageNow"
              @current-change="changePage"
              :page-size="pageLimit"
              :total="total"
          />
        </div>
        <div class="role-body-drawer">
          <el-drawer v-model="drawer1" :with-header="false">
            <h3 class="center">编辑角色</h3>
            <el-form>
              <el-form-item label="角色名称" prop="username">
                <el-input placeholder="请输入角色名称" v-model="roleForm.roleName"/>
              </el-form-item>
            </el-form>
            <div class="drawer-btn-list">
              <LittleBtn :value="btnValue3" @click="updateRole"/>
              <el-button style="width: 100px; margin-left: 20px" @click="drawer1=false">取消</el-button>
            </div>
          </el-drawer>
          <el-drawer v-model="drawer2" :with-header="false">
            <h3>权限管理</h3>
            <el-tree
                :data="authList"
                ref="tree"
                show-checkbox
                node-key="id"
                :default-checked-keys="checkedAuthList"
                default-expand-all
                :props="defaultProps"
            />
            <div class="drawer-btn-list">
              <LittleBtn :value="btnValue3" @click="authRole"/>
              <el-button style="width: 100px; margin-left: 20px" @click="drawer1=false">取消</el-button>
            </div>
          </el-drawer>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue'
import LittleBtn from "@/components/Common/Button/LittleBtn.vue"
import useAdminStore from "@/store/adminStore/admin.ts";
import {Edit, User, Delete, InfoFilled} from "@element-plus/icons-vue";
import {reqRoleList, reqDeleteRole, reqAddOrUpdateRole, reqAuthList, reqRoleAuthList} from "@/api/auth/role/index.ts";
import {ElMessage} from "element-plus";

// 按钮
const btnValue1 = ref('搜索')
const btnValue2 = ref('添加角色')
const btnValue3 = ref('确定')

// 关键字
const inputKeyWord = ref('')

// 当前页
const pageNow = ref(1)

// 树形控件
const tree = ref()

// 每页数据条数
const pageLimit = ref(6)

// 总数量
const total = ref(0)

// 角色数据
const roleList = ref([])
const getRoleData = async () => {
  const res = await reqRoleList(pageNow.value, pageLimit.value, inputKeyWord.value)
  if (res.code === 200) {
    roleList.value = res.data.records
    total.value = res.data.total
  } else {
    return new Error("获取角色列表请求错误")
  }
}

// 挂载完成钩子
onMounted(() => {
  getRoleData()
})

// 翻页
const changePage = () => {
  getRoleData()
}

// 编辑角色抽屉
const drawer1 = ref(false)

// 编辑权限抽屉
const drawer2 = ref(false)

// 重置
const userAdmin = useAdminStore()
const resetData = () => {
  userAdmin.refresh = !userAdmin.refresh
}

// 关键字搜索
const searchKeyWord = () => {
  getRoleData()
}

// 添加角色弹出框
const centerDialogVisible = ref(false)

// 添加角色
const roleForm = reactive({
  roleName: ''
})
const addRole = () => {
  centerDialogVisible.value = true
  Object.assign(roleForm, {
    roleName: ''
  })
}
const submitRole = async () => {
  const res = await reqAddOrUpdateRole(roleForm)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    await getRoleData()
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
  centerDialogVisible.value = false
}

// 获取权限
const authList = ref([])
const checkedAuthList = ref([])
const filterCheckedAuth = (dataList, filterList) => {
  dataList.forEach((item) => {
    if (item.select && item.level === 4) {
      filterList.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterCheckedAuth(item.children, filterList)
    }
  })
  return filterList
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
const allotAuth = async (row) => {
  drawer2.value = true
  roleForm.id = row.id
  const res = await reqAuthList(row.id)
  if (res.code === 200) {
    authList.value = res.data
    checkedAuthList.value = filterCheckedAuth(authList.value, [])
  }
}

// 分配权限
const authRole = async () => {
  let arr = tree.value.getCheckedKeys()
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = [...arr, ...arr1]
  const res = await reqRoleAuthList(roleForm.id, permissionId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '分配失败'
    })
  }
  drawer2.value = false
}

// 编辑数据
const updateRoleDrawer = (row) => {
  console.log(row)
  drawer1.value = true
  roleForm.id = row.id
  roleForm.roleName = row.roleName
}
const updateRole = async () => {
  const res = await reqAddOrUpdateRole(roleForm)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '更新成功'
    })
    await getRoleData()
  } else {
    ElMessage({
      type: 'error',
      message: '更新失败'
    })
  }
  drawer1.value = false
}

// 删除数据
const deleteUser = async (row) => {
  const res = await reqDeleteRole(row.id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    await getRoleData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
</script>

<style scoped lang="scss">
.role-body {
  .role-body-top {
    .role-top-form {
      .el-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .role-body-bottom {
    margin-top: 20px;

    .role-body-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .role-body-list {
      margin-top: 20px;
    }

    .role-body-pagination {
      margin-top: 20px;

      :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
        background-color: #8b51fd !important; //修改默认的背景色
      }
    }

    .role-body-drawer {
      position: relative;

      h3 {
        height: 60px;
      }

      .el-form {
        margin-top: 50px;
      }

      .el-drawer {
        .drawer-btn-list {
          display: flex;
          flex-direction: row;
          position: absolute;
          bottom: 40px;
          right: 50px;
        }
      }
    }
  }
}
</style>