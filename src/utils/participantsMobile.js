import { loadParticipants, getParticipants, setSelectedParticipant, addParticipant, getSelectedParticipantIndex } from "../models/participants.js";
import { loadEvents } from "../models/events.js";
import ConfirmParticipantDeleteModal from "../components/Modals/ConfirmParticipantDeleteModal";

export default {
  components: {
    ConfirmParticipantDeleteModal
  },
  methods: {
    async addParticipant () {
      if(!this.addingName) return;
      addParticipant(this.addingName);
      this.addingName = "";
      this.listOpen = false;
      loadParticipants();
      loadEvents();
    },
    async removeParticipant(participant) {
      this.showModalEvent = true;
      this.participantToDelete = participant;
    },
    updateName(value){
       this.addingName = value;
    },
    updateSelectedParticipant(value){
      setSelectedParticipant(value);
      this.listOpen = false;
    },
    getSelectedParticipantIndex(){
      return getSelectedParticipantIndex();
    }
  },
  data () {
    loadParticipants();
    return {
      participantToDelete: undefined,
      showModalEvent: false,
      listOpen: false,
      addingName: "",
      items: getParticipants(),
    }
  },
}
