import { useState, useRef } from 'react';

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import api from '../lib/api';
import arrayMove from 'array-move';
import { ToastContainer } from "react-toastr";
import 'react-toastr'

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

function TodoListItem(props) {
    let {
        data,
        deleteItem,
        onChange,
    } = props;

    let changeField = (field, newValue) => {
        let newData = { ...data };
        newData[field] = newValue;
        onChange(newData);
    }

    return <li className={styles.todoListItem}>
        <input
            onChange={e => changeField('done', e.target.checked)}
            type="checkbox"
            checked={data.done}
        />
        <input value={data.text}
               onChange={e => changeField('text', e.target.value)}
               type="text"
        />

        <button type="button" onClick={() => deleteItem(data)}>delete item</button>

    </li>
}

const SrotableTodoListItem = SortableElement(TodoListItem);

function TodoList(props) {
    let { items, onChange, deleteItem } = props;

    let tm = useRef(null);

    let onChangeItem = (index) => (item) => {
        let newItems = [...items];
        newItems[index] = item;
        onChange(newItems);

        clearInterval(tm.current);
        tm.current = setTimeout(() => {
            api.post('/api/update-task', item, { _id: item._id }).then((resp) => {
                console.log('Данные обновлены', resp)
            })
        }, 500);
    }

    return <ul>
        {
            items.map((item, index) => <SrotableTodoListItem
                index={index}
                key={item._id}
                data={item}
                onChange={onChangeItem(index)}
                deleteItem={deleteItem}
            />)
        }
    </ul>
}


const SrotableTodoList = SortableContainer(TodoList);

function Home(props) {
    let [items, setItems] = useState(props.model);
    let [currentText, setCurrentText] = useState('');
    let toastrContainer = useRef();

    /**
     * Create new item from currentText value
     * @returns {Promise<void>}
     */
    let addNewItem = async () => {
        let response = await api.post('/api/create-task', { text: currentText })

        let newItem = [...items];
        newItem.push(response.model)
        setItems(newItem);

        setCurrentText('');

        toastrContainer.current.success('Record added')
    }

    let onSortEnd = ({ oldIndex, newIndex }) => {
        let newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);

        setTimeout(() => {
            let out = [];

            for (let index in newItems) {
                out.push({
                    index,
                    _id: newItems[index]._id
                });
            }

            api.post('/api/order-task', out).then(resp => console.log('order nums saved', resp))
        }, 0);
    };

    /**
     * Delete task item
     * @param item
     */
    let deleteItem = async (item) => {
        try {
            let response = await api.post('/api/delete-task', { _id: item._id })

            if (response.success) {
                let newItems = [...items];
                let index = newItems.indexOf(item);
                newItems.splice(index, 1);
                setItems(newItems);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles.container}>
            <ToastContainer ref={ref => toastrContainer.current = ref} />
            <Head>
                <title>Test todo app</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Todo app
                </h1>
                <SrotableTodoList
                    onSortEnd={onSortEnd}
                    onChange={(newList) => setItems(newList)}
                    items={items}
                    deleteItem={deleteItem}
                />

                <form action="">
                    <h3>Create new task</h3>

                    <input type="text"
                           placeholder="type your tark for today"
                           value={currentText}
                           onChange={e => setCurrentText(e.target.value)} />
                    <button type="button" onClick={e => {
                        e.preventDefault();
                        addNewItem();
                    }}>
                        Create new task
                    </button>
                </form>
            </main>

            <footer className={styles.footer}>
                Powered by owlcoder
            </footer>

        </div>
    )
}

Home.getInitialProps = async (ctx) => {
    const resp = await api.get('/api/list-task')
    return { model: resp.model };
}

export default Home;
