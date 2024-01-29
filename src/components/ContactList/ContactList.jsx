import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';

const ContactList = () => {
  const contacts = useSelector(state => {
    const { filter, contacts } = state.contacts;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={nanoid()}
          contact={contact}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};

const ContactItem = ({ contact, onDelete }) => {
  return (
    <li>
      {contact.name}: {contact.number}
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default ContactList;
