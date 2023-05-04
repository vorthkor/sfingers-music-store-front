<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/transactions.svg"
      />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Sfingers Music Store</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-card
          class="mx-auto"
          max-width="auto"
          >
            <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="items"
            :search="search"
            item-value="name"
            class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title class="mx-1 text-no-wrap" ><div style="width: 1rem;">Transactions</div></v-toolbar-title>
                  <v-divider
                  class="mx-0"
                  inset
                  vertical
                  ></v-divider>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-divider
                  inset
                  vertical
                  ></v-divider>

                  <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="props"
                      >
                        <div class="text-no-wrap" style="width: 8rem;">New Transaction</div>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.productID"
                                label="ProductID"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.clientID"
                                label="ClientID"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.quantity"
                                label="Quantity"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue-darken-1"
                          variant="text"
                          @click="close"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue-darken-1"
                          variant="text"
                          @click="save"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">

        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
  import Api from "@/api/transactions.js"
  export default {
    data: () => ({
      dialog: false,
      itemsPerPage: 10,
      search: '',
      searched: [],
      items: [],
      results: [],
      headers: [
        {
          title: 'Id',
          align: 'start',
          sortable: false,
          key: 'id'
        },
        {title: 'Price', value: 'price'},
        {title: 'ClientID', value: 'clientID'},
        {title: 'ProductID', value: 'productID'},
        {title: 'Product Name', value: 'productName'},
        {title: 'Quantity', value: 'quantity'},
        {title: 'Created At', value: 'createdAt'},
      ],
    //   "id": "64385699843f8e6f81626d50",
    // "price": "958",
    // "clientID": "642cbb1135a85ab979be9e77",
    // "productID": "6420c3208a60435f847b5e18",
    // "productName": "Violão",
    // "quantity": "2",
    // "createdAt": "2023-04-13T19:23:05.123Z"
      selectedId: null,
      editedIndex: -1,
      editedItem: {
        clientID: '',
        productID: '',
        quantity: '',
      },
      defaultItem: {
        clientID: '',
        productID: '',
        quantity: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Transaction' : 'Edit Transaction'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created() {
      this.getServerData()
    },
    methods: {
      getServerData() {
        Api.getTransactions(
          (body) => {
            this.items = body
          }
        ),
        () => {
          this.showErrorMessage = true
          this.message = 'Failed to get transactions'
        }
      },

      close () {
        this.dialog = false
        this.getServerData()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.getServerData()
      },

      save () {
        if (this.editedIndex === -1) {
          Api.insertTransaction(
            this.editedItem
          ),
          () => {
            this.showErrorMessage = true
            this.message = 'Failed to insert'
          }
        } else {
          this.message = 'Failed to insert'
        }
        this.close()
      },
      
    },
  }
</script>
