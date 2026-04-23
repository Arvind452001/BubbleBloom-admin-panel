'use client';

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header({ title }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="p-0">
      <div className="header-inner">
        <div className="page-title">
          <button
            id="toggleBtn"
            className="btn btn-outline-secondary me-2"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h4 className="mb-0">{title}</h4>
        </div>
        <div className="header-actions d-flex align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-link d-flex align-items-center text-decoration-none dropdown-toggle"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: 'none', background: 'none' }}
            >
              <span className="me-2 d-none d-md-inline text-muted small">Admin</span>
              <img src="/assets/images/avatar.svg" alt="avatar" className="avatar rounded-circle" />
            </button>
            <ul
  className="dropdown-menu dropdown-menu-end"
  aria-labelledby="userDropdown"
  style={{ padding: "4px 0", minWidth: "140px" }}
>
  {/* <li>
    <button
      onClick={() => navigate('/my-profile')}
      className="dropdown-item text-primary"
      style={{
        border: 'none',
        background: 'none',
        width: '100%',
        textAlign: 'left',
        padding: '6px 10px',
        fontSize: '14px',
        lineHeight: '1.2'
      }}
    >
      My Profile
    </button>
  </li> */}

  <li>
    <button
      onClick={handleLogout}
      className="dropdown-item text-danger"
      style={{
        border: 'none',
        background: 'none',
        width: '100%',
        textAlign: 'left',
        padding: '6px 10px',
        fontSize: '14px',
        lineHeight: '1.2'
      }}
    >
      Logout
    </button>
  </li>
</ul>
          </div>
        </div>
      </div>
    </header>
  )
}
