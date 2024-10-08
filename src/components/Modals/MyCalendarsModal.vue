<template>
  <v-dialog v-model="show" width="500" :persistent="isPersistent()">
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>{{ $root.currentMessages.myCalendars }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-2"
            fab
            small
            dark
            color="indigo"
            @click.stop="showImportCalendarModal = true"
          >
            <v-icon dark> mdi-import </v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-item-group color="primary" @change="changeCalendar($event)">
            <template v-for="(item, index) in items">
                <v-list-item :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-btn icon color="red" @click="removeCalendar($event, item.id)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-list-item>
              <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <v-card-text class="pa-6 text-center" v-if="items.length === 0">
          {{ $root.currentMessages.emptyCalendarsText }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn text color="primary" @click="show = false" v-if="!isPersistent()">
            {{ $root.currentMessages.close }}
          </v-btn>
          <v-btn text color="primary" @click="showCreateCalendarModal = true" v-if="items.length === 0">
            {{ $root.currentMessages.createNewCalendar }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="showSnackBar" timeout="3000" bottom>
        {{ $root.currentMessages.invalidCalendarDeleteMessage }}
      </v-snackbar>
      <ImportCalendarModal v-model="showImportCalendarModal" />
      <CreateCalendarModal v-model="showCreateCalendarModal" />
  </v-dialog>
</template>
<script>
  import { isCalendarIdValid, getIdCalendar } from "@/models/calendar.js";
  import { executeActionIndexedDB, ActionEnum } from "@/models/indexedDB.js";
  import { eventBus } from "@/main.js";
  import ImportCalendarModal from '@/components/Modals/ImportCalendarModal';
  import CreateCalendarModal from '@/components/Modals/CreateCalendarModal';

  export default {
    components: {
      ImportCalendarModal,
      CreateCalendarModal
    },
    props: {
      value: Boolean,
    },
    computed: {
      show: {
        get() { return this.value },
        set (value) { this.$emit ('input', value) }
      }
    },
    created(){
      eventBus.$on('added-new-calendar-in-indexedDB', async () => {
        this.items = await executeActionIndexedDB(ActionEnum.GET_ALL, "");
      });
    },
    async mounted() {
      this.items = await executeActionIndexedDB(ActionEnum.GET_ALL, "");
    },
    data() {
      return {
        items: [],
        showSnackBar: false,
        showImportCalendarModal: false,
        showCreateCalendarModal: false
      }
    },
    methods: {
      async changeCalendar(selectedCalendar) {
        let calendarIdentifier = this.items[selectedCalendar].id;
        const currentOrigineURL = window.location.origin;
        const url = `${currentOrigineURL}/?idCalendar=${calendarIdentifier}`;
        if(await isCalendarIdValid(calendarIdentifier)){
          window.location.href = url;
        } else {
          this.showSnackBar = true;
          await executeActionIndexedDB(ActionEnum.DELETE, calendarIdentifier);
          this.items = await executeActionIndexedDB(ActionEnum.GET_ALL, "");
        }
      },
      async removeCalendar(event, calendarToDelete){
        event.stopPropagation();
        await executeActionIndexedDB(ActionEnum.DELETE, calendarToDelete);
        this.items = await executeActionIndexedDB(ActionEnum.GET_ALL, "");
      },
      isPersistent(){
        return getIdCalendar() ? false : true;
      }
    }
  }
</script>
