const editUserValidator = ({ name, email, exp, tags }) => {
  const errors = {
    name: "",
    email: "",
    exp: "",
    tags: "",
  };

  if (!name) {
    errors.name = "Name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  }

  if (!exp) {
    errors.exp = "Experience is required";
  }
  if (tags.length <= 0) {
    errors.tags = "Tags are required";
  }

  return errors;
};

export default editUserValidator;
