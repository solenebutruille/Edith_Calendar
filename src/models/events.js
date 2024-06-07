import { getDocs, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { getParticipants } from './participants.js'
import { getParticipantDoc, getParticipantsCollection, getIdCalendar } from "./calendar.js"

const events = [];

export function getEvents() {
   return events;
}

export async function createEvent(participant, eventData){
  const participantRef = getParticipantDoc(participant);
  await setDoc(participantRef, eventData, { merge: true});
  loadEvents();
}

export async function removeEvent(participant, fieldId){
  const participantRef = getParticipantDoc(participant);
  var removeData = {};
  removeData[fieldId] =  deleteField();
  await updateDoc(participantRef, removeData);
  loadEvents();
}

export async function updateEvent(participant, updateData){
  const participantRef = getParticipantDoc(participant);
  await updateDoc(participantRef, updateData);
  loadEvents();
}

export async function loadEvents () {
  if(!getIdCalendar()) return;
  resetEvents();

  const participantCollection = getParticipantsCollection();
  const querySnapshot = await getDocs(participantCollection);

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
