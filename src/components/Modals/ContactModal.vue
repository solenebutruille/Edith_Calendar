<template>
  <v-dialog v-model="show" width="500">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Contact Information</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Name:</v-list-item-title>
              <v-list-item-subtitle>Jean-Filou</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Email:</v-list-item-title>
              <v-list-item-subtitle>Jean.Filou@edithcalendar.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Phone:</v-list-item-title>
              <v-list-item-subtitle>+33 7 50 98 05 88</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text class="pa-6 text-center">
          For any inquiries, assistance or suggestions, please feel free to contact us.
          We appreciate your feedback!
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn text color="primary" @click="show = false">
            Close
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
