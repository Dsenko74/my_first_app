import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    // для правильного відображення стану компонента input задаємо value={this.state.term}. Тільки для чого
    onUpDateSearch = (e) => {
        const term = e.target.value; //привласнюємо поточне значення інпута
        this.setState({term}); //записуємо його в state.term
        this.props.onUpDateSearch(term)// викликаємо onUpDateSearch та в ній нагору передаємо term
    }

    render() {
        return (
            <input
                type="text"
                className='form-control search-input'
                placeholder='Знайти співробітника'
                value={this.state.term}
                onChange={this.onUpDateSearch} />
        )
    }
}

export default SearchPanel;