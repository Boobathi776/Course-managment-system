import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    fileUploadSchema,
    type FileUploadSchemaType,
} from "./fileUploadSchema";

const FileUpload = () => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FileUploadSchemaType>({
    resolver: zodResolver(fileUploadSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [preview, setPreview] = useState<{ name: string; image: string | null }>({
    image: "",
    name: "",
  });

  const onSubmit = async (formData: FileUploadSchemaType) => {
    console.log("submit button clicked");
    console.log(formData);
    const myFormData = new FormData();
    myFormData.append("file", formData.file[0]);

    try {
      const response = await axios.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload success:", response.data);
    } catch (err: any) {
      console.error("Upload error:", err.response?.data || err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="file"
        control={control}
        render={({ field }) => {
          return (
            <>
              <Button component="label" variant="outlined">
                Upload file
                <input
                  hidden
                  type="file"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    if (e.target.files && e.target.files.length > 0) {
                      const fileName = e.target.files[0].name;
                      const imageURl = URL.createObjectURL(e.target.files[0]);
                      setPreview({
                        name: fileName,
                        image: imageURl,
                      });
                    }
                  }}
                ></input>
              </Button>
              {preview.name}
              {preview.image && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={preview.image}
                    alt="Preview"
                    width="200"
                    style={{ borderRadius: 8, border: "1px solid #ccc" }}
                  />
                </Box>
              )}
            </>
          );
        }}
      />

      <Button type="submit" variant="contained">
        Upload
      </Button>


    </Box>
  );
};

export default FileUpload;
