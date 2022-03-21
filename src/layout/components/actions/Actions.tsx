import React from 'react';
import { useDispatch,useSelector} from "react-redux";
import './Actions.scss';

import Notifications from './Notifications';
import SettingsDropdown from './SettingsDropdown';
import { AppState, store } from '../../../redux/store';

const Actions = () => {
  const user=useSelector((state:AppState)=>state.login["user"]);

  return(
  
  
  <div className='actions'>
    
    {/* <Notifications /> */}
   { user && <span>{user["name"]} ({user["role"]})</span>}
    <SettingsDropdown />
  </div>

  )
  };

export default Actions;
