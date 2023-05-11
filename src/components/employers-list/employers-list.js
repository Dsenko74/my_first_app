 import EmployersListItem from "../emploers-list-item/emploers-list-item";
import './employers-list.css';

const EmployersList = ({data, onDelete, onToggleProp, onChangeSalary}) => {

    const elements = data.map(item => {
        // в масив data додали id, який далі передається як унікальний індефікатор, для того щоб не рендерети весь код.  {id, ...itemprops} це деструктуризація кожного item, окремо id  витягуємо, інші значення в itemprops 
        const {id, ...itemprops} = item; 
        return (
            <EmployersListItem
                key={id} //name={item.name} salary={item.salary} дорівнює {...item} spred оператор
                {...itemprops}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}// передаємо нагору значення дата атрібута на якому відбулася подія app.js
                onChangeSalary={(e) => onChangeSalary(id, e.target.value)}/> 

        )
    })
   /*  console.log(elements); */
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;