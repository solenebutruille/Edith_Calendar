<template>
  <v-app v-resize="onResize">
    <v-main>
      <HomeScreen v-if="!idCalendar"/>
      <BarItem v-if="idCalendar"/>
      <v-lazy v-model="isActive" >
        <ParticipantEvenementMobile v-if="windowSize.width <= 650 && idCalendar"/>
      </v-lazy>
      <v-row
        class="pa-0 ml-1 mr-1"
        align="center"
      >
        <CalendarItem v-if="idCalendar"/>
        <v-lazy v-model="isActive" >
          <ParticipantEvenement v-if="windowSize.width > 650 && idCalendar"/>
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
import { getIdCalendar } from "./main.js";
import HomeScreen from './components/HomeScreen';

const idCalendar = getIdCalendar();

export default {
  name: 'App',
  components: {
    CalendarItem,
    BarItem,
    ParticipantEvenement,
    ParticipantEvenementMobile,
    HomeScreen,
  },
  methods: {
    onResize() {
      this.windowSize = { width: window.innerWidth, height: window.innerHeight };
    },
  },
  mounted() {
    this.onResize();
  },
  data: () => ({
    isActive: false,
    windowSize: {
      width: 0,
      height: 0,
    },
    idCalendar: idCalendar,
  }),
};

</script>
