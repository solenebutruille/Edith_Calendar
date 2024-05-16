<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent v-if="calendarId">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>{{ $root.currentMessages.clickOnYourName }}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group
            color="primary"
            @change="updateSelectedParticipant($event)"
          >
          <template v-for="(item, index) in items">
              <v-list-item :key="item.title">
                <v-list-item-icon>
                  <v-icon :color="item.color"> mdi-circle </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.title"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
          <v-hover v-slot="{ hover }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="grey darken-1"> mdi-circle </v-icon>
            </v-list-item-icon>
              <v-text-field
                  single-line
                  :placeholder=$root.currentMessages.newParticipantName
                  @input="updateNewParticipantName($event)"
                  :value="newParticipantName"
              ></v-text-field>
              <v-btn
                icon
                color="green"
                v-show="hover"
                @click="addParticipant"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
          </v-list-item>
          </v-hover>
        </v-list-item-group>
      </v-list>
      </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import { getParticipants, addParticipant, setSelectedParticipant } from "../../models/participants.js";
  import { getIdCalendar } from "../../models/calendar.js"

  export default {
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
        valid: true,
        menu: false,
        newParticipantName: "",
        items: getParticipants(),
        calendarId: getIdCalendar()
      }
    },
    methods: {
      updateSelectedParticipant(value){
        if(!value || value === 0) return;
        setSelectedParticipant(value - 1);
        this.show = false;
      },
      async addParticipant () {
        if(!this.newParticipantName) return;
        addParticipant(this.newParticipantName);
        this.newParticipantName = "";
        this.show = false;
      },
      updateNewParticipantName(value){
         this.newParticipantName = value;
      },
    }
  }
</script>
