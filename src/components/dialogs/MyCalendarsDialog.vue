<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
    <v-form
    ref="form"
  >
      <v-card>
        <v-toolbar
          color="blue"
          dark
        >
        <div style="font-size: 20px;">
            My Calendars
        </div>
        </v-toolbar>
        <v-list>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
            @change="changeCalendar($event)"
          >
          <template v-for="(calendar, index) in calendars">
            <v-hover :key="calendar.id" v-slot:default="{ hover }">
              <v-list-item :key="calendar.id">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="calendar.title"
                  ></v-list-item-title>
                </v-list-item-content>
                <v-btn
                  icon
                  color="red"
                  v-show="hover"
                   @click="removeCalendar(calendar.id)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-list-item>
            </v-hover>
            <v-divider v-if="index + 1 < calendars.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
          >
            ??
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    methods: {
      changeCalendar (value) {
        let url = this.calendars[value].url;
        if(url) window.location.href = url;
        else console.log("mettre une jolie error");
      }, removeCalendar(value){
        console.log(value);
    /*    let openRequest = indexedDB.open("my_calendars", 1);

        openRequest.onupgradeneeded = function(){
          let db = openRequest.result;
          db.createObjectStore('calendars', {
            keyPath: 'id'
          });
        };
        openRequest.onerror = function() {
          console.log("il faut  display une error");
        };
        openRequest.onsuccess = async function(){
          let db = openRequest.result;
          let transaction = db.transaction("calendars", "readonly");
          let calendarStore = transaction.objectStore("calendars");
          let calendarsList = calendarStore.delte(value);
          calendarsList.onsuccess = function() {
            console.log("item successufully deleted")
          };
          calendarsList.onerror = function() {
            console.log("error deleting item")
          };
        }*/
      },
    },
    props:  {
     value: Boolean,
   },
   computed: {
     show: {
       get () { return this.value },
       set (value) { this.$emit('input', value)}
     }
   },
    data () {
      var calendars = [];
      calendars.push({
        id: "id",
        title: "title",
        url: "url",
      });

      let openRequest = indexedDB.open("my_calendars", 1);

      openRequest.onupgradeneeded = function(){
        let db = openRequest.result;
        db.createObjectStore('calendars', {
          keyPath: 'id'
        });
      };
      openRequest.onerror = function() {
        console.log("il faut  display une error");
      };
      openRequest.onsuccess = async function(){
        let db = openRequest.result;
        let transaction = db.transaction("calendars", "readonly");
        let calendarStore = transaction.objectStore("calendars");
        let calendarsList = calendarStore.getAll();
        calendarsList.onsuccess = function() {
          for (var cal in calendarsList.result){
            calendars.push({
              id: cal.id,
              title: cal.title,
              url: cal.url,
            });
          }
        };
      }
      return {
        calendars: calendars,
        selectedItem: "selectedItem",
      }
    }
  }
</script>
