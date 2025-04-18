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

const Device_list = (props)=>{   

    const { company } = useParams();  

    const metaData = {
        meta_title : 'Devices',
        meta_description : '',
        meta_keywords : '',
    }   

    const queryParams = new URLSearchParams(window.location.search) 		
    const item_per_page = all_function.limit()
    const __filterData = {
        page:queryParams.get('page') ?? 1,	             
        company: company ?? '',        
        device_id:queryParams.get('device_id') ?? '',	
        device_type:queryParams.get('device_type') ?? '',	
        device_name:queryParams.get('device_name') ?? '',
        device_location:queryParams.get('device_location') ?? '', 	
        unit:queryParams.get('unit') ?? '',	
        status:queryParams.get('status') ?? '',	                                
    }

    const [filterData, set_filterData] = useState(__filterData)     
    const [total, set_total] = useState(0)   
    const [data, set_data] = useState([]);  
    const [next, set_next] = useState("");   
    const [previous, set_previous] = useState("");  
    const [loader, set_loader] = useState(true);   
    const [page, set_page] = useState(__filterData.page);   
    let [selected_item, set_selected_item] = useState([]);    
    const [selected_company, set_selected_company] = useState(""); 
    const [selected_device, set_selected_device] = useState(""); 
    const device_types = all_function.device_types() ?? []
    const [companies, set_companies] = useState([])  
    const MySwal = withReactContent(Swal)

    useEffect(() => {		
        fetchData(page)        
	},[]); 

    useEffect(() => {	
        fetchCompany()   
    },[]);  

    const fetchData = async (page)=>{ 
        set_loader(true)  
        const res = await Api.company_devices({
            company:filterData.company, 
            device_id:filterData.device_id,
            device_type:filterData.device_type,
            device_name:filterData.device_name,
            device_location:filterData.device_location,
            unit:filterData.unit,
            status:filterData.status,
            page:page,
        })

        if( res && (res.status === 200) ){
            const resData = res.data;             
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

    const fetchCompany = async (id)=>{ 		
        try{				
            const res = await Api.companies({});            
            if( res && (res.status === 200) ){				
            let resData = res.data
            set_companies(resData.results)				
            }			
        }
        catch (err) {
            console.log('err:', err)
        }        
    }	
    

    const assign_device = async (obj)=>{ 
        try{				
            const res = await Api.assign_device(obj);          
            if( res && (res.status === 200) ){				
            fetchData(1)        
            set_selected_company('')	
            selected_device('')							
            }			
        }
        catch (err) {
            console.log('err:', err)
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
          if(filterData.device_type){			
              location.searchParams.set('device_type', filterData.device_type);        
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
                        width: '350px',
                        animation: false,
                        title: 'Deleted!',
                        text: "Selected devices has been deleted."
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
        <h1>Devices</h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>            
            <li className="breadcrumb-item active">Devices</li>
        </ol>
        </nav>
    </div>

    <section className="section">
    <div className="row">
        <div className="col-md-12">  

            <div className="card">
                <div className="card-body">

                    <div className="row py-2 pt-md-4 pt-2">
                        <div className="col-lg-10 col-md-10 COL-12">

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
                                        id="device_type" 
                                        name="device_type" 
                                        value={filterData.device_type}  
                                        onChange={handleChange}
                                        >
                                        <option value="">Device Type</option>
                                        {
                                            device_types.map((val,i)=>{
                                                return(
                                                    <option key={i} value={val}>{val}</option>
                                                )
                                            })
                                        }                                                                                                  
                                        </select>
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
                        <div className="col-lg-2 col-md-2 COL-12">
                            <div className="d-flex justify-content-end">    
                                <div className="group ps-2 ps-md-4">                            
                                    <Link className="btn btn-secondary radius-50 px-3" to={`/add-device`}>+ Add New</Link>                            
                                    {/* &nbsp;&nbsp;
                                    <a className="btn btn-danger radius-50 px-3" onClick={()=>confirmDelete()}>
                                       <i className="bi bi-trash"></i>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row py-2">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr className="table-active">
                                            <th scope="col" className="text-uppercase">#</th> 
                                            <th scope="col" className="text-uppercase">Device ID</th>                                            
                                            <th scope="col" className="text-uppercase">Device Name</th>                                              
                                            <th scope="col" className="text-uppercase">Device Type</th>  
                                            <th scope="col" className="text-uppercase">Company</th>              
                                            <th scope="col" className="text-uppercase text-center">Status</th>  
                                            <th scope="col" className="text-uppercase text-center">Action</th>                                  
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { loader ? 
                                        <tr key={0}>
                                            <td colSpan={7}>
                                            <Loader text="" /> 
                                            </td>
                                        </tr>
                                        : 
                                        <>
                                        {data && data.length > 0 ?
                                            data.map((doc,i) => ( 
                                                <tr key={i}>
                                                    <td>{sl_no++}</td>                                        
                                                    <td>{doc.device_id}</td>
                                                    <td>{doc.device_name}</td> 
                                                    <td>{doc.device_type}</td>                                
                                                    <td>
                                                    {
                                                        doc.company ==  1 ?
                                                        <>
                                                        <select className="form-select"
                                                        id="company" 
                                                        name="company"                                                         
                                                        onChange={
                                                            (e) => {
                                                                set_selected_company(e.target.value)
                                                                set_selected_device(doc.id)
                                                            }
                                                        }
                                                        >
                                                        <option value="">--</option>  
                                                        { 
                                                            companies.map((val,j)=>{
                                                                if(val.id!=1){
                                                                    return(
                                                                        <option key={j} value={val.id}>{val.name}</option>
                                                                    )
                                                                }                                                                
                                                            })
                                                        }
                                                        </select>
                                                        </>
                                                        :
                                                        doc.company_name
                                                    }
                                                    </td>  
                                                    <td className="text-center">
                                                    {
                                                        doc.status=='0' ?
                                                        <i className="bi bi-circle-fill text-danger" 
                                                        title='In-Active'></i>                                                    
                                                        :
                                                        <i className="bi bi-circle-fill text-success" 
                                                        title='Active'></i>
                                                    }                                            
                                                    </td>          
                                                    <td className="text-center">

                                                        {
                                                            doc.company == 1 &&
                                                            <>
                                                            <button 
                                                            type="button" 
                                                            className={`${ (selected_company && selected_device==doc.id) ? 'btn btn-secondary btn-sm' : 'btn btn-secondary btn-sm disabled' }`}
                                                            onClick={()=>assign_device({                                                            
                                                                id:selected_device,
                                                                company:selected_company
                                                            })}
                                                            >Assign</button>
                                                            <div className="vr"></div>
                                                            </>
                                                        }                                                         

                                                        <Link title="Sensor Data" to={`/${doc.device_type.toLowerCase()}-device-data/${doc.id}`}  >
                                                        View
                                                        </Link> 

                                                        <div className="vr"></div> 

                                                        <Link title="Edit" to={`/edit-device/${doc.id}`} >
                                                        <i className="bi bi-pencil-square text-primary"></i>
                                                        </Link>  

                                                        <div className="vr"></div> 

                                                        <Link title="Delete" onClick={()=>confirmDelete(doc.id)} >
                                                        <i className="bi bi-trash text-danger"></i>
                                                        </Link>   
                                                              
                                                    </td>                                                               
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={7}>
                                                No Record Found.
                                                </td>
                                            </tr>                                            
                                        } 
                                        { 
                                            total_page > 1 &&  
                                            <tr>
                                            <td colSpan={7} className='pt-3'>
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
                                            </td>
                                            </tr>     
                                        }				                           
                                        </>
                                    }  
                                    </tbody>
                                </table>

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
export default Device_list;

