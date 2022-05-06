import React from 'react'
import { useEffect, useState } from 'react'
import { getEntries, createEntry } from '../../services/entries'
import Entry from './Entry';
import { useUserContext } from '../../context/UserContext';

export default function EntryList() {
  const { user } = useUserContext();
  const [entryList, setEntryList] = useState([]);
  const [content, setContent] = useState('');
  
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
    <div>
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
    </div>
  )
}
