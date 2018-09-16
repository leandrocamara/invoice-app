
<template>
  <div>
    <md-table v-model="invoices" :table-header-color="tableHeaderColor">
      <md-table-row v-if="invoices.length > 0" slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nome da Empresa">{{ item.nameCompany }}</md-table-cell>
        <md-table-cell md-label="Vencimento">{{ item.dateMaturity | moment('DD/MM/YYYY') }}</md-table-cell>
        <md-table-cell md-label="Valor">{{ item.value | currency('R$', '.', '2') }}</md-table-cell>

        <md-table-cell md-label="Status">
          <md-button v-if="item.paid" class="md-just-icon md-simple md-info">
            <md-icon>credit_card</md-icon>
            <md-tooltip md-direction="top">Pago</md-tooltip>
          </md-button>
          <md-button v-else class="md-just-icon md-simple md-danger">
            <md-icon>credit_card</md-icon>
            <md-tooltip md-direction="top">Pendente</md-tooltip>
          </md-button>
        </md-table-cell>

        <md-table-cell md-label="Ação">
          <md-button class="md-just-icon md-simple md-sucess" :to="{ path: `alterar-fatura/${item._id}` }">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Editar</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger" @click="deleteInvoice(item)">
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Excluir</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>

      <div v-if="invoices.length == 0">
        <md-table-cell md-label="Nenhum registro encontrado"></md-table-cell>
      </div>
    </md-table>
  </div>
</template>

<script>
import http from '@/resources/http'
import notification from '@/resources/notification'

export default {
  name: 'invoice-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    }
  },
  created () {
    this.getInvoices()
  },
  data () {
    return {
      invoices: []
    }
  },
  methods: {
    /**
     * Recupera todas as faturas.
     */
    getInvoices () {
      http.get('/invoices')
        .then(response => {
          this.invoices = response.data
        })
        .catch(error => {
          notification(this, error.response.data.message, 'danger')
        })
    },
    /**
     * Remove uma fatura.
     *
     * @param invoice
     */
    deleteInvoice (invoice) {
      http.delete('/invoices/' + invoice._id)
        .then(response => {
          notification(this, 'Fatura removida com sucesso!')
          this.invoices.splice(this.invoices.indexOf(invoice, 1))
        })
        .catch(error => {
          notification(this, error.response.data.message, 'danger')
        })
    }
  }
}
</script>
