<template>
  <v-row>
    <v-col>
      <v-sheet>
        <v-toolbar flat >
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            <small style="font-size: 15px;">{{ $refs.calendar.title }}</small>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <template>
            <v-btn icon color="indigo" @click="toggleView">
              <v-icon small v-if="type === 'month'"> mdi-magnify </v-icon>
              <v-icon small v-else> mdi-arrow-expand-all </v-icon>
            </v-btn>
          </template>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :locale=$root.currentMessages.dateFormat
          :weekdays="weekdays"
          :interval-count="0"
          @click:event="showEvent"
          @click:date="addEvent"
          @click:more="viewDay"
        ></v-calendar>
      </v-sheet>
      <AddEventModal
        v-model="showModalEvent"
        :fields="modalData"
     > </AddEventModal>
     <WrongParticipantSelectedModal
       v-model="showModalWrongParticipant"
       :fields="modalWrongParticipant"
    > </WrongParticipantSelectedModal>
    </v-col>
  </v-row>
</template>

<script>
  import AddEventModal from './Modals/AddEventModal';
  import WrongParticipantSelectedModal from './Modals/WrongParticipantSelectedModal';
  import { getSelectedParticipant } from "../models/participants.js";
  import { getEvents } from '../models/events.js'

  export default {
    data() {
      return {
          modalData: {
            dates: [new Date()],
            newEvent: false,
            title: "",
            id: null,
            color: null,
            participant: "",
            startDate: new Date(),
            endDate: null,
          },
          modalWrongParticipant: {
            errorMessage: "",
          },
          showModalEvent: false,
          showModalWrongParticipant: false,
          focus: '',
          type: 'month',
          selectedEvent: {},
          selectedElement: null,
          selectedOpen: false,
          eventMore: false,
          events:  getEvents(),
          weekdays: "1,2,3,4,5,6,0",
      }
    },
    components: {
      AddEventModal,
      WrongParticipantSelectedModal,
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay({ date }){
        this.focus = date;
        this.type = 'week';
      },
      toggleView(){
        this.type = (this.type === 'week') ? 'month' : 'week';
      },
      getEventColor (event) {
        return event.color
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      addEvent({ date }){
        var selectedParticipant = getSelectedParticipant();
        if ( ! this.verifyParticipant(null, selectedParticipant, true)) return;
        this.modalData.dates = [date];
        this.modalData.startDate = date;
        this.modalData.endDate = null;
        this.modalData.title = selectedParticipant.title;
        this.modalData.newEvent = true;
        this.modalData.color = selectedParticipant.color;
        this.modalData.participant = selectedParticipant.title;
        this.showModalEvent = true;
      },
      showEvent ({ event }) {
        if ( ! this.verifyParticipant(event.participant, getSelectedParticipant(), false))
          return;
        const isoStartDate = event.start.toISOString();
        const isoEndDate = event.end.toISOString();
        this.modalData.dates = [isoStartDate.substring(0, isoStartDate.indexOf("T")),isoEndDate.substring(0, isoEndDate.indexOf("T"))];
        this.modalData.title = event.name;
        this.modalData.newEvent = false;
        this.modalData.id = event.id;
        this.showModalEvent = true;
        this.modalData.color = event.color;
        this.modalData.participant = event.participant;
      },
      verifyParticipant(targetParticipant, currentParticipant, addition){
        if(addition){
          if(!currentParticipant || !currentParticipant.title) {
            this.modalWrongParticipant.errorMessage = "Selected participant is not valid to create event.";
            this.showModalWrongParticipant = true;
            return false;
          }
          else return true;
        }
        if (!targetParticipant || !currentParticipant || targetParticipant.title !== currentParticipant.title) {
          this.modalWrongParticipant.errorMessage = "To edit the event, " + targetParticipant.title + " must be selected.";
          this.showModalWrongParticipant = true;
          return false;
        } else return true;
      }
    },
  }
</script>

<style>
  .v-calendar-daily__head {
    height: 599px;
  }

  .v-calendar-daily__intervals-head {
    width: 0px !important;
  }
</style>
