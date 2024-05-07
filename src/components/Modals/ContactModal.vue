<template>
  <v-dialog v-model="show" width="500">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>{{ $root.currentMessages.contactInformation }}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ $root.currentMessages.name }}:</v-list-item-title>
              <v-list-item-subtitle>Solene</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ $root.currentMessages.email }}:</v-list-item-title>
              <v-list-item-subtitle>solene.butruille@orange.fr</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ $root.currentMessages.phone }}:</v-list-item-title>
              <v-list-item-subtitle>+33 7 50 98 05 89</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text class="pa-6 text-center">
          {{ $root.currentMessages.contactText }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn text color="primary" @click="show = false">
            {{ $root.currentMessages.close }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script>
      export default {
        props: {
          value: Boolean,
        },
        computed: {
          show: {
            get() { return this.value },
            set (value) { this.$emit ('input', value) }
          }
        }
      }
  </script>
