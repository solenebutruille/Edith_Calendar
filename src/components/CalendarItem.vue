<template>
  <v-row>
    <v-col>
      <v-sheet>
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
            <small style="font-size: 15px;">{{ $refs.calendar.title }}</small>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div class="font-weight-bold font-weight-medium" style="font-size: 20px;">
            {{ calendarName }}
          </div>
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
          :weekdays="weekdays"
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
  import { getDocs, collection } from "firebase/firestore";
  import { db, getIdCalendar, participants, selectedParticipant } from "../main.js";

  const idCalendar = getIdCalendar();
  const events = [];

  export async function loadEvents () {

    events.splice(0, events.length);
    const querySnapshot = await getDocs(collection(db, idCalendar));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const participant = participants.find((part) => part.title == doc.id);
      const color = participant ? participant.color : "";

      for (var prop in data) {
        if(prop.includes("id")){
          var index = events.findIndex(x => x.id==prop);
          index === -1 ?
          events.push({
            name: data[prop].title,
            start: new Date(data[prop].startDate.seconds*1000),
            end: new Date(data[prop].endDate.seconds*1000),
            color: color,
            timed: false,
            id: prop,
            participant: participant,
          }) : events[index].color = color;
        }
      }
    });
  }

  export default {
    data() {
      this.getCalendarName(idCalendar);
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
          weekdays: "1,2,3,4,5,6,0",
          calendarName: "",
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
        if ( ! this.verifyParticipant(null, selectedParticipant, true)) return;
        this.modalData.dates = [date];
        this.modalData.startDate = date;
        this.modalData.endDate = null;
        this.modalData.title = "";
        this.modalData.newEvent = true;
        this.modalData.color = selectedParticipant.color;
        this.modalData.participant = selectedParticipant.title;
        this.showModalEvent = true;
      },
      showEvent ({ event }) {
        if ( ! this.verifyParticipant(event.participant, selectedParticipant, false))
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
      },
      async getCalendarName(idCalendar){
          const querySnapshot = await getDocs(collection(db, idCalendar));
          querySnapshot.forEach((doc) => {
            if(doc.id === "calendarInfo"){
              const data = doc.data();
              this.calendarName = data.name;
            }
          });
      }
    },
  }
</script>
