
  import { db, getIdCalendar } from "../main.js";
  import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
  import { loadEvents } from "../components/CalendarItem"

  const idCalendar = getIdCalendar();
  const participants = [];
  var selectedParticipant = {};
  const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];

  export function getParticipants () { return participants; }
  export function getSelectedParticipant () { return selectedParticipant; }

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
      },
    },
    data () {
      this.getParticipants(idCalendar);
      return {
        addingName: "",
        dialog: false,
        selectedItem: 0,
        items: participants,
      }
    },
  }
