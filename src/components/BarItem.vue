<template>
  <v-row
    class="pa-6 ma-2 mx-lg-auto"
    align="center"
    justify="space-around"
  >
  <div>
    <div class="font-weight-bold font-weight-medium">E D I T H </div>
    <div class="font-weight-bold font-weight-medium">   C A L E N D A R </div>
  </div>
    <v-btn
      icon
      color="indigo"
      @click="showMyCalendars = true"
    >
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="showImportCalendar = true"
    >
      <v-icon>mdi-import</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="showNewCalendarDialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="showShareCalendar = true"
    >
      <v-icon>mdi-share</v-icon>
    </v-btn>
    <NewCalendarDialog
      v-model="showNewCalendarDialog"
    > </NewCalendarDialog>
    <ShareCalendarDialog
      v-model="showShareCalendar"
    > </ShareCalendarDialog>
    <ImportCalendarDialog
      v-model="showImportCalendar"
    > </ImportCalendarDialog>
  </v-row>
</template>

<script type="text/javascript">

  import NewCalendarDialog from './dialogs/NewCalendarDialog';
  import ShareCalendarDialog from './dialogs/ShareCalendarDialog';
  import ImportCalendarDialog from './dialogs/ImportCalendarDialog';

  export default {
    components: {
      NewCalendarDialog,
      ShareCalendarDialog,
      ImportCalendarDialog,
    },
    data: () => ({
      showNewCalendarDialog: false,
      showMyCalendars: false,
      showShareCalendar: false,
      showImportCalendar: false,
    })
  };

</script>
