<template>
  <v-row
    class="pa-6 ma-2 mx-lg-auto"
    justify="space-around"
  >
  <div @click="redirectToHomePage" style="cursor: pointer">
    <div class="font-weight-bold font-weight-medium">E D I T H </div>
    <div class="font-weight-bold font-weight-medium">   C A L E N D A R </div>
  </div>
    <v-btn
      icon
      color="indigo"
      @click="showCreateCalendarModal = true"
    >
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="showImportCalendarModal = true"
    >
      <v-icon>mdi-import</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="shareCalendar"
    >
      <v-icon>mdi-share</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="showContactModal = true"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <CreateCalendarModal v-model="showCreateCalendarModal" />
    <ImportCalendarModal v-model="showImportCalendarModal" />
    <ContactModal v-model="showContactModal" />
    <ShareCalendarModal v-model="showShareCalendarModal" />
  </v-row>
</template>

<script type="text/javascript">
  import CreateCalendarModal from './Modals/CreateCalendarModal';
  import ImportCalendarModal from './Modals/ImportCalendarModal';
  import ContactModal from './Modals/ContactModal';
  import ShareCalendarModal from './Modals/ShareCalendarModal';
  import { getIdCalendar } from "../models/calendar.js"

  export default {
    components: {
      CreateCalendarModal,
      ImportCalendarModal,
      ShareCalendarModal,
      ContactModal
    },
    data: () => ({
      showCreateCalendarModal: getIdCalendar() ? false : true,
      showImportCalendarModal: false,
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
