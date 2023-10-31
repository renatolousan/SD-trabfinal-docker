import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [db1Elements, setDb1Elements] = useState([]);
  const [db2Elements, setDb2Elements] = useState([]);
  const [comparisonResult, setComparisonResult] = useState([]);

  async function fetchElements() {
    try {
      const response1 = await axios.get('http://localhost:3001/getElementsdb1');
      const response2 = await axios.get('http://localhost:3001/getElementsdb2');
      setDb1Elements(response1.data);
      setDb2Elements(response2.data);
    } catch (error) {
      console.error('Error fetching elements:', error);
    }
  }

  useEffect(() => {
    async function fetchDb1Elements() {
      try {
        const response = await axios.get('http://localhost:3001/getElementsdb1');
        setDb1Elements(response.data);
      } catch (error) {
        console.error('Error fetching elements from DB1:', error);
      }
    }
    
    async function fetchDb2Elements() {
      try {
        const response = await axios.get('http://localhost:3001/getElementsdb2');
        setDb2Elements(response.data);
      } catch (error) {
        console.error('Error fetching elements from DB2:', error);
      }
    }

    fetchDb1Elements();
    fetchDb2Elements();
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  async function fetchComparison() {
    try {
      const response = await axios.get('http://localhost:3001/compareElements');
      setComparisonResult(response.data);
    } catch (error) {
      console.error('Error fetching comparison:', error);
    }
  }

  const handleAddToList1 = async (listSetter) => {
    try {
      const response = await axios.post('http://localhost:3001/addElementdb1', {
        element: text
      });
      
      if (response.data.status === 'Element received!') {
        listSetter(prevList => [...prevList, text]);
        setText('');
      } else {
        console.error("Failed to add element");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddToList2 = async (listSetter) => {
    try {
      const response = await axios.post('http://localhost:3001/addElementdb2', {
        element: text
      });
      
      if (response.data.status === 'Element received!') {
        listSetter(prevList => [...prevList, text]);
        setText('');
      } else {
        console.error("Failed to add element");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function deleteAllElements() {
    try {
      await axios.delete('http://localhost:3001/deleteAllElements');
      setDb1Elements([]);
      setDb2Elements([]);
      setComparisonResult([]);
    } catch (error) {
      console.error('Error deleting all elements:', error);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text..."
        />
        <button onClick={() => handleAddToList1(setLeftList)}>Add DB1</button>
        <button onClick={() => handleAddToList2(setRightList)}>Add DB2</button>
        <button onClick={fetchComparison}>Comparar</button>
        <button onClick={deleteAllElements}>Deletar tudo</button>
        <button onClick={fetchElements}>Refresh</button>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <ul style={{ marginRight: '20px' }}>
        {db1Elements.map((element, index) => (
          <li key={index}>
          {element.content} (Timestamp: {new Date(element.timestamp).toLocaleString()})
           </li>
        ))}
        </ul>
        <ul>
      </ul>
        <ul>
          {db2Elements.map((element, index) => (
          <li key={index}>
          {element.content} (Timestamp: {new Date(element.timestamp).toLocaleString()})
           </li>
        ))}
        </ul>

  <section>
  <ul>
    {comparisonResult.map((item, index) => (
      <li key={index}>
        Elemento: {item.content} - {item.status}
      </li>
    ))}
  </ul>
</section>
      </div>
    </div>
  );
}

export default App;
