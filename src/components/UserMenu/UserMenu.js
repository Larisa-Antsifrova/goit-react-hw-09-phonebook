// Imports from React
import React, { useCallback } from 'react';

// Imports of components
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Imports from Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserEmail } from '../../redux/auth/auth-selectors';
import { logoutUser } from '../../redux/auth/auth-operations';

// Styles imports
import styles from './UserMenu.module.css';
import { withStyles } from '@material-ui/core/styles';

// Customization of default Chip component from Matarial-UI
const StyledChip = withStyles({
  root: {
    backgroundColor: '#283593',
    color: '#ffffff',
  },
})(Chip);

export default function UserMenu() {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(logoutUser()), [dispatch]);
  const userEmail = useSelector(getUserEmail);

  return (
    <div className={styles.UserMenu}>
      <StyledChip avatar={<Avatar />} label={userEmail} />
      <button onClick={onLogout} className={styles.logoutbutton}>
        <ExitToAppIcon />
      </button>
    </div>
  );
}
