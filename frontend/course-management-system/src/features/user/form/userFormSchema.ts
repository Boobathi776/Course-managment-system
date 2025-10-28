import z, { email } from "zod";

export const newUserFormShema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z .]{3,150}$/, { message: "Enter a valid name" }),
  email: z.email("Enter a valid email address"),
  dateOfBirth: z
    .date()
    .nullable()
    .refine(
      (dob) => {
        if (dob !== null) {
          const today = new Date();
          const oneYearBefore = new Date(today).setFullYear(
            today.getFullYear() - 1
          );
          return new Date(oneYearBefore) > dob;
        }
        return false;
      },
      { message: "Please choose a valid date of birth (minimum 1 age)" }
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*&()])[a-zA-Z0-9!@#$%^&*()]{8,150}$/,
      {
        message:
          "password should contain 1 Captial,1 small letter and 1 number and 1 special letter and minimum 8 letters for strong password",
      }
    ),
  confirmPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*&()])[a-zA-Z0-9!@#$%^&*()]{8,150}$/,
      {
        message:
          "password should contain 1 Captial,1 small letter and 1 number and 1 special letter and minimum 8 letters for strong password",
      }
    ),
  roleId: z.boolean(),
  isActive: z.boolean(),
})
.refine((data)=>{
    if(data.confirmPassword===data.password) return true;
    return false
}
,{message : "Confirm password not match with password",path:["confirmPassword"]});

export type NewUserFormType = z.infer<typeof newUserFormShema>;



export const updateUserFormSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z .]{3,150}$/, { message: "Enter a valid name" }),
  email: z.email("Enter a valid email address"),
  dateOfBirth: z
    .date()
    .nullable()
    .refine(
      (dob) => {
        if (dob !== null) {
          const today = new Date();
          const oneYearBefore = new Date(today).setFullYear(
            today.getFullYear() - 1
          );
          return new Date(oneYearBefore) > dob;
        }
        return false;
      },
      { message: "Please choose a valid date of birth (minimum 1 age)" }
    ),
  roleId: z.boolean(),
  isActive: z.boolean(),
});


export type UpdateUserFormType = z.infer<typeof updateUserFormSchema>;
