import { useEffect, useState } from 'react'
import { getEntries } from '../../services/entries'
import Entry from '../../components/Entry/Entry';

export default function Home() {
  const [entryList, setEntryList] = useState([]);
  
  useEffect(() => {
    const fetchEntryList = async () => {
      const res = await getEntries();
      setEntryList(res);
    }
    fetchEntryList()
  }, [])
  
  return (
    <section>
      <h2>Say something...</h2>
      <form>
        <input placeholder='add new entry'></input>
        <button>Add</button>
      </form>
      <p>Recent entries:</p>
      <div>
        {entryList.map((entry) => <Entry key={`${entry.id}`} entry={entry}/>)}
      </div>
    </section>
  )
}
