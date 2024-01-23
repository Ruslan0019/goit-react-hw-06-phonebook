import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      parsedContacts.forEach(contact => dispatch(addContact(contact)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));
  };

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleFormSubmit} />

      <h2>Contacts</h2>
      <Filter
        filter={filter}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
      <ContactList contacts={filterContacts()} onDelete={handleDelete} />
    </div>
  );
};

export default App;
