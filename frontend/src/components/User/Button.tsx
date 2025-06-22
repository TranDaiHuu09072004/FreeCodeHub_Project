type MyButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  icon?: string;
  isNumber_blog?: boolean;
  number_blog?: string;
  type?: "button" | "submit" | "reset";
};
const Button = ({
  children,
  onClick,
  className,
  icon,
  isNumber_blog,
  number_blog,
  type = "button",
}: MyButtonProps) => {
  return (
    <>
      {" "}
      <button type={type} className={className} onClick={onClick}>
        {icon && <i className={`mr-2 text-[18px] ${icon}`}></i>}
        {children} {isNumber_blog && <span>{number_blog}</span>}
      </button>
    </>
  );
};

export default Button;
