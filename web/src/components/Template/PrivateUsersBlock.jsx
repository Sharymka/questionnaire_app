import React from 'react';
import {Autocomplete, Box, FormControlLabel, IconButton, Modal, Radio, TextField, Typography} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import {users} from '../../const/const';

function PrivateUsersBlock(props) {

  const {showUsers, setShowUsers} = props;
  const [checkedUsers, setCheckedUsers] = React.useState([]);

  const handleClose = ()=> {
    setShowUsers(!showUsers);
  }

  const handleCheckedUsers = (userId) => {
      setCheckedUsers((prevState) => {
          if (prevState.includes(userId)) {
              return prevState.filter((item)=> item !== userId);
          } else {
              return [...prevState, userId];
          }
      });
  }


  return (
      <>

          <Modal
              open={showUsers}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box
                  className="p-4 card container"
                  sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      maxWidth: 400,
                  }}
              >
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Кому показывать вопрс:
                  </Typography>
                  <Typography id="modal-modal-description">
                      {/*<Autocomplete renderInput={(params) => (*/}
                      {/*    <TextField  variant="outlined" label="Выберите пользователей" />*/}
                      {/*)} options={}/>*/}

                      {/*{*/}
                      {/*    users.map((user, index) => (*/}
                      {/*        // <di>{user.id}</di>*/}
                      {/*        <div key={index} className='d-flex align-items-center'>*/}
                      {/*            <span style={{color: 'black', marginRight: '8px'}}>{index + 1}.</span>*/}
                      {/*            <FormControlLabel*/}
                      {/*                // value={option.value}*/}
                      {/*                control={<Radio checked={checkedUsers.includes(user.id)}/>}*/}
                      {/*                label=""*/}
                      {/*                onClick={() => handleCheckedUsers(user.id)}*/}
                      {/*            />*/}
                      {/*            <MenuItem key={user.name} value={user.name}>*/}
                      {/*                <ListItemText primary={user.first_name + ' ' + user.last_name} />*/}
                      {/*            </MenuItem>*/}
                      {/*        </div>*/}
                      {/*    ))*/}
                      {/*}*/}
                  </Typography>
              </Box>
          </Modal>
      </>

  );
}

export default PrivateUsersBlock;