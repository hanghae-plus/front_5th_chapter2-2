import { useState } from "react";
import { Discount, Product } from "../../types";
import { Button } from "./ui/Button";

interface ProductEditFormProps {
	editingProduct: Product;
	setEditingProduct: (product: Product | null) => void;
	products: Product[];
	onProductUpdate: (updatedProduct: Product) => void;
}

export function ProductEditForm({
	editingProduct,
	setEditingProduct,
	products,
	onProductUpdate,
}: ProductEditFormProps) {
	const [newDiscount, setNewDiscount] = useState<Discount>({
		quantity: 0,
		rate: 0,
	});

	// 새로운 핸들러 함수 추가
	const handleProductNameUpdate = (productId: string, newName: string) => {
		if (editingProduct && editingProduct.id === productId) {
			const updatedProduct = { ...editingProduct, name: newName };
			setEditingProduct(updatedProduct);
		}
	};

	// 새로운 핸들러 함수 추가
	const handlePriceUpdate = (productId: string, newPrice: number) => {
		if (editingProduct && editingProduct.id === productId) {
			const updatedProduct = { ...editingProduct, price: newPrice };
			setEditingProduct(updatedProduct);
		}
	};

	// 수정 완료 핸들러 함수 추가
	const handleEditComplete = () => {
		if (editingProduct) {
			onProductUpdate(editingProduct);
			setEditingProduct(null);
		}
	};

	const handleStockUpdate = (productId: string, newStock: number) => {
		const updatedProduct = products.find((p) => p.id === productId);
		if (updatedProduct) {
			const newProduct = { ...updatedProduct, stock: newStock };
			onProductUpdate(newProduct);
			setEditingProduct(newProduct);
		}
	};

	const handleAddDiscount = (productId: string) => {
		const updatedProduct = products.find((p) => p.id === productId);
		if (updatedProduct && editingProduct) {
			const newProduct = {
				...updatedProduct,
				discounts: [...updatedProduct.discounts, newDiscount],
			};
			onProductUpdate(newProduct);
			setEditingProduct(newProduct);
			setNewDiscount({ quantity: 0, rate: 0 });
		}
	};

	const handleRemoveDiscount = (productId: string, index: number) => {
		const updatedProduct = products.find((p) => p.id === productId);
		if (updatedProduct) {
			const newProduct = {
				...updatedProduct,
				discounts: updatedProduct.discounts.filter((_, i) => i !== index),
			};
			onProductUpdate(newProduct);
			setEditingProduct(newProduct);
		}
	};

	return (
		<div>
			<div className="mb-4">
				<label className="mb-1 block">상품명: </label>
				<input
					type="text"
					value={editingProduct.name}
					onChange={(e) =>
						handleProductNameUpdate(editingProduct.id, e.target.value)
					}
					className="w-full rounded border p-2"
				/>
			</div>
			<div className="mb-4">
				<label className="mb-1 block">가격: </label>
				<input
					type="number"
					value={editingProduct.price}
					onChange={(e) =>
						handlePriceUpdate(editingProduct.id, parseInt(e.target.value))
					}
					className="w-full rounded border p-2"
				/>
			</div>
			<div className="mb-4">
				<label className="mb-1 block">재고: </label>
				<input
					type="number"
					value={editingProduct.stock}
					onChange={(e) =>
						handleStockUpdate(editingProduct.id, parseInt(e.target.value))
					}
					className="w-full rounded border p-2"
				/>
			</div>
			{/* 할인 정보 수정 부분 */}
			<div>
				<h4 className="mb-2 text-lg font-semibold">할인 정보</h4>
				{editingProduct.discounts.map((discount, index) => (
					<div key={index} className="mb-2 flex items-center justify-between">
						<span>
							{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
						</span>
						<Button
							color="red"
							className="px-2 py-1"
							onClick={() => handleRemoveDiscount(editingProduct.id, index)}
						>
							삭제
						</Button>
					</div>
				))}
				<div className="flex space-x-2">
					<input
						type="number"
						placeholder="수량"
						value={newDiscount.quantity}
						onChange={(e) =>
							setNewDiscount({
								...newDiscount,
								quantity: parseInt(e.target.value),
							})
						}
						className="w-1/3 rounded border p-2"
					/>
					<input
						type="number"
						placeholder="할인율 (%)"
						value={newDiscount.rate * 100}
						onChange={(e) =>
							setNewDiscount({
								...newDiscount,
								rate: parseInt(e.target.value) / 100,
							})
						}
						className="w-1/3 rounded border p-2"
					/>
					<Button
						color="blue"
						className="w-1/3"
						onClick={() => handleAddDiscount(editingProduct.id)}
					>
						할인 추가
					</Button>
				</div>
			</div>
			<Button color="green" onClick={handleEditComplete}>
				수정 완료
			</Button>
		</div>
	);
}
