import { ButtonHTMLAttributes, ReactNode } from "react"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 태그 안에 들어갈 내용 ex. 텍스트, 아이콘 등 */
  children?: ReactNode
}
export default function Button({ className, children, type = "button", onClick, disabled, ...props }: IButton) {
  return (
    <button className={className} onClick={onClick} type={type} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
