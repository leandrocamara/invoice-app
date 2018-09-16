
<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <div v-if="!id">
                <h4 class="title">Cadastrar Fatura</h4>
                <p class="category">Cadastre uma nova Fatura</p>
              </div>
              <div v-else>
                <h4 class="title">Alterar Fatura</h4>
              </div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Usuário</label>
                    <md-input v-model="userMock.name" disabled></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Valor</label>
                    <md-input v-model="invoice.value" type="number" data-vv-name="value" v-validate="'required'" required></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-75">
                  <md-field>
                    <label>Nome da Empresa</label>
                    <md-input v-model="invoice.nameCompany" data-vv-name="nameCompany" v-validate="'required'" required></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                  <md-field id="date-maturity">
                    <date-picker
                      v-model="invoice.dateMaturity" placeholder="Data de Vencimento*" data-vv-name="dateMaturity"
                      v-validate="'required'" format="DD/MM/YYYY" :editable="false" lang="pt-br" required>
                    </date-picker>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-switch v-model="invoice.paid" class="md-primary">
                    <label>Fatura Paga?</label>
                  </md-switch>
                </div>
                <div class="md-layout-item md-size-50 text-left">
                  <md-button class="md-raised md-danger" to="/faturas">Voltar</md-button>
                </div>
                <div class="md-layout-item md-size-50 text-right">
                  <md-button v-if="!id" class="md-raised md-success" @click="createInvoice()">Cadastrar</md-button>
                  <md-button v-else class="md-raised md-success" @click="updateInvoice()">Alterar</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'

import http from '@/resources/http'
import notification from '@/resources/notification'

export default {
  name: 'invoice-form',
  components: { DatePicker },
  props: ['id'],
  created () {
    if (this.id) {
      this.getInvoice(this.id)
    }
  },
  data () {
    return {
      userMock: {
        _id: '5b985e52485ecb083c4fc922',
        name: 'Leandro Câmara'
      },
      invoice: {
        paid: false,
        dateMaturity: null
      }
    }
  },
  methods: {
    /**
     * Recupera a fatura de acordo com o ID.
     *
     * @param idInvoice
     */
    getInvoice (idInvoice) {
      http.get('/invoices/' + idInvoice)
        .then(response => {
          this.invoice = response.data
        })
        .catch(error => {
          notification(this, error.response.data.message, 'danger')
        })
    },
    /**
     * Salva uma nova fatura.
     */
    createInvoice () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.getPreparedInvoice()

          http.post('/invoices', this.invoice)
            .then(response => {
              this.$router.push('/faturas')
              notification(this, 'Fatura cadastrada com sucesso!')
            })
            .catch(error => {
              notification(this, error.response.data.message, 'danger')
            })
        } else {
          notification(this, 'Favor preencher os campos obrigatórios!', 'danger')
        }
      })
    },
    /**
     * Altera a fatura de acordo com ID.
     */
    updateInvoice () {
      http.put(`/invoices/${this.invoice._id}`, this.invoice)
        .then(response => {
          this.$router.push('/faturas')
          notification(this, 'Fatura alterada com sucesso!')
        })
        .catch(error => {
          notification(this, error.response.data.message, 'danger')
        })
    },
    /**
     * Prepara os dados da fatura para envio ao Servidor.
     */
    getPreparedInvoice () {
      this.invoice.user = this.userMock
    }

  }
}
</script>

<style>
/* date-maturity */
#date-maturity:before {
  background-color: transparent !important;
}
#date-maturity:after {
  background-color: transparent !important;
}

/* md-invalid */
.md-field.md-theme-default.md-invalid label {
  color: #ff1744 !important;
}
.md-field.md-theme-default.md-invalid:after {
  background-color: #ff1744 !important;
}

/* border-bottom */
.md-field.md-theme-default:before {
  background-color: #43a047 !important;
}

/* md-switch */
.md-switch {
  display: flex;
}
.md-checked .md-switch-thumb {
  background-color: #43a047 !important;
}
.md-checked .md-switch-container {
  background-color: rgba(76, 175, 80, 0.38) !important;
}
</style>
