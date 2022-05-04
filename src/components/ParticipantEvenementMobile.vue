<template fluid>
  <v-card
    class="mx-auto"
  >
    <v-list>
      <v-list-group
        :value="openListGroup"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Participants</v-list-item-title>
        </template>
        <v-list>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
            @change="updateSelectedParticipant($event)"
          >
          <template v-for="(item, index) in items">
            <v-hover :key="item.title" v-slot:default="{ hover }">
              <v-list-item :key="item.title" @click="closeOpenListGroup">
                <v-list-item-icon>
                  <v-icon :color="item.color"> mdi-circle </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.title"
                  ></v-list-item-title>
                </v-list-item-content>
                <v-btn
                  icon
                  color="red"
                  v-show="hover"
                   @click="removeParticipant(item.title)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-list-item>
            </v-hover>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
  import { db, getIdCalendar } from "../main.js";
  import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
  import { loadEvents } from "./CalendarItem"

  const idCalendar = getIdCalendar();
  const participants = [];
  var selectedParticipant = {};
  const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];

  export function getParticipantsMobile () { return participants; }
  export function getSelectedParticipantMobile () { return selectedParticipant; }

  export default {
    methods: {
      async addParticipant () {
        await setDoc(doc(collection(db, idCalendar), this.addingName), {
          name: this.addingName,
        });
        this.dialog = false;
        this.addingName = "";
        this.getParticipants(idCalendar);
        loadEvents();
      },
      async removeParticipant(participant) {
        await deleteDoc(doc(collection(db, idCalendar), participant));
        this.getParticipants(idCalendar);
        loadEvents();
      },
      updateName(value){
         this.addingName = value;
      },
      updateSelectedParticipant(value){
        selectedParticipant = participants[value];
      },
      async getParticipants(idCalendar){
        participants.splice(0, participants.length);
        const querySnapshot = await getDocs(collection(db, idCalendar));
        querySnapshot.forEach((item) => {
          participants.push({
            title: item.id,
            color: colors[this.rnd(0, colors.length - 1)],
          });
        });
        selectedParticipant = participants[0];
      }, rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      }, closeOpenListGroup(){
        this.openListGroup = false;
        console.log("ok");
      }
    },
    data () {
      this.getParticipants(idCalendar);
      return {
        addingName: "",
        dialog: false,
        selectedItem: 0,
        items: participants,
        openListGroup: true,
      }
    },
  }
</script>
