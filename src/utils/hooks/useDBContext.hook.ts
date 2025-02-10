import {useContext} from 'react';
import {DBContext} from '../../../App';

export function useDBContext() {
  const context = useContext(DBContext);

  if (!context) {
    throw new Error('Must be used inside of DB Context Provider');
  }

  return context;
}
