
  import { db, getIdCalendar, participants, setSelectedParticipant } from "../main.js";
  import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
  import { loadEvents } from "../components/CalendarItem"

  const idCalendar = getIdCalendar();
  const colors = ['red', 'pink', 'purple', 'blue', 'indigo', 'deep-purple',
                  'cyan', 'green', 'orange', 'teal', 'light-blue',
                'green', 'light-green', 'lime', 'yellow', 'amber',
                'deep-orange', 'brown', 'blue-grey'];

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

        var colorsClone = [...colors];
        colorsClone.sort(() => Math.random() - 0.5);

        const querySnapshot = await getDocs(collection(db, idCalendar));
        querySnapshot.forEach((item) => {
          if(item.id !== "calendarInfo"){
            if(!colorsClone.length) colorsClone = [...colors];
            var color =  colorsClone.pop()
            participants.push({
              title: item.id,
              color: color,
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
        addingName: "",
        dialog: false,
        selectedItem: 0,
        items: participants,
      }
    },
  }
