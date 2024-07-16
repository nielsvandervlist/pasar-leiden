import Link from "next/link";
import classNames from "classnames";
import React from "react";

const variants = {
    primary: 'text-text rounded-md border-[3px] border-text px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
    secondary: 'text-secondary rounded-md border-[3px] border-secondary px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
    white: 'text-white rounded-md border-[3px] border-white px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
}

type Variant = keyof typeof variants;

interface ButtonProps {
    href?: string,
    children: any,
    className?: string,
    variant: Variant
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
    disabled?: boolean
}

export default function Button({href, children, className, variant, onClick, disabled}: ButtonProps){

    className = classNames(variants[variant], className)

    if(href){
        return <Link className={classNames('btn', className)} href={href}>
            {children}
        </Link>
    }

    return <button className={classNames('btn', className)} disabled={disabled} onClick={onClick}>
        {children}
    </button>
}
