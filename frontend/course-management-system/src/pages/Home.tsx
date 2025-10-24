import { FileUpload as Up } from '@mui/icons-material'
import { Typography } from '@mui/material'
import FileUpload from './fileUpload/FileUpload'

const Home = () => {
  return (
    <div>
      <Typography fontSize="contrast">Home page</Typography>
      <Up></Up>
      <FileUpload/>
    </div>
  )
}

export default Home
