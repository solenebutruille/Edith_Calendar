import { colors, rnd, eventBus } from "@/main.js";
import { getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { loadEvents } from "../models/events.js";
import { getParticipantDoc, getParticipantsCollection, getIdCalendar } from "./calendar.js"

const participants = [];
export var selectedParticipantIndex = undefined;


export function setSelectedParticipant(index) {
  selectedParticipantIndex = index;
  eventBus.$emit('updated-selected-participant');
}

export function getSelectedParticipant() {
  return participants[selectedParticipantIndex];
}

export function getSelectedParticipantIndex() {
  return selectedParticipantIndex;
}

export function getParticipants(){
  return participants;
}

export async function addParticipant(name){
  const participantRef = getParticipantDoc(name);
  await setDoc(participantRef, {
    name: name,
  });
  await loadParticipants();
  const newParticipantIndex = participants.findIndex((part) => part.title === name);
  setSelectedParticipant(newParticipantIndex);
}

export async function deleteParticipant(participant){
  const participantRef = getParticipantDoc(participant);
  await deleteDoc(participantRef);
  loadEvents();
  loadParticipants();
}

export async function loadParticipants(){
  if(!getIdCalendar()) return;
  participants.splice(0, participants.length);
  var colorsParticipants = colors.slice();
  const participantCollection = getParticipantsCollection();
  const querySnapshot = await getDocs(participantCollection);
  querySnapshot.forEach((item) => {
    if(colorsParticipants.length == 0) colorsParticipants = colors.slice();
    if(item.id !== "calendarInfo"){
      participants.push({
        title: item.id,
        color: colorsParticipants.splice(rnd(0, colorsParticipants.length - 1), 1)[0],
      });
    }
  });
  loadEvents();
}
