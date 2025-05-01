import { z } from "zod";

export const formatZodErrors = (error: z.ZodError): Record<string, string[]> => {
  const errorMap: Record<string, string[]> = {};

  error.errors.forEach((err) => {
    const path = err.path.join(".");

    if (!errorMap[path]) {
      errorMap[path] = [];
    }

    errorMap[path].push(err.message);
  });

  return errorMap;
};

export const validateSchema = <T extends z.ZodType>(schema: T, data: Partial<z.infer<typeof schema>>) => {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = formatZodErrors(error);
      return {
        success: false,
        errors: formattedErrors,
      };
    }

    return {
      success: false,
      errors: { _global: ["An unexpected error occurred during validation"] },
    };
  }
};
