import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

const ContactList = () => {
  const contactsData = useSelector(state => state.contacts);

  const contacts = useMemo(() => {
    const { filter, contacts } = contactsData;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contactsData]);

  const dispatch = useDispatch();

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
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
