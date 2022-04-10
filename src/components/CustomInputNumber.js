import React , {useState,useReducer,useRef} from 'react';
import styled , { ThemeProvider } from 'styled-components';
const CustomInputNumbertStyle = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    flex-direction: row;
    font-size:16px;
    .input-button,.input-num {
        width: 48px;
        height: 48px;
        border-radius:5px;
        border: 1px solid #1e9fd2;
        cursor:pointer;
        margin: 0 4px;
        box-sizing:border-box;
        line-height:48px;
        text-align:center;
        color:#1e9fd2;
        font-size: 24px;
        background-color:#ffffff;
        
    }
    .input-num {
        display:flex;
        align-items:center;
        border: 1px solid #b5b5b5;
        input {
            width: 100%;
            border:none;
            text-align: center;
            box-sizing:border-box;
            padding:0;
        }
        input:focus{
            outline: none;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type="number"]{
            -moz-appearance: textfield;
        }
    }

    button:disabled,
    button[disabled]{
        opacity: 0.48;
        cursor: not-allowed;
    }
    button:hover {
        background-color: #b2dbeb;
      }
`

// 長按滑鼠事件計時器
var time,time2;
const CustomInputNumber = (props) => {
    // 輸入數值
    const [count,setCount] = useState(props.value)
    // 獲取input element
    const inputRef = useRef(null);
   

    // 監聽input value變化
    const handleChange  = (e) => {
        setCount(e.target.value)
        if (e.target.value >= props.max){
            e.target.value = props.max
        } else if (e.target.value <= props.min){
            e.target.value = props.min
        } 
        props.onChange(e)
    }

    // 監聽input 離焦
    const handleBlur  = (e) => {
        if (e.target.value >= props.max){
            e.target.value = props.max
            setCount(props.max)
        } else if (e.target.value <= props.min){
            e.target.value = props.min
            setCount(props.min)
        } else {
            setCount(e.target.value)
        }
        props.onBlur(e)
    }

    // 點擊+按紐
    const increment = () => {
        inputRef.current.stepUp()
        setCount(inputRef.current.value)
        let event = {}
        event.target = inputRef.current
        props.onChange(event)
        if (event.target.value >= props.max && time){
            clearTimeout(time)
            clearInterval(time2)
        }
    }

    // 點擊-按紐
    const decrement = () => {
        inputRef.current.stepDown()
        setCount(inputRef.current.value)
        let event = {}
        event.target = inputRef.current
        props.onChange(event)
        if (event.target.value <= props.min && time){
            clearTimeout(time)
            clearInterval(time2)
        }
    }
    // 長按按鈕
    const mousedown = (e,type) => {
        let start = new Date();
        time = setTimeout(() => {
            let nowTime = new Date();
            if (nowTime.getTime() - start.getTime() > 500) {
                time2 = setInterval(()=>{
                    if (type === 'up'){
                        increment()
                    } else {
                        decrement()
                    }
                    
                },300)
            }
        }, 500);
    } 
    // 放開按紐
    const mouseup = () => {
        clearTimeout(time)
        clearInterval(time2)
    }
    return (
        <CustomInputNumbertStyle>
            <button className='input-button'  
                onClick={decrement} onMouseDown={(e)=>mousedown(e,'down')} 
                onMouseUp={(e)=>mouseup(e,'down')} 
                disabled={count<=props.min || props.disabled}>
                    -
            </button>
            <div className='input-num'>
                <input 
                    ref={inputRef}
                    type='number' 
                    disabled={props.disabled}
                    value={count}
                    name={props.name}
                    step={props.step}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    max={props.max}
                    min={props.min}
            />
            </div>
            <button className='input-button'  
                onClick={increment} onMouseDown={(e)=>mousedown(e,'up')} 
                onMouseUp={(e)=>mouseup(e,'up')} 
                disabled={count>=props.max || props.disabled}>
                    +
            </button>
        </CustomInputNumbertStyle>
    )
}

export default CustomInputNumber