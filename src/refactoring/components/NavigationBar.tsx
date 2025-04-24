import { useAdmin } from "../contexts/AdminContext";
import { Button } from "./ui/Button";

export function NavigationBar() {
	const { isAdmin, handleAdminToggle } = useAdmin();

	return (
		<NavigationBar.Layout>
			<Button color="white" onClick={handleAdminToggle}>
				{isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
			</Button>
		</NavigationBar.Layout>
	);
}

NavigationBar.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<nav className="bg-blue-600 p-4 text-white">
			<div className="container mx-auto flex items-center justify-between">
				<h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
				{children}
			</div>
		</nav>
	);
};
