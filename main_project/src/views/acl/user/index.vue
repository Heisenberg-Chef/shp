<template>
  <div>
    <el-card style="height: 80px">
      <el-form inline class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserList" :disabled="!keyword">
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 15px 0px">
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button
        type="danger"
        :disabled="!selectIdArr.length"
        @click="userBatchDelete"
      >
        批量删除
      </el-button>
      <el-table
        style="margin: 10px 0px"
        border
        :data="tableData"
        @selection-change="selectChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="id" width="80" prop="id"></el-table-column>
        <el-table-column label="用户姓名" prop="username"></el-table-column>
        <el-table-column label="用户昵称" prop="name"></el-table-column>
        <el-table-column label="用户角色" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="270">
          <template v-slot="{ row }">
            <el-button
              icon="User"
              size="small"
              type="primary"
              @click="clickRoleBtn(row)"
            >
              分配角色
            </el-button>
            <el-button
              icon="Edit"
              size="small"
              type="success"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`您确定删除${row.username}吗？`"
              width="250"
              @confirm="userDelete(row.id)"
            >
              <template #reference>
                <el-button icon="Delete" size="small" type="danger">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="getUserList"
        @current-change="getUserList"
      />
    </el-card>

    <!-- 添加、修改 -->
    <el-drawer v-model="drawerShow" direction="rtl" size="35%">
      <template #header>
        <h4>{{ userParams.id ? '更新' : '添加' }}用户</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名:" prop="username">
            <el-input placeholder="请输入姓名" v-model="userParams.username" />
          </el-form-item>
          <el-form-item label="用户昵称:" prop="name">
            <el-input placeholder="请输入昵称" v-model="userParams.name" />
          </el-form-item>
          <el-form-item label="账号密码:" prop="password" v-if="!userParams.id">
            <el-input placeholder="请输入密码" v-model="userParams.password" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 分配角色 -->
    <el-drawer v-model="roleShow" direction="rtl" size="35%">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名:">
            <el-input
              placeholder="请输入用户姓名"
              disabled
              v-model="userParams.username"
            />
          </el-form-item>
          <el-form-item label="角色列表:">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedRoleChange"
            >
              <el-checkbox v-for="item in allRole" :key="item.id" :label="item">
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="colseRole">取消</el-button>
          <el-button
            type="primary"
            :disabled="!userRole.length"
            @click="setRole"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqRemoveAllUser,
} from '@/api/acl/user'
import type { User, RoleData, SetRoleData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const tableData = ref<User[]>([])
const drawerShow = ref<boolean>(false)
const roleShow = ref<boolean>(false)
const userParams = reactive<User>({
  name: '',
  username: '',
  password: '',
})
const keyword = ref<string>('')
const formRef = ref()

// 自定义表达校验
const validateUserName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户姓名至少为5位'))
  }
}
const validateName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少为5位'))
  }
}
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户密码至少为6位'))
  }
}
const rules = {
  username: [{ required: true, validator: validateUserName, trigger: 'blur' }],
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
}

onMounted(() => {
  getUserList()
})

// 用户列表
const getUserList = async () => {
  const result = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    tableData.value = result.data.records
    total.value = result.data.total
  }
}

// 重置
const reset = () => {
  keyword.value = ''
  pageNo.value = 1
  pageSize.value = 5
  getUserList()
}

// 添加
const addUser = () => {
  Object.assign(userParams, { name: '', username: '', password: '', id: '' })
  drawerShow.value = true
  nextTick(() => {
    formRef.value.clearValidate()
  })
}

// 修改
const updateUser = (row: User) => {
  Object.assign(userParams, {
    name: row.name,
    username: row.username,
    password: row.password,
    id: row.id,
  })
  nextTick(() => {
    formRef.value.clearValidate()
  })
  drawerShow.value = true
}

// 添加/修改请求
const save = async () => {
  await formRef.value.validate()
  const result = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    drawerShow.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    if (!userParams.id) {
      pageNo.value = 1
    }
    getUserList()
  } else {
    drawerShow.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}

// 取消
const cancel = () => {
  drawerShow.value = false
}

const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(false)
const allRole = ref<RoleData[]>([])
const userRole = ref<any[]>([])

// 分配角色按钮
const clickRoleBtn = async (row: User) => {
  Object.assign(userParams, row)
  const result = await reqAllRole(row.id as number)
  if (result.code === 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    roleShow.value = true
    if (userRole.value.length === 0) {
      checkAll.value = false
      isIndeterminate.value = false
    } else if (userRole.value.length === allRole.value.length) {
      checkAll.value = true
      isIndeterminate.value = false
    } else {
      checkAll.value = false
      isIndeterminate.value = true
    }
  }
}

// 全选
const handleCheckAllChange = (val: any) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedRoleChange = (value: any) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}

// 分配角色确定
const setRole = async () => {
  const param: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => item.id),
  }
  const result = await reqSetUserRole(param)
  if (result.code === 200) {
    getUserList()
    ElMessage({
      type: 'success',
      message: '分配角色成功',
    })
    roleShow.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '分配角色失败',
    })
  }
}
const colseRole = () => {
  roleShow.value = false
}

// 删除
const userDelete = async (id: number) => {
  const result = await reqRemoveUser(id)
  if (result.code === 200) {
    getUserList()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
}
// 批量删除
const selectIdArr = ref<number[]>([])
const selectChange = (value: any) => {
  selectIdArr.value = value.map((item: any) => item.id)
}
const userBatchDelete = async () => {
  const result = await reqRemoveAllUser(selectIdArr.value)
  if (result.code === 200) {
    getUserList()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
