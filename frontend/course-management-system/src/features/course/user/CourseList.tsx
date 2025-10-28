import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../store/store';
import { fetchCourses, type Course } from '../../../store/slices/courseSlice';
import { useSelector } from 'react-redux';
import { getAccessToken, getAllCourses, getUser } from '../../../store/selectors/overAllSelcetors';
import CourseCard from './CourseCard';
import { tokenDecoder } from '../../../shared/functions/tokenDecocer';
import { ageCalculator } from '../../../shared/functions/ageCalculator';

const CourseList = () => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchCourses());
    },[]);

    const user = useSelector(getUser);

    let dateofBirth = user ? user.dateOfBirth : new Date(); 

    const age = ageCalculator(dateofBirth);

    const courses :Course[] = useSelector(getAllCourses);

  return (
    <Box sx={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5}}>
        {
            courses && courses.map(course=>{

                return(
                    <CourseCard key={course.id} course={course} age={age} />
                );
            })
        }
    </Box>
  )
};

export default CourseList;
