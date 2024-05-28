import { getCalendarName, getIdCalendar } from './calendar.js';
import { eventBus } from "@/main.js";

export const ActionEnum = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    GET_ALL: 'GET_ALL',
    COUNT: 'COUNT'
};

const dbName = "edith-calendar";
const version = 1;
const objectStoreName = "idCalendars";

export async function executeActionIndexedDB(action, calendarID){
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = function (event) {
      const indexedDB = event.target.result;
      if(!indexedDB.objectStoreNames.contains(objectStoreName)){
        indexedDB.createObjectStore(objectStoreName, { keyPath: 'id' });
      }
    };

    request.onerror = function (event) {
      // log in terminal
      reject(event.target.errorCode);
    };

    request.onsuccess = async function (event) {
      const indexedDB = event.target.result;
      const calendarName = action === ActionEnum.ADD ? await getCalendarName() : "";
      executeAction(indexedDB, action, calendarID, calendarName).then(resolve).catch(reject);
    };

  });
}

async function executeAction(indexedDB, action, calendarID, calendarName){
  return new Promise((resolve, reject) => {
    const transaction = indexedDB.transaction([objectStoreName], 'readwrite');

    transaction.oncomplete = () => {
      // Handle errors!
      resolve();
    };

    transaction.onerror = (event) => {
      // Handle errors!
      reject(event.target.errorCode);
    };

    const objectStore = transaction.objectStore(objectStoreName);
    let request;
    switch(action) {
      case ActionEnum.ADD:
        request = objectStore.put({ id: getIdCalendar(), name: calendarName});
        break;
      case ActionEnum.DELETE:
        request = objectStore.delete(calendarID);
        break;
      case ActionEnum.GET_ALL:
        request = objectStore.getAll();
        break;
      case ActionEnum.COUNT:
        request = objectStore.count();
        break;
    }
    request.onerror = (event) => {
      // Handle errors!
      reject(event.target.errorCode)
    };
    request.onsuccess = (event) => {
      const response = event.target.result;
      if(action === ActionEnum.ADD) {
        eventBus.$emit('added-new-calendar-in-indexedDB')
      }
      resolve(response);
    };
  });
}
