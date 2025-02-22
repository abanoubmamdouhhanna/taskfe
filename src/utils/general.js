import joi from 'joi'

export const generalFeilds = {
  firstName: joi.string().min(3).max(20).messages({
    "any.required": "First name is required",
    "string.empty": "First name cant't be empty",
    "string.base": "First name should be a type of string!",
    "string.min": "First name should be at least 3 characters!",
    "string.max": "First name should be less than 20 characters!",
  }),
  lastName: joi.string().min(3).max(20).messages({
    "any.required": "Last name is required",
    "string.empty": "Last name cant't be empty",
    "string.base": "Last name should be a type of string!",
    "string.min": "Last name should be at least 3 characters!",
    "string.max": "Last name should be less than 20 characters!",
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.email": "Email must be valid!!",
      "string.empty": "Email is not allowed to be empty",
    }),
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .messages({
      "string.pattern.base":
        "password must be at least eight characters long, with at least one letter and one number",
    }),

  cPassword: joi.string().messages({
    "any.only": "The confirmation password must be the same as the password",
  }),
  phone: joi
    .string()
    .pattern(/^(\+2)?01[0125][0-9]{8}$/)
    .messages({ "string.pattern.base": "please Enter a valid phone Number" }),
};
