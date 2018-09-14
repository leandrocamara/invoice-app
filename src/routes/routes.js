
import Notifications from '@/pages/Notifications.vue'
import InvoiceList from '@/pages/Invoice/InvoiceList.vue'
import InvoiceForm from '@/pages/Invoice/InvoiceForm.vue'
import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/faturas',
    children: [
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'faturas',
        name: 'Faturas',
        component: InvoiceList
      },
      {
        path: 'cadastrar-fatura',
        name: 'Faturas',
        component: InvoiceForm
      },
      {
        path: 'alterar-fatura/:id',
        name: 'Faturas',
        component: InvoiceForm,
        props: true
      }
    ]
  }
]

export default routes
