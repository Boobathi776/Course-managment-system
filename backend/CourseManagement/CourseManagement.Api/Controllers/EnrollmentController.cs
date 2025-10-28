using CourseManagement.DataAccess.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        IWebHostEnvironment _environment;
        public EnrollmentController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }



        //    [HttpPost("file-upload")]
        //    public async Task<string> StoreFile([FromForm] FileUploadDto model)
        //    {
        //        if(model.file.Length == 0) throw new ArgumentNullException("model");
        //        if(model.file.Length >0)
        //        {
        //            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
        //            if(!Directory.Exists(uploadsFolder))
        //            {
        //                Directory.CreateDirectory(uploadsFolder);
        //            }
        //            var uniqueFileName = Guid.NewGuid().ToString() + "_" + model.file.FileName;
        //            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        //            using (var stream = new FileStream(filePath, FileMode.Create))
        //            {
        //                await model.file.CopyToAsync(stream);
        //            }


        //            return $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
        //        }
        //        return "nothing";
        //    }
        //}


        //public class FileUploadDto
        //{
        //    public string Name { get; set; }
        //    public IFormFile file { get; set; }
        //}
    }

}
