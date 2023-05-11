
import './emploers-list-item.css';

const EmployersListItem = (props) => {

    const {name, salary, onDelete, onToggleProp, onChangeSalary, increase, rise} = props;
   // const {increase, rise } = this.state;// після 133 урока increase приходить не з пропсами, а по замовчуванню воно вже false in state
    let ClassName = "list-group-item d-flex justify-content-between";
    if (increase) {
        ClassName += ' increase';
    }
    if (rise) {
        ClassName += ' like'
    }

    return (// span button навішуємо data-toggle='rise'data-toggle='increase' щоб розуміти де відбулась подія далі дивись EL.js 14 onToggleProp
        <li className={ClassName}>
            <span className="list-group-item-label"
            onClick={onToggleProp} data-toggle='rise'>{name}</span> 
            <input 
                type="text"
                className="list-group-item-input"
                defaultValue={salary + '$'}
                onChange={onChangeSalary}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={onToggleProp}
                    data-toggle='increase'>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}


export default EmployersListItem;