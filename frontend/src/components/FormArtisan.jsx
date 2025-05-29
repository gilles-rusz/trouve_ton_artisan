import React, { useState } from 'react';

const ContactForm = ({ artisanEmail }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Envoi en cours...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, artisanEmail }),
      });
      if (!res.ok) throw new Error('Erreur lors de l’envoi');
      setStatus('Message envoyé avec succès !');
      setFormData({ nom: '', email: '', objet: '', message: '' });
    } catch (err) {
      setStatus('Erreur lors de l’envoi. Merci de réessayer plus tard.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl mb-4">Contacter cet artisan</h2>

      <label className="block mb-4">
        <span className="block font-semibold mb-1">
          Nom <span className="text-red-600">*</span>
        </span>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-4">
        <span className="block font-semibold mb-1">
          Email <span className="text-red-600">*</span>
        </span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-4">
        <span className="block font-semibold mb-1">
          Objet <span className="text-red-600">*</span>
        </span>
        <input
          type="text"
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-4">
        <span className="block font-semibold mb-1">
          Message <span className="text-red-600">*</span>
        </span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          rows={5}
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Envoyer
      </button>

      <p className="mt-3">{status}</p>
    </form>
  );
};

export default ContactForm;

