<template>
  <v-dialog v-model="show" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>{{ $root.currentMessages.loadCalendar }}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-text-field :label=$root.currentMessages.calendarID placeholder="4d1jwkALDdj9Y_fRcF" filled :value="calendarIdentifier"
          class="pt-6 ma-2 mx-lg-auto" @input="calendarIdentifier = $event; isIdValid = true;" :rules="[rules.required, rules.validId]"
          centered required></v-text-field>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="show = false">
            {{ $root.currentMessages.cancel }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="loadCalendar">
            {{ $root.currentMessages.load }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
  import { isCalendarIdValid } from "../../models/calendar.js"

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
        calendarIdentifier: "",
        isIdValid: true,
        rules: {
            required: value => !!value || 'Item is required',
            validId: () => this.isIdValid || 'ID is invalid',
        }
      }
    },
    methods: {
      async loadCalendar() {
        if(!this.calendarIdentifier){
          this.$refs.form.validate();
          return;
        }
        const currentOrigineURL = window.location.origin;
        const url = `${currentOrigineURL}/?idCalendar=${this.calendarIdentifier}`;
        if(await isCalendarIdValid(this.calendarIdentifier)){
          window.location.href = url;
        } else {
          this.isIdValid = false;
          this.$refs.form.validate();
        }
      }
    }
  }
</script>
