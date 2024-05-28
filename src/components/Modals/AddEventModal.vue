<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500">
      <v-form ref="form" v-model="valid">
        <v-card>
          <v-toolbar color="blue" dark>
            <v-toolbar-title> {{ $root.currentMessages.eventDetails }} </v-toolbar-title>
          </v-toolbar>
          <v-text-field
            :label=$root.currentMessages.title
            :value="field.title"
            class="pt-6 ma-2 mx-lg-auto"
            @input="updateVariable($event)"
            :rules="[v => !!v || $root.currentMessages.itemIsRequired]"
            style="padding-left: 5px;"
            centered
            required
          ></v-text-field>
          <v-row class="pt-6 ma-2 mx-lg-auto">
            <v-menu v-model="menu" :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="field.dates[0]"
                  :label=$root.currentMessages.startDate
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[v => !!v || $root.currentMessages.itemIsRequired]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="field.dates[1]"
                  :label=$root.currentMessages.endDate
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[v => !!v || $root.currentMessages.itemIsRequired]"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="field.dates"
                :locale=$root.currentMessages.dateFormat
                :first-day-of-week="1"
                @input="onChangeDate"
                color="blue"
                range
              >
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="menu = false"
                  text
                >
                  OK
                </v-btn>
              </v-date-picker>
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
            {{ $root.currentMessages.create }}
          </v-btn>
          <v-btn
            depressed
            color="primary"
            @click="updateEvent"
            v-if="!field.newEvent"
            :disabled="!valid"
          >
            {{ $root.currentMessages.update }}
          </v-btn>
          <v-btn
            color="error"
            @click="removeEvent"
            v-if="!field.newEvent"
          >
            {{ $root.currentMessages.delete }}
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import { Timestamp } from "firebase/firestore";
  import { getSelectedParticipant } from "../../models/participants.js";
  import { createEvent, removeEvent, updateEvent } from "../../models/events.js"


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
        createEvent(participant, eventData);
        this.show = false;
      },
      async removeEvent(){
          const participant = getSelectedParticipant().title;
          removeEvent(participant, this.field.id);
          this.show = false;
      },
      async updateEvent(){
        const participant = getSelectedParticipant().title;
        var updateData = {};
        updateData[this.field.id] = {
          title: this.field.title,
          startDate: Timestamp.fromDate(new Date(this.field.dates[0])),
          endDate: this.field.dates[1] ? Timestamp.fromDate(new Date(this.field.dates[1])) : null,
        };
        updateEvent(participant, updateData);
        this.show = false;
      },
      updateVariable(value){
        this.field.title = value;
      },
      onChangeDate(){
        this.field.dates.sort();
      }
    }
  }
</script>
