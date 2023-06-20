import Link from "next/link";
import classNames from "classnames";

const variants = {
    primary: 'text-text rounded-md border-[3px] border-text px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
    secondary: 'text-secondary rounded-md border-[3px] border-secondary px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
    white: 'text-white rounded-md border-[3px] border-white px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
}

export default function Button({href, children, className, variant}){

    className = classNames(variants[variant], className)

    return <Link className={classNames('btn', className)} href={href}>
        {children}
    </Link>
}
