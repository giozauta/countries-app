import React from 'react'
import { useParams,Outlet,Navigate} from 'react-router-dom';

const LangGuard = () => {
    const {lang} = useParams();
    const langs = ['en','ka'];
    
    if(!langs.includes(lang)){
        return <Navigate to = {"/en/cards"}/>
    }
    return <Outlet />
    
}    

export default LangGuard;
