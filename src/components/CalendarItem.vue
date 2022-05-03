<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat >
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
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
          @click:event="showEvent"
          @click:date="addEvent"
        ></v-calendar>
      </v-sheet>
      <ModalAddEvent
        v-model="showModalEvent"
        :fields="modalData"
     > </ModalAddEvent>
     <ModalWrongParticipant
       v-model="showModalWrongParticipant"
       :fields="modalWrongParticipant"
    > </ModalWrongParticipant>
    </v-col>
  </v-row>
</template>

<script>
  import ModalAddEvent from './ModalAddEvent';
  import ModalWrongParticipant from './ModalWrongParticipant';
  import { db, getIdCalendar } from "../main.js";
  import { getDocs, collection } from "firebase/firestore";
  import { getParticipants, getSelectedParticipant } from "./ParticipantEvenement";

  const idCalendar = getIdCalendar();
  const events = [];

  export async function loadEvents () {

    events.splice(0, events.length);
    const participants = await getParticipants();
    const querySnapshot = await getDocs(collection(db, idCalendar));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const participant = participants.find((part) => part.title == doc.id);
      const color = participant.color;

      for (var prop in data) {
        if(prop.includes("id")){
          events.push({
            name: data[prop].title,
            start: new Date(data[prop].startDate.seconds*1000),
            end: new Date(data[prop].endDate.seconds*1000),
            color: color,
            timed: false,
            id: prop,
            participant: participant,
          });
        }
      }
    });
  }

  export default {
    data() {
      loadEvents();
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
          events: events,
      }
    },
    components: {
      ModalAddEvent,
      ModalWrongParticipant,
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
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
        const participant = getSelectedParticipant();

        this.modalData.dates = [date];
        this.modalData.startDate = date;
        this.modalData.endDate = null;
        this.modalData.title = "";
        this.modalData.newEvent = true;
        this.modalData.color = participant.color;
        this.modalData.participant = participant.title;
        this.showModalEvent = true;
      },
      showEvent ({ event }) {
        const participant = getSelectedParticipant();
        if ( ! this.verifyParticipant(event.participant.title, participant.title))
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
      verifyParticipant(targetParticipant, currentParticipant){
        if (targetParticipant !== currentParticipant) {
          this.modalWrongParticipant.errorMessage = "To edit the event, " + targetParticipant + " must be selected, not " + currentParticipant;
          this.showModalWrongParticipant = true;
          return false;
        } else return true;
      },
    },
  }
</script>
