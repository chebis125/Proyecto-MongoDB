import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addTask(e) {
        e.preventDefault();
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                window.M.toast({html: 'Tarea Actualizada'});
                this.setState({_id: '', title: '', description: ''});
                this.fetchTasks();
            });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.M.toast({html: 'Tarea Guardada'});
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        }

    }

    deleteTask(id) {
        if(confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Borrada'});
                this.fetchTasks();
            });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            });
        });
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks);
        });
    }

    render() {
        return (
            <div>
                {/* Barra de navegación */}
                <nav>
                <div className="container">
                    <div className="nav-wrapper">
                    <a href="#!" class="brand-logo"><i class="material-icons">shopping_cart</i>Tabla de productos</a>
                    </div>
                </div>
                </nav>

                <div className="container">
                <div className="row">
                    <div className="col s5">
                    <div className="card">
                        <div className="card-content">
                        <form onSubmit={this.addTask}>
                            <div>
                                <h3>Nuevo producto</h3>
                            </div>
                            <div className="row">
                            <div className="input-field col s12">
                                <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Producto" autoFocus/>
                            </div>
                            </div>
                            <div className="row">
                            <div className="input-field col s12">
                                <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Descripcion de producto" className="materialize-textarea"></textarea>
                            </div>
                            </div>

                            <button type="submit" className="btn">
                            Send 
                            </button>
                        </form>
                        </div>
                    </div>
                    </div>
                    <div className="col s7">
                    <table>
                        <thead>
                        <tr>
                            <th className='title'>Title</th>
                            <th className='description'>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.tasks.map(task => {
                                return (
                                    <tr key={task._id}>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>
                                            <button onClick={() => this.deleteTask(task._id)} className="btn ">
                                                <i className="material-icons">delete</i> 
                                            </button>
                                            <button onClick={() => this.editTask(task._id)} className="btn" style={{margin: '4px'}}>
                                                <i className="material-icons">edit</i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}

export default App;