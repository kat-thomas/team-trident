console.clear()
import{app} from"./app.js";

import{
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const db=getFirestore(app);

const conspiracyCollection= collection(db,"conspiracies");

const conspiraciesRef=document.querySelector("#conspiracies");
const conspiraciesFormRef=document.querySelector("#new-conspiracy");
const conspiracyTextRef=document.querySelector("#conspiracy-text")


async function getConspiracies(){
    const conspiraciesDocs= await getDocs
    (conspiracyCollection);
    console.log(conspiraciesDocs.docs.length);

    conspiraciesRef.innerHTML="";
    for (let i = 0; i < conspiraciesDocs.docs.length; i++) {
        const currentConspiracy = conspiraciesDocs.docs [i];
        console.log(currentConspiracy.id, currentConspiracy.data());

        const conspiracyData =currentConspiracy.data();
        conspiraciesRef.innerHTML += "<li>" + "<p>" + conspiracyData.text + "</p>"+ "</li>";
    }
}

async function addNewConspiracy(e) {
    e.preventDefault();

    const conspiracyTextValue=conspiracyTextRef.value;
  const newConpsiracy=await addDoc(conspiracyCollection, {text: conspiracyTextValue});
  console.log(newConpsiracy);

  getConspiracies();

  conspiraciesFormRef.reset();

}

conspiraciesFormRef.onsubmit= addNewConspiracy;



getConspiracies()