console.clear();
import { app } from "./app.js";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const db = getFirestore(app);

const conspiracyCollection = collection(db, "conspiracies");

const conspiraciesRef = document.querySelector("#conspiracies");

const conspiraciesFormRef = document.querySelector("#new-conspiracy");
const conspiracyTextRef = document.querySelector("#conspiracy-text");

async function getConspiracies() {
  const conspiraciesDocs = await getDocs(conspiracyCollection);

  conspiraciesRef.innerHTML = "";

  for (let i = 0; i < conspiraciesDocs.docs.length; i++) {
    const currentConspiracy = conspiraciesDocs.docs[i];

    const data = currentConspiracy.data();

    const hearts = data.hearts || 0;

    conspiraciesRef.innerHTML += `
        <div class="conspiracies">
            <h4>
            ${data.text}
            </h4>
            <p>Likes: ${hearts}</p>
            <p>
            <button class="conspiracyheart" data-id="${currentConspiracy.id}" data-hearts="${hearts}" >&hearts;</button>  
            <button class="conspiracydelete" data-id="${currentConspiracy.id}">delete</button>
            </p>
          </div>
        `;
  }
  const heartsRef = document.querySelectorAll(".conspiracyheart");

  for (let i = 0; i < heartsRef.length; i++) {
    heartsRef[i].onclick = addHeart;
  }

  const crossesRef = document.querySelectorAll(".conspiracydelete");
  for (let i = 0; i < crossesRef.length; i++) {
    crossesRef[i].onclick = deleteConspiracy;
  }
}

async function addNewConspiracy(e) {
  e.preventDefault();

  const conspiracyTextValue = conspiracyTextRef.value;
  const newConpsiracy = await addDoc(conspiracyCollection, {
    text: conspiracyTextValue,
  });
  console.log(newConpsiracy);

  conspiraciesFormRef.reset();
}

conspiraciesFormRef.onsubmit = addNewConspiracy;

getConspiracies();

async function addHeart(e) {
  console.log("Add heart", e.target.dataset.id);

  const newHeartCount = Number(e.target.dataset.hearts) + 1;

  const conspiracyToUpdate = doc(conspiracyCollection, e.target.dataset.id);

  await updateDoc(conspiracyToUpdate, {
    hearts: newHeartCount });
  
  getConspiracies();
}

async function deleteConspiracy(e) {
  console.log("delete conspiracy", e.target.dataset.id);

  const userConfirmed = confirm(
    "Are you really going to let yourself be silenced?",
    e.target.dataset.id
  );

  if (userConfirmed) {
    const conspiracyToDelete = doc(conspiracyCollection, e.target.dataset.id);

    await deleteDoc(conspiracyToDelete);

    getConspiracies();
  }
}

getConspiracies();
