import { User } from "../model/userTypes";

export const validateSignUpForm = (user: User): string | null => {
  let errors: string | null = null;

  if (!user.email) {
    errors = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors = "Email address is invalid.";
  }

  if (!user.password) {
    errors = "Password is required.";
  } else if (user.password.length < 6) {
    errors = "Password must be at least 6 characters.";
  }

  if (!user.phone) {
    errors = "Phone number is required.";
  } else if (user.phone.length != 10) {
    errors = "Enter valid phone number.";
  }

  if (!user.name.trim()) {
    errors = "Name is required.";
  }

  return errors;
};

export const validateLoginForm = (user: Pick<User, 'email' | 'password'>): string | null => {
    let errors: string | null = null;
    if (!user.email) {
      errors = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors = "Email address is invalid.";
    }
  
    if (!user.password) {
      errors = "Password is required.";
    } else if (user.password.length < 6) {
      errors = "Password must be at least 6 characters.";
    }
  
    return errors;
  };
