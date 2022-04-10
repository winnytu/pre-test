import React , {useState,useReducer,useEffect,useDispatch} from 'react';
import styled , { ThemeProvider } from 'styled-components';
import CustomInputNumber from './CustomInputNumber'
const RoomAllocationStyle = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    width: 350px;
    padding: 10px;
    font-size:16px;
    .summarize {
        width:100%;
        font-size: 20px;
        font-weight: 600;
    }
    .last-guest {
        width:100%;
        background-color:#f0fdff;
        border-radius:5px;
        border: 1px solid #1e9fd2;
        padding: 0px 15px;
        box-sizing:border-box;
        color:#808080;
    }
    .room-container{
        width:100%;
        border-bottom : 1px solid #999999;
        padding:10px;
    }
    .room-total {
        font-size:18px;
        font-weight: 600;
    }
    .guest-type {
        font-weight: 600;
    }
    .guest-type p {
        color : #666666;
        font-size: 12px;
    }
    .people-num{
        display: flex;
        justify-content:space-between;
    }
`

const RoomAllocation = (props) => {
    var rows = []
        
    for (var i = 0; i < props.room; i++) {
        rows.push( { adult: 1, child: 0 })
    }

    // 房間分配結果
    const [result,setResult] = useState(rows)
    // 尚未分配人數
    const [lastGuest,setLastGuest] = useState(props.guest)
    // 房間分配人數是否變動
    const [change,setChange] = useState(0)
    // 更新尚未分配人數
    useEffect(()=>{
        var selectedGuest = 0
        result.forEach(e=>{
            selectedGuest = selectedGuest + e.adult + e.child
        })
        setLastGuest(props.guest - selectedGuest)
        setChange(0)
    },[change])
    // 大人房最多人數
    const handleAdultMaxChange = (room) =>{
        return lastGuest==0?room.adult:4-room.child 
    }
    // 小孩房最多人數
    const handleChildMaxChange = (room) =>{
        return lastGuest==0?room.child:4-room.adult 
    }
    // 監聽CustomInputNumber value變化
    const handleInputNumber = (e,i) => {
        console.log(e.target.name)
        console.log(e.target.value)
        origin = Object.assign(result)
        if (e.target.name === 'adult'){
            origin[i] = { adult: Number(e.target.value), child: origin[i].child }
            setResult(origin)
        } else {
            origin[i] = { adult:origin[i].adult, child: Number(e.target.value) }
            setResult(origin)
        }
        setChange(1)
        props.onChange(result)
    };
    // 監聽CustomInputNumber blur行為
    const blurInputNumber = (e) =>{
        console.log(e.target.name)
        console.log(e.target.value)
    }
    // 渲染房間分配欄位
    var rows = [];
    for (let i = 0; i < props.room; i++) {
        rows.push(
            <div key={i} className="room-container">
                <p className='room-total'>房間 : {result[i].adult+result[i].child}人</p>
                <div className='people-num'>
                    <p className='guest-type'>大人<p>年齡20+</p></p>
                    
                    <CustomInputNumber 
                        min={1}
                        max={handleAdultMaxChange(result[i])}
                        step={1}
                        name="adult"
                        value = {result[i].adult}
                        disabled={props.guest == props.room}
                        onChange={(e)=>handleInputNumber(e,i)}
                        onBlur={(e)=>blurInputNumber(e,i)}
                    />
                </div>
                <div className='people-num'>
                    <p className='guest-type'>小孩</p>
                    <CustomInputNumber 
                        min={0}
                        max={handleChildMaxChange(result[i])}
                        step={1}
                        name="child"
                        value = {result[i].child}
                        disabled={props.guest == props.room}
                        onChange={(e)=>handleInputNumber(e,i)}
                        onBlur={(e)=>blurInputNumber(e,i)}
                    />
                </div>
            </div>
        );
    }
    return (
        <RoomAllocationStyle>
            <p className='summarize'>住宿人數:{props.guest}人 / {props.room}房</p>
            <div className='last-guest'>
                <p>尚未分配人數:{lastGuest}人</p>
            </div>
            {rows}
           
        </RoomAllocationStyle>
    )
}

export default RoomAllocation