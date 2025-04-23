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

const mamCollection = collection(db, "MAM");

const newMAMFormRef = document.querySelector("#newMAMForm");
const MAMRef = document.querySelector("#MAM");

async function addNewMAM(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  await addDoc(mamCollection, {
    name: formData.get("name"),
    planet: formData.get("planet"),
    size: formData.get("size"),
    daylength: formData.get("daylength"),
    discoverer: formData.get("discoverer"),
  });

  getNewMAM();

  newMAMFormRef.reset();
}

async function getNewMAM() {
  MAMRef.innerHTML = "";

  const mamList = await getDocs(mamCollection);

  for (let index = 0; index < mamList.docs.length; index++) {
    const currentMAM = mamList.docs[index];
    const mamData = currentMAM.data();

    MAMRef.innerHTML += `
        <div>
            <h4>${mamData.name}</h4>
            
                <p>Planet: ${mamData.planet}</p>
                <p>Size: ${mamData.size}</p>
                <p>Day Length: ${mamData.daylength}</p>
                <p>Discovered by: ${mamData.discoverer}</p>
            <p> 
        <button class="delete" data-id="${currentMAM.id}">delete</button>
        </p>
        </div>
    `;
  }

  const deleteRef = document.querySelectorAll(".delete");

  for (let i = 0; i < deleteRef.length; i++) {
    deleteRef[i].onclick = deleteMAM;
  }
}

newMAMFormRef.onsubmit = addNewMAM;

async function deleteMAM(e) {
  console.log("Do you want to delete your comment:", e.target.dataset.id, "?");

  const userConfirmed = confirm(
    "Do you want to delete your moon?",
    e.target.dataset.id
  );

  if (userConfirmed) {
    const mamToDelete = doc(mamCollection, e.target.dataset.id);

    await deleteDoc(mamToDelete);

    getNewMAM();
  }
}

getNewMAM();
