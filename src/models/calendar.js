import { doc, writeBatch, getDoc, collection } from "firebase/firestore";
import { db } from "../main.js";
import { nanoid } from "nanoid";

const collectionName = process.env.VUE_APP_CALENDAR_FIREBASE_COLLECTION;
const participantsCollectionName = "Participants";
const nameField = "name";

export function getIdCalendar() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('idCalendar');
}

export function getParticipantsCollection(){
  const idCalendar = getIdCalendar();
  return collection(db, collectionName, idCalendar, participantsCollectionName);
}

export function getParticipantDoc(participantName){
  const idCalendar = getIdCalendar();
  return doc(db, collectionName, idCalendar, participantsCollectionName, participantName);
}

export async function getCalendarName(){
  const idCalendar = getIdCalendar();
  if(!idCalendar) return;
  let calendarName = "";
  const calendarDoc = await getDoc(doc(db, collectionName, idCalendar));
  if(calendarDoc.exists() && calendarDoc.data()[nameField]){
    calendarName = calendarDoc.data()[nameField]
  }
  return calendarName;
}

export async function createCalendar (calendarName, calendarUsers) {
  if(!calendarName || calendarUsers.length === 0) return;

  const uuid = nanoid (18);
  const batch = writeBatch (db);

  const initCalendar = doc(db, collectionName, uuid);
  batch.set (initCalendar, {name: calendarName });

  for (const user of Object.values(calendarUsers)) {
    const userDoc = doc(db, collectionName, uuid, participantsCollectionName, user)
    batch.set(userDoc, {name: user });
  }

  await batch
    .commit()
    .then(() => {
      const baseUrl = window.location.origin + window.location.pathname;
      const newUrl = `${baseUrl}?idCalendar=${uuid}`;
      window.location.href = newUrl;
    })
    .catch ((error) => {
      console.error("Batch write operation failed: ", error);
    });
}

export async function isCalendarIdValid(calendarId){
  if(!calendarId) return;
  const calendarRef = await getDoc(doc(db, collectionName, calendarId));
  return (calendarRef.exists() && calendarRef.data()[nameField]);
}
