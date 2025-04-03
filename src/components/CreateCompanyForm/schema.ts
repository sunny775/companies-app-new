import { z } from "zod";

const phoneRegex =
  /^\+\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/i;

const faxRegex =
  /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}(\s?(x|ext\.?)\s?\d{1,6})?$/i;

export const emailSchema = z.string().trim().email("Invalid email format");

export const phoneSchema = z
  .string()
  .trim()
  .regex(phoneRegex, "Invalid phone number format")

export const companyBasicInfoSchema = z.object({
  legalName: z
    .string()
    .trim()
    .min(2, "Legal name must be at least 2 characters")
    .max(100, "Legal name is too long"),

  stateOfIncorporation: z
    .string()
    .trim()
    .min(3, "State of incorporation must be at least 3 characters")
    .max(50, "State of incorporation is too long"),

  industry: z
    .string()
    .trim()
    .min(3, "Industry must be at least 3 characters")
    .max(100, "Industry name is too long"),

  totalNumberOfEmployees: z.number().int().min(1, "Must be a positive number"),

  numberOfFullTimeEmployees: z
    .number()
    .int()
    .min(1, "Must be a positive number"),

  numberOfPartTimeEmployees: z
    .number()
    .int()
    .min(0, "Must be a positive number"),

  website: z.string().trim().regex(urlRegex, "Invalid website URL"),

  linkedInCompanyPage: z
    .string()
    .trim()
    .regex(urlRegex, "Invalid LinkedIn URL"),

  facebookCompanyPage: z
    .string()
    .trim()
    .regex(urlRegex, "Invalid Facebook URL"),

  otherInformation: z
    .string()
    .trim()
    .max(500, "Other information is too long")
    .optional(),

  fax: z.string().trim().regex(faxRegex, "Invalid fax number"),

  phone: phoneSchema,

  email: emailSchema,
});

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  phone: phoneSchema,

  email: emailSchema,
});

export const basicAddressSchema = z.object({
  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country is too long"),
  state: z
    .string()
    .trim()
    .min(2, "State must be at least 2 characters")
    .max(100, "State is too long"),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City is too long"),
  street: z
    .string()
    .trim()
    .min(5, "Street must be at least 5 characters")
    .max(200, "Street is too long"),
  zipCode: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9- ]{3,10}$/, "Invalid zip code format"),
});
