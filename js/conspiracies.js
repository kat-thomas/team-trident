import { app } from "./app.js";

import {
  getFirestore,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const db = getFirestore(app);

const conspiraciesCollection = collection(db, "conspiracies");

const conspiraciesRef = document.querySelector("#conspiracies");

async function getConspiracies() {
  const conspiracyDocs = await getDocs(conspiraciesCollection);

  conspiraciesRef.innerHTML = "";

  for (let i = 0; i < conspiracyDocs.docs.length; i++) {
    const currentConspiracy = conspiracyDocs.docs[i];

    const data = currentConspiracy.data();

    const hearts = data.hearts || 0;

    conspiraciesRef.innerHTML += `
    <div class="conspiracycontent">
        <p>
        ${data.text}
        </p>
        <p>Likes: ${hearts}</p>
      
        <p>
            <span class="hearts" data-id="${currentConspiracy.data}">
                <img
          src="images/heart.png"
          alt="heart"
          width=30px
                    </span>
        </p>
        <p>
            <span class="delete" data-id="${currentConspiracy.id}">
                <img
          src="images/delete.png"
          alt="trash"
          width=30px
                    </span>
        </p>
      </div>
    `;
  }

  const heartsRef = document.querySelectorAll(".hearts");

  for (let i = 0; i < heartsRef.length; i++) {
    heartsRef[i].onclick = addHearts;
  }

  const crossesRef = document.querySelectorAll(".delete");

  for (let i = 0; i < crossesRef.length; i++) {
    crossesRef[i].onclick = rescindConspiracy;
  }
}

async function addHearts(e) {
  console.log("Add hearts", e.target.dataset.id);

  const newHeartCount = Number(e.target.dataset.hearts) + 1;


  await updateDoc(conspiracyToUpdate, { hearts: newHeartCount });

 
  getConspiracies();
}

async function rescindConspiracy(e) {
  console.log("Rescind Conspiracy", e.target.dataset.id);

  const userConfirmed = confirm("Are you going to let them silence you?");

  if (userConfirmed) {
    const conspiracyToDelete = doc(conspiraciesCollection, e.target.dataset.id);

    await deleteDoc(conspiracyToDelete);

    getConspiracies();
  }
}

getConspiracies();