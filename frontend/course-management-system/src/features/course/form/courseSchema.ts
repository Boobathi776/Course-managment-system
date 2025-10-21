import z from "zod";

export const courseFromSchema = z.object({
  name: z.string().min(2,"Course name is required"),
  startDate: z
    .date()
    .nullable()
    .refine(
      (val) => {
        if (val != null) {
          return val > new Date();
        }
        return false;
      },
      { message: "start date must be the future date" }
    ),

  courseDuration: z
    .number()
    .min(1, "Course should happen minimum 1 months")
    .max(30, "maximum allowed months is 30"),
  minimumAgeRequired: z
    .number()
    .min(1, "Minimum age should be 1")
    .max(160, "maximum allowed age is 167"),
});

export type CourseFromScemaType = z.infer<typeof courseFromSchema>;
