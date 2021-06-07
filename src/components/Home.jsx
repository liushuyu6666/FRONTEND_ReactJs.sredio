import { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router";
import { endSession, startSession } from "../Services/session";
import {updateSymbols} from "../Services/symbols";

const Home = (props) => {
    const [response, setResponse] = useState({
        symbols: ['?', '?', '?'],
        credit: '?',
        msg: 'creating a session...',
    })
    const [mask, setMask] = useState({
        symbols: [false, false, false],
        credit: false,
        msg: false,
    })
    // const [fruits, setFruits] = useState(['?', '?', '?']);
    // const [spinner, setSpinner] = useState([false, false, false]);
    // const [creditMast, setCreditMast] = useState(false);
    // const [msgMask, setMsgMask] = useState(false);
    // const [credit, setCredit] = useState(10);
    const [button, setButton] = useState(true);
    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");
    const [cashButton, setCashButton] = useState(true);
    // const [error, setError] = useState("enjoy!");
    const classNameArray = ['home-page-machine-first', 
                            'home-page-machine-second',
                            'home-page-machine-third'];
    const mapSymbolsToSvg = {'?' : 'images/question.svg',
                             'C' : 'images/cherry.svg',
                             'L' : 'images/lemon.svg',
                             'W' : 'images/watermelon.svg',
                             'O' : 'images/orange.svg',
                             'X' : 'images/spinner.gif'};
    const innerRef = useRef(); 
    // const outerRef = useRef();

    // componentDidMount
    useEffect(() => {
        startSession()
        .then(res => {
            setResponse(res)
            console.log(res);
        })
        .catch(err => {
            setResponse(err)
            console.error(err.message);
        })
    }, []);

    // componentDidUpdate
    useEffect(() => {
        if(response["symbols"][0] !== '?' 
        && response["symbols"][1] !== '?' 
        && response["symbols"][2] !== '?'){
            setTimeout(() => {
                setMask({
                    ...mask,
                    symbols: [false, true, true]
                });
            }, 1000);
            setTimeout(() => {
                setMask({
                    ...mask,
                    symbols: [false, false, true]
                });
            }, 2000);
            setTimeout(() => {
                setMask({
                    ...mask,
                    symbols: [false, false, false]
                });
            }, 3000);
            setTimeout(() => {
                setMask({
                    symbols: [false, false, false],
                    credit: false, 
                    msg: false
                });
                setButton(true);
                setCashButton(true);
            }, 3300);
        }
        else{
            setButton(true);
            setCashButton(true);
            setMask({
                symbols: [false, false, false],
                credit: false,
                msg: false,
            })
        }
    }, [response]);

    // useEffect(() => {
    //     if(credit <= 0 || isNaN(credit)){
    //         setError("you cannot play");
    //         setButton(false);
    //     }
    // }, [credit])

    const startGame = (event) => {
        event.preventDefault();
        
        setButton(false);
        setCashButton(false);
        setLeft("");
        setTop("");
        setMask({
            ...mask,
            symbols: [true, true, true],
            credit: true,
            msg: true,
        })
        updateSymbols()
            .then(res => {
                setResponse(res);
                console.log(res);
            })
            .catch(err => {
                setResponse(err);
                setMask({
                    ...mask,
                    symbols: [false, false, false],
                    credit: false,
                    msg: false,
                })
                setButton(true);
                setCashButton(true);
                console.error(err);
            });
    }

    const cashCheat = (event) => {
        // event.preventDefault();

        const {offsetTop, offsetLeft} = innerRef.current;
        const v1 = Math.floor(Math.random() * 10);
        const v2 = Math.floor(Math.random() * 10);
        const v3 = Math.floor(Math.random() * 4);

        // window.alert([offsetTop, offsetLeft]);

        if(v1 < 5){
            if(v3 === 0){
                setTop((offsetTop - 300) + "px");
                setLeft(offsetLeft);
            }
            else if(v3 === 1){
                setTop((offsetTop + 300) + "px");
                setLeft(offsetLeft);
            }
            else if(v3 === 2){
                setTop(offsetTop);
                setLeft((offsetLeft - 300) + "px");
            }
            else{
                setTop(offsetTop);
                setLeft((offsetLeft + 300) + "px");
            }
        }
        if(v2 < 4){
            setCashButton(false);
        }
    }

    const cashOut = () => {
        endSession()
        .then(res => {
            setResponse({
                ...res,
                msg: "you cash out all money",
            });
            setMask({
                ...mask,
                symbols: [false, false, false],
                credit: false,
                msg: false,
            })
            console.log(res);
        })
        .catch(err => {
            setResponse(err);
            setMask({
                ...mask,
                symbols: [false, false, false],
                credit: false,
                msg: false,
            })
            console.error(err);
        })
    }
 
    // const calCredits = (symbols) => {
    //     if(symbols.every(it => it === 'C')){ // cherry 10 credits
    //         setError("you get 10 credits");
    //         setCredit(credit + 9);
    //     }
    //     else if(symbols.every(it => it === 'L')){ // lemon 20 credits
    //         setError("you get 20 credits");
    //         setCredit(credit + 19);
    //     }
    //     else if(symbols.every(it => it === 'O')){ // orange 30 credits
    //         setError("you get 30 credits");
    //         setCredit(credit + 29);
    //     }
    //     else if(symbols.every(it => it === 'W')){ // watermelon 40 credits
    //         setError("you get 40 credits");
    //         setCredit(credit + 39);
    //     }
    //     else{
    //         setError("good luck next time!");
    //         setCredit(credit - 1);
    //     }
    // }

    return(
        <div className={"home-page-container"}>
            <div className={"home-page-message"}>
                <label>{(mask["msg"])?("? ? ?"):(response["msg"])}</label>
            </div>
            <div className={"home-page-score"}>
                {(mask["credit"])?("xx"):(response["credit"])}
            </div>
            <div className={"home-page-machine"}>            
                {
                    [1, 2, 3].map((item, i) => (
                        (mask["symbols"][i])?
                        (
                            <div key={i} className={classNameArray[i]}>
                                <img className={"home-page-fruits"}
                                src={`${mapSymbolsToSvg['X']}`} ></img>
                            </div>
                        ):
                        (
                            <div key={i} className={classNameArray[i]}>
                                <img className={"home-page-fruits"}
                                src={`${mapSymbolsToSvg[response["symbols"][i]]}`} ></img>
                            </div>
                        )
                    ))
                }
            </div>
            <div className={"home-page-button"}>
                {
                    (button)?
                    (
                        <button className={"home-page-button-button btn btn-secondary"}
                                onClick={startGame}
                                disabled={!button}
                        >
                            start
                        </button>
                    ):
                    (
                        <>
                        </>
                    )
                }
            </div>
            <div className={"home-page-cashOut"}>
                <button className={"btn btn-secondary"}
                        ref={innerRef}
                        style={{position:"absolute", top: top, left: left}}
                        disabled={!cashButton}
                        onMouseEnter={cashCheat}
                        onClick={cashOut}
                >
                    CASH OUT
                </button>
            </div>
        </div>
    )
}

export default withRouter(Home);