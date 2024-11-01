import { Post, User } from "../model/userTypes";

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

export const validateLoginForm = (
  user: Pick<User, "email" | "password">
): string | null => {
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
export const validatePost = (post: Post): string | null => {
  let errors: string | null = null;
  if (!post.name.trim()) {
    return (errors = "Name is required.");
  } else if (post.name.length < 3) {
    return (errors = "Enter valid name.");
  }

  if (!post.description.trim()) {
    return (errors = "Description is required.");
  } else if (post.description.length < 3) {
    return (errors = "Enter valid description.");
  }

  if (!post.price.trim()) {
    return errors = "Price is required.";
  } else if (Number(post.price) <= 0) {
    return (errors = "Enter valid price.");
  }

  if (!post.images[0] || !post.images[1] || !post.images[2]) {
    return (errors = "Upload All Images");
  }
  return null;
};
