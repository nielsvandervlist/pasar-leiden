import Head from 'next/head'
import {GetStaticProps} from 'next'
import Container from '../../components/container'
import Layout from '../../components/layout'
import {getFeaturedImage, getProgramContent} from '../../lib/api'
import {CMS_NAME} from '../../lib/constants'
import Intro from "../../components/intro";

export default function Index( {program, image, preview}) {

    const table = program.content.replace(/\\"/g, '"')
    const hero = image.featuredImage.node.sourceUrl

    return (
        <Layout preview={preview}>
            <Head>
                <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
            </Head>
            <Intro image={hero}/>
            <Container>
                <div className={'content'} dangerouslySetInnerHTML={{ __html: table }} />
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {
    const program = await getProgramContent()
    const image = await getFeaturedImage()

    return {
        props: {program,image, preview},
        revalidate: 10,
    }
}
