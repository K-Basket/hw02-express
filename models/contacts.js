import { AssertionError } from "assert";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

const contactsPath = fileURLToPath(new URL("contacts.json", import.meta.url));

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);

//   return JSON.parse(data);
// };

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

// const getById = async (contactId) => {
//   const list = await listContacts();
//   const contact = list.find((contact) => contact.id === contactId);

//   return contact || null;
// };

async function getById(contactId) {
  const list = await listContacts();
  const contact = list.find((contact) => contact.id === contactId);

  return contact || null;
}

// const removeContact = async (contactId) => {
//   const list = await listContacts();
//   const index = list.findIndex((contact) => contact.id === contactId);

//   if (index === -1) return null;

//   const [result] = list.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

//   return result;
// };

async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const [result] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

  return result;
}

// const addContact = async (body) => {
//   const list = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   };

//   list.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

//   return newContact;
// };

async function addContact(body) {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

  return newContact;
}

// const updateContact = async (contactId, body) => {
//   const list = await listContacts();
//   const index = list.findIndex((contact) => contact.id === contactId);

//   if (index === -1) return null;

//   list[index] = { id: contactId, ...body };

//   await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
//   return list[index];
// };

async function updateContact(contactId, body) {
  const list = await listContacts();
  const index = list.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  list[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
}

export { listContacts, getById, removeContact, addContact, updateContact };
