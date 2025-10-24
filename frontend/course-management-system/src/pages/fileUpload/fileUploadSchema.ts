import z from "zod";

export const fileUploadSchema = z.object({
  file: z
    .any()
    .refine((f) => f instanceof File, { message: "File is required" })
    .refine((file : File[])=>file?.[0]?.size <= 2*1024*1024,{message : "maximum file size is 2 mb"} ),
});


export type FileUploadSchemaType = z.infer<typeof fileUploadSchema>;
