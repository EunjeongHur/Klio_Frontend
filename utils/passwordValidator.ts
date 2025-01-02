export const validatePassword = (password: string): string[] => {
	const errors: string[] = [];

	// Validation 1: Length and required characters
	if (
		!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&(){}[\]])[A-Za-z\d@$!%*?&(){}[\]]{8,}$/.test(
			password
		)
	) {
		errors.push("At least 8 characters long, include:");
		errors.push("- An uppercase letter");
		errors.push("- A lowercase letter");
		errors.push("- A number");
		errors.push("- A special character (@$!%*?&(){}[]).");
	}

	// Validation 2: No three consecutive identical characters
	if (/(\w)\1{2,}/.test(password)) {
		errors.push("No more than three consecutive identical characters.");
	}

	return errors;
};
