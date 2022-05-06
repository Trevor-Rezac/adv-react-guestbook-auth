import { useEffect, useState } from 'react'
import { getEntries, createEntry } from '../../services/entries'
import Entry from '../../components/Entry/Entry';
import { useUserContext } from '../../context/UserContext';

export default function Home() {
  const { user } = useUserContext();
  const [entryList, setEntryList] = useState([]);
  const [content, setContent] = useState('');
  console.log('user.id~~~~', user.id)
  
  const fetchEntryList = async () => {
    const res = await getEntries();
    setEntryList(res);
  }
  
  useEffect(() => {
    fetchEntryList()
  }, [])

  const handleChange = async (e) => {
    e.preventDefault();
    setContent(e.target.value)
  }

  const addEntry = async () => {
    const res = await createEntry({ userId: user.id, content })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEntry();
    await fetchEntryList();
  }
  
  return (
    <section>
      <h2>Say something...</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='add new entry'
          onChange={handleChange}
          value={content}
          />
        <button>Add</button>
      </form>
      <h3>Recent entries:</h3>
      <div>
        {entryList.map((entry) => <Entry key={`${entry.id}`} entry={entry}/>)}
      </div>
    </section>
  )
}
