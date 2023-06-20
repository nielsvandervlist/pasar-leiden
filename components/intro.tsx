import { CMS_NAME, CMS_URL } from '../lib/constants'
import Image from "next/image";

export default function Intro({image}) {
  return (
    <section className="flex-col md:max-h-[400px] overflow-hidden md:flex-row flex items-center md:justify-between mb-16 md:mb-12">
      <img className={'w-full'} src={image} alt={'hero'}/>
    </section>
  )
}
