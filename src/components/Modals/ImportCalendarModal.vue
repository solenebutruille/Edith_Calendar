<template>
  <v-dialog v-model="show" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>{{ $root.currentMessages.loadCalendar }}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-6 text-center">
          {{ $root.currentMessages.importCalendarText }}
        </v-card-text>
        <v-text-field :label=$root.currentMessages.calendarID :placeholder=calendarPlaceholder filled :value="calendarLink"
          class="pt-6 ma-2 mx-lg-auto" @input="calendarLink = $event; resetValidators();;" :rules="[rules.required, rules.validId, rules.validURL, rules.invalidOrgin, rules.emptyID]"
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

  const Validators = {
      InvalidID: 'InvalidID',
      InvalidURL: 'InvalidURL',
      EmptyID: 'EmptyID',
      InvalidOrgin: 'InvalidOrgin'
  };

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
      const currentOrigineURL = window.location.origin;
      const calendarPlaceholder = `${currentOrigineURL}/?idCalendar=4d1jwkALDdj9Y_fRcF`;
      return {
        valid: true,
        calendarLink: "",
        invalidID: false,
        invalidURL: false,
        invalidOrgin: false,
        emptyID: false,
        calendarPlaceholder: calendarPlaceholder,
        rules: {
            required: value => !!value || this.$root.currentMessages.itemIsRequired,
            validId: () => !this.invalidID || this.$root.currentMessages.invalidID,
            validURL: () => !this.invalidURL ||  this.$root.currentMessages.invalidURL,
            invalidOrgin: () => !this.invalidOrgin || this.$root.currentMessages.urlMustBeFromApp,
            emptyID: () => !this.emptyID ||  this.$root.currentMessages.calendarIDNotEmpty,
        }
      }
    },
    methods: {
      async loadCalendar() {
        if(!this.calendarLink){
          this.$refs.form.validate();
          return;
        }
        let parsedURL;
        try {
          parsedURL = new URL(this.calendarLink);
        } catch (_) {
          this.setValidatorTrue(Validators.InvalidURL);
          return;
        }
        if(!(parsedURL.origin === window.location.origin)){
          this.setValidatorTrue(Validators.InvalidOrgin);
          return;
        }
        const urlParams = new URLSearchParams(parsedURL.search);
        let idCalendar = urlParams.get('idCalendar');
        if(!idCalendar){
          this.setValidatorTrue(Validators.EmptyID);
          return;
        }
        if(await isCalendarIdValid(idCalendar)){
          window.location.href = this.calendarLink;
        } else {
          this.setValidatorTrue(Validators.InvalidID);
        }
      },
      setValidatorTrue(validator){
        switch(validator) {
          case Validators.InvalidID:
            this.invalidID = true;
            break;
          case Validators.InvalidURL:
            this.invalidURL = true;
            break;
          case Validators.EmptyID:
            this.emptyID = true;
            break;
          case Validators.InvalidOrgin:
            this.invalidOrgin = true;
            break;
        }
        this.$refs.form.validate();
      },
      resetValidators(){
        this.invalidID = false;
        this.invalidURL = false;
        this.invalidOrgin = false;
        this.emptyID = false;
      }
    }
  }
</script>
