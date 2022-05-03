<template>
  <v-app>
    <v-main>
      <BarItem/>
      <v-row
        class="pa-6 ma-2 mx-lg-auto"
        align="center"
        justify="space-around"
      >
        <CalendarItem/>
        <ParticipantEvenement/>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import CalendarItem from './components/CalendarItem';
import BarItem from './components/BarItem';
import ParticipantEvenement from './components/ParticipantEvenement';

export default {
  name: 'App',

  components: {
    CalendarItem,
    BarItem,
    ParticipantEvenement,
  },

  data: () => ({
    //
  }),
};
</script>
