import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar text-white">
      
      {/* Header */}
      <div className="sidebar-header p-0 d-flex align-items-center justify-content-center">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          style={{ width: "150px" }}
        />
      </div>

      <ul className="nav flex-column px-2 pt-3">

        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            <i className="fa fa-home me-2"></i> Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/users">
            <i className="fa fa-users me-2"></i> Users
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link text-white" to="/children">
            <i className="fa fa-child me-2"></i> Children
          </Link>
        </li> */}

        {/* <li className="nav-item">
          <Link className="nav-link text-white" to="/audio-records">
            <i className="fa fa-microphone me-2"></i> Audio Records
          </Link>
        </li> */}

        <li className="nav-item">
          <Link className="nav-link text-white" to="/ai-predictions">
            <i className="fa fa-robot me-2"></i> AI Predictions
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link text-white" to="/training-data">
            <i className="fa fa-database me-2"></i> Training Data
          </Link>
        </li> */}

        {/* <li className="nav-item">
          <Link className="nav-link text-white" to="/feedback">
            <i className="fa fa-comment-dots me-2"></i> Feedback
          </Link>
        </li> */}

          <li className="nav-item">
          <Link className="nav-link text-white" to="/faq">
            <i className="fa fa-question-circle me-2"></i> FAQ
          </Link>
        </li>

         <li className="nav-item">
          <Link className="nav-link text-white" to="/contact">
            <i className="fa fa-envelope me-2"></i> Contact
          </Link>
        </li>

          <li className="nav-item">
          <Link className="nav-link text-white" to="/notifications">
            <i className="fa fa-bell me-2"></i> Notifications
          </Link>
        </li>

       

      </ul>
    </nav>
  );
}



