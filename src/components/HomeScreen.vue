<template>
  <v-card
    class="mx-auto"
  >
  <v-row
    class="pa-6 ma-2 mx-lg-auto"
    align="center"
    justify="space-around"
  >
  <div>
    <v-row
      class="pa-6 ma-2 mx-lg-auto"
      align="center"
      justify="space-around"
    >
    <div class="font-weight-bold font-weight-medium" style="font-size: 30px;">E D I T H </div>
    </v-row>
    <v-row
      class="pa-6 ma-2 mx-lg-auto"
      align="center"
      justify="space-around"
    >
    <div class="font-weight-bold font-weight-medium" style="font-size: 30px;">C A L E N D A R </div>
    </v-row>
  </div>
  </v-row>
  <v-row
    class="pa-16 ma-2 mx-lg-auto"
    align="center middle"
    justify="space-around"
  >
    <v-btn
      icon
      large
      color="indigo"
      @click="dialog = true"
    >
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
    <v-btn
      icon
      large
      color="indigo"
      @click="dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn
      icon
      large
      color="indigo"
      @click="dialog = true"
    >
      <v-icon>mdi-import</v-icon>
    </v-btn>
  </v-row>
  </v-card>
</template>

<script type="text/javascript">
  export default {
    data: () => ({
      dialog: false,
    })
  };

</script>
