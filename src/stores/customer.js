import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import db from '@/firebase';

export const useCustomerStore = defineStore('customers', () => {
  const customers = ref([])
  const searchTerm = ref('')

  // Fetch customers from Firestore
  // const fetchCustomers = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'customers'))
  //     customers.value = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }))
  //   } catch (error) {
  //     console.error('Error fetching customers:', error)
  //   }
  // }
    const fetchCustomers = async () => {
      console.log('fetching customers')
      console.log(searchTerm.value)
      try {
        let q = query(collection(db, 'customers'))
        if (searchTerm.value) {
          q = query(
            q,
            where('name', '==', searchTerm.value),
            where('email', '==', searchTerm.value),
            where('status', '==', searchTerm.value),
            where('phone_number', '==', searchTerm.value),
          )
        }
        const querySnapshot = await getDocs(q)
        customers.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(customers.value);
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
    searchTerm,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
})
