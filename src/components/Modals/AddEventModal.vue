<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
    <v-form
    ref="form"
    v-model="valid"
  >
      <v-card>
        <v-toolbar
          color="blue"
          dark
        >
          <v-text-field
              label="Title"
              :value="field.title"
              class="pt-6 ma-2 mx-lg-auto"
              @input="updateTheVariable($event)"
              :rules="[v => !!v || 'Item is required']"
              centered
              required
          ></v-text-field>
        </v-toolbar>
        <v-row class="pt-6 ma-2 mx-lg-auto">
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="field.dates[0]"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[v => !!v || 'Item is required']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="field.dates[1]"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[v => !!v || 'Item is required']"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="field.dates"
                locale="en-en"
                :first-day-of-week="1"
                @input="onChangeDate"
                color="blue"
                range
              ></v-date-picker>
            </v-menu>
          </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="createEvent"
            v-if="field.newEvent"
            :disabled="!valid"
          >
            Create
          </v-btn>
          <v-btn
            depressed
            color="primary"
            @click="updateEvent"
            v-if="!field.newEvent"
            :disabled="!valid"
          >
            Update
          </v-btn>
          <v-btn
            color="error"
            @click="removeEvent"
            v-if="!field.newEvent"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import { db, getIdCalendar } from "../../main.js";
  import { doc, setDoc, Timestamp, updateDoc, deleteField } from "firebase/firestore";
  import { loadEvents } from "../../models/events.js";
  import { getSelectedParticipant } from "../../models/participants.js";

  const idCalendar = getIdCalendar();

  export default {
    props:  {
     value: Boolean,
     fields: Object,
   },
   computed: {
     show: {
       get () { return this.value },
       set (value) { this.$emit('input', value)}
     }
   },
    data () {
      return {
        valid: true,
        field: this.fields,
        menu: false,
      }
    },
    created() {
      this.$emit("fields", this.field);
    },
    methods: {
      async createEvent () {
        const participant = getSelectedParticipant().title;
        const idEvent = "id" + Date.now();
        var eventData = {};

        eventData[idEvent] = {
          title: this.field.title,
          startDate: Timestamp.fromDate(new Date(this.field.dates[0])),
          endDate: this.field.dates[1] ? Timestamp.fromDate(new Date(this.field.dates[1])) : null,
        };

        await setDoc(doc(db, idCalendar, participant), eventData, { merge: true });
        loadEvents();
        this.show = false;
      },
      async removeEvent(){
          const participant = getSelectedParticipant().title;
          const participantRef = doc(db, idCalendar, participant);
          var removeData = {};
          removeData[this.field.id] = deleteField();
          await updateDoc(participantRef, removeData);
          loadEvents();
          this.show = false;
      },
      async updateEvent(){
        const participant = getSelectedParticipant().title;
        const participantRef = doc(db, idCalendar, participant);
        var updateData = {};
        updateData[this.field.id] = {
          title: this.field.title,
          startDate: Timestamp.fromDate(new Date(this.field.dates[0])),
          endDate: this.field.dates[1] ? Timestamp.fromDate(new Date(this.field.dates[1])) : null,
        };
        await updateDoc(participantRef, updateData);
        loadEvents();
        this.show = false;
      },
      updateTheVariable(value){
         this.field.title = value;
      },
      onChangeDate(){
        this.field.dates.sort();
      }
    }
  }
</script>
