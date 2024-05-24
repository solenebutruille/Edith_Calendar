import { getDocs, collection, setDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../main.js";
import { getParticipants } from './participants.js'
import { getIdCalendar } from "./calendar.js"

const events = [];
const idCalendar = getIdCalendar();

export function getEvents() {
   return events;
}

export async function createEvent(participant, eventData){
  await setDoc(doc(db, idCalendar, participant), eventData, { merge: true});
  loadEvents();
}

export async function removeEvent(participant, fieldId){
  const participantRef = doc(db, idCalendar, participant);
  var removeData = {};
  removeData[fieldId] =  deleteField();
  await updateDoc(participantRef, removeData);
  loadEvents();
}

export async function updateEvent(participant, updateData){
  const participantRef = doc(db, idCalendar, participant);
  await updateDoc(participantRef, updateData);
  loadEvents();
}

export async function loadEvents () {
  if(!idCalendar) return;
  resetEvents();
  const querySnapshot = await getDocs(collection(db, idCalendar));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const participant = getParticipants().find((part) => part.title == doc.id);
    const color = participant ? participant.color : "";

    for (var prop in data) {
      if(prop.includes("id")){
        var index = events.findIndex(x => x.id==prop);
        index === -1 ?
        events.push({
          name: data[prop].title,
          start: new Date(data[prop].startDate.seconds*1000),
          end: new Date(data[prop].endDate.seconds*1000),
          color: color,
          timed: false,
          id: prop,
          participant: participant,
        }) : events[index].color = color;
      }
    }
  });
}

function resetEvents(){
  events.splice(0, events.length);
}
