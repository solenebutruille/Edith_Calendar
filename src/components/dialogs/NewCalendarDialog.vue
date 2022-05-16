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
            New Calendar
        </div>
        </v-toolbar>
        <v-text-field
            label="Name"
            class="pt-6 ma-2 mx-lg-auto"
            @input="updateCalendarName($event)"
            :rules="[v => !!v || 'Item is required']"
            centered
            required
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="createCalendar"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
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
        calendarName: "",
      }
    }
  }
</script>
