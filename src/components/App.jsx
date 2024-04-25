import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

axios.defaults.baseURL = 'http://localhost:1337/';

export const App = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    hologram_name: '',
    weight: '',
    superpower: '',
    extinct_since: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('animals');
        setAnimals(res.data);
      } catch (err) {
        notifyE(err.message);
      }
    };

    fetchData();
  }, []);

  const deleteAnimal = async id => {
    try {
      const res = await axios.delete(`animals/${id}`);
      const newData = animals.filter(animal => animal.id !== id);
      setAnimals(newData);
      notifyS(res.data.message);
    } catch (err) {
      notifyE(err.message);
    }
  };

  const updateField = async (id, field, value) => {
    try {
      await axios.patch(`animals/${id}`, { [field]: value });
      const updatedAnimals = animals.map(animal => {
        if (animal.id === id) {
          return { ...animal, [field]: value };
        }
        return animal;
      });
      setAnimals(updatedAnimals);
    } catch (err) {
      notifyE(err.message);
    }
  };

  const addAnimal = async () => {
    try {
      const res = await axios.post('animals', newAnimal);
      setAnimals([...animals, res.data]);
      setNewAnimal({
        hologram_name: '',
        weight: '',
        superpower: '',
        extinct_since: '',
      });
      const updatedData = await axios.get('animals');
      setAnimals(updatedData.data);
      notifyS(res.data.message);
    } catch (err) {
      notifyE(err.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewAnimal({ ...newAnimal, [name]: value });
  };

  const notifyS = message => toast.success(message);
  const notifyE = message => toast.error(message);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Virtual Zoo</h1>
      <ul className={css.list}>
        {animals.map(animal => (
          <li className={css.listItem} key={animal.id}>
            <p>
              Name:{' '}
              <input
                className={css.listItemInput}
                type="text"
                value={animal.hologram_name}
                onChange={e =>
                  updateField(animal.id, 'hologram_name', e.target.value)
                }
              />
            </p>
            <p>
              Weight:{' '}
              <input
                className={css.listItemInput}
                type="text"
                value={animal.weight}
                onChange={e => updateField(animal.id, 'weight', e.target.value)}
              />
            </p>
            <p>
              Super power:{' '}
              <input
                className={css.listItemInput}
                type="text"
                value={animal.superpower}
                onChange={e =>
                  updateField(animal.id, 'superpower', e.target.value)
                }
              />
            </p>
            <p>
              Extinct since:{' '}
              <input
                className={css.listItemInput}
                type="text"
                value={animal.extinct_since}
                onChange={e =>
                  updateField(animal.id, 'extinct_since', e.target.value)
                }
              />
            </p>
            <button
              className={css.deleteButton}
              onClick={() => deleteAnimal(animal.id)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
      <div className={css.addAnimalWrapper}>
        <input
          className={css.listItemInput}
          type="text"
          name="hologram_name"
          value={newAnimal.hologram_name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className={css.listItemInput}
          type="text"
          name="weight"
          value={newAnimal.weight}
          onChange={handleChange}
          placeholder="Weight"
        />
        <input
          className={css.listItemInput}
          type="text"
          name="superpower"
          value={newAnimal.superpower}
          onChange={handleChange}
          placeholder="Super power"
        />
        <input
          className={css.listItemInput}
          type="text"
          name="extinct_since"
          value={newAnimal.extinct_since}
          onChange={handleChange}
          placeholder="Extinct since"
        />
        <button className={css.addButton} onClick={addAnimal}>
          ADD ANIMAL
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
