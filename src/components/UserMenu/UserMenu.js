// Imports from React
import React from 'react';
// Imports of components
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// Imports from Redux
import { connect } from 'react-redux';
import { getUserName, getUserEmail } from '../../redux/auth/auth-selectors';
import { logoutUser } from '../../redux/auth/auth-operations';
// Imports of helpers
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// Styles imports
import styles from './UserMenu.module.css';

// Customization of default Chip component from Matarial-UI
const StyledChip = withStyles({
  root: {
    'background-color': '#283593',
    color: '#ffffff',
  },
})(Chip);

const UserMenu = ({ userEmail, onLogout }) => {
  return (
    <div className={styles.UserMenu}>
      <StyledChip avatar={<Avatar />} label={userEmail} />
      <button onClick={onLogout} className={styles.logoutbutton}>
        <ExitToAppIcon />
      </button>
    </div>
  );
};

UserMenu.defaultProps = {
  userEmail: null,
};

UserMenu.propTypes = {
  userEmail: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userName: getUserName(state),
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = {
  onLogout: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
