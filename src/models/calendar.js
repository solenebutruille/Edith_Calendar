import { doc, writeBatch, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../main.js";
import { nanoid } from "nanoid";

export function getIdCalendar() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('idCalendar');
}

export async function getCalendarName(){
  const idCalendar = getIdCalendar();
  if(!idCalendar) return;
  const querySnapshot = await getDocs(collection(db, idCalendar));
  let calendarName = ""
  querySnapshot.forEach((doc) => {
      if(doc.id === "calendarInfo"){
        const data = doc.data();
        calendarName = data.name;
      }
  });
  return calendarName;
}

export async function createCalendar (calendarName, calendarUsers) {
  const uuid = nanoid (18);
  const batch = writeBatch (db);

  const initCalendar = doc(db, uuid, "calendarInfo");
  batch.set (initCalendar, {name: calendarName });

  for (const user of Object.values(calendarUsers)) {
    const userDoc = doc(db, uuid, user)
    batch.set(userDoc, {name: user });
  }

  await batch
    .commit()
    .then(() => {
      console.log("Batch write operation completed");
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
  const calendarRef = await getDoc(doc(db, calendarId, "calendarInfo"));
  return calendarRef.exists();
}
