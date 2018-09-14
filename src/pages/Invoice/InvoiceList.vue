
<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Lista de Faturas</h4>
            <p class="category">Lista com todas as faturas registradas</p>
          </md-card-header>
          <md-card-content>
            <invoice-table table-header-color="green"></invoice-table>
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" to="/cadastrar-fatura">Nova Fatura</md-button>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import InvoiceTable from './InvoiceTable.vue'

export default{
  components: {
    InvoiceTable
  }
}
</script>
