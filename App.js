import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const apiUrls = [
    'http://20.244.56.144/numbers/odd',
    'http://20.244.56.144/numbers/primes',
    'http://20.244.56.144/numbers/fibo',
    
  ];

  const [allNumbers, setAllNumbers] = useState([]);

  useEffect(() => {
    fetchAllNumbers();
  }, []);

  const fetchAllNumbers = async () => {
    try {
      const numbersPromises = apiUrls.map(async (apiUrl) => {
        const response = await axios.get(apiUrl);
        return response.data.numbers;
      });

      const allNumbersFromApis = await Promise.all(numbersPromises);
      const sortedUniqueNumbers = Array.from(new Set(allNumbersFromApis.flat())).sort((a, b) => a - b);
      setAllNumbers(sortedUniqueNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const generateJson = () => {
    const jsonData = {
      numbers: allNumbers
    };
    const jsonString = JSON.stringify(jsonData, null, 2); 
    return jsonString;
  };

  return (
    <div>
      <h1>All Numbers from APIs</h1>
      <pre>
        <code>{generateJson()}</code>
      </pre>
    </div>
  );
}

export default App;