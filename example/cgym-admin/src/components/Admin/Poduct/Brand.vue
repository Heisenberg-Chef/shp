<template>
  <div class="brand-body">
    <el-card>
      <div class="brand-body-title">
        <little-btn @click="saveBrandData" :value="btnContent"/>
      </div>
      <div class="brand-body-list">
        <el-table border :data="brandList" :row-style="{height:'70px'}">
          <el-table-column label="序号" width="100px" align="center" type="index">
          </el-table-column>
          <el-table-column label="名称" width="350px" align="center">
            <template #default="{row}">
              <pre style="color: #707070">{{ row.tmName }}</pre>
            </template>
          </el-table-column>
          <el-table-column label="logo" width="350px" align="center">
            <template #default="{row}">
              <img :src="row.logoUrl" style="width: 50px">
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{row}">
              <el-button type="primary" :icon="Edit" circle @click="updateBrandData(row)"/>
              <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  :title="`您确认删除${row.tmName}品牌?`"
                  @confirm="deleteBrandConfirm(row.id)"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle/>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="brand-body-pagination center">
        <el-pagination
            background
            @current-change="changePage"
            layout="total, prev, pager, next, jumper"
            v-model:current-page="pageNow"
            :page-size="pageLimit"
            :total="total"
        />
      </div>
      <div class="brand-body-dialog">
        <el-dialog v-model="dialogFormVisible" title="品牌">
          <el-form :model="formData" :rules="rulesOfFrom" ref="formRef">
            <el-form-item label="名称" label-width="60px" prop="tmName">
              <el-input autocomplete="off" v-model="formData.tmName" placeholder="请输入品牌名称"
                        style="width: 400px;"/>
            </el-form-item>
            <el-form-item label="logo" label-width="60px" prop="logoUrl">
              <el-upload action="http://114.115.179.162:8022/prod-api/admin/product/fileUpload"
                         :before-upload="beforeAvatarUpload"
                         :on-success="handleAvatarSuccess"
                         class="avatar-uploader"
                         :show-file-list="false">
                <img v-if="formData.logoUrl" :src="formData.logoUrl" class="avatar"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <UploadFilled/>
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submit">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import LittleBtn from "@/components/Common/Button/LittleBtn.vue"
import {ref, onMounted, reactive, nextTick} from "vue"
import {reqBrandData, operationData, deleteBrand} from "@/api/product/brand/index.ts";
import {Edit, Delete, InfoFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

// 当前页码
let pageNow = ref(1)

// 每页数量
const pageLimit = ref(5)

// 总数量
const total = ref(0)

// 品牌数据
const brandList = ref([])

// 表单ref
const formRef = ref()

// 换页
const changePage = () => {
  brandData(pageNow.value, pageLimit.value)
}

// 获取品牌数据
const brandData = async () => {
  const res = await reqBrandData(pageNow.value, pageLimit.value)
  total.value = res.data.total
  brandList.value = res.data.records
}

// 对话框
const dialogFormVisible = ref(false)

// 表单
const formData = reactive({
  tmName: '',
  logoUrl: ''
})

// 名称校验
const validatorName = (rule, value, callback) => {
  if (value.trim().length > 1) {
    callback()
  } else {
    callback(new Error("品牌名称长度至少两位"))
  }
}

// logo校验
const validatorLogo = (rule, value, callback) => {
  if (value) {
    callback()
  } else {
    callback(new Error("请上传logo"))
  }
}

// 表单校验
const rulesOfFrom = {
  tmName: [
    // trigger: 焦点触发事件
    {required: true, trigger: 'blur', validator: validatorName}
  ],
  logoUrl: [
    {required: true, validator: validatorLogo}
  ]
}

// 图片上传前钩子
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 1) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: "图片尺寸不符"
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: "图片格式不符"
    })
    return false
  }
}

// 图片上传成功的钩子
const handleAvatarSuccess = (response) => {
  formData.logoUrl = response.data
}

// 创建品牌
const saveBrandData = () => {
  formData.id = ''
  formData.tmName = ''
  formData.logoUrl = ''
  dialogFormVisible.value = true
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

// 更新品牌
const updateBrandData = (row) => {
  // ES6合并语法
  Object.assign(formData, row)
  dialogFormVisible.value = true
}

// 删除品牌
const deleteBrandConfirm = async (id) => {
  const res = await deleteBrand(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    await brandData(brandList.value.length >= 1 ? pageNow.value : pageNow.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// 提交
const submit = async () => {
  // 全部表单校验
  await formRef.value.validate()
  const res = await operationData(formData)
  if (res.code === 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'sucess',
      message: formData.id ? '修改成功' : '编辑成功'
    })
    await brandData()
    formData.tmName = ''
    formData.logoUrl = ''
  } else {
    ElMessage({
      type: 'error',
      message: formData.id ? '修改失败' : '编辑失败'
    })
  }
}

// 按钮内容
const btnContent = ref('添加')

onMounted(() => {
  brandData()
})
</script>

<style scoped lang="scss">
.brand-body {

  .brand-body-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .brand-body-list {
    margin-top: 20px;
  }

  .brand-body-pagination {
    height: 80px;

    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
      background-color: #8b51fd !important; //修改默认的背景色
    }
  }

  .brand-body-dialog {
  }

  .avatar-uploader {
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 178px;
    height: 178px;
    display: block;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader {
    &:hover {
      border-color: #8b51fd;
    }
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>