const Modifiabletextfield = ({id,IsMod,onchange,content}) => {
    return (  
        <textarea className="modifiabletextfield" id={id} type="text" readOnly={!IsMod}
        defaultValue={content} onChange={onchange}
        />
    );
}



const Articlecomponents= {
    Modifiabletextfield,

}
export default Articlecomponents;