import React, { useState } from "react";
import { db } from "../firebase";
import {
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import "./personal.scss";

export const Personal = ({
  user,
  personalEquip,
  docID,
  setPersonalEquip,
  getUser,
}) => {
  let [newPersonalItem, setNewPersonalItem] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    personalEquip.push({ item: newPersonalItem, checked: false });
    // Adds news doc to collection
    const addItem = doc(db, "travelers", `${docID}`);
    await updateDoc(addItem, `${user}`, {
      items: personalEquip,
    });
    setNewPersonalItem("");
    return getUser();
  };

  const deleteItem = async (e) => {
    // e.preventDefault();
    const id = e.target.id;
    console.log(id);
    const newEquipList = personalEquip.filter((equ) => equ.item !== id);
    console.log({ newEquipList });
    const deleteItem = doc(db, "travelers", `${docID}`);
    await updateDoc(deleteItem, `${user}`, {
      items: newEquipList,
    });
    setPersonalEquip([...newEquipList]);
  };
  return (
    <div className="personal">
      <div className="title">
        <h5>Personal</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-group__item">
          <input
            type="text"
            value={newPersonalItem}
            onChange={(e) => setNewPersonalItem(e.target.value)}
            id="add-group__item"
          />
        </label>

        <input type="submit" value="Add Item" />
      </form>
      <div className="personal__items">
        {user ? (
          personalEquip.map((item, i) => {
            return (
              <div className="item">
                <input
                  id={`${item.item}`}
                  className="personal__item"
                  type="checkbox"
                  checked={item.checked}
                />
                <label htmlFor={`${item.item}`}>{item.item}</label>
                <input
                  id={item.item}
                  type="submit"
                  value="X"
                  onClick={deleteItem}
                  className="button delete"
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
