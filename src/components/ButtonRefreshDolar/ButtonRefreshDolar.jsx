export const ButtonRefreshDolar = ({className ,onClick , title ,style , content }) => {
    return(
        <button
            type="button"
            onClick={onClick}
            className= {className}
            title= {title}
            style={{style}}>
            {content}
        </button>
    )

}