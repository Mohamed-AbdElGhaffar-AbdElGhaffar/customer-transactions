import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../CustomerTable/CustomerTable.module.css';

export default function CustomerTable({ onSelectCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [amountFilter, setAmountFilter] = useState('');
  const [amountInputClass, setAmountInputClass] = useState('');
  const [activeTransactionId, setActiveTransactionId] = useState(null);
  const [customerFilter, setCustomerFilter] = useState('');
  const [customerInputClass, setCustomerInputClass] = useState('');

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/customers');
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/transactions');
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.amount.toString().includes(amountFilter) &&
    customers.find(c => c.id === transaction.customer_id)?.name.toLowerCase().includes(customerFilter.toLowerCase())
  );

  const handleAmountFilter = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    setAmountInputClass(value === '' ? '' : regex.test(value) ? 'is-valid' : 'is-invalid');
    setAmountFilter(value);
  };

  const handleCustomerFilter = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z.'-\s]*$/;
    setCustomerInputClass(value === '' ? '' : regex.test(value) ? 'is-valid' : 'is-invalid');
    setCustomerFilter(value);
  };

  const handleClick = (transaction, customer) => {
    setActiveTransactionId(transaction.customer_id);
    onSelectCustomer(customer);
  };

  return (
    <>
      <div className={`${style.title} d-flex justify-content-center align-items-center`}>
        <h1>Customer and Transaction Data</h1>
      </div>
      <div>
        <div className={`${style.inputs} d-md-flex d-block justify-content-center align-items-center`}>
          <div className={style.filter}>
            <input
              type="text"
              placeholder="Filter by Customer Name"
              className={`form-control ${customerInputClass}`}
              value={customerFilter}
              onChange={handleCustomerFilter}
            />
          </div>
          <div className={style.filter}>
            <input
              type="text"
              placeholder="Filter by Amount"
              className={`form-control ${amountInputClass}`}
              value={amountFilter}
              onChange={handleAmountFilter}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => {
              const customer = customers.find(c => c.id === transaction.customer_id);
              const isActive = transaction.customer_id === activeTransactionId;

              return (
                <tr key={transaction.id} onClick={() => handleClick(transaction, customer)} className={isActive ? "active" : ''}>
                  <td>{customer ? customer.name : 'Unknown'}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
