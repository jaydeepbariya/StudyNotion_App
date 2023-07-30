import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const RequirementField = ({name,label,register,errors,getValues,setValue}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    } 
    
    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    } 

    //registering the field in form
    useEffect(() => {
        register(name, {required:true})
    }, []);

    //when requirementList updating update value in form as well
    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

  return (
    <div>
        <label htmlFor={name}>{ label } <sup>*</sup></label>
          <input 
              type='text'
              id={name}
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className='w-full'
          />
          <button
              type='button'
              onClick={()=>handleAddRequirement()}
              className='font-semibold text-yellow-50 bg-richblack-600 rounded-md px-2 py-1 hover:scale-95 active:shadow-sm active:shadow-white'
            >
              Add
          </button> 

          <ul className='my-4'>
          {
              requirementList.length > 0 && (
                  requirementList.map((item, index) => {
                      return (
                          <li className='flex gap-x-4' key={index}>
                              <p>{item}</p>
                              <button onClick={()=>handleRemoveRequirement(index)} className='rounded-sm bg-richblack-600 hover:scale-95 active:shadow-sm active:shadow-white'>Remove</button>
                          </li>
                      )
                  })
              )
              }
          </ul>
          
          {
              errors[name] && (
                  <span>{ label} is required</span>
              )
          }
      </div>


        
      
  )
}
export default RequirementField