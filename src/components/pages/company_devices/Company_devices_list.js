import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom'; 
import Parser from 'html-react-parser';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import all_function from '../../../config/all_function';
import Api from '../../../config/Api';
import Pagination from "../../common/pagination/Pagination";
import Meta from '../../common/Meta'; 
import Loader from '../../common/Loader'; 

const Company_devices_list = (props)=>{   

    const { company } = useParams();  

    const metaData = {
        meta_title : 'Company devices',
        meta_description : '',
        meta_keywords : '',
    }   

    const queryParams = new URLSearchParams(window.location.search) 		
    const item_per_page = all_function.limit()
    const __filterData = {
        page:queryParams.get('page') ?? 1,	             
        company: company,        
        device_id:queryParams.get('device_id') ?? '',	
        device_name:queryParams.get('device_name') ?? '',
        device_location:queryParams.get('device_location') ?? '', 	
        unit:queryParams.get('unit') ?? '',	
        status:queryParams.get('status') ?? '',	                
    }

    const [filterData, set_filterData] = useState(__filterData)     
    const [total, set_total] = useState(0)   
    const [data, set_data] = useState([]);  
    const [companyRow, set_companyRow] = useState("");  
    const [next, set_next] = useState("");   
    const [previous, set_previous] = useState("");  
    const [loader, set_loader] = useState(true);   
    const [page, set_page] = useState(__filterData.page);   
    let [selected_item, set_selected_item] = useState([]);    

    const MySwal = withReactContent(Swal)

    useEffect(() => {		
        fetchData(page)        
	},[]); 
    useEffect(() => {		
        fetchCompanyRow(company)        
	},[]); 

    const fetchData = async (page)=>{ 
        set_loader(true)  
        const res = await Api.company_devices({
            company:filterData.company, 
            device_id:filterData.device_id,
            device_name:filterData.device_name,
            device_location:filterData.device_location,
            unit:filterData.unit,
            status:filterData.status,
            page:page,
        })

        if( res && (res.status === 200) ){
            const resData = res.data; 
            //console.log(resData)
            set_total(resData.count)
            set_next(resData.next)
            set_previous(resData.previous)
            set_data(resData.results)   
            set_loader(false)  
        }

        let pageNo = page ?? 1
        set_page(pageNo)
        updateBrowserUrl(pageNo)			
    }
    const fetchCompanyRow = async (company)=>{ 
        const res = await Api.company_row({
            id:company, 
        })
        if( res && (res.status === 200) ){
            const resData = res.data; 
            set_companyRow(resData)   
        }        
    }
    
    const showNext = async (url) => {	
        const urlParams = new URLSearchParams(url);
        const page = urlParams.get('page');
        fetchData(page) 
    };    
    const showPrevious = async (url) => {
        const urlParams = new URLSearchParams(url);
        const page = urlParams.get('page');        
        fetchData(page) 
    };
    

    const updateBrowserUrl = (page)=>{	
		const location = new URL(window.location);
		location.search="";		
        if(page){
          location.searchParams.set('page', page);
        }        
        if(filterData.device_id){			
            location.searchParams.set('device_id', filterData.device_id);        
        }  
        if(filterData.device_name){			
            location.searchParams.set('device_name', filterData.device_name);        
        }  
        if(filterData.device_location){			
            location.searchParams.set('device_location', filterData.device_location);        
        }  
        if(filterData.unit){			
            location.searchParams.set('unit', filterData.unit);        
        }  
        if(filterData.status){			
            location.searchParams.set('status', filterData.status);        
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
      set_page(1)
      updateBrowserUrl(1)			
      fetchData(1)	
    }

    const handlePaginate = (page)=>{	
      set_page(page)
      updateBrowserUrl(page)	
      fetchData(page); 		
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
      updateSelectedItem()	
    }   

    const updateSelectedItem = ()=>{
        let selected_inputs = [] 
        let inputs = document.querySelectorAll('.selected-chk:checked');
        for(var i = 0; i < inputs.length; i++) {             
            selected_inputs.push(inputs[i].value)
        } 
        set_selected_item(selected_inputs)  
    }

    const confirmDelete = async (id)=>{	
		MySwal.fire({
			title: 'Are you sure?',
			text: "You want to delete this item!",			
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
			}).then( async (result) => {
			if (result.isConfirmed) {
				
				const res = await Api.delete_company_devices({  
                    id:id,
                });
                                        
                if( res && ( res.status === 200 || res.status === 204) ){
                    set_page(1)
                    updateBrowserUrl(1)	          
                    fetchData(1)
                    MySwal.fire({
                        //icon: 'success',
                        width: '350px',
                        animation: false,
                        title: 'Deleted!',
                        text: "Selected Company devices has been deleted."
                    })		
                }
			}
		})	
  	}
    
    let total_page   = Math.ceil(total/item_per_page);  
    let start_text   = (total) ? ((page - 1) * item_per_page) + 1 : 0;
    let end_text     = (((page - 1) * item_per_page) > (total - item_per_page)) ? total : (((page - 1) * item_per_page) + item_per_page);
    let display_text = `Showing ${start_text} to ${end_text}  of <strong>${total}</strong> results`;
    let sl_no        = (total) ? ((page - 1) * item_per_page) + 1 : 1;

    return (  
    <>  
    <Meta metaData={metaData} />
    <HelmetProvider>
    <Helmet>	
    </Helmet>				
    </HelmetProvider>    

    <div className="pagetitle">
        <h1>
        {
            companyRow &&
            <>Devices for : {companyRow.name}</>                
        }            
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/companies">Companies</Link></li>
            <li className="breadcrumb-item active">Company devices</li>
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
                                        <input type="text" className="form-control border-left-0" placeholder="Device ID" 
                                        id="device_id" 
                                        name="device_id" 
                                        value={filterData.device_id}  
                                        onChange={handleChange} />
                                    </div>
                                    <div className="me-3">
                                        <select className="form-select"
                                        id="status" 
                                        name="status" 
                                        value={filterData.status}  
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
                                    <Link className="btn btn-secondary radius-50 px-3" to={`/add-company-devices/${company}`}>+ Add New</Link>                            
                                    {/* &nbsp;&nbsp;
                                    <a className="btn btn-danger radius-50 px-3" onClick={()=>confirmDelete()}>
                                       <i className="bi bi-trash"></i>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row py-4">
                        <div className="col-12">
                            <div className='row'>
                            { loader ? 
                                <Loader text="" /> 
                                : 
                                <>
                                {data && data.length > 0 ?
                                    data.map((doc,i) => {
                                        
                                        return(
                                        <div key={i} className="col-lg-6 col-md-6 col-12 py-2">
                                            <div className={`card flex-row h-100 ${ (doc.status)==1 ? 'bg-success' : 'bg-danger'} `}>                                           
                                                <img className="device-img" src="/assets/img/device/2.png" alt="" />                                             
                                                <div className="card-body text-white">                                                
                                                <h5 className="card-title text-white">{doc.device_id}</h5>
                                                <h5 className="card-text mb-1"><b>Name</b> : {doc.device_name}</h5>
                                                <p className="card-text mb-1"><b>Unit</b> : {doc.unit}</p>
                                                <p className="card-text mb-1"><b>Location</b> : {doc.device_location}</p>                               
                                                <p className="card-text mb-1"><b>Note</b> : {doc.note}</p>          

                                                <Link title="Edit" to={`/edit-company-devices/${company}/${doc.id}`} >                                                
                                                <i className="bi bi-pencil-square text-white"></i>
                                                </Link>  
                                                <div className="vr"></div> 
                                                <Link title="Delete" onClick={()=>confirmDelete(doc.id)} >
                                                <i className="bi bi-trash text-white"></i>
                                                </Link>  
                                                <div className="vr"></div> 
                                                <Link  className="text-white" title="Sensor Data" style={{cursor:"pointer"}} to={`/device-data/${doc.id}`} >
                                                <i className="bi bi-clipboard-data text-white"></i> Device Data
                                                </Link>

                                                </div>
                                            </div>  
                                          </div>
                                        )
                                    })
                                    :
                                    <div className="col-sm-4 col-12">
                                    No Record Found.
                                    </div>                                                                  
                                }

                                { 
                                    total_page > 1 &&     
                                    <div className="col-md-12">                                 
                                    <div className="card-body table-responsive px-2">                                        
                                    <div className="text-end">
                                    <span className="p-3">{Parser(display_text)}</span>
                                    <div className="btn-group">                                    
                                    { page == 1 ? 
                                        <button type="button" className="btn btn-secondary" disabled>Previous</button>
                                        : 
                                        <button type="button" className="btn btn-primary" onClick={() => showPrevious(previous) } >Previous</button>
                                    }

                                    { page < total_page ? 
                                        <button type="button" className="btn btn-primary" onClick={() => showNext(next)}>Next</button>
                                        : 
                                        <button type="button" className="btn btn-secondary" disabled>Next</button>						
                                    }	
                                    </div>
                                    </div>
                                    </div>
                                    </div>     
                                }				                        
                                </>
                            }  
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
export default Company_devices_list;

