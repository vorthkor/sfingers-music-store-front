<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/logo.svg"
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
                  <v-toolbar-title>Products</v-toolbar-title>
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
                  <v-btn
                    append-icon="mdi-logout"
                    single-line
                    @click="logoutNow"
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
                        New Product
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
                                v-model="editedItem.description"
                                label="Description"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.color"
                                label="Color"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.details"
                                label="Details"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.price"
                                label="Price"
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
                          @click="login"
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

                  <v-dialog v-model="dialogDelete" max-width="900px">
                    <v-card>
                      <v-card-title class="text-h5">Are you sure you want to delete this product?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogLoginOk" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5">Successfully logged in!</v-card-title>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogAdmins" max-width="750px">
                    <v-card>
                      <v-card-title class="text-h5">You need to be an administrator to create a product, please login.</v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="adminItem.username"
                                label="Username"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                            <v-text-field
                              v-model="adminItem.password"
                              label="Password"
                            ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="loginConfirm">Login</v-btn>
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
  import Api from "@/api/products.js"
  import ApiAdm from "@/api/admins.js"


  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      dialogAdmins: false,
      dialogLoginOk: false,
      dialogErrors: false,
      loggedAdmin: false,
      itemsPerPage: 20,
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
        {title: 'Description', value: 'description'},
        {title: 'Color', value: 'color'},
        {title: 'Details', value: 'details'},
        {title: 'Price', value: 'price'},
        {title: 'Quantity', value: 'quantity'},
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      selectedId: null,
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        color: '',
        details: '',
        price: '',
        quantity: '',
      },
      defaultItem: {
        name: '',
        description: '',
        color: '',
        details: '',
        price: '',
        quantity: '',
      },
      adminItem: {
        username: '',
        password: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
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
        Api.getProducts(
          (body) => {
            for (let products of Object.keys(body)) {
              var product = body[products]
              this.items = product
            }
          },
          (error) => {
            this.dialogErrors = true
            this.message = error.response.data.errorMessage
          }
        )
      },

      logoutNow() {
        this.loggedAdmin = false
        this.dialogErrors = true
        this.message = "Logged out"
        this.adminItem.username = ''
        this.adminItem.password = ''
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
        Api.deleteProduct(
          this.selectedId
        ),
        () => {
          this.dialogErrors = true
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

      login() {
        if(!this.loggedAdmin) {
          this.dialogAdmins = true
        } else {
          this.save()
        }
      },

      loginConfirm() {
        ApiAdm.adminLogin(
          this.adminItem,
          (body) => {
            this.dialogLoginOk = true,
            this.dialogAdmins = false
            this.loggedAdmin = true
            this.save()
          },
          (error) => {
            this.dialogErrors = true
            this.message = error.response.data.errorMessage

          }
        )
      },

      save () {
        if (this.editedIndex > -1) {
          Api.updateProduct(
            this.editedItem,
            () => {
              this.dialogAdmins = false
            },
            (error) => {
              this.dialogAdmins = false
              this.dialogErrors = true
              this.message = error.response.data.errorMessage
            }
          )
        } else {
          Api.insertProduct(
            this.editedItem,
            () => {
              this.dialogAdmins = false
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
