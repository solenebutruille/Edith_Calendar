import { db, getIdCalendar, colors, rnd } from "../main.js";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { loadEvents } from "../models/events.js";

const idCalendar = getIdCalendar();
const participants = [];
export var selectedParticipantIndex = undefined;


export function setSelectedParticipant(index) {
  selectedParticipantIndex = index;
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
  await setDoc(doc(collection(db, idCalendar), name), {
    name: name,
  });
  await loadParticipants();
  const newParticipantIndex = participants.findIndex((part) => part.title === name);
  setSelectedParticipant(newParticipantIndex);
  await loadParticipants();
}

export async function deleteParticipant(participant){
  await deleteDoc(doc(collection(db, idCalendar), participant));
  loadEvents();
  loadParticipants();
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
  loadEvents();
}
