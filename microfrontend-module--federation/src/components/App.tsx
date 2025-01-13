import {useState} from "react";
import './App.scss';

export const App = () => {
    const [counter, setCounter] = useState(0);


    return <div>
        Hello World1

        <div>{counter}</div>
        {/*@ts-ignore*/}
        <button onClick={() => {setCounter(counter + 1);}}>Increase</button>
    </div>;
}
