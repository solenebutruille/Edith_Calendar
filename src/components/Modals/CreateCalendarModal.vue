<template>
  <v-dialog v-model="show" width="500">
    <v-form ref="form">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>{{ $root.currentMessages.createNewCalendar}}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-text-field :label=$root.currentMessages.newCalendarName placeholder="Londres 2024" filled :value="newCalendarName"
          class="pt-6 ma-2 mx-lg-auto" @input="newCalendarName = $event" :rules="[v => !!v || $root.currentMessages.itemIsRequired]"
          centered required></v-text-field>
        <v-spacer></v-spacer>
        <v-list-item-group color="primary">
          <v-list-item>
            {{ $root.currentMessages.participants }}
          </v-list-item>
          <template v-for=" (item, index) in items">
            <v-list-item :key="item">
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
          <v-list-item>
          <v-text-field single-line :placeholder=$root.currentMessages.newParticipantName @input="newParticipantName = $event"
            :value="newParticipantName" :rules=rules></v-text-field>
            <v-btn icon color="green" @click="addParticipant">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="show = false">
            {{ $root.currentMessages.cancel }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="createCalendar">
            {{ $root.currentMessages.create }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  import { createCalendar } from "../../models/calendar.js";

  const participants = [];

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
        newCalendarName: "",
        newParticipantName: "",
        items: participants,
        checkEmptyList: true,
        rules: [v => !!v || this.$root.currentMessages.itemIsRequired,
                () => (this.items.length > 0 || this.checkEmptyList) || this.$root.currentMessages.atLeastOneParticipant]
      }
    },
    methods: {
      createCalendar() {
        this.checkEmptyList = false;
        if(!this.newCalendarName || this.items.length === 0){
          this.$refs.form.validate();
          return;
        }
        createCalendar(this.newCalendarName, participants);
        this.show = false;
        this.newCalendarName = "";
      },
      addParticipant() {
        if(!this.newParticipantName){
          this.$refs.form.validate();
          return;
        }
        participants.push(this.newParticipantName);
        this.newParticipantName = "";
        this.rules = [];
      }
    }
}
</script>
