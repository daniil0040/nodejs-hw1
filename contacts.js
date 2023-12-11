import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

/** shown full contacts list */
export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

/** shown contact requested by id */
export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

/** delete contact by id */
export async function removeContact(contactId) {
  const contacts = await listContacts();
  const deletedIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (deletedIndex === -1) {
    return null;
  }
  const [result] = contacts.splice(deletedIndex, 1);
  await updateContacts(contacts);
  return result;
}

/** add created contact to contacts list */
export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}
