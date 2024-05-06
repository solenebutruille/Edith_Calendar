<template>
  <v-dialog v-model="show" width="500">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Share Calendar</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Calendar URL</v-list-item-subtitle>
              <v-list-item-title>{{ calendarUrl }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="copyToClipboard(calendarUrl)">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Calendar ID</v-list-item-subtitle>
              <v-list-item-title>{{ calendarId }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="copyToClipboard(calendarId)">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn text color="primary" @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="showSnackBar" timeout="2000" bottom>
        Copied to clipboard
      </v-snackbar>
    </v-dialog>
  </template>
  <script>
      import { getIdCalendar } from "../../models/calendar.js"

      export default {
        props: {
          value: Boolean,
        },
        computed: {
          show: {
            get() { return this.value },
            set (value) { this.$emit ('input', value) }
          }
        },
        data() {
          return {
            valid: true,
            calendarUrl: window.location.href,
            calendarId: getIdCalendar(),
            showSnackBar: false
          }
        },
        methods: {
          async copyToClipboard(value){
            await navigator.clipboard.writeText(value);
            this.showSnackBar = true;
          }
        }
      }
  </script>
