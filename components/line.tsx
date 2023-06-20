import classNames from "classnames";

const styles = {
    one: {
        "backgroundColor": "#ffffff",
        "opacity": "0.8",
        "backgroundImage": "linear-gradient(135deg, #FEC85A 25%, transparent 25%), linear-gradient(225deg, #FEC85A 25%, transparent 25%), linear-gradient(45deg, #FEC85A 25%, transparent 25%), linear-gradient(315deg, #FEC85A 25%, #0c0c0c 25%)",
        "backgroundPosition": "10px 0, 10px 0, 0 0, 0 0",
        "backgroundSize": "20px 20px",
        "backgroundRepeat": "repeat"
    },
    two: {
        "background": "radial-gradient(circle at center ,#FEC85A, #FEC85A 10%, transparent 10%, transparent  20%, #FEC85A 20%, #FEC85A 30%, transparent 30%, transparent 40%, #FEC85A 40%, #FEC85A 50%, transparent 50%, transparent 60%, #FEC85A 60%, #FEC85A 70%, transparent 70%, transparent 80%, #FEC85A 80%, #FEC85A 90%, transparent 90%)",
        "backgroundSize": "40px 40px",
        "backgroundColor": "#689380",
        "opacity": "1",
        "backgroundRepeat": "repeat"
    },
    three: {
        "background": "linear-gradient(135deg, #ffffff 15%, transparent 15%), linear-gradient(225deg, #ffffff 15%, transparent 15%),linear-gradient(135deg, #FEC85A 25%, transparent 25%),linear-gradient(225deg, #FEC85A 25%, transparent 25%),linear-gradient(0deg, #FEC85A 45%, transparent 25%)",
        "backgroundSize": "20px 20px",
        "backgroundColor": "#689380",
        "opacity": "1",
        "backgroundRepeat": "repeat"
    }
}

export default function Line({className, style}) {

    return <div style={styles[style]} className={classNames('w-full h-[40px] opacity-5', className)}/>
}
