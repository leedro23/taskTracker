import "./Button.css"

const closeButton = (props) =>{
    return (
        <>
        <button className={props.className} onClick={props.onClick}>
            {props.children}
        </button>
        </>
    )
}

export default closeButton;