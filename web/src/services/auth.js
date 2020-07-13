export const  isAuthenticated = () => {
  const token = localStorage.getItem('sessionToken');
  if(token) return true;
  return false;
}