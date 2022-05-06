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
      @click="dialog = true"
    >
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="dialog = true"
    >
      <v-icon>mdi-import</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn
      icon
      color="indigo"
      @click="dialog = true"
    >
      <v-icon>mdi-share</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Sorry ...
        </v-card-title>

          <v-spacer></v-spacer>
        <v-card-text>
          This functionnality is coming soon
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script type="text/javascript">
  export default {
    data: () => ({
      dialog: false,
    })
  };

</script>
