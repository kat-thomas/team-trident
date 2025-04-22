import { app } from "./app.js";

import {
  getFirestore,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const db = getFirestore(app);

const moonmentCollection = collection(db, "moonments");

const moonmentsRef = document.querySelector("#moonments");

const moonmentFormRef = document.querySelector("#new-moonment");
const moonmentTextRef = document.querySelector("#moonment-text");

async function getMoonment() {
  const moonmentsDocs = await getDocs(moonmentCollection);

  moonmentsRef.innerHTML = "";

  for (let i = 0; i < moonmentsDocs.docs.length; i++) {
    const currentMoonment = moonmentsDocs.docs[i];

    const data = currentMoonment.data();

    const hearts = data.hearts || 0;

    moonmentsRef.innerHTML += `
    <div class="moonment">
        <h4>
        ${data.text}
        </h4>
        <p>Likes: ${hearts}</p>
        <p>
          <button class="delete" data-id="${currentMoonment.id}">Delete</button>
          <button class="heart" data-id="${currentMoonment.id}" data-hearts="${hearts}" >&hearts;</button>
        </p>
      </div>
    `;
  }

  const heartsRef = document.querySelectorAll(".heart");

  for (let i = 0; i < heartsRef.length; i++) {
    heartsRef[i].onclick = addHeart;
  }

  const deleteRef = document.querySelectorAll(".delete");

  for (let i = 0; i < deleteRef.length; i++) {
    deleteRef[i].onclick = deleteMoonment;
  }
}

async function addNewMoonment(e) {
  e.preventDefault();

  const moonmentTextValue = moonmentTextRef.value;

  if (moonmentTextValue.trim() === "") {
    alert("Please enter a valid comment");
  } else {
    const newMoonment = await addDoc(moonmentCollection, {
      text: moonmentTextValue,
    });

    console.log(newMoonment);

    getMoonment();

    moonmentFormRef.reset();
  }
}

moonmentFormRef.onsubmit = addNewMoonment;

getMoonment();

async function addHeart(e) {
  console.log("Add heart", e.target.dataset.id);

  const newHeartCount = Number(e.target.dataset.hearts) + 1;

  const moonmentToUpdate = doc(moonmentCollection, e.target.dataset.id);

  await updateDoc(moonmentToUpdate, { hearts: newHeartCount });

  getMoonment();
}

async function deleteMoonment(e) {
  console.log("Do you want to delete your comment:", e.target.dataset.id, "?");

  const userConfirmed = confirm(
    "Do you want to delete your comment:",
    e.target.dataset.id,
    "?"
  );

  if (userConfirmed) {
    const moonmentToDelete = doc(moonmentCollection, e.target.dataset.id);

    await deleteDoc(moonmentToDelete);

    getMoonment();
  }
}

getMoonment();
