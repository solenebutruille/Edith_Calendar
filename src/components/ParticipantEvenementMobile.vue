<template fluid>
  <v-card
    class="mx-auto"
  >
    <v-list>
      <v-list-group
        prepend-icon="mdi-account-circle"
        no-action
        v-model="listOpen"
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
              <v-list-item :key="item.title"  @click="listOpen = false">
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
          <v-hover
            v-slot="{ hover }"
          >
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="grey darken-1"> mdi-circle </v-icon>
            </v-list-item-icon>
              <v-text-field
                  single-line
                  placeholder="New Participant Name"
                  @input="updateName($event)"
                  :value="addingName"
              ></v-text-field>
              <v-btn
                icon
                color="green"
                v-show="hover"
                 @click="addParticipant"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
          </v-list-item>
          </v-hover>
        </v-list-item-group>

      </v-list>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>


    import { db, getIdCalendar, participants, setSelectedParticipant } from "../main.js";
    import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
    import { loadEvents } from "../components/CalendarItem"

    const idCalendar = getIdCalendar();
    const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];

    export default {
      methods: {
        async addParticipant () {
          if(!this.addingName) return;
          await setDoc(doc(collection(db, idCalendar), this.addingName), {
            name: this.addingName,
          });
          this.addingName = "";
          this.loadParticipants(idCalendar);
          loadEvents();
        },
        async removeParticipant(participant) {
          await deleteDoc(doc(collection(db, idCalendar), participant));
          this.loadParticipants(idCalendar);
          loadEvents();
        },
        updateName(value){
           this.addingName = value;
        },
        updateSelectedParticipant(value){
          setSelectedParticipant(participants[value]);
        },
        async loadParticipants(idCalendar){
          participants.splice(0, participants.length);
          const querySnapshot = await getDocs(collection(db, idCalendar));
          querySnapshot.forEach((item) => {
            if(item.id !== "calendarInfo"){
              participants.push({
                title: item.id,
                color: colors[this.rnd(0, colors.length - 1)],
              });
            }
          });
          setSelectedParticipant(participants[0]);
          loadEvents();
        }, rnd (a, b) {
          return Math.floor((b - a + 1) * Math.random()) + a
        },
      },
      data () {
        this.loadParticipants(idCalendar);
        return {
          listOpen: false,
          addingName: "",
          selectedItem: 0,
          items: participants,
        }
      },
    }


</script>
