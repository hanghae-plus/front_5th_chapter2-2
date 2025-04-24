import { QuantityButton, RemoveButton } from '.';

type CartItemActionsProps = {
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export const CartItemActions = ({ onIncrease, onDecrease, onRemove }: CartItemActionsProps) => (
  <div>
    <QuantityButton onClick={onDecrease} label="-" />
    <QuantityButton onClick={onIncrease} label="+" />
    <RemoveButton onClick={onRemove} />
  </div>
);
