const updateUserValidator = ({ name, email, exp, tags, position, dept }) => {
  const errors = {
    name: "",
    email: "",
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

export default updateUserValidator;
