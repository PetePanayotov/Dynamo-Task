import { createPortal } from "react-dom";

type Props = {
    children?: React.ReactNode
};

export const Portal: React.FC<Props> = ({children}) => {

    return createPortal(children, document.body)
}