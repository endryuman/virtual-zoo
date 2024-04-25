import { useEffect, useState } from 'react';
import axios from 'axios';

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
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const deleteAnimal = async id => {
    try {
      await axios.delete(`animals/${id}`);
      const newData = animals.filter(animal => animal.id !== id);
      setAnimals(newData);
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewAnimal({ ...newAnimal, [name]: value });
  };

  return (
    <div>
      <div>Virtual Zoo</div>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>
            <p>
              Name:{' '}
              <input
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
                type="text"
                value={animal.weight}
                onChange={e => updateField(animal.id, 'weight', e.target.value)}
              />
            </p>
            <p>
              Super power:{' '}
              <input
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
                type="text"
                value={animal.extinct_since}
                onChange={e =>
                  updateField(animal.id, 'extinct_since', e.target.value)
                }
              />
            </p>
            <button onClick={() => deleteAnimal(animal.id)}>DELETE</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Add New Animal</h2>
        <input
          type="text"
          name="hologram_name"
          value={newAnimal.hologram_name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="weight"
          value={newAnimal.weight}
          onChange={handleChange}
          placeholder="Weight"
        />
        <input
          type="text"
          name="superpower"
          value={newAnimal.superpower}
          onChange={handleChange}
          placeholder="Super power"
        />
        <input
          type="text"
          name="extinct_since"
          value={newAnimal.extinct_since}
          onChange={handleChange}
          placeholder="Extinct since"
        />
        <button onClick={addAnimal}>Add Animal</button>
      </div>
    </div>
  );
};

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:1337/';

// export const App = () => {
//   const [animals, setAnimals] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get('animals');
//         setAnimals(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(animals);

//   const deleteAnimal = async id => {
//     try {
//       await axios.delete(`animals/${id}`);
//       const newData = animals.filter(animal => animal.id !== id);
//       setAnimals(newData);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateField = async (id, field, value) => {
//     try {
//       await axios.patch(`animals/${id}`, { [field]: value });
//       const updatedAnimals = animals.map(animal => {
//         if (animal.id === id) {
//           return { ...animal, [field]: value };
//         }
//         return animal;
//       });
//       setAnimals(updatedAnimals);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <div>Virtual Zoo</div>
//       <ul>
//         {animals.map(animal => (
//           <li key={animal.id}>
//             <p>
//               Name:{' '}
//               <input
//                 type="text"
//                 value={animal.hologram_name}
//                 onChange={e =>
//                   updateField(animal.id, 'hologram_name', e.target.value)
//                 }
//               />
//             </p>
//             <p>
//               Weight:{' '}
//               <input
//                 type="text"
//                 value={animal.weight}
//                 onChange={e => updateField(animal.id, 'weight', e.target.value)}
//               />
//             </p>
//             <p>
//               Super power:{' '}
//               <input
//                 type="text"
//                 value={animal.superpower}
//                 onChange={e =>
//                   updateField(animal.id, 'superpower', e.target.value)
//                 }
//               />
//             </p>
//             <p>
//               Extinct since:{' '}
//               <input
//                 type="text"
//                 value={animal.extinct_since}
//                 onChange={e =>
//                   updateField(animal.id, 'extinct_since', e.target.value)
//                 }
//               />
//             </p>
//             <button onClick={() => deleteAnimal(animal.id)}>DELETE</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
