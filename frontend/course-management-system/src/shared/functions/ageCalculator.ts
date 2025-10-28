export const ageCalculator = (dateOfBirth: Date): number => {
  const today = new Date();
  const actualDateOfBirth = new Date(dateOfBirth);
  let age = today.getFullYear() - actualDateOfBirth.getFullYear();
  if (
    actualDateOfBirth.getMonth() > today.getMonth() ||
    (actualDateOfBirth.getMonth() === today.getMonth() &&
      actualDateOfBirth.getDay() > today.getDay())
  ) {
    return age--;
  } else {
    return age;
  }
};
