<template>
  <div class="user-body">
    <div class="user-body-top">
      <el-card>
        <div class="user-top-form">
          <el-form>
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
              <LittleBtn :value="btnValue1" @click.prevent="serachOfKeyWord"/>
              <el-button style="width: 100px; height: 35px; margin-left: 20px" @click="resetList">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="user-body-bottom">
      <el-card>
        <div class="user-body-title">
          <LittleBtn @click="addUserDrawer" :value="btnValue2"/>
          <LittleBtn @click="deleteManyUser" style="margin-left: 20px" :value="btnValue3"
                     v-show="!!selectCheckArr.length"/>
        </div>
        <div class="user-body-list">
          <el-table border :data="userData" @selection-change="selectChange">
            <el-table-column type="selection" align="center">
            </el-table-column>
            <el-table-column label="#" align="center" type="index">
            </el-table-column>
            <el-table-column label="id" align="center" prop="id">
            </el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" align="center" width="240px">
              <template #default="{row}">
                <div class="operator-btn">
                  <el-button type="primary" size="default" @click="allotRole(row)" :icon="User" circle/>
                  <el-button type="info" size="default" @click="updateUserDrawer(row)" :icon="Edit" circle/>
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
        <div class="user-body-pagination center">
          <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              v-model:current-page="pageNow"
              @current-change="changePage"
              :page-size="pageLimit"
              :total="total"
          />
        </div>
        <div class="user-body-drawer">
          <el-drawer v-model="drawer1" :with-header="false">
            <h3 class="center">{{ userForm.id ? '更新用户' : '添加用户' }}</h3>
            <el-form :model="userForm" :rules="ruleOfUser" ref="formRef">
              <el-form-item label="用户姓名" prop="username">
                <el-input placeholder="请输入用户姓名" v-model="userForm.username"/>
              </el-form-item>
              <el-form-item label="用户昵称" prop="name">
                <el-input placeholder="请输入用户昵称" v-model="userForm.name"/>
              </el-form-item>
              <el-form-item label="用户密码" prop="password" v-if="!userForm.id">
                <el-input placeholder="请输入用户密码" v-model="userForm.password"/>
              </el-form-item>
            </el-form>
            <div class="drawer-btn-list">
              <LittleBtn :value="btnValue4" @click="addUser"/>
              <el-button style="width: 100px; margin-left: 20px" @click="drawer1=false">取消</el-button>
            </div>
          </el-drawer>
          <el-drawer v-model="drawer2" :with-header="false">
            <h3 class="center">分配角色</h3>
            <el-form :model="userForm" :rules="ruleOfUser" ref="formRef">
              <el-form-item label="用户姓名" prop="username">
                <el-input placeholder="请输入用户姓名" v-model="userForm.username" disabled/>
              </el-form-item>
              <el-form-item label="角色列表">
                <el-checkbox
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                >
                  全部选择
                </el-checkbox>
                <el-checkbox-group @change="handleCheckedRolesChange" v-model="checkRoleList">
                  <el-checkbox v-for="role in roleList" :key="role.id" :label="role">
                    {{ role.roleName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div class="drawer-btn-list">
              <LittleBtn :value="btnValue4" @click="addRole"/>
              <el-button style="width: 100px; margin-left: 20px" @click="drawer2=false">取消</el-button>
            </div>
          </el-drawer>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import LittleBtn from "@/components/Common/Button/LittleBtn.vue"
import useAdminStore from "@/store/adminStore/admin.ts";
import {ref, onMounted, reactive, nextTick} from "vue";
import {
  reqUser,
  reqAddOrUpdateUser,
  reqRoleList,
  reqUpdateRole,
  reqDeleteOneUser,
  reqDeleteManyUser,
} from "@/api/auth/user/index.ts";
import {User, Edit, Delete, InfoFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

// 按钮
const btnValue1 = ref('搜索')
const btnValue2 = ref('添加')
const btnValue3 = ref('批量删除')
const btnValue4 = ref('确定')

// 当前页
let pageNow = ref(1)

// 每页数量
const pageLimit = ref(5)

// 总数量
const total = ref(0)

// 复选框全选
const checkAll = ref(false)

// 不确定状态
const isIndeterminate = ref(true)

// 全选回调
const handleCheckAllChange = (val) => {
  checkRoleList.value = val ? roleList.value : []
  isIndeterminate.value = false
}

// 取消全选
const handleCheckedRolesChange = () => {
  isIndeterminate.value = !(roleList.value.length === checkRoleList.value.length)
}

// 表单数据
const userForm = reactive({
  username: '',
  name: '',
  password: '',
})

// 表单实例
const formRef = ref()

// 关键字
const keyWord = ref('')

// 表单校验
const validatorName = (rule, value, callBack) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('用户名长度至少五位'))
  }
}
const validatorPwd = (rule, value, callBack) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('密码长度至少六位'))
  }
}
const ruleOfUser = {
  username: [{required: true, trigger: 'blur', validator: validatorName}],
  name: [{required: true, trigger: 'blur'}],
  password: [{required: true, trigger: 'blur', validator: validatorPwd}]
}

