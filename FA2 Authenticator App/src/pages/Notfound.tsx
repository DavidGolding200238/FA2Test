import { useLocation } from "react-router-dom";
import {useEffect } from 'react' ;

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('Route not found:', location.pathname );
  }, [location.pathname]);
  

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page <code>{location.pathname}</code> does not exist.</p>
    </div>
  );
};
export default NotFound;