import { db, getIdCalendar } from "../main.js";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { loadParticipants, getParticipantsByIndex, getParticipants, setSelectedParticipant } from "../models/participants.js";
import { loadEvents } from "../models/events.js"

const idCalendar = getIdCalendar();

export default {
  methods: {
    async addParticipant () {
      await setDoc(doc(collection(db, idCalendar), this.addingName), {
        name: this.addingName,
      });
      this.dialog = false;
      this.addingName = "";
      loadParticipants();
      loadEvents();
    },
    async removeParticipant(participant) {
      await deleteDoc(doc(collection(db, idCalendar), participant));
      loadParticipants(idCalendar);
      loadEvents();
    },
    updateName(value){
       this.addingName = value;
    },
    updateSelectedParticipant(value){
      setSelectedParticipant(getParticipantsByIndex(value));
    }
  },
  data () {
    loadParticipants();
    return {
      addingName: "",
      dialog: false,
      selectedItem: 0,
      items: getParticipants(),
    }
  },
}
