<template>
  <v-app v-resize="onResize">
    <v-main>
      <SelectParticipant
        v-model="showModalSelectParticipant"
     > </SelectParticipant>
      <BarItem/>
      <v-container class="d-flex justify-center" style="margin-bottom:10px;">
        <small style="font-size:20px; font-weight: 700 !important;"> {{ calendarName }} </small>
      </v-container>
      <v-lazy v-model="isActive" >
        <ParticipantEvenementMobile v-if="windowSize.width <= 650"/>
      </v-lazy>
      <v-row
        class="pa-0 ml-1 mr-1"
        align="center"
      >
        <CalendarItem/>
        <v-lazy v-model="isActive" >
          <ParticipantEvenement v-if="windowSize.width > 650"/>
        </v-lazy>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import CalendarItem from './components/CalendarItem';
import BarItem from './components/BarItem';
import ParticipantEvenement from './components/ParticipantEvenement';
import ParticipantEvenementMobile from './components/ParticipantEvenementMobile';
import SelectParticipant from './components/Modals/SelectParticipant';
import { getCalendarName } from './models/calendar.js';

export default {
  name: 'App',
  components: {
    CalendarItem,
    BarItem,
    ParticipantEvenement,
    ParticipantEvenementMobile,
    SelectParticipant,
  },
  methods: {
    onResize() {
      this.windowSize = { width: window.innerWidth, height: window.innerHeight };
    }
  },
  async mounted() {
    this.onResize();
    this.calendarName = await getCalendarName();
  },
  data: () => {
    return {
      showModalSelectParticipant: true,
      calendarName: "",
      isActive: false,
      windowSize: {
        width: 0,
        height: 0,
      },
    }
  },
};

</script>
