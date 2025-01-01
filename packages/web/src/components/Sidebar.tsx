import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="sidebar" style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #dee2e6',
      padding: '20px'
    }}>
      <nav>
        <h3 style={{ color: "#333" }}>メニュー</h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/" style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '16px'
            }}>Home</Link>
          </li>
          <li>
            <Link to="/about" style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '16px'
            }}>About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
