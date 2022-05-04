<template>
  <v-app v-resize="onResize">
    <v-main>
      <BarItem/>
  <!--    <ParticipantEvenementMobile v-if="windowSize.width <= 550"/> -->
      <v-row
        align="center"
        justify="space-around"
      >
        <CalendarItem/>
  <!--      <ParticipantEvenement v-if="windowSize.width > 550"/> -->
  <ParticipantEvenement />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import CalendarItem from './components/CalendarItem';
import BarItem from './components/BarItem';
import ParticipantEvenement from './components/ParticipantEvenement';
//import ParticipantEvenementMobile from './components/ParticipantEvenementMobile';
import { loadEvents } from "./components/CalendarItem"

export default {
  name: 'App',

  components: {
    CalendarItem,
    BarItem,
    ParticipantEvenement,
  },

  methods: {
    onResize() {
      this.windowSize = { width: window.innerWidth, height: window.innerHeight };
      loadEvents();
    },
  },

  mounted() {
    this.onResize();
  },

  data: () => ({
    windowSize: {
      width: 0,
      height: 0,
    },
  }),
};
</script>
