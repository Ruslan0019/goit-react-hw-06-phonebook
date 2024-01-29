import React, { useState } from 'react';
import { Button, Form, Input, Label } from './ContactForm.styled';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

const ContactForm = () => {
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setNewContact(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addContact(newContact));
    setNewContact({ name: '', number: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Input
          type="text"
          name="name"
          value={newContact.name}
          onChange={handleChange}
          required
        />
      </Label>

      <Label>
        Number:
        <Input
          type="tel"
          name="number"
          value={newContact.number}
          onChange={handleChange}
          required
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
