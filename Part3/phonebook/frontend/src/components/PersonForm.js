
const PersonForm = (props) =>(
    <form onSubmit={props.onSubmit}>
        <div>
            name: <input value={props.namevalue} onChange={props.onChangeName}/>
        </div>
        <div>
            number: <input value={props.numbervalue} onChange={props.onChangeNumber}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm