export const splitCamelPascalCase = (str: string): string => {
    const result = str.replace(/([a-zA-Z])([A-Z])/g, "$1 $2");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };