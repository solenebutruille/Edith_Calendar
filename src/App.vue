<template>
  <v-app v-resize="onResize">
    <v-main>
      <SelectParticipant
        v-model="showModalSelectParticipant"
     > </SelectParticipant>
      <BarItem/>
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
  mounted() {
    this.onResize();
  },
  data: () => {
    return {
      showModalSelectParticipant: true,
      isActive: false,
      windowSize: {
        width: 0,
        height: 0,
      },
    }
  },
};

</script>
