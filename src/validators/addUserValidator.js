const addUserValidator = ({
  name,
  email,
  password,
  exp,
  tags,
  position,
  dept,
}) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    exp: "",
    tags: "",
    position: "",
    dept: "",
  };

  if (!name) {
    errors.name = "Name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 4) {
    errors.password = "Password length must be greater than 4 ";
  }

  if (!exp) {
    errors.exp = "Experience is required";
  }
  if (tags.length <= 0) {
    errors.tags = "Tags are required";
  }
  if (!position) {
    errors.position = "Position is required";
  }
  if (!dept) {
    errors.dept = "Department is required";
  }

  return errors;
};

export default addUserValidator;
