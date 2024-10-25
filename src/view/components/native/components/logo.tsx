import { CSSClass, SizeIcons } from '../../../constants'

// Assets
import NovelJsLogoSVG from '../../../assets/svg/JavaScriptNovel-480-svg.svg'

export default function NativeLogo() {
    return <img
        src={NovelJsLogoSVG}
        alt="JavaScriptNovel Logo"
        className={`${CSSClass.App}-Native-Logo`}
        width={SizeIcons.small.rect.width}
        height={SizeIcons.small.rect.height} />
}