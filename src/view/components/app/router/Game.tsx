import { CSSClass } from "../../../constants";

export default function GameRoute() {
    return (
        <div className={`${CSSClass.App}-App-RouteContent`}>
            <iframe className={`${CSSClass.App}-App-RouteContent-Iframe`} src="https://es.wikipedia.org/wiki/Wikipedia:Portada"/>
        </div>
    )
}