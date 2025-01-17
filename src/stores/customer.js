import { ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import db from '@/firebase'
// import { db } from '../firebase' // Assuming you have a firebaseConfig.js file

export const useCustomerStore = defineStore('customers', () => {
  const customers = ref([]) // Store customer data

  // Fetch customers from Firestore
  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'))
      customers.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  // Create a new customer
  const createCustomer = async (newCustomer) => {
    try {
      await addDoc(collection(db, 'customers'), newCustomer)
      await fetchCustomers() 
    } catch (error) {
      console.error('Error creating customer:', error)
    }
  }

  // Update a customer
  const updateCustomer = async (customerId, updatedCustomer) => {
    try {
      const customerRef = doc(db, 'customers', customerId)
      await updateDoc(customerRef, updatedCustomer)
      await fetchCustomers() 
    } catch (error) {
      console.error('Error updating customer:', error)
    }
  }

  // Delete a customer
  const deleteCustomer = async (customerId) => {
    try {
      const customerRef = doc(db, 'customers', customerId)
      await deleteDoc(customerRef)
      await fetchCustomers() 
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  return {
    customers,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
})
