<template>
  <v-row class="pa-6 ma-2 mx-lg-auto" justify="space-around">
    <div @click="redirectToHomePage" style="cursor: pointer">
      <div class="font-weight-bold font-weight-medium">E D I T H </div>
      <div class="font-weight-bold font-weight-medium">   C A L E N D A R </div>
    </div>
    <v-btn icon color="indigo" @click="showMyCalendarsModal = true">
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
    <v-btn icon color="indigo" @click="showCreateCalendarModal = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn icon color="indigo" @click="shareCalendar">
      <v-icon>mdi-share</v-icon>
    </v-btn>
    <v-btn icon color="indigo" @click="showContactModal = true">
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <CreateCalendarModal v-model="showCreateCalendarModal" />
    <MyCalendarsModal v-model="showMyCalendarsModal" />
    <ContactModal v-model="showContactModal" />
    <ShareCalendarModal v-model="showShareCalendarModal" />
  </v-row>
</template>

<script type="text/javascript">
  import CreateCalendarModal from '@/components/Modals/CreateCalendarModal';
  import MyCalendarsModal from '@/components/Modals/MyCalendarsModal';
  import ContactModal from '@/components/Modals/ContactModal';
  import ShareCalendarModal from '@/components/Modals/ShareCalendarModal';
  import { getIdCalendar } from "@/models/calendar.js";
  import { eventBus } from "@/main.js";

  export default {
    components: {
      CreateCalendarModal,
      MyCalendarsModal,
      ShareCalendarModal,
      ContactModal
    },
    async mounted() {
      if(!getIdCalendar()){
          this.showMyCalendarsModal = true;
      }
    },
    created(){
      eventBus.$on('no-previous-calendars-on-homepage', () => {
        this.showCreateCalendarModal = true;
        this.showMyCalendarsModal = false;
      });
    },
    data: () => ({
      showCreateCalendarModal: false,
      showMyCalendarsModal: false,
      showShareCalendarModal: false,
      showContactModal: false,
    }),
    methods: {
      redirectToHomePage () {
        window.location.href = window.location.origin;
      },
      async shareCalendar(){
        if(navigator.share){
          const shareData = {
            title: "My calendar",
            text: "Share my calendar",
            url: window.location.href,
          };
          await navigator.share(shareData);
        } else {
          this.showShareCalendarModal = true;
        }
      }
    }
  };

</script>
