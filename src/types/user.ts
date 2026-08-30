export interface User {
	_id: string;
	role: "admin" | "employee" | "customer";
	firstName: string;
	lastName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}
