"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = ({ eleveId, setResponseEleve }) => {
  const SCHOOL_MANAGER_API_BASE_URL = 'http://localhost:8080/school-management/eleves';
  const [isEditing, setIsEditing] = useState(false);
  const [eleve, setEleve] = useState({
    id: '',
    matricule: '',
    nom: '',
    prenom: '',
    prenomPere: '',
    nomMere: '',
    contact: '',
    adresse: '',
    dateNaissance: '',
    dateInscription: '',
    classeId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SCHOOL_MANAGER_API_BASE_URL}/${eleveId}`);
        setEleve(response.data);
        setIsEditing(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (eleveId) {
      fetchData();
    }
  }, [eleveId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEleve((prevEleve) => ({
      ...prevEleve,
      [name]: value,
    }));
  };

  const reset = () => {
    setIsEditing(false);
    setEleve({
      id: '',
      matricule: '',
      nom: '',
      prenom: '',
      prenomPere: '',
      nomMere: '',
      contact: '',
      adresse: '',
      dateNaissance: '',
      dateInscription: '',
      classeId: '',
    });
  };

  const updateEleve = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${SCHOOL_MANAGER_API_BASE_URL}/${eleveId}`, eleve);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const updatedEleve = response.data;
      setResponseEleve(updatedEleve);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isEditing) {
    return <button onClick={() => setIsEditing(true)}>Modifier les informations de l'élève</button>;
  }

  return (
    <div>
      <h2>Modifier les informations de l'élève</h2>
      <form onSubmit={updateEleve}>
        <table>
        <tbody>
            <tr>
                <td>Matricule:</td>
                <td>
                <input type="text" name="matricule" value={eleve.matricule} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Nom:</td>
                <td>
                <input type="text" name="nom" value={eleve.nom} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Prénom:</td>
                <td>
                <input type="text" name="prenom" value={eleve.prenom} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Prénom du père:</td>
                <td>
                <input type="text" name="prenomPere" value={eleve.prenomPere} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Nom de la mère:</td>
                <td>
                <input type="text" name="nomMere" value={eleve.nomMere} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Contact:</td>
                <td>
                <input type="text" name="contact" value={eleve.contact} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Adresse:</td>
                <td>
                <input type="text" name="adresse" value={eleve.adresse} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Date de naissance:</td>
                <td>
                <input type="text" name="dateNaissance" value={eleve.dateNaissance} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Date d'inscription:</td>
                <td>
                <input type="text" name="dateInscription" value={eleve.dateInscription} onChange={handleChange} />
                </td>
            </tr>
            <tr>
                <td>Classe:</td>
                <td>
                <input type="text" name="classeId" value={eleve.classeId} onChange={handleChange} />
                </td>
            </tr>
            </tbody>
        </table>
        <button type="submit">Enregistrer</button>
        <button onClick={reset}>Annuler</button>
      </form>
    </div>
  );
};

export default EditStudent;