import React, { useState } from "react";
import { db } from "../firebase";
import {
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import "./group.scss";

export const Group = ({ group, setGroup, getData }) => {
  let [newGroupItem, setNewGroupItem] = useState();

  console.log(newGroupItem);

  const handleSubmit = async (e) => {
    e.preventDefault();
    group.push({ item: newGroupItem, checked: false });
    // Adds news doc to collection
    const addItem = doc(db, "yosemite", "Group");
    await updateDoc(addItem, {
      Equipment: group,
    });
    setNewGroupItem("");
    return getData();
  };

  const deleteItem = (e) => {
    // e.preventDefault();
    console.log(e.target.id);
    const id = e.target.id;
    console.log(id);
    const newEquipList = group.filter((equ) => equ.item !== id);
    console.log(newEquipList);
    const deleteItem = doc(db, "yosemite", `Group`);
    updateDoc(deleteItem, {
      Equipment: newEquipList,
    });
    setGroup([...newEquipList]);
  };

  return (
    <div className="group">
      <div className="title">
        <h5>Group</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-group__item">
          <input
            type="text"
            value={newGroupItem}
            onChange={(e) => setNewGroupItem(e.target.value)}
            id="add-group__item"
          />
        </label>

        <input type="submit" value="Add Item" />
      </form>
      <div className="group__items">
        {group.map((item) => {
          return (
            <div className="item">
              <input
                id={`${item.item}`}
                className="group__item"
                type="checkbox"
                checked={item.checked}
              />
              <label htmlFor={`${item.item}`}>{item.item}</label>
              <input
                id={`${item.item}`}
                type="submit"
                value="X"
                onClick={deleteItem}
                className="button delete"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
