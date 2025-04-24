import { createContext, useContext, useState } from "react";

type AdminContextType = {
	isAdmin: boolean;
	handleAdminToggle: () => void;
};

const AdminContext = createContext<AdminContextType>({
	isAdmin: false,
	handleAdminToggle: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
	const [isAdmin, setIsAdmin] = useState(false);

	const handleAdminToggle = () => {
		setIsAdmin(!isAdmin);
	};

	return (
		<AdminContext.Provider value={{ isAdmin, handleAdminToggle }}>
			{children}
		</AdminContext.Provider>
	);
}

export function useAdmin() {
	const context = useContext(AdminContext);

	if (!context) {
		throw new Error("useAdmin must be used within a AdminProvider");
	}

	return context;
}
