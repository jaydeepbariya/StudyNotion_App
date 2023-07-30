import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx'
import {MdEdit} from 'react-icons/md'

const NestedView = ({handleChangeEditSectionName}) => {
  
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div>
        <div>
            {course?.courseContent?.map((section, index)=>{
                return (
                    <details key={section._id} open>
                        <summary>
                            <div className='flex items-center justify-start gap-x-4'>
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p> 
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <button
                                    onClick={handleChangeEditSectionName}
                                    >
                                    <MdEdit />
                                </button>
                            </div>
                        </summary>
                    </details>
                )
            })}
        </div>
    </div>
  )
}

export default NestedView