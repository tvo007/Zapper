
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const usePath = param => {
  const [newPath] = useState (param);

   const history = useHistory();

  const routeChange = () => {
    let path = newPath;
    history.push (path);
  };

  return {
    routeChange,
  };
};

export default usePath;
