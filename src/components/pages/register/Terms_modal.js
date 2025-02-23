import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 

import Modal from 'react-bootstrap/Modal';
import Api from '../../../config/Api';

import { useSelector, useDispatch } from 'react-redux'
import { termsAction } from '../../../actions/modal'

const Terms_modal = (props)=>{ 
 
  const dispatch = useDispatch()  
  const termsModelState = useSelector( (state)=> state.terms_modal ) 

  const [data, set_data] = useState({})   
 
	useEffect(() => {	
	},[props]);  

  return reactDOM.createPortal(   
	  <>      
      <Modal show={termsModelState.show} size="lg" onHide={()=>dispatch(termsAction(false))} backdrop="static" id="terms_modal" className='modal-dialog-centered'>
      <Modal.Header closeButton>
      <Modal.Title>
      Terms and conditions
      </Modal.Title> 
      </Modal.Header>
      <Modal.Body className="modal-body">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </Modal.Body>      
      </Modal>       
    </>, document.querySelector('#main-modal')    
    );
 
}
export default Terms_modal;

