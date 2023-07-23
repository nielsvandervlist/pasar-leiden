import Head from 'next/head'
import {GetStaticProps} from 'next'
import Container from '../../components/container'
import Layout from '../../components/layout'
import {getAllMedia, getContactContent, getFeaturedImage} from '../../lib/api'
import {CMS_NAME} from '../../lib/constants'
import Intro from "../../components/intro";

export default function Index({content, image, preview}) {

    const hero = image.featuredImage.node.sourceUrl
    const contactContent = content.content.replace(/\\"/g, '"')

    return (
        <Layout preview={preview}>
            <Head>
                <title>{`Pasar Leiden Contact`}</title>
            </Head>
            <Intro image={hero}/>
            <Container>
                <div className={'grid grid-cols-3 gap-8'}>
                    <div className={'col-span-3 lg:col-span-1 rounded-lg bg-secondary px-8 pt-8 pb-8 text-white overflow-hidden'}>
                        <h2 className={'text-2xl lg:text-5xl font-semibold mb-6 leading-snug tracking-wider'}>Contact</h2>
                        <div className={'content'} dangerouslySetInnerHTML={{__html: contactContent}}/>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {
    const image = await getFeaturedImage()
    const content = await getContactContent()

    return {
        props: {content, image, preview},
        revalidate: 10,
    }
}
