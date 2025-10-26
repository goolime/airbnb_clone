import { useLocation } from 'react-router-dom';

export function AppearOnURL({pathName, children }) {
  const location = useLocation();
  const isActive = location.pathname === pathName;

  return isActive ? children : null;
}