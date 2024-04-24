
  import { db, getIdCalendar, participants, setSelectedParticipant } from "../main.js";
  import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
  import { loadEvents } from "../components/CalendarItem"

  const idCalendar = getIdCalendar();
  const colors = ['blue', 'indigo', 'yellow', 'green', 'orange', 'grey', "red", 'black'];

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
        var colorsParticipants = colors.slice();
        const querySnapshot = await getDocs(collection(db, idCalendar));
        querySnapshot.forEach((item) => {
          if(colorsParticipants.length == 0) colorsParticipants = colors.slice();
          if(item.id !== "calendarInfo"){
            participants.push({
              title: item.id,
              color: colorsParticipants.splice(this.rnd(0, colorsParticipants.length - 1), 1)[0],
            });
          }
        });
        setSelectedParticipant(participants[0]);
        loadEvents();
      }, rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      }
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
