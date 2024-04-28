import { db, getIdCalendar, participants, setSelectedParticipant, colors, rnd } from "../main.js";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { loadEvents } from "../components/CalendarItem"

const idCalendar = getIdCalendar();

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
      var colorsParticipants = colors.slice();
      const querySnapshot = await getDocs(collection(db, idCalendar));
      querySnapshot.forEach((item) => {
        if(colorsParticipants.length == 0) colorsParticipants = colors.slice();
        if(item.id !== "calendarInfo"){
          participants.push({
            title: item.id,
            color: colorsParticipants.splice(rnd(0, colorsParticipants.length - 1), 1)[0],
          });
        }
      });
      setSelectedParticipant(participants[0]);
      loadEvents();
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
