import { Component } from 'react';
/* import './employers-add-form.css'; */
import './employees-add-form.scss';

class EmployersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.length > 3 && this.state.salary > 0) {
            this.props.onAdd(this.state.name, this.state.salary);//тут ми отримуємо onAdd з app, який як функція передана через props.  в app onAdd отримує метод addItem який спускається вниз, і вже тут йому передаєтся state, який формує новий елемент масиву.
            this.setState({
                name: '',
                salary: ''
            })
        }
    }

    onValueChange = (e) => {
         this.setState({
            [e.target.name] : e.target.value //  в input додали name. тепер по кліку вибираємо значення [e.target.name] та присвоюємо e.target.value
        })
      }
    render() {
        const {name, salary} = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Як його зовуть?"
                        name='name'
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name='salary'
                        value={salary}
                        onChange={this.onValueChange} />
    
                    <button type="submit"
                            className="btn btn-outline-light">Додати</button>
                </form>
            </div>
        )
    }
}
export default EmployersAddForm;