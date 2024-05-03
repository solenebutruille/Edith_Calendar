import { loadParticipants, getParticipants, setSelectedParticipant, addParticipant, getSelectedParticipantIndex } from "../models/participants.js";
import { loadEvents } from "../models/events.js"
import ConfirmParticipantDeleteModal from "../components/Modals/ConfirmParticipantDeleteModal";

export default {
  components: {
    ConfirmParticipantDeleteModal
  },
  methods: {
    async addParticipant () {
      addParticipant(this.addingName);
      this.dialog = false;
      this.addingName = "";
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
      this.forceReRender();
    },
    getSelectedParticipantIndex() {
      return getSelectedParticipantIndex();
    },
    forceReRender() {
      this.forceRender += 1;
    }
  },
  data () {
    loadParticipants();
    return {
      forceRender: 0,
      participantToDelete: undefined,
      showModalEvent: false,
      addingName: "",
      dialog: false,
      items: getParticipants(),
    }
  },
}
