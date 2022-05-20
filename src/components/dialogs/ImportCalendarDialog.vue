<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
    <v-form
    ref="form"
  >
      <v-card>
        <v-toolbar
          color="blue"
          dark
        >
        <div style="font-size: 20px;">
            Import Calendar
        </div>
        </v-toolbar>
        <v-text-field
            label="Paste calendar link here"
            class="pt-6 ma-2 mx-lg-auto"
            @input="calendarLinkInput($event)"
            :rules="[v => !!v || 'Item is required']"
            centered
            required
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="importCalendar"
          >
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    methods: {
      async importCalendar () {

        let calendarLink = this.calendarLink;
        let paramString = calendarLink.split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let idCalendar = queryString.get("idCalendar");

        if(!idCalendar){
          console.log("display une erreur de idCalendar");
          return;
        }

        let openRequest = indexedDB.open("my_calendars", 1);

        openRequest.onupgradeneeded = function(){
          let db = openRequest.result;
          db.createObjectStore('calendars', {
            keyPath: 'id'
          });
        };
        openRequest.onerror = function() {
          console.log("il faut  display une error");
        };
        openRequest.onsuccess = function(){
          let db = openRequest.result;
          let transaction = db.transaction("calendars", "readwrite");
          let calendars = transaction.objectStore("calendars");
          let calendar = {
            id: idCalendar,
            url: calendarLink
          };
          let request = calendars.add(calendar);
          request.onsuccess = function() {
            window.location.href = calendarLink;
          };
          request.onerror = function(){
            console.log("il faut  display une error", request.error);
            console.log("log une erreur differente si le calendrier yest deja", request.error);
          }
        };
      }, calendarLinkInput(value){
         this.calendarLink = value;
      },
    },
    props:  {
     value: Boolean,
   },
   computed: {
     show: {
       get () { return this.value },
       set (value) { this.$emit('input', value)}
     }
   },
    data () {
      return {
        calendarLink: "",
      }
    }
  }
</script>
