
import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';
let Pagination = (props)=> {
    
    let [total_item, set_total_item]        = useState("");
    let [item_per_page, set_item_per_page]  = useState("");
    let [page_number, set_page_number]      = useState(1);
    let handlePaginate                      = props.data.handlePaginate; 
    
    useEffect(() => {   
        set_total_item(props.data.total);
        set_item_per_page(props.data.item_per_page);
        set_page_number(props.data.page_number);		
	},[props]);      
    
    let adjacents           = 3;      
    let limit               = item_per_page; 
    let page                = page_number;                
    
    if(page === 0){
        page = 1; 
    }       
    
    let prev                = page - 1; //previous page is page - 1
    let next                = page + 1; //next page is page + 1
    let lastpage            = Math.ceil(total_item/limit); //lastpage is = total pages / items per page, rounded up.  

    let lpm1                = lastpage - 1; //last page minus 1     
    let start_text          = (total_item) ? ((page - 1) * limit) + 1 : 0;
    let end_text            = (((page - 1) * limit) > (total_item - limit)) ? total_item : (((page - 1) * limit) + limit);
    let display_text        = 'Showing '+start_text+' to '+ end_text+' of '+total_item+' results';
    var counter = 0;

    return(
        <>
            <div className="d-flex justify-content-between">
            <div className="pt-3">
            {display_text}
            </div>
            <div>
                <ul className="pagination" id='pagination'>
                {page > 1 ? 
                    <li key={prev} className="page-item previous"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(prev);}}>Previous</Link></li>                     
                    : <li className="page-item previous disabled"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();}}>Previous</Link></li>  
                }

                {lastpage < 7 + ( adjacents * 2) ? 
                    (()=>{
                        const options = [];
                        for( let i=1; i <= lastpage; i++){ 
                            if(i === page){
                                options.push(<li key={i} className="page-item active"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                  
                            }
                            else{       
                                options.push(<li key={i} className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                     
                            }  
                            counter = i;                 
                        }
                        return options      
                    })()     
                    : lastpage > 5 + ( adjacents * 2) ? 

                        (page <= 1 + (adjacents * 2)) ?   // if                          
                            (()=>{
                                const options = [];
                                for(let i= 1; i < 4 + (adjacents * 2); i++) {
                                    if(i === page){
                                        options.push(<li key={i} className="page-item active"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                  
                                    }
                                    else{
                                        options.push(<li key={i} className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                     
                                    }  
                                    counter = i;                      
                                }
                                return options  
                            })()   
                            (()=>{  
                                const options = [];
                                options.push(<li><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();}}>...</Link></li>)
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(lpm1);}}>{lpm1}</Link></li>)
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(lastpage);}}>{lastpage}</Link></li>)                               
                                return options  
                            })()                   
                        : ( lastpage - (adjacents * 2) > page && page > (adjacents * 2) ) ? //elseif
                            
                            (()=>{ 
                                const options = [];
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(1);}}>1</Link></li>)
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(2);}}>2</Link></li>)
                                options.push(<li><Link to="/" className="page-link">...</Link></li>)
                                return options  
                            })()  
                            (()=>{
                                const options = [];
                                for(let i = page - adjacents; i <= page + adjacents; i++) {
                                    if(i === page){
                                        options.push(<li key={i} className="page-item active"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                  
                                    }
                                    else{
                                        options.push(<li key={i} className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                     
                                    }   
                                    counter = i;                     
                                }
                                return options      
                            })()
                            (()=>{ 
                                const options = [];
                                options.push(<li><Link to="/">...</Link></li>)
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(lpm1);}}>{lpm1}</Link></li>)
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(lastpage);}}>{lastpage}</Link></li>)                                
                                return options  
                            })()                              
                        :  //else
                            (()=>{ 
                                const options = [];
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(1);}}>1</Link></li>)
                                options.push(<li className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(2);}}>2</Link></li>)
                                options.push(<li><Link to="/" className="page-link">...</Link></li>)
                                return options 
                            })()   
                            (()=>{
                                const options = [];
                                for(let i = lastpage - (2 + (adjacents * 2)); i <= lastpage; i++){
                                    if(i === page){
                                        options.push(<li key={i} className="page-item active"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                  
                                    }
                                    else{
                                        options.push(<li key={i} className="page-item"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(i);}}>{i}</Link></li>)                     
                                    }  
                                    counter = i;                      
                                }
                                return options      
                            })()           
                            
                    :
                    ''
                }

                { page <= (counter-1) ? 
                 <li key={next} className="page-item next"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();handlePaginate(next);}}>Next</Link></li> 
                 :
                 <li className="page-item disabled"><Link to="/" className="page-link" onClick={(e)=>{e.preventDefault();}}>Next</Link></li>
                }
                </ul>
            </div>
            </div>
        </>
    )
    
}
export default Pagination;		