import { CSSClass, SizeIcons } from "../../../constants";

// Assets
import Minimize from '../../..//assets/svg/Minimize.svg';
import Maximize from '../../..//assets/svg/Maximize.svg';
import CloseIcon from '../../..//assets/svg/CloseIcon.svg';
import { useElectron } from "../../..//hooks";

export default function NativeControls() {

    const { windowControls } = useElectron()

    return (
        <div className={`${CSSClass.App}-Native-Controls`}>
            <button
                onClick={() => windowControls("minimize")}
                className={`${CSSClass.App}-Native-Controls_Element`}>
                <img
                    src={Minimize}
                    alt="JavaScriptNovel Controls"
                    width={SizeIcons.icon}
                    height={SizeIcons.icon}
                    className={`${CSSClass.App}-Native-Controls_Element_Image`} />
            </button>
            <button
                onClick={() => windowControls("maximize")}
                className={`${CSSClass.App}-Native-Controls_Element`}>
                <img
                    src={Maximize}
                    alt="JavaScriptNovel Controls"
                    width={SizeIcons.icon}
                    height={SizeIcons.icon}
                    className={`${CSSClass.App}-Native-Controls_Element_Image`} />
            </button>
            <button
                id="close"
                onClick={() => windowControls("close")}
                className={`${CSSClass.App}-Native-Controls_Element`}>
                <img
                    src={CloseIcon}
                    alt="JavaScriptNovel Controls"
                    width={SizeIcons.icon}
                    height={SizeIcons.icon}
                    className={`${CSSClass.App}-Native-Controls_Element_Image`} />
            </button>
        </div>
    )
}