import style from "./style.module.css"

interface ITitle {
    text: string;
}
export const Title = (props:ITitle) => {
    return (
        <h1 className={style.title}>{props.text}</h1>
    )
}