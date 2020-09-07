import { useState } from 'react';

import Head from 'next/head'
import styles from '../styles/Home.module.css'

function TodoListItem(props) {
    let {
        data,
        deleteItem,
        onChange
    } = props;

    let changeField = (field, newValue) => {
        let newData = { ...data };
        newData[field] = newValue;
        onChange(newData);
    }

    return <li>
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

function TodoList(props) {

    let { items, onChange, deleteItem } = props;

    let onChangeItem = (index) => (item) => {
        let newItems = [...items];
        newItems[index] = item;
        onChange(newItems);
    }

    return <ul>
        {
            items.map((item, index) => <TodoListItem
                key={item._id}
                data={item}
                onChange={onChangeItem(index)}
                deleteItem={deleteItem}
            />)
        }
    </ul>
}

let idCounter = 3;

const INITIAL_VALUE = [
    { _id: 1, text: 'Сходить в магазин', done: true },
    { _id: 2, text: 'Помыть посуду', done: false },
    { _id: 3, text: 'Погулять с собакой', done: false },
];

function Home() {
    let [items, setItems] = useState(INITIAL_VALUE);
    let [currentText, setCurrentText] = useState('test');

    let addNewItem = async () => {

        let response = await fetch('/api/create-task', {
            method: "POST",
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({ text: currentText })
        })

        let responseData = await response.json();

        console.log(responseData);

        // let newItem = [...items];
        // newItem.push({ _id: ++idCounter, text: currentText, done: false })
        // setItems(newItem);
        // setCurrentText('');
    }

    let deleteItem = (item) => {
        let newItems = [...items];
        let index = newItems.indexOf(item);
        newItems.splice(index, 1);
        setItems(newItems);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Test todo app</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Todo app
                </h1>
                <TodoList
                    onChange={(newList) => setItems(newList)}
                    items={items}
                    deleteItem={deleteItem}
                />

                <form action="">
                    <h3>Добавление нового элемента</h3>
                    <input type="text"
                           placeholder="type your tark for today"
                           value={currentText}
                           onChange={e => setCurrentText(e.target.value)} />
                    <button type="button" onClick={e => {
                        e.preventDefault();
                        addNewItem();
                    }}>Добавить
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
    // const res = await fetch('https://api.github.com/repos/vercel/next.js')
    // const json = await res.json()
    // return { stars: json.stargazers_count }
}

export default Home;
