using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Dto.ResponseDto
{
    public class GenericResponseDto<T>
    {
        public int StatusCode { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; } 
        public T Data { get; set; }
        
    }
}
