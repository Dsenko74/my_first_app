import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../emploers-add-form/emploers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex V.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 15000, increase: false, rise: false, id:3}
            ],
            term: '',
            filter: ''
        }
        this.maxId = 4;
    }
    //видаляємо співробітника з data коли тицяємо на кнопочку
    deleteItem = (id) => {
        this.setState(({data}) => {
/*             const index = data.findIndex(elem => elem.id === id); перший метод, не самий еффективний
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            } */
            return {
                data: data.filter(elem => elem.id !== id) // другий метод
            }
        })
    }
    // додаємо в data нового співробітника
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            console.log(newArr);
            return {
                data: newArr
            }
        })
    }

/*     onToggleIncrease = (id) => {
            this.setState(({data}) => {
            //перший варіант, він великий, але більш зрозумілий ніж другий 
            const index = data.findIndex(elem => elem.id === id); //знаходимо індекс елементу data на якому спрацювало onToggleIncrease

            const old = data[index]; //ствоюємо масив тільки з цим елементом
            const newItem = {...old, increase: !old.increase}; //змінюємо в ньому increase
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]; //формуємо новий масив
            return {
                data: newArr
            }
        }) 
        //
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                } 
                return item;
            })
        }))
    } */
    //універсальний метод, який знизу з пропсів отримує id  елемента та його дата атрибут EL.js 14 
    onToggleProp = (id, prop) => {// в залежності від того що прийде в prop змінеться INCREASE ore rise
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                } 
                return item;
            })
        }))
}
    //метод для пошуку з search panel
    searchEmp = (items, term) => { //term це строка яку вводимо у пошуку, 
        if (term.length === 0) {// якщо нуль то нічого не змінюємо
            return items;
        }
        return items.filter(item => {// проходимось по кожному елемету data, 
            return item.name.indexOf(term) > -1//якщо в значенні name є співпадіння, то фільтуруємо це значення
        })
    }

    onUpDateSearch = (term) => {
        this.setState({term}); //  this.setState({term}) ==  this.setState({term: term})
    }
    // для фільтрацій по кнопках
    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default: return items
        }
    }

    onFiltetSelect = (filter) => {
        this.setState({filter})
    }

    onChangeSalary = (id, salary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: salary}
                } 
                return item;
            })
        }))
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length; // в app-info прокидуємо кількість співробітників
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter); 
       //як відбувається реалізація відображення різних фільтрацій. Спрешу проганяємо через this.searchEmp(data, term), яке передається як перший  аргумент в filterPost. який прийме як відфільтрована data, а вже потім цю дату прогоняємо через filterPost
        return (
            <div className='app'>
                <AppInfo
                employees={employees}// в app-info прокидуємо кількість співробітників
                increased={increased}/>
                <div className="search-panel">
                    <SearchPanel
                    onUpDateSearch={this.onUpDateSearch}/>
                    <AppFilter
                    filter={filter}
                    onFiltetSelect={this.onFiltetSelect}/>
                </div>
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployersAddForm
                onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;