import React from 'react'
import ContactForm from '../components/reusable/ContactForm'

const Contact = () => {
  return (
    <div className='w-11/12 mx-auto'>
        <h1 className='text-3xl my-6 font-bold text-blue-300 text-center'>Contact Us</h1>
        <p className='text-richblack-300 text-center'>Fill this form and be in touch with us.</p>
        <ContactForm />
    </div>
  )
}

export default Contact