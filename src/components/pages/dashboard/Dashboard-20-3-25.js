import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Meta from '../../common/Meta';
import Chart from 'react-apexcharts'

const Dashboard = (props)=>{   

  const metaData = {
    meta_title			  : 'Dashboard',
    meta_description	: '',
    meta_keywords		  : '',
  }   

  const chart1_options = {
    options: {
        chart: {
          id: 'chart1'
        },
        colors: ['#345beb'],
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    },
    series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]
  }  
  
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
        colors: ['#77B6EA', '#545454'],
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            text: 'Month'
          }
        },
        yaxis: {
          title: {
            text: 'Temperature'
          },
          min: 5,
          max: 40
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
          name: "High - 2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
    }  
    
    const chart3_options = {
        options: {
            chart: {
              id: 'chart3'
            },
            colors: ['#ebd334'],
            xaxis: {
              categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
            }
        },
        series: [{
            name: 'series-1',
            data: [50, 60, 70, 200, 75, 300, 250]
        }]
    }  

  return (  
    <>  
    <Meta metaData={metaData} />
    <HelmetProvider>
    <Helmet>	 
    </Helmet>				
    </HelmetProvider>

    <div className="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>

    <section className="section dashboard">

      <div className="row">  
          <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Sales <span>| Today</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart"></i>
                  </div>
                  <div className="ps-3">
                    <h6>145</h6>
                    <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xxl-4 col-md-6">
            <div className="card info-card revenue-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Revenue <span>| This Month</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <div className="ps-3">
                    <h6>$3,264</h6>
                    <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xxl-4 col-xl-12">
            <div className="card info-card customers-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Customers <span>| This Year</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="ps-3">
                    <h6>1244</h6>
                    <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="row">    

          <div className="col-lg-4 col-md-6 col-12">
            <div className="card p-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 pe-0"><small className="text-uppercase">Active Visitors</small>
                            <h3 className="card-title">157,367</h3>
                        </div>
                        <div className="col-md-6 text-success text-md-end"><small>&#8593;6.7% Increase</small></div>
                    </div>
                    {/* <div id="sales_chart"></div> */}
                    <Chart options={chart1_options.options} series={chart1_options.series} type="bar"  height={250} />
                </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="card p-3">
              <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 pe-0"><small className="text-uppercase">Visitor per minute</small>
                            <h3 className="card-title">9,741</h3>
                        </div>
                        <div className="col-md-6 text-danger text-md-end"><small>&#8595; 13.5% Decrease</small>
                        </div>
                    </div>
                    {/* <div id="apex-line-chart1"></div> */}
                    <Chart options={chart2_options.options} series={chart2_options.series} type="line"  height={250} />
                </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="card p-3">
              <div className="card-body">
                  <div className="row">
                      <div className="col-md-6 pe-0"><small className="text-uppercase">Conversion Rate</small>
                          <h3 className="card-title">9.73%</h3>
                      </div>
                      <div className="col-md-6 text-success text-md-end"><small>&#8593; 3.5% Increase</small>
                      </div>
                  </div>
                  {/* <div id="sales_chart"></div> */}
                  <Chart options={chart3_options.options} series={chart3_options.series} type="bar"  height={250} />
              </div>
            </div>
          </div>

      </div>      

    </section>
    
    </>
  );
 
}
export default Dashboard;

