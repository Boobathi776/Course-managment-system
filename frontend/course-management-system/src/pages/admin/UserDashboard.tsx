import { Box } from '@mui/material'
import UserForm from '../../features/user/form/UserForm'

const UserDashboard = () => {
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <UserForm/>
    </Box>
  )
}

export default UserDashboard
