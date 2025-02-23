import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Meta from '../../common/Meta';
import Chart from 'react-apexcharts'

import icon_orange from '../../../assets/img/icon-orange.png';
import icon_blue from '../../../assets/img/Icon-blue.png';

const Dashboard = (props)=>{   

  const metaData = {
    meta_title			: 'Dashboard',
    meta_description	: '',
    meta_keywords		: '',
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

    <div className="row">
    <div className="col-md-12">
        <h4 className="dark-text">👋 Hey, FDMS.</h4>
        <p>Here is all your Relik analytics overview</p>
    </div>
    </div>

    <div className="row graphs my-3">
    <div className="col-md-4">
        <div className="card h-100">
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
    <div className="col-md-4">
        <div className="card h-100">
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
    <div className="col-md-4">
        <div className="card h-100">
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

    <div className="row graphs my-3">
    <div className="col-md-12">
        <div className="card h-100">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Today’s Summery</h3>
                        <p>Company Summery</p>
                    </div>
                    <div className="col-md-6 text-success text-md-end">
                        <a href="#" className="btn btn-outline-secondary"><i className="fa fa-upload"></i>
                            Export</a>
                    </div>
                </div>
                <div className="row pt-2 pt-md-4">
                    <div className="col-md-4">
                        <div className="orange_light bg-dash">
                            <img src={icon_orange} className="img-fluid" />
                            <h4 className="fw-bold">Total Number of Clients</h4>
                            <p className="mb-0">545</p>
                            <small className="text-primary">+5% from yesterday</small>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="blue_light bg-dash">
                            <img src={icon_blue} className="img-fluid" />
                            <h4 className="fw-bold">Total Number of Visits</h4>
                            <p className="mb-0">1542</p>
                            <small className="text-primary">+5% from yesterday</small>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="orange_light bg-dash">
                            <img src={icon_orange} className="img-fluid" />
                            <h4 className="fw-bold">Total Number of Customers</h4>
                            <p className="mb-0">245</p>
                            <small className="text-primary">+5% from yesterday</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  );
 
}
export default Dashboard;

