const API_URL = import.meta.env.VITE_API_URL ||'https://sensei-academy-api.onrender.com';
export function getToken(){ return localStorage.getItem('sensei_token'); }
export async function api(path, options={}){
  const token=getToken();
  const response=await fetch(`${API_URL}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} : {}),...(options.headers||{})}});
  const data=await response.json().catch(()=>({message:'Unexpected server response'}));
  if(!response.ok) throw new Error(data.message||'Request failed');
  return data;
}
