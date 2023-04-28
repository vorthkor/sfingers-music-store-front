<template>
  
  <div>
    <v-navigation-drawer
    v-model="drawer"
    >
      <v-list>
        <v-list-item
          title="Menu"
          subtitle="Loja de Artigos Musicais"
        >
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
          :lines="false"
          density="compact"
          nav
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            :to="item.to"
            link
            active-color="primary"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Sfingers Music Store</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
    data: () => ({ 
      drawer: null,
      items: [
          { text: 'Products', icon: 'mdi-format-list-bulleted', to:'/'},
          { text: 'Transactions', icon: 'mdi-cash-multiple', to:'/transactions' },
          { text: 'Clients', icon: 'mdi-account-group', to:'/clients' },
      ],
    }),
}
</script>
