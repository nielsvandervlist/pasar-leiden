import Link from "next/link";
import classNames from "classnames";
import React from "react";

const variants = {
    primary: 'text-text rounded-md border-[3px] border-text px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
    primaryFilled: 'text-text rounded-md bg-secondary text-white px-4 py-2 inline-block tracking-wide leading-7 font-semibold',
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
    ref?: any,
}

// Helper function to check if URL is external
const isExternalUrl = (url: string): boolean => {
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        return true;
    }
    return false;
};

export default function Button({href, children, className, variant, onClick, disabled, ref}: ButtonProps){

    className = classNames(variants[variant], className)

    if(href){
        // Check if it's an external URL
        if (isExternalUrl(href)) {
            return (
                <a 
                    className={classNames('btn', className)} 
                    href={href} 
                    ref={ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClick}
                >
                    {children}
                </a>
            );
        }
        
        // Internal URL - use Next.js Link
        return <Link className={classNames('btn', className)} href={href} ref={ref}>
            {children}
        </Link>
    }

    return <button className={classNames('btn', className)} disabled={disabled} onClick={onClick}>
        {children}
    </button>
}
