
  import { db, getIdCalendar, participants, setSelectedParticipant } from "../main.js";
  import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
  import { loadEvents } from "../components/CalendarItem"

  const idCalendar = getIdCalendar();
  const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];

  export default {
    methods: {
      async addParticipant () {
        await setDoc(doc(collection(db, idCalendar), this.addingName), {
          name: this.addingName,
        });
        this.dialog = false;
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
        addingName: "",
        dialog: false,
        selectedItem: 0,
        items: participants,
      }
    },
  }
