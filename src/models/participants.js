import { db, getIdCalendar, colors, rnd } from "../main.js";
import { collection, getDocs } from "firebase/firestore";
import { loadEvents } from "../models/events.js";

const idCalendar = getIdCalendar();
const participants = [];
var selectedParticipant = {};

export function setSelectedParticipant(item) {
  selectedParticipant = item;
}

export function getSelectedParticipant() {
  return selectedParticipant;
}

export function getParticipants(){
  return participants;
}

export function getParticipantsByIndex(index){
  return participants[index];
}

export async function loadParticipants(){
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
}
