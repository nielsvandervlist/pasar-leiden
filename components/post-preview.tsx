import Button from "../components/button";
import Image from "next/image";
import Link from 'next/link'
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Line from "./line";

export default function PostPreview({
                                        title,
                                        coverImage,
                                        excerpt,
                                        slug,
                                    }) {
    return (
        <div className={'col-span-4 mb-4 md:mb-0 card relative'}>
            <div
                className={'h-full flex flex-col bg-white rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.05)] relative overflow-hidden'}>
                <div>

                    {coverImage && (
                        <img className={'w-full'} src={coverImage?.node.sourceUrl} alt={'card-img'}/>
                    )}
                </div>
                <div className={'p-8 flex flex-1 flex-col items-start relative'}>
                    <Line style={'three'} className={'absolute left-0 right-0 -top-[40px] z-10'}/>
                    <h3 className="text-2xl lg:text-3xl mb-3 leading-snug font-semibold tracking-wider">
                        <Link
                            href={`/posts/${slug}`}
                            className="hover:underline"
                            dangerouslySetInnerHTML={{__html: title}}
                        ></Link>
                    </h3>
                    <div
                        className="text-md mt-auto leading-relaxed mb-8 font-light leading-7 tracking-wider"
                        dangerouslySetInnerHTML={{__html: excerpt}}
                    />
                    <Button className={'mt-auto flex items-center'} variant={'primary'} href={'/programma'}>Lees meer<FontAwesomeIcon className={'ml-4'} icon={faArrowRightLong}/></Button>
                </div>
            </div>
        </div>
    )
}
