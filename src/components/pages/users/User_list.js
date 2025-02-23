import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import all_function from '../../../config/all_function';
import Api from '../../../config/Api';
import Pagination from "../../common/pagination/Pagination";
import Meta from '../../common/Meta'; 
import Loader from '../../common/Loader'; 

import { useSelector, useDispatch } from 'react-redux'
import { fetchDevice } from '../../../redux/slice/deviceReducer'

const User_list = (props)=>{   

    const metaData = {
        meta_title : 'Users',
        meta_description : '',
        meta_keywords : '',
    }   

    const queryParams = new URLSearchParams(window.location.search) 		
    const item_per_page = all_function.limit()
    const __filterData = {
        DeviceName: queryParams.get('DeviceName') ?? '',        
        Status:queryParams.get('Status') ?? '',	      
    }

    const [filterData, set_filterData] = useState(__filterData) 
    const [page_number, set_page_number] = useState(1);   
    let [selected_device, set_selected_device] = useState([]);

    const dispatch = useDispatch()
    const deviceState = useSelector( (state)=> state.devices ) 
    const data = (deviceState.data) ? deviceState.data : []; 
    const total = (deviceState.total) ? deviceState.total : 0;     
    const loader = (deviceState.loader) ? deviceState.loader : false; 

    useEffect(() => {		
        fetchData(page_number)        
	  },[]); 	

    const MySwal = withReactContent(Swal)

    const fetchData = async (page_number)=>{ 
      dispatch(fetchDevice({         
        page_number:page_number,
        DeviceName:filterData.DeviceName,
        Status:filterData.Status, 
      }))       
      if(!page_number){
        set_page_number(1)
        updateBrowserUrl(1)			
      }	
    }	

    const updateBrowserUrl = (page_number)=>{	
		const location = new URL(window.location);
		location.search="";		
        if(page_number){
          location.searchParams.set('p', page_number);
        }
        if(filterData.DeviceName){	
            location.searchParams.set('DeviceName', filterData.DeviceName);		
        }
        if(filterData.search_for=='Status'){			
            location.searchParams.set('Status', filterData.Status);        
        }               
		window.history.pushState({},'', location);
	}

    const handleChange = (e)=>{	
      const field_name  = e.target.name;
      const field_value = e.target.value;
      set_filterData({...filterData, [field_name]: field_value})
    }	

    const handleFilter = (e)=>{
      e.preventDefault();			
      set_page_number(1)
      updateBrowserUrl(1)			
      fetchData(1)	
    }

    const handlePaginate = (pgNo)=>{	
      set_page_number(pgNo)
      updateBrowserUrl(pgNo)	
      fetchData(pgNo); 		
    }

    const handleCheckall = (e)=>{
      let inputs = document.querySelectorAll('.selected-chk');  	
      if(e.target.checked){			
        for (var i = 0; i < inputs.length; i++) {   
          inputs[i].checked = true;   
        }   
      } 
      else{
        for (var j = 0; j < inputs.length; j++) {   
          inputs[j].checked = false;   
        }   
      }
      updateSelectedDevice()	
    }   

    const updateSelectedDevice = ()=>{
        let selected_inputs = [] 
        let inputs = document.querySelectorAll('.selected-chk:checked');
        for(var i = 0; i < inputs.length; i++) {             
            selected_inputs.push(inputs[i].value)
        } 
        set_selected_device(selected_inputs)  
    }

    const confirmDelete = async ()=>{   
        if(selected_device.length > 0){        
            MySwal.fire({
                //icon: 'warning',
                width: '350px',
                animation: false,
                title: 'Are you sure?',
                text: "You want to delete this item!",			
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then( async (result) => {
                if (result.isConfirmed) {
                    try{
                        const res = await Api.delete_multiple_devices({                            
                            UserID:localStorage.getItem(process.env.REACT_APP_PREFIX + 'user_id'),
                            id:selected_device.join(","),
                        });
                                                
                        if( res && (res.status === 200) ){
                            set_page_number(1)
                            updateBrowserUrl(1)	          
                            fetchData(1)
                            MySwal.fire({
                                //icon: 'success',
                                width: '350px',
                                animation: false,
                                title: 'Deleted!',
                                text: "Selected item has been deleted."
                            })		
                        }
                    }
                    catch{

                    }
                }
            })	
        }
        else{
            MySwal.fire({
                //icon: 'info',
                width: '350px',
                animation: false,
                title: '',
                text: "Please select at least one item to delete"
            })		 
        }
  	} 

    return (  
    <>  
    <Meta metaData={metaData} />
    <HelmetProvider>
    <Helmet>	
    </Helmet>				
    </HelmetProvider>    

    <div className="pagetitle">
        <h1>Users</h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item active">Users</li>
        </ol>
        </nav>
    </div>

    <section className="section">
    <div className="row">
        <div className="col-md-12">  

            <div className="card">
                <div className="card-body">

                    <div className="row py-2 pt-md-4 pt-2">
                        <div className="col-md-8">

                            <form id="frmFilter" name="frmFilter" method="get" onSubmit={handleFilter}>	
                            <div className="d-flex">
                                    <div className="me-3">
                                        <input type="text" className="form-control border-left-0" placeholder="Device Name" 
                                        id="DeviceName" 
                                        name="DeviceName" 
                                        value={filterData.DeviceName}  
                                        onChange={handleChange} />
                                    </div>
                                    <div className="me-3">
                                        <select className="form-select"
                                        id="Status" 
                                        name="Status" 
                                        value={filterData.Status}  
                                        onChange={handleChange}
                                        >
                                        <option value="">Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">In-Active</option>                                     
                                        </select>
                                    </div>   
                                    <div className="me-3">
                                    <button type="submit" className="btn btn-primary radius-50 px-3 px-md-5">Filter</button>
                                    </div>
                            </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex justify-content-end">    
                                <div className="group ps-2 ps-md-4">                            
                                    <Link className="btn btn-secondary radius-50 px-3" to="/add-device">+ Add New</Link> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row py-2">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead style={{backgroundColor:"#EAF0F0"}}>
                                        <tr className="table-active">
                                            <th>
                                                <div className="form-check">                               
                                                <input className="form-check-input checkall" type="checkbox" onClick={handleCheckall} />
                                                </div>
                                            </th>                                
                                            <th scope="col" className="text-uppercase">Username</th>
                                            <th scope="col" className="text-uppercase">Email</th>  
                                            <th scope="col" className="text-uppercase">Phone</th> 
                                            <th scope="col" className="text-uppercase">Company</th>  
                                            <th scope="col" className="text-uppercase">Role</th>                                                          
                                            <th scope="col" className="text-uppercase text-center">Status</th>  
                                            <th scope="col" className="text-uppercase text-center">Action</th>                                  
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { loader ? 
                                        <tr key={0}>
                                        <td colSpan={8}>
                                        <Loader text="" /> 
                                        </td>
                                        </tr>
                                        : 
                                        <>
                                        {data && data.length > 0 ?
                                            data.map((doc,index) => ( 
                                                <tr key={index}>
                                                    <th>
                                                        <div className="form-check">                                            
                                                        <input type="checkbox" 
                                                        className="form-check-input selected-chk" 
                                                        name="id[]" 
                                                        value={doc.id}
                                                        onChange={updateSelectedDevice}
                                                        />							
                                                        </div>
                                                    </th>                                        
                                                    <th>{doc.DeviceName}</th>
                                                    <th>{doc.DeviceID}</th>  
                                                    <th>{doc.DeviceID}</th>                   
                                                    <th>{doc.DeviceID}</th>                                                         
                                                    <th>{all_function.getFormattedDate(doc.created_at)}</th>  
                                                    <th className="text-center">
                                                    {
                                                        doc.Status=='0' ?
                                                        <i className="bi bi-circle-fill text-danger" 
                                                        title='In-Active'></i>                                                    
                                                        :
                                                        <i className="bi bi-circle-fill text-success" 
                                                        title='Active'></i>
                                                    }                                            
                                                    </th>          
                                                    <th className="text-center">

                                                        <Link title="View Devices" style={{cursor:"pointer"}} to={`/view-user/${doc.DeviceIntID}`} >
                                                        <i className="bi bi-clipboard-data text-primary"></i> Devices
                                                        </Link> 

                                                        <div className="vr"></div> 

                                                        <Link title="Edit" style={{cursor:"pointer"}} to={`/edit-user/${doc.DeviceIntID}`} >
                                                        <i className="bi bi-pencil-square text-primary"></i>
                                                        </Link>  

                                                        <div className="vr"></div> 

                                                        <Link title="Delete" style={{cursor:"pointer"}} to={`/edit-user/${doc.DeviceIntID}`} >
                                                        <i className="bi bi-trash text-danger"></i>
                                                        </Link>   

                                                              
                                                    </th>                                                               
                                                </tr>
                                            ))
                                            :
                                            // <tr>
                                            //     <td colSpan={8}>
                                            //     No Record Found.
                                            //     </td>
                                            // </tr>

                                            <tr>
                                                <th>
                                                    <div className="form-check">                                            
                                                    <input type="checkbox" 
                                                    className="form-check-input selected-chk" 
                                                    name="id[]" 
                                                    value={1}
                                                    onChange={updateSelectedDevice}
                                                    />							
                                                    </div>
                                                </th>                                        
                                                <th>testuser</th>
                                                <th>user@test.com</th>                                        
                                                <th>9874563210</th>  
                                                <th>1</th>  
                                                <th>User</th>  
                                                <th className="text-center">
                                                {
                                                    0==0 ?
                                                    <i className="bi bi-circle-fill text-danger" title='In-Active'></i>                                                    
                                                    :
                                                    <i className="bi bi-circle-fill text-success" title='Active'></i>
                                                   
                                                }                                            
                                                </th>          
                                                <th className="text-center">

                                                        <Link title="View Devices" style={{cursor:"pointer"}} to={`/view-user/1`} >
                                                        <i className="bi bi-clipboard-data text-primary"></i> Devices
                                                        </Link> 

                                                        <div className="vr"></div> 

                                                        <Link title="Edit" style={{cursor:"pointer"}} to={`/edit-user/1`} >
                                                        <i className="bi bi-pencil-square text-primary"></i>
                                                        </Link>  

                                                        <div className="vr"></div> 

                                                        <Link title="Delete" style={{cursor:"pointer"}} to={`/edit-user/1`} >
                                                        <i className="bi bi-trash text-danger"></i>
                                                        </Link>   
                               
                                                </th>                                                               
                                            </tr>
                                        }                            
                                        </>
                                    }  
                                    </tbody>
                                </table>

                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                {total > 1 && 
                                <div className="card-body table-responsive">
                                <Pagination data={{
                                    'total':total,
                                    'item_per_page':item_per_page,
                                    'page_number' :page_number,
                                    'handlePaginate':handlePaginate						
                                }}/>
                                </div>
                                }	
                                </div>                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
    </section>
    </>
  );
 
}
export default User_list;

