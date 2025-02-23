import React from "react"; 
import { Link } from 'react-router-dom';

const Messages = ()=>{
    return(         
		<>
        <li className="nav-item dropdown">

        <Link className="nav-link nav-icon" to="#" data-bs-toggle="dropdown">
        <i className="bi bi-chat-left-text"></i>
        <span className="badge bg-success badge-number">3</span>
        </Link>

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li className="dropdown-header">
        You have 3 new messages
        <Link to="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>

        <li className="message-item">
        <Link to="#">
        <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
        <div>
        <h4>Maria Hudson</h4>
        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
        <p>4 hrs. ago</p>
        </div>
        </Link>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>

        <li className="message-item">
        <Link to="#">
        <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle" />
        <div>
        <h4>Anna Nelson</h4>
        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
        <p>6 hrs. ago</p>
        </div>
        </Link>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>

        <li className="message-item">
        <Link to="#">
        <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle" />
        <div>
        <h4>David Muldon</h4>
        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
        <p>8 hrs. ago</p>
        </div>
        </Link>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>

        <li className="dropdown-footer">
        <Link to="#">Show all messages</Link>
        </li>

        </ul>

        </li>	
        </>
    )
}
export default Messages;