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
import db from '@/firebase'

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
    try {
      let q = query(collection(db, 'customers'))
      if (searchTerm.value) {
        q = query(collection(db, 'customers'), where('name', '==', searchTerm.value))
        const emailQuery = query(
          collection(db, 'customers'),
          where('email', '==', searchTerm.value),
        )
        const statusQuery = query(
          collection(db, 'customers'),
          where('status', '==', searchTerm.value),
        )
        const phoneQuery = query(
          collection(db, 'customers'),
          where('phone_number', '==', searchTerm.value),
        )
        const [nameSnapshot, emailSnapshot, statusSnapshot, phoneSnapshot] = await Promise.all([
          getDocs(q),
          getDocs(emailQuery),
          getDocs(statusQuery),
          getDocs(phoneQuery),
        ])
        const allDocs = [
          ...nameSnapshot.docs,
          ...emailSnapshot.docs,
          ...statusSnapshot.docs,
          ...phoneSnapshot.docs,
        ]
        const uniqueDocs = Array.from(new Set(allDocs.map((doc) => doc.id))).map((id) =>
          allDocs.find((doc) => doc.id === id),
        )
        customers.value = uniqueDocs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      } else {
        const querySnapshot = await getDocs(q)
        customers.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      }
      console.log(customers.value)
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
