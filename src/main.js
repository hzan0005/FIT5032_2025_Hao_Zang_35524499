import { createApp } from 'vue'
import App from './App.vue'

// ✅ 样式引入（Bootstrap + PrimeVue）
import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'

// ✅ 使用 Aura 主题（确保 @primevue/themes 已正确安装）
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// ✅ 导入 PrimeVue DataTable 所需组件
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// ✅ 创建 app 实例
const app = createApp(App)

// ✅ 启用 PrimeVue 并设置主题
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

// ✅ 注册组件（必须显式注册才能使用）
app.component('DataTable', DataTable)
app.component('Column', Column)

// ✅ 挂载
app.mount('#app')
