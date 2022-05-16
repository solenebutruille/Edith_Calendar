<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>
        <v-toolbar
          color="blue"
          dark
        >
        <div style="font-size: 20px;">
            Share Calendar
        </div>
        <v-divider></v-divider>
        <v-btn
          icon
          color="black"
          @click="copyURLToClipboard"
        >
          <v-icon>mdi-clipboard</v-icon>
        </v-btn>
        </v-toolbar>
        <v-text-field
            :value="url"
            class="pt-6 ma-2 mx-lg-auto"
            :rules="[v => !!v || 'Item is required']"
            centered
        ></v-text-field>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Text copy to clipboard
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  import { db } from "../../main.js";
  import { doc, setDoc } from "firebase/firestore";

  export default {
    methods: {
      async createCalendar () {
        const idEvent = btoa(Date.now());
        await setDoc(doc(db, idEvent, "calendarInfo"), {
          name: this.calendarName
        });
        this.calendarName = "";
        window.location.href = "http://localhost:8080/?idCalendar="+idEvent;
      }, updateCalendarName(value){
         this.calendarName = value;
      }, copyURLToClipboard(){
        this.snackbar = true;
        navigator.clipboard.writeText(this.url);
      }
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
        snackbar: false,
        calendarName: "",
        url: window.location.href,
      }
    }
  }
</script>
