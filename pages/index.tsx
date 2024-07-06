import Head from 'next/head'
import {GetStaticProps} from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Button from "../components/button";
import Line from '../components/line';
import {getAllPostsForHome, getFeaturedImage} from '../lib/api'
import {CMS_NAME} from '../lib/constants'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightLong, faArrowDownLong} from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import Location from '../public/location.jpg'
import Link from "next/link";

export default function Index({allPosts: {edges}, image, preview}) {
    const heroPost = edges[0]?.node
    const morePosts = edges.slice(1)

    const hero = image.featuredImage.node.sourceUrl

    return (
        <Layout preview={preview}>
            <Head>
                <title>{`Pasar Leiden`}</title>
            </Head>
            <Intro image={hero}/>
            <Container>
                <div className={'lg:grid grid-cols-12 gap-10'}>
                    <div className={'col-span-12 lg:col-span-5 lg:pb-20 mb-8 lg:mb-0'}>
                        <h3 className={'text-2xl lg:text-4xl font-semibold mb-6 leading-9 tracking-wider'}>Wie is Pasar Leiden? </h3>
                        <p className={'leading-7 tracking-wide'}>Pasar Leiden wil de verbinding tussen de stad en haar Indo-community versterken met als doel om deze verbintenis te behouden voor de aankomende generaties. Dit willen wij bereiken met ons culturele festival. Om het evenement jaarlijks terug te kunnen laten keren, vragen wij bij de entree om een symbolische bijdrage van €2,- (kinderen t/m 12 jaar zijn gratis). </p>
                    </div>
                    <div className={'card col-span-12 lg:col-span-5 lg:col-start-9 relative'}>
                        <div className={'rounded-lg bg-secondary px-8 pt-8 pb-16 text-white overflow-hidden lg:absolute lg:-top-[250px] right-0'}>
                            <Line style={'two'} className={'absolute left-0 right-0 bottom-0 z-10'}/>
                            <h3 className={'text-2xl lg:text-5xl font-semibold mb-6 leading-snug tracking-wider'}>Komt u ook 31
                                Augustus?</h3>
                            <p className={'leading-7 tracking-wide'}>Na een succesvolle tweede editie komt Pasar Leiden terug. Kom langs en geniet van heerlijk Indo eten, lifestyle kraampjes en live optredens!</p>
                            <Button variant={'white'} href={'/programma'} className={'white mt-8'}>Bekijk
                                programma <FontAwesomeIcon className={'ml-2'} icon={faArrowRightLong}/></Button>
                        </div>
                    </div>
                </div>
            </Container>
            <section className={'bg-primary py-16'}>
                <Container>
                    {morePosts.length > 0 && <MoreStories posts={morePosts}/>}
                </Container>
            </section>
            <section className={'py-20 relative'}>
                <div className={'bg-secondary h-2/3 absolute top-0 left-0 right-0'}>
                    <Line className={'absolute left-0 right-0 bottom-0'} style={'two'}></Line>
                </div>
                <div className={'relative z-20'}>
                    <Container>
                        <div className={'text-center justify-center flex flex-col text-white'}>
                            <h2 className={'text-2xl lg:text-6xl font-semibold mb-8 tracking-wider'}>Waar is het?</h2>
                            <p className={'lg:text-2xl max-w-[600px] mx-auto mb-8 font-light tracking-wider leading-relaxed'}>Waar is het?
Zaterdag 31 augustus van 12.00-22.00 uur in Het Pesthuis, Leiden. OV? 5 minuten lopen vanaf Leiden CS / Auto? Parkeergarage Morspoort
                            </p>

                            <FontAwesomeIcon className={'mb-8 text-3xl'} icon={faArrowDownLong}/>
                            <figure className={'text-center'}>
                                <Image className={'mx-auto rounded-lg overflow-hidden'} src={Location} alt={'locatie'}/>
                            </figure>
                        </div>
                    </Container>
                </div>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {
    const allPosts = await getAllPostsForHome(preview)
    const image = await getFeaturedImage()

    return {
        props: {allPosts, image, preview},
        revalidate: 10,
    }
}
