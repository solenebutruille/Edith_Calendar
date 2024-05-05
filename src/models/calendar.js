import { doc, writeBatch, getDoc } from "firebase/firestore";
import { db } from "../main.js";
import { nanoid } from "nanoid";

export function getIdCalendar() {
  let urlString = window.location.href;
  let paramString = urlString.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  return queryString.get("idCalendar");
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
  const calendarRef = await getDoc(doc(db, calendarId, "calendarInfo"));
  return calendarRef.exists();
}