// 换页
const changePage = () => {
  getUserData()
}

// 抽屉开关
const drawer1 = ref(false)
const drawer2 = ref(false)

// 获取用户数据
const userData = ref([])
const getUserData = async () => {
  const res = await reqUser(pageNow.value, pageLimit.value, keyWord.value)
  if (res.code === 200) {
    total.value = res.data.total
    userData.value = res.data.records
  }
}

// 添加用户抽屉
const addUserDrawer = () => {
  drawer1.value = true
  // 打开时清空数据
  Object.assign(userForm, {
    id: '',
    username: '',
    name: '',
    password: ''
  })
  // 清除提示
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

// 更新用户抽屉
const updateUserDrawer = (row) => {
  drawer1.value = true
  Object.assign(userForm, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

// 添加用户
const addUser = async () => {
  await formRef.value.validate()
  const res = await reqAddOrUpdateUser(userForm)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: userForm.id ? '更新成功' : '添加成功'
    })
    await getUserData()
  } else {
    ElMessage({
      type: 'error',
      message: userForm.id ? '更新失败' : '添加失败'
    })
  }
}

// 角色列表
const roleList = ref([])

// 选中角色列表
const checkRoleList = ref([])

// 分配角色
const allotRole = async (row) => {
  Object.assign(userForm, row)
  const res = await reqRoleList(userForm.id)
  if (res.code === 200) {
    roleList.value = res.data.allRolesList
    checkRoleList.value = res.data.assignRoles
    drawer2.value = true
  }
}

// 添加角色
const addRole = async () => {
  const data = {
    userId: userForm.id,
    roleIdList: checkRoleList.value.map(item => item.id)
  }
  const res = await reqUpdateRole(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配成功'
    })
    await getUserData()
  } else {
    ElMessage({
      type: 'error',
      message: '更新失败'
    })
  }
  drawer2.value = false
}

// 删除单个用户
const deleteUser = async (row) => {
  console.log(row.id)
  const res = await reqDeleteOneUser(row.id)
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: '删除成功'
    })
    await getUserData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// 获取删除列表
const selectCheckArr = ref([])
const selectChange = (val) => {
  selectCheckArr.value = val
}

// 删除多个用户
const deleteManyUser = async () => {
  const deleteIdList = selectCheckArr.value.map(item => {
    return item.id
  })
  const res = await reqDeleteManyUser(deleteIdList)
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: '删除成功'
    })
    await getUserData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// 关键字搜索
const serachOfKeyWord = async () => {
  await getUserData()
}

// 重置
const userAdmin = useAdminStore()
const resetList = () => {
  userAdmin.refresh = !userAdmin.refresh
}

onMounted(() => {
  getUserData()
})
</script>

<style scoped lang="scss">
.user-body {
  .user-body-top {
    .user-top-form {
      .el-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .user-body-bottom {
    margin-top: 20px;

    .user-body-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .user-body-list {
      margin-top: 20px;
    }

    .user-body-pagination {
      margin-top: 20px;

      :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
        background-color: #8b51fd !important; //修改默认的背景色
      }
    }

    .user-body-drawer {
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