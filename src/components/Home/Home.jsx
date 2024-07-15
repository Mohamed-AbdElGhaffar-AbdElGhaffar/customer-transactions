import React, { useState } from 'react';
import style from '../Home/Home.module.css'
import CustomerTable from '../CustomerTable/CustomerTable';
import TransactionGraph from '../TransactionGraph/TransactionGraph';
import axios from 'axios';

export default function Home() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchCustomerId = async (customer) => {
    try {
      const {data} = await axios.get(`http://localhost:3001/transactions?customer_id=${customer.id}`);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching Customer ID:', error);
    }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    if (customer) {
      fetchCustomerId(customer);
    }
  };

  return <>
  
    <div className="App">
      <CustomerTable onSelectCustomer={handleSelectCustomer} />
      {selectedCustomer && <TransactionGraph transactions={transactions} />}
    </div>

  </>
}
