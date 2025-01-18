import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import db from '@/firebase'

export const useCustomerStore = defineStore('customers', () => {
  const customers = ref([])
  const searchTerm = ref('')

  const fetchCustomers = async () => {
    try {

      const allDocs = []

      // Fetch all customers
      const querySnapshot = await getDocs(collection(db, 'customers'))
      querySnapshot.forEach((doc) => {
        allDocs.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      if (searchTerm.value) {
        console.log('Filtering customers for similar matches...')
        const lowerSearchTerm = searchTerm.value.toLowerCase()

        // Filter documents for similar matches in specified fields
        customers.value = allDocs.filter((doc) => {
          return (
            (doc.email &&
              typeof doc.email === 'string' &&
              doc.email.toLowerCase().includes(lowerSearchTerm)) ||
            (doc.first_name &&
              typeof doc.first_name === 'string' &&
              doc.first_name.toLowerCase().includes(lowerSearchTerm)) ||
            (doc.last_name &&
              typeof doc.last_name === 'string' &&
              doc.last_name.toLowerCase().includes(lowerSearchTerm)) ||
            (doc.phone_number && doc.phone_number.includes(lowerSearchTerm)) || // Phone numbers are numeric
            (doc.state &&
              typeof doc.state === 'string' &&
              doc.state.toLowerCase().includes(lowerSearchTerm))
          )
        })
      } else {
        customers.value = allDocs // No search term, return all documents
      }

      console.log('Customers fetched successfully:', customers.value)
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
