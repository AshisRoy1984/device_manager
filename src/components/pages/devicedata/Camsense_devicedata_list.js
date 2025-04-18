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
import Chart from 'react-apexcharts'

const Camsense_devicedata_list = (props)=>{   

    const { device } = useParams();  

    const metaData = {
        meta_title : 'Device data',
        meta_description : '',
        meta_keywords : '',
    }   

    const queryParams = new URLSearchParams(window.location.search) 		
    const item_per_page = all_function.limit()
    const __filterData = {
        page:queryParams.get('page') ?? 1,	
        timestamp_after:queryParams.get('timestamp_after') ?? '',	
        timestamp_before:queryParams.get('timestamp_before') ?? '',
        status:queryParams.get('status') ?? '',
    }

    const [filterData, set_filterData] = useState(__filterData)     
    const [total, set_total] = useState(0)   
    const [data, set_data] = useState([]);  
    const [deviceRow, set_deviceRow] = useState("");  
    const [next, set_next] = useState("");   
    const [previous, set_previous] = useState("");  
    const [loader, set_loader] = useState(true);   
    const [page, set_page] = useState(__filterData.page);    
    const statusArr = ['STUCK','MOTION','DEFAULT']

    const MySwal = withReactContent(Swal)

    useEffect(() => {		
        fetchDevice(device)        
    },[]); 

    useEffect(() => {		
        fetchData(page)        
    },[]);

    const fetchDevice = async (device)=>{        
        const res = await Api.company_device_row({
            id:device,             
        })       
        if( res && (res.status === 200) ){
            const resData = res.data; 
            set_deviceRow(resData) 
        }       			
    }

    const fetchData = async (page)=>{ 
        set_loader(true)  

        const res = await Api.company_device_row({
          id:device,             
        })       
        const deviceRow = res.data; 
        if(deviceRow){
              const res = await Api.camsense_device_sensor_data({
                  device:deviceRow.device_id,  
                  timestamp_after:filterData.timestamp_after,
                  timestamp_before:filterData.timestamp_before,
                  status:filterData.status,
                  page:page,
              })
              if( res && (res.status === 200) ){
                  const resData = res.data; 
                  console.log(resData)
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
        else{
          set_loader(false)  
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
        if(filterData.timestamp_after){			
            location.searchParams.set('timestamp_after', filterData.timestamp_after);        
        }  
        if(filterData.timestamp_before){			
            location.searchParams.set('timestamp_before', filterData.timestamp_before);        
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
            
            const res = await Api.delete_camsense_device_sensor_data({  
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
                    text: "Selected device data has been deleted."
                })		
            }
          }
        })	
  	}

    var map_data = []
    data.map((val,i)=>{
      let time = all_function.getDateTime(val.timestamp)
      map_data[i] = { time:time, value:val.count }
    })
    map_data.sort((a, b) => a.time < b.time ? -1 : (a.time > b.time ? 1 : 0))    

    var categories = []
    map_data.map((val,i)=>{      
      categories[i] = val.time
    })

    var series = []
    map_data.map((val,i)=>{      
      series[i] = val.value
    })

    var max_series = Math.max(...series) + 5   

    const chart2_options = {
        options: {
          chart: {
            id: 'chart2',
            height: 250,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA'],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            //text: 'Average High & Low Temperature',
            text: '',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: categories, //['08:23', '15:11', '19:24', '19:25', '20:04', '20:40', '20:44'],
            title: {
              text: 'Time'
            }
          },
          yaxis: {
            title: {
              text: 'Count'
            },
            min: 0,
            max: max_series
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        },
        series: [
          {
            name: "Count",
            data: series, //[28, 29, 33, 36, 32, 32, 33]
          }          
        ],
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
            deviceRow &&
            <>Device data for : {deviceRow.device_id}</>                
        } 
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/devices">Devices</Link></li>
            <li className="breadcrumb-item active">Device data</li>
        </ol>
        </nav>
    </div>

    <section className="section">
    <div className="row">
        <div className="col-md-12">  

            <div className="card">
                <div className="card-body">

                    <div className="row py-2 pt-md-4 pt-2">
                        <div className="col-lg-6 col-md-6 col-12">
                            {
                                deviceRow ?
                                <>
                                <div className={`card flex-row border border-secondary rounded-3 ${ (deviceRow.status)==1 ? 'bg-light' : 'bg-light'} `}>  
                                    <img className="device-img"  src="/assets/img/device/2.png" alt="" />                                             
                                    <div className="card-body">
                                      <h5 className="card-title">{deviceRow.device_id}</h5>
                                      <h5 className="card-text mb-1"><b>Name</b> : {deviceRow.device_name}</h5>                                      
                                      <p className="card-text mb-1"><b>Location</b> : {deviceRow.device_location}</p>  
                                      <p className="card-text mb-1"><b>Device Type</b> : {deviceRow.device_type}</p> 
                                      <p className="card-text mb-1">
                                        <b>Status</b> : &nbsp;
                                        {
                                            deviceRow.status=='0' ?                                           
                                            <button type="button" className="btn btn-danger btn-sm">In-Active</button>                                                 
                                            :
                                            <button type="button" className="btn btn-success btn-sm">Active</button> 
                                        }              
                                      </p> 
                                      <p className="card-text mb-1"><b>Threshold</b> : {deviceRow.threshold}</p> 
                                      <p className="card-text mb-1"><b>Trigger</b> : {deviceRow.trigger}</p>  
                                      <p className="card-text mb-1"><b>Unit</b> : {deviceRow.unit}</p>                      
                                      <p className="card-text mb-1"><b>Note</b> : {deviceRow.note}</p>          
                                    </div>
                                </div>
                                </>
                                :
                                <Loader text="" /> 
                            }
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className={`card h-100 `}>  
                                <div className="card-body">     
                                  {
                                    loader ?    
                                    <div className="text-center" style={{paddingTop:"100px"}}>                                 
                                    <Loader text="" />  
                                    </div>                                  
                                    :                                    
                                    <Chart 
                                        options={chart2_options.options} 
                                        series={chart2_options.series} 
                                        type="line"  
                                        height={250} 
                                    />                                    
                                  }  
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="row py-2 pt-md-4 pt-2">
                        <div className="col-md-10">

                            <form id="frmFilter" name="frmFilter" method="get" onSubmit={handleFilter}>	
                            <div className="d-flex">                                    
                                    <div className="me-3">
                                        <input type="datetime-local" className="form-control border-left-0" placeholder="From Date" 
                                        id="timestamp_after" 
                                        name="timestamp_after" 
                                        value={filterData.timestamp_after}  
                                        onChange={handleChange} />
                                    </div>
                                    <div className="me-3">
                                        <input type="datetime-local" className="form-control border-left-0" placeholder="To Date" 
                                        id="timestamp_before" 
                                        name="timestamp_before" 
                                        value={filterData.timestamp_before}  
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
                                        {
                                          statusArr.map((val,i)=>{
                                            return(
                                              <option key={i} value={val}>{val}</option>
                                            )
                                          })
                                        }                                
                                        </select>
                                    </div>   
                                    <div className="me-3">
                                    <button type="submit" className="btn btn-primary radius-50 px-3 px-md-5">Filter</button>
                                    </div>
                            </div>
                            </form>
                        </div>
                        <div className="col-md-2">
                            <div className="d-flex justify-content-end">    
                                <div className="group ps-2 ps-md-4">                            
                                    <Link className="btn btn-secondary radius-50 px-3" to={`/add-camsense-device-data/${device}`}>+ Add New</Link>                            
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
                        <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead style={{backgroundColor:"#EAF0F0"}}>
                                        <tr className="table-active">
                                            <th scope="col" className="text-uppercase">#</th>                                             
                                            <th scope="col" className="text-uppercase">Time</th> 
                                            <th scope="col" className="text-uppercase text-center">Count</th>
                                            <th scope="col" className="text-uppercase text-center">IP Aaddress</th>  
                                            <th scope="col" className="text-uppercase text-center">Status</th>  
                                            <th scope="col" className="text-uppercase text-center">Action</th>                                  
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { loader ? 
                                        <tr key={0}>
                                        <td colSpan={6}>
                                        <Loader text="" /> 
                                        </td>
                                        </tr>
                                        : 
                                        <>
                                        {data && data.length > 0 ?
                                            data.map((doc,index) => ( 
                                                <tr key={index}>
                                                    <td>{sl_no++}</td> 
                                                    <td>{all_function.getFormattedDate(doc.timestamp)}</td>
                                                    <td className="text-center">{doc.count}</td> 
                                                    <td className="text-center">{doc.ip_address}</td>    
                                                    <td className="text-center">{doc.status}</td>                                                          
                                                    <td className="text-center">

                                                        <Link title="Edit" to={`/edit-camsense-device-data/${device}/${doc.id}`} >
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
                                                <td colSpan={6}>
                                                No Record Found.
                                                </td>
                                            </tr>                                          
                                        } 

                                        { 
                                            total_page > 1 &&    
                                            <tr>
                                            <td colSpan={6} className="pt-3">
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
export default Camsense_devicedata_list;

