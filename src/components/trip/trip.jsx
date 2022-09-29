import React, { useEffect } from "react";
import { useState } from "react";
import { db, deleteStorage } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Group } from "../group/group";
import { Personal } from "../personal/personal";

import "./trip.scss";

export const Trip = ({ user }) => {
  let [group, setGroup] = useState([]);
  let [personalEquip, setPersonalEquip] = useState([]);
  let [docID, setDocID] = useState("");

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "yosemite"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      const equipment = data.Equipment.map((item) => item);
      console.log(equipment);
      setGroup([...equipment]);
    });
  };

  const getUser = async () => {
    const userSnapshot = await getDocs(collection(db, "travelers"));
    userSnapshot.forEach((doc) => {
      let data = doc.data();
      let docID = doc.id;
      setDocID(docID);
      const person = data[`${user}`];
      const equipment = person.items.map((item) => item);
      setPersonalEquip([...equipment]);
    });
  };

  const handleGroupCheck = async (e) => {
    const index = group.findIndex((object) => {
      return object.item === e.target.id;
    });
    // console.log({ e.target });

    if (index !== -1) {
      group[index].checked = !e.target.checked;
    }
    // Adds news doc to collection
    const addItem = doc(db, "yosemite", "Group");
    await updateDoc(addItem, {
      Equipment: group,
    });
    return getData();
  };

  const handlePersonalCheck = async (e) => {
    console.log(e.target);
    const index = personalEquip.findIndex((object) => {
      // console.log({ object });
      return object.item === e.target.id;
    });
    // check to index
    if (index !== -1) {
      personalEquip[index].checked = !e.target.checked;
    }
    // Adds news doc to collection
    const addItem = doc(db, "travelers", `${docID}`);
    await updateDoc(addItem, `${user}`, {
      items: personalEquip,
    });
    return getUser();
  };

  useEffect(() => {
    getData();
    getUser();
    const groupCheckboxs = document.querySelectorAll(".group__item");
    groupCheckboxs.forEach((checkbox) =>
      checkbox.addEventListener("change", handleGroupCheck)
    );
    const personalCheckboxs = document.querySelectorAll(".personal__item");
    personalCheckboxs.forEach((checkbox) =>
      checkbox.addEventListener("change", handlePersonalCheck)
    );
  }, [group.length, personalEquip.length]);

  return (
    <div className="trip">
      <div>
        <h3>Yosemite</h3>
      </div>
      <Group group={group} setGroup={setGroup} getData={getData} />
      <Personal
        getUser={getUser}
        user={user}
        personalEquip={personalEquip}
        docID={docID}
        setPersonalEquip={setPersonalEquip}
      />
    </div>
  );
};
