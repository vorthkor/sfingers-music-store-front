<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/clients.svg"
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
                  <v-toolbar-title>Clients</v-toolbar-title>
                  <v-divider
                  class="mx-4"
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
                  class="mx-4"
                  inset
                  vertical
                  ></v-divider>
                  <v-btn
                    append-icon="mdi-refresh"
                    single-line
                    @click="getServerData"
                  ></v-btn>
                  <v-divider
                  class="mx-4"
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
                        class="mb-2"
                        v-bind="props"
                      >
                        New Client
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
                                v-model="editedItem.name"
                                label="Name"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.email"
                                label="Email"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.address"
                                label="Address"
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

                  <v-dialog v-model="dialogErrors" max-width="max-width">
                    <v-card>
                      <v-card-title class="text-h5">{{message}}</v-card-title>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5">Are you sure you want to delete this client?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon
                  size="small"
                  class="me-2"
                  @click="editItem(item.raw)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  size="small"
                  @click="deleteItem(item.raw)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn
                  color="primary"
                  @click="getServerData"
                >
                  Reset
                </v-btn>
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
  import Api from "@/api/clients.js"
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      dialogErrors: false,
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
        {title: 'Name', value: 'name'},
        {title: 'Email', value: 'email'},
        {title: 'Address', value: 'address'},
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      selectedId: null,
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        address: '',
      },
      defaultItem: {
        name: '',
        email: '',
        address: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created() {
      this.getServerData()
    },
    methods: {
      getServerData() {
        Api.getClients(
          (body) => {
            for (let clients of Object.keys(body)) {
              var client = body[clients]
              this.items = client
            }
          },
          (error) => {
            this.dialogErrors = true
            this.message = error.response.data.errorMessage
          }
        )
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.selectedId = this.editedItem['id']
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        Api.deleteClient(
          this.selectedId
        ),
        () => {
          this.showErrorMessage = true
          this.message = 'Failed to delete'
        }
        this.closeDelete()
      },

      close () {
        this.getServerData()
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.getServerData()
      },

      closeDelete () {
        this.getServerData()
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.getServerData()
      },

      save () {
        if (this.editedIndex > -1) {
          Api.updateClient(
            this.editedItem,
            () => {
            },
            (error) => {
              this.dialogAdmins = false
              this.dialogErrors = true
              this.message = error.response.data.errorMessage
            }
          )
        } else {
          Api.insertClient(
            this.editedItem,
            () => {
            },
            (error) => {
              this.dialogAdmins = false
              this.dialogErrors = true
              this.message = error.response.data.errorMessage
            }
          )
        }
        this.close()
      },
      
    },
  }
</script>
