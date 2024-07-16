import Head from 'next/head'
import {GetStaticProps} from 'next'
import Container from '../../components/container'
import Layout from '../../components/layout'
import {getAllMedia, getFeaturedImage} from '../../lib/api'
import {CMS_NAME} from '../../lib/constants'
import Intro from "../../components/intro";

export default function Index( {media, image, preview}) {

    const hero = image.featuredImage.node.sourceUrl

    return (
        <Layout preview={preview}>
            <Head>
                <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
            </Head>
            <Intro image={hero}/>
            <Container>
                <div className={'grid grid-cols-12 gap-4 mb-8'}>
                {
                    media.edges.map((photo,index) => {
                        return <img key={index} className={'col-span-12 md:col-span-4'} src={photo.node.sourceUrl} alt={'media'} />
                    })
                }
                </div>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {
    const image = await getFeaturedImage()
    const media = await getAllMedia()

    return {
        props: {media, image, preview},
        revalidate: 10,
    }
}
